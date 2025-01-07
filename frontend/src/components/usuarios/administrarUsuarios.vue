<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - TranspaServic</h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>

    <section class="main"  style="width: 94% !important; height: auto;">
      <div class="main-top">
        <h1>Roles de Usuario</h1>
        <i class="fas fa-file-alt"></i>
      </div>

      <center>
       
        <table  style="width: 90% !important;">
          <caption>Roles del Usuario</caption>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rol in roles" :key="rol.id">
              <td>{{ rol.nombre_rol }}</td>
              
            </tr>
          </tbody>
        </table>
      </center><br><br>
      <div class="form-group">
        <button @click="nuevorol()" class="button">Asignar Nuevo Rol</button>
      </div>
    <div class="form-group">
      <button @click="atras" class="button2">Regresar</button>
    </div>
    </section>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menuOpen: false,
      roles: {
        id_user:''
      },
      searchTerm: "", 
      id_user:''// Nuevo dato para almacenar el término de búsqueda
    };
  },
  methods: {
    aprobarOrden(userid) {
      this.$router.push(`/administrarusuario/${userid}`);
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
    nuevorol() {
      const idusuario2 = this.$route.params.userid;
      this.$router.push(`/usuarios/agregarRol/${idusuario2}`);
    },
    goToupdate1() { 
      this.$router.push("/updateOrden1");
    },
    customFunction() {
      this.$router.push("/");
    },
    atras() {
      this.$router.push("/usuarios/lista");
    },
    async administrarRoles() {
      try {
        const idusuario = this.$route.params.userid;
        const response = await axios.get(`http://138.197.94.5:3000/api/users/rolesT/${idusuario}`);
        this.roles = response.data; // Asignar todos los roles encontrados
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
    this.administrarRoles();
  },
};
</script>

<style scoped>
@import url("../../style/styles.css");
</style>
