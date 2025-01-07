<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - Plan de Trabajo</h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>


    <div class="container2">
      <h1 class="title">Editar Usuario</h1>
      <form @submit.prevent="editarusuario" class="form">
        <h4 style="color: aliceblue; text-align: left;">Prestadora Asociada</h4>
        <input type="text" v-model="usuario.name" class="input" required readonly><br>
        <h4 style="color: aliceblue; text-align: left;">Asociar Nueva Prestadora</h4>
        <select v-model="usuario.name" name="empresa">
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
        <input type="text" v-model="usuario.lastname" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Correo</h4>
        <input type="text" v-model="usuario.email" class="input" required><br>
        <h4 style="color: aliceblue; text-align: left;">Teléfono de Contacto</h4>
        <input type="text" v-model="usuario.phone" class="input" required><br>
        <button type="submit" class="button">Editar Usuario</button><br>
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
        phone: ""
      },
      menuOpen: false,
      ordenes: [],
      searchTerm: "" // Nuevo dato para almacenar el término de búsqueda
    };
  },
  methods: {
    editarusuario() {
      const idusuario = this.$route.params.userid;
      const userData = {
        id: idusuario,
        name: this.usuario.name,
        lastname: this.usuario.lastname,
        email: this.usuario.email,
        phone: this.usuario.phone
      };

      axios.post(`http://138.197.94.5:3000/api/users/actualizar/${idusuario}`, userData)
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
