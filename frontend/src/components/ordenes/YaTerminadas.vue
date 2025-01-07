<template>
  <div class="page">
    <header class="appbar" style="margin-top: 45px !important;">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TranspaServic</h4>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <section class="main" style="margin-top: -10px; height: auto;">
      <div class="main-top">
        <h1 style="color: aliceblue !important;">TIKETS por Aprobar</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 250px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); align-self: center !important;">
      </div>
      <center>
        <input type="text" v-model="searchTerm" placeholder="Buscar tikete...">
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
                  <button style="background-color: aquamarine !important;" @click="aprobarOrden(orden.id)">APROBAR</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </section>
    <div class="form-group">
      <button @click="atras" class="button2">Regresar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      menuOpen: false,
      ordenes: [],
      searchTerm: "", // Nuevo dato para almacenar el término de búsqueda
    };
  },
  methods: {
    aprobarOrden(ordenId) {
      this.$router.push(`/segundoEstage/${ordenId}`);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToList() {
      this.$router.push("/buscar");
    },
    goToCreate() {
      this.$router.push("/agregar");
    },
    goToupdate1() {
      this.$router.push("/updateOrden1");
    },
    customFunction() {
      this.$router.push("/");
    },
    atras() {
      this.$router.push("/ordenes");
    },
    async obtenerOrdenesPendientes() {
      try {
        const userDataString = localStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        if (userData && userData.data && userData.data.name) {
          const response = await axios.get(
            `http://138.197.94.5:3000/api/ordenes/tiketsterminados/`
          );
          this.ordenes = response.data;
        } else {
          const errorMessage = "No se encontró el nombre de usuario en la información del usuario en sesión.";
          console.error(errorMessage);
          alert(errorMessage);
        }
      } catch (error) {
        const errorMessage = "Aun no hay ordenes para este prestador de servicio.";
        console.error(errorMessage);
        alert(errorMessage);
      }
    },
  },
  computed: {
    filteredOrdenes() {
      return this.ordenes
        .filter((orden) =>
          Object.values(orden).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
        .map((orden) => ({
          ...orden,
          fecha_viaje: orden.fecha_viaje.slice(0, 10),
          fecha: orden.fecha.slice(0, 10),
        }));
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
  max-width: 80%;
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
