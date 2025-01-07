<template>
  <div class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/" class="navbar-logo">
          <!-- <img src="@/assets/logo.png" alt="Logo" /> -->
        </router-link>
      </div>

      <!-- Menú de navegación -->
      <ul :class="['navbar-menu', { active: isMenuActive }]">
        <li class="navbar-item"><router-link to="/" class="navbar-link" @click="closeMenu">Inicio</router-link></li>
        <li class="navbar-item"><router-link to="/login" class="navbar-link" @click="closeMenu">login</router-link></li>
        <li class="navbar-item"><router-link to="/register" class="navbar-link" @click="closeMenu">register</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes" class="navbar-link" @click="closeMenu">ordenes</router-link></li>
        <li class="navbar-item"><router-link to="/crear-ordenes" class="navbar-link" @click="closeMenu">crear-ordenes</router-link></li>
        <li class="navbar-item"><router-link to="/updateOrden1" class="navbar-link" @click="closeMenu">updateOrden1</router-link></li>
        <li class="navbar-item"><router-link to="/poraprobar" class="navbar-link" @click="closeMenu">poraprobar</router-link></li>
        <li class="navbar-item"><router-link to="/aprobadas" class="navbar-link" @click="closeMenu">aprobadas</router-link></li>
        <li class="navbar-item"><router-link to="/terminadas" class="navbar-link" @click="closeMenu">terminadas</router-link></li>
        <li class="navbar-item"><router-link to="/terminadoEstage/:idOrden" class="navbar-link" @click="closeMenu">terminadoEstage/:idOrden</router-link></li>
        <li class="navbar-item"><router-link to="/segundoEstage/:idOrden" class="navbar-link" @click="closeMenu">segundoEstage/:idOrden</router-link></li>
        <li class="navbar-item"><router-link to="/tercerEstage/:idOrden" class="navbar-link" @click="closeMenu">tercerEstage/:idOrden</router-link></li>
        <li class="navbar-item"><router-link to="/agregarProducto/:idOrden" class="navbar-link" @click="closeMenu">agregarProducto/:idOrden</router-link></li>
        <li class="navbar-item"><router-link to="/usuarios/lista" class="navbar-link" @click="closeMenu">usuarios/lista</router-link></li>
        <li class="navbar-item"><router-link to="/enviar_whatsapp" class="navbar-link" @click="closeMenu">enviar_whatsapp</router-link></li>
        <li class="navbar-item"><router-link to="/usuarios/administrar/:userid" class="navbar-link" @click="closeMenu">usuarios/administrar/:userid</router-link></li>
        <li class="navbar-item"><router-link to="/usuarios/agregarRol/:userid" class="navbar-link" @click="closeMenu">usuarios/agregarRol/:userid</router-link></li>
        <li class="navbar-item"><router-link to="/agregarProducto/:idOrden" class="navbar-link" @click="closeMenu">agregarProducto/:idOrden</router-link></li>
        <li class="navbar-item"><router-link to="/usuarios/consultas" class="navbar-link" @click="closeMenu">usuarios/consultas</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes/consultas" class="navbar-link" @click="closeMenu">ordenes/consultas</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes/consultas/fecha" class="navbar-link" @click="closeMenu">ordenes/consultas/fecha</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes/consultas/probeedor" class="navbar-link" @click="closeMenu">ordenes/consultas/probeedor</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes/consultas/estado" class="navbar-link" @click="closeMenu">ordenes/consultas/estado</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes/consultas/todos" class="navbar-link" @click="closeMenu">ordenes/consultas/todos</router-link></li>
        <li class="navbar-item"><router-link to="/ordenes/cargacsv" class="navbar-link" @click="closeMenu">ordenes/cargacsv</router-link></li>
        <li class="navbar-item"><router-link to="/back_tikets" class="navbar-link" @click="closeMenu">back_tikets</router-link></li>
        <li class="navbar-item"><router-link to="/tiketcBackStage/:idOrden" class="navbar-link" @click="closeMenu">tiketcBackStage/:idOrden</router-link></li>
        <li class="navbar-item"><router-link to="/editarUsuario/:userid" class="navbar-link" @click="closeMenu">editarUsuario/:userid</router-link></li>
        <li class="navbar-item"><router-link to="/cambiarContrasena/:userid" class="navbar-link" @click="closeMenu">cambiarContrasena/:userid</router-link></li>
        <li class="navbar-item"><router-link to="/politicasemarte" class="navbar-link" @click="closeMenu">politicasemarte</router-link></li>
      </ul>

      <!-- Botón de navegación móvil (opcional) -->
      <div class="navbar-toggle" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    closeMenu() {
      this.isMenuActive = false;
    },
  },
};
</script>

<style scoped>
/* Estilos para la barra de navegación */
.navbar {
  background-color: #333;
  padding: 1rem 2rem;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.navbar-logo img {
  width: 120px;
  height: auto;
}

.navbar-menu {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  /* display: none; */
}

.navbar-item {
  margin: 0 15px;
}

.navbar-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.navbar-link:hover {
  color: #ff6f61;
}

.navbar-toggle {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
}

.bar {
  width: 100%;
  height: 4px;
  background-color: white;
  border-radius: 5px;
}

.navbar-menu.active {
  display: block;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #333;
  text-align: center;
}

.navbar-menu.active .navbar-item {
  margin: 20px 0;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 1768px) {
  .navbar-menu {
    display: none;
    /* width: 100%; */
  }

  .navbar-toggle {
    display: flex;
  }

  .navbar-menu.active {
    display: block;
    overflow: scroll;
    height: 100vh;
  }

  .navbar-item {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
}
</style>
