<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TranspaServic </h4>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">

      <section class="main">
        <section class="main">
          <div class="main-top">
            <h1 style="color: aliceblue !important;">TIKETS Terminados y aprobados </h1>
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 250px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

          </div>

          <center>
            <input type="text" v-model="searchTerm" placeholder="Buscar tikete..." />
            <table>
              <caption style="color: aliceblue !important;">Listado de TIKETS terminados y listos para el usuario final</caption>
              <thead>
                <tr>

                  <th>Fecha Radicación</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>No Documento</th>
                  <th>Fecha Viaje</th>
                  <th>Valor </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="orden in filteredOrdenes" :key="orden.id">
                  <td>{{ orden.fecha }}</td>
                  <td>{{ orden.origen }}</td>
                  <td>{{ orden.destino }}</td>
                  <td>{{ orden.cedula }}</td>
                  <td>{{ orden.fecha_viaje }}</td>
                  <td>{{ orden.valor }}</td>

                </tr>
              </tbody>
            </table>
          </center>


        </section>

      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      menuOpen: false, // Agrega esta línea para inicializar la variable menuOpen
      ordenes: [],
      searchTerm: "",
    };
  },
  computed: {
    filteredOrdenes() {
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
  methods: {
    terminarOrden(ordenId) {
      // Aquí puedes redirigir al usuario a un formulario con la información de la orden seleccionada
      // Puedes usar el enrutador para hacer esto
      this.$router.push(`/terminado/${ordenId}`);
    },
    toggleMenu() {
      // Función para alternar la visibilidad del menú Appbar izquierdo
      this.menuOpen = !this.menuOpen;
    },
    goToList() {
      // Función para ir a la lista de productos
      this.$router.push('/buscar');
    },
    goToCreate() {
      // Función para ir a la página de crear producto
      this.$router.push('/agregar');
    },
    customFunction() {
      // Función para la tercera opción del menú Appbar izquierdo
      this.$router.push('/');
    },
    aprobarOrden(ordenId) {
      // Aquí puedes redirigir al usuario a un formulario con la información de la orden seleccionada
      // Puedes usar el enrutador para hacer esto
      this.$router.push(`/terminadoEstage/${ordenId}`);
    },

    atras() {
      // Función para la tercera opción del menú Appbar izquierdo
      this.$router.push('/ordenes');
    },
    async obtenerOrdenesTerminadas() {
      try {
        const response = await axios.get('http://138.197.94.5:3000/api/ordenes/tiketsterminados');
        this.ordenes = response.data;
      } catch (error) {
        console.error('Error al obtener las órdenes pendientes:', error);
      }
    }

  },
  mounted() {
    // Llama al método para obtener las órdenes pendientes cuando el componente se monta
    this.obtenerOrdenesTerminadas();
  }
};
</script>


<style scoped></style>