<template>
  <div class="page">
    <header class="appbar" style="margin-top: 45px !important;">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TranspaServic </h4>
      </div>
      <link rel="stylesheet" />
      <!-- Font Awesome Cdn Link -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">

      <section class="main" style="margin-top: -10px;">

        <div class="main-top">
          <h1 style="color: aliceblue !important;">Consultar Por Cedula </h1>
        </div>
        <div class="main-skills">
          <div class="card">
            <table border="2">

              <tr style="background-color: indianred;">
                <td colspan="2">
                  <label for="campo16" style="color: whitesmoke;">Ingrese Número de Cedúla a Buscar</label>

                </td>
              </tr>
              <br>
              <!-- Primera fila con 4 columnas -->
              <tr>
                <input type="text" v-model="searchTerm" placeholder="Ingrese Numero de Cedula ...." />
                <div class="table-container">
                  <table class="bordered-table">
                    <caption style="color: aliceblue !important;">Listado de TIKETS por aprobar</caption>
                    <thead>
                      <tr>
                        <th>Fecha Radicación</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Prestadora</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Fecha Viaje</th>
                        <th>Valor Unit</th>
                        <th>Cantidad</th>
                        <th>Valor Total</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="orden in filteredOrdenes" :key="orden.id">
                        <td>{{ orden.fecha }}</td>
                        <td>{{ orden.origen }}</td>
                        <td>{{ orden.destino }}</td>
                        <td>{{ orden.prestadora }}</td>
                        <td>{{ orden.nombre_paciente }}</td>
                        <td>{{ orden.cedula }}</td>
                        <td>{{ orden.fecha_viaje }}</td>
                        <td>{{ orden.valor }}</td>
                        <td>{{ orden.cantidad }}</td>
                        <td>{{ orden.valor_neto_pax }}</td>
                        <td>
                          <button style="background-color: aquamarine !important;" @click="aprobarOrden(orden.id)">Administrar</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </tr>
              <br><br>
            </table>

          </div>




        </div><br>
        <button @click="exportToExcel()" class="button3">Exportar Excel</button><br><br>
        <button class="button2" @click="atras">Atras</button><br><br>


      </section>
      <section>

      </section>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as XLSX from 'xlsx';


export default {
  data() {
    return {
      menuOpen: false, // Agrega esta línea para inicializar la variable menuOpen
      userData: null,
      ordenes: [],
      searchTerm: "",
    };
  },

  created() {
    // Recuperar la información del usuario del localStorage
    const userData = localStorage.getItem('userData');
    console.log(userData);


    if (userData) {
      // Si la información del usuario existe en el localStorage,
      // asignarla a una variable de datos del componente.
      this.userData = JSON.parse(userData);
    } else {
      alert('La contraseña es incorrecta');
    }
  },
  computed: {
    filteredOrdenes() {
      // Filtrar las órdenes basadas en el término de búsqueda
      return this.ordenes
        .filter((orden) =>
          // Filtrar por id, fecha, ciudad y tipo de proyecto
          Object.values(orden).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
        .map((orden) => ({
          ...orden
        }));
    },

  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToList() {
      this.$router.push('/buscar');
    },
    goToHome() {
      this.$router.push('/home');
    },

    aprobarOrden(ordenId) {
      // Aquí puedes redirigir al usuario a un formulario con la información de la orden seleccionada
      // Puedes usar el enrutador para hacer esto
      this.$router.push(`/terminadoEstage/${ordenId}`);
    },

    terminarOrden(ordenId) {
      // Aquí puedes redirigir al usuario a un formulario con la información de la orden seleccionada
      // Puedes usar el enrutador para hacer esto
      this.$router.push(`/terminado/${ordenId}`);
    },
    async obtenerOrdenesPendientes() {
      try {
        const response = await axios.get(
          "http://138.197.94.5:3000/api/ordenes/tiketstodos"
        );
        this.ordenes = response.data;
      } catch (error) {
        console.error("Error al obtener las órdenes pendientes:", error);
      }
    },

    exportToExcel() {
      // Crear una matriz para almacenar los datos de las órdenes
      const data = [
        ['Fecha Radicación', 'Contrato Transporte', 'Origen', 'Destino', 'Nombre', 'Documento', 'Fecha de Viaje', 'Valor', 'cantidad', 'valor_neto_pax', 'Prestadora'],
        []
      ];

      // Iterar sobre las órdenes y agregar los datos de cada orden a la matriz
      this.ordenes.forEach(orden => {
        data.push([
          orden.fecha.slice(0, 10),
          orden.contrato_transporte,
          orden.origen,
          orden.destino,
          orden.nombre_paciente,
          orden.cedula,
          orden.fecha_viaje.slice(0, 10),
          orden.valor,
          orden.cantidad,
          orden.valor_neto_pax,
          orden.prestadora
        ]);
      });

      // Crear una hoja de cálculo a partir de la matriz de datos
      const ws = XLSX.utils.aoa_to_sheet(data);

      // Establecer el título de la hoja de cálculo
      const wsName = 'trasnpaservic';

      // Estilos para las celdas
      ws['!cols'] = [
        // Define el ancho de cada columna (en unidades de caracteres)
        { wch: 13 }, // Ancho de la primera columna
        { wch: 13 }, // Ancho de la segunda columna
        { wch: 13 }, // Ancho de la tercera columna
        { wch: 13 }, // Ancho de la cuarta columna
        { wch: 13 }, // Ancho de la quinta columna
        { wch: 13 }, // Ancho de la sexta columna
        { wch: 13 }, // Ancho de la séptima columna
        { wch: 13 }, // Ancho de la octava columna
        { wch: 13 }, // Ancho de la novena columna
        { wch: 13 }  // Ancho de la décima columna
      ];// Puedes establecer un nombre fijo o dinámico aquí

      // Crear un libro de Excel y agregar la hoja de cálculo
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, wsName);

      // Descargar el archivo Excel
      XLSX.writeFile(wb, `${wsName}.xlsx`);
    },
    atras() {
      this.$router.push('/ordenes/consultas');
    },
    goToOrdenes() {
      this.$router.push('/ordenes');
    },
    goToCreate() {
      this.$router.push('/agregar');
    },
    customFunction() {
      this.$router.push('/');
    },
    goToCreateOrder() {
      this.$router.push('/crear-ordenes');
    },
    porAprobar() {
      this.$router.push('/poraprobar');
    },
    yaAprobada() {
      this.$router.push('/aprobadas');
    },
    enEjecucion() {
      this.$router.push('/enejecucion');
    },
    yaTerminada() {
      this.$router.push('/ordenes');
    },
    logout() {
      // Eliminar el token de autenticación del almacenamiento local
      localStorage.removeItem('token');
      // Redirigir al usuario a la página de inicio de sesión
      this.$router.push('/login');
    },


  },
  mounted() {
    this.obtenerOrdenesPendientes();
  },
};
</script>


<style scoped>
@import url("../../style/styles.css");

.main-skills {
  display: flex;
  justify-content: space-between;
  /* Para distribuir los elementos horizontalmente */
}

.card {
  flex: 1;
  /* Para que cada tarjeta tenga el mismo ancho */
}

.main-skills {
  display: flex;
  justify-content: space-between;
  /* Para distribuir los elementos horizontalmente */
}

.card {
  flex: 1;
  /* Para que cada tarjeta tenga el mismo ancho */
}

.table-container {
  max-width: 100%;
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
</style>