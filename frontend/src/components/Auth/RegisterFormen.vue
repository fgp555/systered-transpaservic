<template>
  <div class="page">
    <!-- Appbar superior -->
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - Plan de Trabajo </h2>
      </div>
    </header>

    <!-- Contenido del formulario de registro -->
    <div class="container2">
      <h1 class="title">Crear Usuario</h1>
      <form @submit.prevent="register" class="form">
        <h4 style="color: aliceblue; text-align: left;">Prestadora Asociada</h4>
        <select v-model="name" name="empresa">
          <option value="noasociado">No Asociado</option>
          <option value="copetran">Copetran</option>
          <option value="cootransunidos">Cootransunidos</option>
          <option value="cotaxi">Cotaxi</option>
          <option value="cootransmagdalena">Cootransmagdalena</option>
          <option value="transsander">Transsander</option>
          <option value="concorde">Concorde</option>
          <option value="transricaurte">Transricaurte</option>
          <option value="catatumbo">Catatumbo</option>
          <option value="cotrans">Cotrans</option>
          <option value="sotracor">Sotracor</option>
          <option value="traescor">Traescor</option>
          <option value="ballegom">Ballegom</option>
          <option value="cotransar">Cotransar</option>
          <option value="cootransmor">Cootransmor</option>
          <option value="sotramagdalena">Sotramagdalena</option>
          <option value="cotrasangil">Cotrasangil</option>
          <option value="cotrasaravita">Cotrasaravita</option>
          <option value="cotranstame">Cotranstame</option>
          <option value="cotranal">Cotranal</option>
          <option value="motilones">Motilones</option>
          <option value="cooptmotilon">Cooptmotilon</option>
        </select><br>
        <h4 style="color: aliceblue; text-align: left;">Nombre Completo</h4>
        <input type="text" v-model="lastname" placeholder="ingrese un Apellido" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Correo</h4>
        <h5 style="color: wheat; text-align: left;">usuario para ingresar al sistema</h5>
        <input type="text" v-model="email" placeholder="Correo Electrónico" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Contraseña</h4>
        <h5 style="color: wheat; text-align: left;">ingrese minímo 8 carateres</h5>
        <input type="password" v-model="password" placeholder="Contraseña" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Teléfono de Contacto</h4>
        <input type="text" v-model="phone" placeholder="Teléfono" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Imagen de Usuario</h4>
        <h5 style="color: wheat; text-align: left;">ingrese una imagen para identificar el usuario</h5>
        <input type="file" @change="handleFileUpload" class="input" required><br> <!-- Nuevo campo para cargar imagen -->
        <button type="submit" class="button">Registrar Usuario</button><br>
        <button @click="goToLogin" class="button2">Atras</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { baseURL } from '../../services/service_baseURL';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      lastname: '',
      phone: '',
      image: null, // Nuevo estado para almacenar la imagen seleccionada
    };
  },
  methods: {
    register() {
      const formData = new FormData();
      formData.append('user', JSON.stringify({ // Nuevo formato de datos para enviar al servidor
        email: this.email,
        password: this.password,
        name: this.name,
        lastname: this.lastname,
        phone: this.phone,
      }));
      formData.append('image', this.image); // Adjuntar la imagen al formulario

      // Petición POST al servidor para registrar al usuario
      // axios.post('http://138.197.94.5:3000/api/users/createT', formData)
      // axios.post('http://localhost:3000/api/users/create', formData)
      axios.post(`${baseURL}/api/users/createT`, formData)
        .then(response => {
          console.log('Usuario registrado exitosamente:', response.data.data);
          alert('Usuario registrado exitosamente');
          // window.location.reload();
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error.response.data.message);
          if (error.response && error.response.data && error.response.data.message) {
            alert('Error al registrar el usuario: ' + error.response.data.message);
          } else {
            alert('Error de red o del servidor');
          }
        });
    },

    goToLogin() {
      // Redirecciona a la página de inicio de sesión
      this.$router.push('/usuarios/lista');
    },


    handleFileUpload(event) {
      // Actualizar el estado 'image' con el archivo seleccionado por el usuario
      this.image = event.target.files[0];
    }
  }
};
</script>




<style scoped></style>