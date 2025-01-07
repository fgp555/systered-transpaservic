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

      <section class="main" style="margin-top: -10px ;height: auto;">

        <div class="main-top">
          <h1 style="color: aliceblue !important;">Agregar Registros po CSV </h1>
        </div>
        <div class="main-skills">
          <div class="card">
            <form @submit.prevent="buscarProveedor">
              <label for="campo1">Seleccionar Archivo</label><br>
              <input type="file" @change="handleFileUpload">
              <br><br>
              <button style="background-color: darkgray;" type="submit" class="button3">Agregar Registros</button><br>
            </form>
          </div>




        </div><br>
        <button class="button2" @click="atras">Atras</button><br><br>






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
      orden: {

        contrato_transporte: '',

        fecha: '',
        chequeo: '',
        valor: '',
        valor_neto_pax: '',
        prestadora: '',
        estado: '',
        serial: '',
        valor_prestadora: '',
        doc1: ''

      },
      menuOpen: false, // Agrega esta línea para inicializar la variable menuOpen
      userData: null,
      ordenes: [],
      searchTerm: "",
      estado: ""
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

  methods: {

    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = reader.result;
        this.sendFormData(csvData); // Enviar csvData como una cadena de texto
      };

      reader.readAsText(file);
    },

    sendFormData(csvData) {
      // Enviar los datos al servidor utilizando axios.post
      axios.post('http://138.197.94.5:3000/api/ordenes/createtiketcsv', { csvData: csvData }) // Enviar csvData como parte de un objeto
        .then(response => {
          console.log('Carga registrada exitosamente:', response.data.data);
          alert('Tikets registrados exitosamente');
          this.$router.push('/ordenes');
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            // Mostrar mensaje de error personalizado enviado por el backend
            alert(`Error al registrar Tiket: ${error.response.data.message}`);
            console.error('Error al registrar Carga:', error.response.data.message);
          } else {
            // Manejo de errores inesperados
            alert('Ocurrió un error inesperado al registrar la carga. Por favor, intente de nuevo.');
            console.error('Error inesperado:', error);
          }
        });
    },



    atras() {
      this.$router.go(-1);
    },


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