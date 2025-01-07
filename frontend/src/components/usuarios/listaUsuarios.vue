<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - TranspaServic</h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>

    <section class="main" style="height: 700px !important;">
      <div class="main-top">
        <h1>Lista de usuarios</h1>
        <i class="fas fa-file-alt"></i>
      </div>

      <center>
        <input type="text" v-model="searchTerm" placeholder="Buscar usuario..." /><br><br>
        <div class="table-container">
          <table class="bordered-table">
            <thead>
              <tr>
                <th>Prestadora Asociada</th>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Accionar del Usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orden in filteredUsers" :key="orden.id">
                <td>{{ orden.name }}</td>
                <td>{{ orden.lastname }}</td>
                <td>{{ orden.email }}</td>
                <td>
                  <div class="dropdown">
                    <button class="dropbtn">Acciones</button>
                    <div class="dropdown-content">
                      <button @click="aprobarOrden(orden.id)">Administrar Roles</button>
                      <button @click="editarusuario(orden.id)">Editar Usuario</button>
                      <button @click="editarUsuario(orden.id)">Cambiar Contraseña</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </center><br><br>
      <div class="form-group">
        <button @click="register" class="button">Crear Nuevo usuario</button>
      </div>
      <div class="form-group">
        <button @click="atras" class="button2">Regresar</button>
      </div>
    </section>

  </div>
</template>

<script>
import axios from "axios";
import { baseURL } from '../../services/service_baseURL';

export default {
  data() {
    return {
      menuOpen: false,
      ordenes: [],
      searchTerm: "",
    };
  },
  methods: {
    aprobarOrden(userid) {
      this.$router.push(`/usuarios/administrar/${userid}`);
    },
    editarusuario(userid) {
      this.$router.push(`/editarUsuario/${userid}`);
    },
    editarUsuario(userid) {
      this.$router.push(`/cambiarContrasena/${userid}`);
    },
    atras() {
      this.$router.push("/home");
    },
    register() {
      this.$router.push("/register");
    },
    async obtenerOrdenesPendientes() {
      try {
        const response = await axios.get(
          // "http://138.197.94.5:3000/api/users/getAllT"
          `${baseURL}/api/users/getAllT`
        );
        this.ordenes = response.data; // Corregir el nombre de la propiedad
      } catch (error) {
        console.error("Error al obtener las órdenes pendientes:", error);
      }
    },
  },
  computed: {
    filteredUsers() { // Corregir el nombre de la propiedad
      // Filtrar las órdenes basadas en el término de búsqueda
      return this.ordenes.filter((orden) =>
        // Filtrar por id, fecha, ciudad y tipo de proyecto
        Object.values(orden).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    },
  },
  mounted() {
    this.obtenerOrdenesPendientes();
  },
};
</script>

<style scoped>
@import url("../../style/styles.css");

.table-container {
  max-width: 70%;
  height: 400px;
  /* Altura fija del contenedor */
  overflow-y: auto;
  /* Habilita la barra de desplazamiento vertical */
  border: 1px solid #ccc;
  /* Opcional: añade un borde al contenedor */
  padding: 10px;
  /* Opcional: añade un padding dentro del contenedor */
}

.bordered-table {
  width: 100%;
  border-collapse: collapse;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #ccc;
  /* Borde de las celdas */
  padding: 4px;
  /* Espaciado dentro de las celdas */
  text-align: left;
  /* Alineación del texto */
  font-size: 12px;
  /* Tamaño de fuente más pequeño */
}

.bordered-table th {
  background-color: #f2f2f2;
  /* Color de fondo de los encabezados */
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: grey;
  color: white;
  padding: 4px;
  font-size: 12px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: 12px;
}

.dropdown-content button {
  color: black;
  padding: 8px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: black;
}
</style>
