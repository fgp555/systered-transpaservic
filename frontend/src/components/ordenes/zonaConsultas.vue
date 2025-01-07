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

      <section class="main" style="margin-top: -10px;height: auto;">

        <div class="main-top">
          <h1 style="color: aliceblue !important;">Consultar Tiketes </h1>
        </div>
        <div class="main-skills">
          <div class="card">
            <h3>Consultar por Fecha </h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/close-up-still-life-hard-exams.jpg?alt=media&token=5e230dba-94df-40c3-8f47-05d20d41d75c" alt="Descripción de la imagen" style="width: 150px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

            <p>Buscar tikets generados por fecha inicio y fecha fin</p><br>
            <button @click="consultarFecha">Buscar</button>
          </div>

          <div class="card">
            <h3>Consultar por Estados</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/front-view-man-holding-ballot.jpg?alt=media&token=68e7ef26-8893-44eb-8cfd-e36b8798e49c" alt="Descripción de la imagen" style="width: 135px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

            <p>Buscar tikets generados por Estado</p><br>
            <button @click="estado">Buscar</button>
          </div>

          <div class="card">
            <h3>Buscar por Prestador</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/one-working-day-modern-automatic-bus-manufacturing-with-unfinished-cars-workers-protective-uniform-automotive-industry.jpg?alt=media&token=74f636a1-ed0b-4146-b96b-01b9d2faa4de" alt="Descripción de la imagen" style="width: 150px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

            <p>Buscar tikets generados por prestador</p><br>
            <button @click="probeedor">Buscar</button>
          </div>

          <div class="card">
            <h3>Buscar Documento</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/ZYJRQTL5AZCDLNOG5CFQ5QRXKA.avif?alt=media&token=df603458-b493-475f-a08f-3ab771cd29fc" alt="Descripción de la imagen" style="width: 130px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

            <p>Buscar todos los tikets generados </p><br>
            <button @click="Todos">Buscar</button>
          </div>


        </div><br>
        <button class="button2" @click="yaTerminada">Atras</button><br><br>


      </section>
      <section>

      </section>

    </div>
  </div>
</template>

<script>
import axios from "axios";

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
          "http://192.168.1.18:3000/api/ordenes/tiketsterminados"
        );
        this.ordenes = response.data;
      } catch (error) {
        console.error("Error al obtener las órdenes pendientes:", error);
      }
    },
    goToUsuarios() {
      this.$router.push('/usuarios/lista');
    },
    goToOrdenes() {
      this.$router.push('/ordenes');
    },
    consultarFecha() {
      this.$router.push('/ordenes/consultas/fecha');
    },
    customFunction() {
      this.$router.push('/');
    },
    estado() {
      this.$router.push('/ordenes/consultas/estado');
    },
    Todos() {
      this.$router.push('/ordenes/consultas/todos');
    },
    yaAprobada() {
      this.$router.push('/aprobadas');
    },
    probeedor() {
      this.$router.push('/ordenes/consultas/probeedor');
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
</style>