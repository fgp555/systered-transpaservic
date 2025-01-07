const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("pg");

console.log("backupRestoreRoutes - process.env.DB_NAME", process.env.DB_NAME);

const backupDir = path.join(__dirname, "../backups");
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Ruta para hacer un backup de la base de datos
router.post("/create-backup", (req, res) => {
  const fileName = `backup_${new Date().toISOString().replace(/[:.]/g, "-")}.sql`;
  const backupPath = path.join(__dirname, "../backups", fileName);

  // El comando pg_dump ahora no utiliza -F c para la compresión
  const command = `pg_dump -h ${process.env.HOST} -p ${process.env.PORT} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -F p > ${backupPath}`;

  exec(command, { env: { ...process.env, PGPASSWORD: process.env.DB_PASS } }, (error, stdout, stderr) => {
    if (error) {
      console.error("Error al generar el backup:", error);
      return res.status(500).json({ message: "Error al generar el backup", error });
    }
    console.log("Backup generado:", backupPath);
    res.download(backupPath, fileName); // Descarga el archivo generado
  });
});

// Ruta para restaurar la base de datos desde un archivo predefinido
router.post("/restore/:dbName", (req, res) => {
  const dbName = process.env.DB_NAME;
  const backupFileName = req.body.backupFileName || "backup_predefinido.sql"; // Nombre del archivo de backup
  const backupPath = path.join(__dirname, "../backups", backupFileName);

  const command = `psql -h ${process.env.HOST} -p ${process.env.PORT} -U ${process.env.DB_USER} -d ${dbName} -f ${backupPath}`;

  exec(command, { env: { ...process.env, PGPASSWORD: process.env.DB_PASS } }, (error, stdout, stderr) => {
    if (error) {
      console.error("Error al restaurar el backup:", error);
      return res.status(500).json({ message: "Error al restaurar el backup", error });
    }
    console.log("Backup restaurado exitosamente en la base de datos:", dbName);
    res.json({ message: `Backup restaurado exitosamente en la base de datos ${dbName}.` });
  });
});

// Ruta para restaurar la base de datos desde un archivo predefinido
router.post("/delete-restore/:dbName", async (req, res) => {
  const dbName = process.env.DB_NAME;
  const backupFileName = req.body.backupFileName || "backup_predefinido.sql"; // Nombre del archivo de backup
  const backupPath = path.join(__dirname, "../backups", backupFileName);

  // Crear cliente para conectarse a la base de datos
  const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName,
  });

  try {
    // Conectar al cliente
    await client.connect();

    // Consultar todas las tablas de la base de datos
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `);

    const tables = result.rows.map((row) => row.table_name);

    if (tables.length === 0) {
      console.log("No se encontraron tablas para truncar.");
    } else {
      // Desactivar restricciones de claves foráneas temporalmente
      await client.query("SET session_replication_role = 'replica';");

      // Truncar cada tabla
      for (const table of tables) {
        console.log(`Truncando tabla: ${table}`);
        await client.query(`TRUNCATE TABLE "${table}" CASCADE;`);
      }

      // Reactivar restricciones de claves foráneas
      await client.query("SET session_replication_role = 'origin';");
      console.log("Datos de todas las tablas truncados exitosamente.");
    }

    // Restaurar el backup
    const restoreCommand = `psql -h ${process.env.HOST} -p ${process.env.PORT} -U ${process.env.DB_USER} -d ${dbName} -f ${backupPath}`;
    exec(restoreCommand, { env: { ...process.env, PGPASSWORD: process.env.DB_PASS } }, (restoreError, restoreStdout, restoreStderr) => {
      if (restoreError) {
        console.error("Error al restaurar el backup:", restoreError);
        return res.status(500).json({ message: "Error al restaurar el backup", error: restoreError });
      }
      console.log("Backup restaurado exitosamente en la base de datos:", dbName);
      res.json({ message: `Backup restaurado exitosamente en la base de datos ${dbName}.` });
    });
  } catch (error) {
    console.error("Error al truncar datos o restaurar la base de datos:", error);
    res.status(500).json({ message: "Error al truncar datos o restaurar la base de datos", error });
  } finally {
    // Cerrar la conexión con la base de datos
    await client.end();
  }
});

// Ruta para listar los archivos de backup existentes
router.get("/backups-list", (req, res) => {
  fs.readdir(backupDir, (err, files) => {
    if (err) {
      console.error("Error al leer la carpeta de backups:", err);
      return res.status(500).json({ message: "Error al leer la carpeta de backups", error: err });
    }

    // Filtra solo los archivos con extensión .sql
    const backupFiles = files.filter((file) => file.endsWith(".sql"));

    // Devuelve la lista de archivos
    res.json({ backups: backupFiles });
  });
});

// Nueva ruta para truncar las tablas de un esquema específico
router.post("/truncate-schema", (req, res) => {
  const { schemaName, dbName } = req.body;

  if (!schemaName || !dbName) {
    return res.status(400).json({ message: "Se requiere el nombre del esquema y la base de datos" });
  }

  // Comando para truncar todas las tablas del esquema
  const command = `psql -h ${process.env.HOST} -p ${process.env.PORT} -U ${process.env.DB_USER} -d ${dbName} -c "DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = '${schemaName}') LOOP EXECUTE 'TRUNCATE TABLE ${schemaName}.' || r.tablename || ' CASCADE'; END LOOP; END $$;"`;

  exec(command, { env: { ...process.env, PGPASSWORD: process.env.DB_PASS } }, (error, stdout, stderr) => {
    if (error) {
      console.error("Error al truncar el esquema:", error);
      return res.status(500).json({ message: "Error al truncar el esquema", error });
    }
    console.log(`Tablas del esquema ${schemaName} truncadas correctamente en la base de datos ${dbName}`);
    res.json({ message: `Tablas del esquema ${schemaName} truncadas exitosamente en la base de datos ${dbName}` });
  });
});

module.exports = router;
