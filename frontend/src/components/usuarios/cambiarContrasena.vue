<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - Plan de Trabajo</h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>

    <div class="container2">
      <h1 class="title">Cambiar Contraseña</h1>
      <form @submit.prevent="cambiarcontraseña" class="form">
        <h4 style="color: aliceblue; text-align: left;">Nueva Contraseña</h4>
        <input type="password" v-model="password" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Ingrese de Nuevo Contraseña</h4>
        <input type="password" v-model="confirmPassword" class="input" required><br>
        <button type="submit" class="button">Cambiar Contraseña</button><br>
      </form>
    </div>
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
      usuario: {
        email: "",
        name: "",
        lastname: "",
        phone: "",
      },
      password: "",
      confirmPassword: "",
      menuOpen: false,
      ordenes: [],
      searchTerm: "" // Nuevo dato para almacenar el término de búsqueda
    };
  },
  methods: {
    cambiarcontraseña() {
      // Verificar si las contraseñas coinciden
      if (this.password !== this.confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
      }

      const idusuario = this.$route.params.userid;
      const userData = {
        id: idusuario,
        password: this.password,
      };

      axios.post(`http://138.197.94.5:3000/api/users/cambiarpass/${idusuario}`, userData)
        .then(response => {
          console.log('Usuario actualizado exitosamente:', response.data.data);
          alert('Se actualizó el usuario correctamente');
          this.$router.push('/usuarios/lista');
        })
        .catch(error => {
          console.error('Error al actualizar el usuario:', error.response.data.message);
          alert('Error al actualizar el usuario');
          this.$router.push('/usuarios/lista');
        });
    },

    async obtenerDetalleUsuario() {
      try {
        const idusuario = this.$route.params.userid; // Obtén el ID del parámetro de la ruta
        console.log("ID Usuario:", idusuario); // Añade este log para verificar el ID
        if (idusuario) {
          const response = await axios.get(
            `http://138.197.94.5:3000/api/users/getDetalle/${idusuario}`
          );
          const usuario = response.data[0];
          this.usuario.email = usuario.email;
          this.usuario.name = usuario.name;
          this.usuario.lastname = usuario.lastname;
          this.usuario.phone = usuario.phone;
        } else {
          console.error("El ID del usuario es undefined.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    },
    atras() {
      this.$router.go(-1);
    },
    register() {
      this.$router.push("/register");
    }
  },
  mounted() {
    this.obtenerDetalleUsuario();
  }
};
</script>


<style scoped>
@import url("../../style/styles.css");
</style>
