<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - TranspaServic </h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">

      <section class="main">
        <section class="main">
          <div class="main-top">
            <h1>Ordenes de Trabajo en Ejecución</h1>
            <i class="fas fa-file-alt"></i>
          </div>

          <center>
            <input type="text" v-model="searchTerm" placeholder="Buscar orden..." />
            <table>
              <caption>Listado de ordenes de trabajo por aprobar</caption>
              <thead>
                <tr>
                  <th>Orden Pedido</th>
                  <th>Fecha Radicación</th>
                  <th>Ciudad</th>
                  <th>Tipo Proyecto</th>
                  <th>Estado</th>
                  <th>Documentos Anexos</th>
                  <th>Accionar de la Orden</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="orden in filteredOrdenes" :key="orden.id">
                  <td>{{ orden.id }}</td>
                  <td>{{ orden.fecha }}</td>
                  <td>{{ orden.ciudad }}</td>
                  <td>{{ orden.tipoproyecto }}</td>
                  <td>{{ orden.estado }}</td>
                  <td><a :href="orden.doc1" target="_blank">Ver Documento Anexado</a></td>
                  <button @click="ejecutarOrden(orden.id)">Administrar</button>
                </tr>
              </tbody>
            </table>
          </center>


        </section>
        <div class="form-group">
          <button @click="atras" class="button2">Regresar</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      menuOpen: false,
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
    ejecutarOrden(ordenId) {
      // Aquí puedes redirigir al usuario a un formulario con la información de la orden seleccionada
      // Puedes usar el enrutador para hacer esto
      this.$router.push(`/cuartoestage/${ordenId}`);
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

    atras() {
      // Función para la tercera opción del menú Appbar izquierdo
      this.$router.push('/ordenes');
    },
    async obtenerOrdenesEnEjecucion() {
      try {
        const response = await axios.get('http://138.197.94.5:3000/api/ordenes/enejecucion');
        this.ordenes = response.data;
      } catch (error) {
        console.error('Error al obtener las órdenes pendientes:', error);
      }
    }

  },
  mounted() {
    // Llama al método para obtener las órdenes pendientes cuando el componente se monta
    this.obtenerOrdenesEnEjecucion();
  }
};
</script>


<style scoped></style>