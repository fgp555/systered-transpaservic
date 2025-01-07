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

      <nav style="display: flex; align-items: flex-start; justify-content: center; padding-bottom: 440px">
        <ul style="margin-top: -10px !important;">
          <div v-for="user in userData" :key="user.id">
            <img :src="user.image" alt="" style="width: 70%;"><br><br>
          </div>
          <li>
            <div v-for="user in userData" :key="user.id">
              <p style="color: aliceblue !important;"> {{ user.name }}</p>
              <p style="color: aliceblue !important;"> {{ user.lastname }}</p>
              <!-- Otros campos de datos del usuario -->
            </div>



          </li>
          <li>
            <a>
              <button class="button2"><i class="fas fa-home"></i><span class="nav-item">Inicio</span></button>
            </a>
          </li>
          <li>
            <a>
              <button class="button2" @click="goToOrdenes"><i class="fas fa-wallet"></i><span class="nav-item"> Tikets</span></button>
            </a>
          </li>
          <li>
            <button class="button2" @click="logout"><i class="fas fa-sign-out-alt"></i> <span class="nav-item">Cerrar sesión</span></button>
          </li>
        </ul>
      </nav>

      <section class="main">

        <div class="main-top">
          <h1 style="color: aliceblue !important;">Administar Sistema</h1>
          <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 250px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

        </div>
        <div class="main-skills">
          <div class="card">
            <h3>Tikets</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/home1.jpg?alt=media&token=4380ce5f-9634-4aab-9f1e-82a08571ae85" alt="Descripción de la imagen" style="width: 150px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

            <p>Crea y Administra tus Tikets</p>
            <button @click="goToOrder" class="button">Administrar Tikets</button>
          </div>
          <div class="card">
            <div v-for="user in userData" :key="user.id">
              <div v-if="user.id == 4">
                <h3>Administrar Usuarios</h3>
                <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/home3.jpg?alt=media&token=d7c3bf9e-14c9-465a-9b73-2ca06e165e3e" alt="Descripción de la imagen" style="width: 150px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <p>Lista los usuarios y administra</p>
                <button style="margin-top: 5px;" @click="gotoListaUsuarios()" class="button">Administrar Usuarios</button>
              </div>
            </div>
          </div>



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
      userData: JSON.parse(localStorage.getItem('userData')) || {}, // Recuperar datos de usuario del almacenamiento local

    };
  },
  created() {
    // Recuperar la información del usuario del localStorage
    const userData = localStorage.getItem('userData');
    console.log(userData);


    if (userData) {
      this.userData = JSON.parse(userData);
    } else {
      alert('La contraseña es incorrecta');
    }
  },
  methods: {
    gotoListaUsuarios() {
      // Función para ir a la lista de productos
      this.$router.push('/usuarios/lista');
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
    logout() {
      // Eliminar el token de autenticación del almacenamiento local
      localStorage.removeItem('token');
      // Redirigir al usuario a la página de inicio de sesión
      this.$router.push('/login');
    },

    goToOrder() {
      // Redirecciona a la página de inicio de sesión
      this.$router.push('/ordenes');
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToUsuarios() {
      this.$router.push('/usuarios/lista');
    },
    goToOrdenes() {
      this.$router.push('/ordenes');
    },

    async buscarempleados() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://192.168.1.18:3000/api/products/getempleados/${idOrden}`);

        // Verifica si la respuesta contiene datos
        if (response.data && response.data.length > 0) {
          // Asigna los productos a la propiedad 'productos1'
          this.empleado = response.data;
        } else {
          console.log('No se encontraron empleados para esta orden.');
        }
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    },

    async buscarroles() {

      const userData = localStorage.getItem('userData');
      this.userData = JSON.parse(userData);
      const idusuario = this.userData.id;

      try {
        const response = await axios.get(`http://192.168.1.18:3000/api/users/roles/${idusuario}`);
        if (response.data && response.data.length > 0) {
          this.rolesusuario = response.data;
        } else {
          console.log('No se encontraron roles de usuario para este usuario.');
        }
      } catch (error) {
        console.error('Error al obtener los roles de usuario:', error);
      }
    },

    isClient() {
      return this.userData && this.userData.roles && this.userData.roles.some(role => role.name === 'CLIENTE');
    },

  },
  computed: {
    isAdmin() {
      return this.userData && this.userData.roles && this.userData.roles.some(role => role.name === 'ADMIN'); // Verificar si el usuario tiene el rol de administrador
    },

  },
  mounted() {
    // Llama al método para obtener los detalles de la orden cuando el componente se monta
    this.buscarroles();
  },
};
</script>


<style scoped>
@import url("../style/styles.css");
</style>
