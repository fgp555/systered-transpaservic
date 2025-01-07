<template>
  <div class="page">
    <header class="appbar" style="margin-top: 45px !important;">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TranspaServic </h4>
      </div>
      <link rel="stylesheet" href="style.css" />
      <!-- Font Awesome Cdn Link -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">
      <nav style="display: flex; justify-content: center; padding-bottom: 200px !important;">
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
              <button class="button2" @click="goToHome"><i class="fas fa-home"></i><span class="nav-item">Inicio</span></button>
            </a>
          </li>
          <li>
            <a>
              <button class="button2" @click="goToOrdenes"><i class="fas fa-wallet"></i><span class="nav-item"> Tikets</span></button>
            </a>
          </li>
          <li>
            <a>
            </a>
          </li>


          <li>
            <button class="button2" @click="logout"><i class="fas fa-sign-out-alt"></i> <span class="nav-item">Cerrar sesión</span></button>
          </li>
        </ul>
      </nav>
      <section class="main" style="height: auto;">
        <div class="main-top">
          <h1 style="color: aliceblue !important;">Administar Tikets </h1>
          <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 250px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">

        </div>
        <div class="main-skills">

          <table class="custom-table" style="border:none !important">
            <tr>
              <td>
                <div v-for="user in userData" :key="user.id" class="card-container">
                  <div class="card" v-if="user.id === 4">
                    <h3>Crear un Nuevo Tikets</h3>
                    <img style="width: 200px  !important;" src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/tikete2.jpg?alt=media&token=67eb83ee-1191-469c-ab27-43a9ba6c7a34" alt="Descripción de la imagen" class="card-img" />
                    <button style="font-size: 10px;" class="button" @click="goToCreateOrder">
                      Crear Tiket
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <div v-for="user in userData" :key="user.id" class="card-container">
                  <div class="card" v-if="user.id === 4">
                    <h3>Cargar Tikets por CSV</h3>
                    <img style="width: 200px  !important;" src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/analysis-strategy-study-information-business-planning.jpg?alt=media&token=16d837d5-08bf-4b6e-8430-ebdeb562abcf" alt="Descripción de la imagen" class="card-img" />
                    <button style="font-size: 10px;" class="button" @click="goToCargarCSV">
                      Cargar CSV
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <div class="card-container">
                  <div class="card">
                    <h3>Tikets Por Aprobar</h3>

                    <img style="width: 200px !important;align-items: center !important; " src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/home1.jpg?alt=media&token=4380ce5f-9634-4aab-9f1e-82a08571ae85" alt="Descripción de la imagen" class="card-img" />

                    <button style="font-size: 10px;" class="button" @click="porAprobar">
                      Ver Por Aprobar
                    </button>
                  </div>
                </div>
              </td>


            </tr>
            <tr>

            </tr>
            <tr>
              <td>
                <div v-for="user in userData" :key="user.id" class="card-container">
                  <div class="card" v-if="user.id === 4">
                    <h3>Tikets ya Aprobados </h3>
                    <img style="width: 200px  !important;" src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/tiket3.webp?alt=media&token=17fc7107-e085-46d1-87d8-bfc2fc0f8108" alt="Descripción de la imagen" class="card-img" />
                    <button style="font-size: 10px;" class="button" @click="yaAprobada">
                      Ver Aprobados prestador
                    </button>
                  </div>
                </div>
              </td>

              <td>
                <div v-for="user in userData" :key="user.id" class="card-container">
                  <div class="card" v-if="user.id === 4">
                    <h3>Tikets ya Aprobadas usuario final</h3>
                    <img style="width: 200px  !important;" src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/home2.jpg?alt=media&token=c8923a97-59ce-4965-b9fc-f90e7352630d" alt="Descripción de la imagen" class="card-img" />
                    <button style="font-size: 10px;" class="button" @click="yaTerminada">
                      Ver Aprobados fin
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <div v-for="user in userData" :key="user.id" class="card-container">
                  <div class="card" v-if="user.id === 4">
                    <h3>Back Tikets</h3>
                    <img style="width: 200px !important;" src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/kyoto-japan-november-1-japanese-railway-ticket-undefined-man-hand-kyoto-japan-november-1-2015.jpg?alt=media&token=37b1e3d7-40a2-42d7-8ba8-cd52c6493c46" alt="Descripción de la imagen" class="card-img" />
                    <button style="font-size: 10px;" class="button" @click="backTikets">
                      Ir a BackTikets
                    </button>
                  </div>
                </div>
              </td>




            </tr>
            <tr>
              <td>
                <div v-for="user in userData" :key="user.id" class="card-container">
                  <div class="card" v-if="user.id === 4">
                    <h3>Zona de Consulta</h3>
                    <img style="width: 200px  !important;" src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/search-research-subject-terms-vocabulary.jpg?alt=media&token=03e6fec8-7162-40f4-8483-f751a6981018" alt="Descripción de la imagen" class="card-img" />

                    <button style="font-size: 10px;" class="button" @click="goToOrdenesConsultas">
                      Ir A Consultas
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false, // Agrega esta línea para inicializar la variable menuOpen
      userData: null
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

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToList() {
      this.$router.push('/buscar');
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

    goToOrdenesConsultas() {
      this.$router.push('/ordenes/consultas');
    },
    goToCreate() {
      this.$router.push('/agregar');
    },
    customFunction() {
      this.$router.push('/');
    },
    goToCreateOrder() {
      this.$router.push('/crear-ordenes');
    },

    goToCargarCSV() {
      this.$router.push('/ordenes/cargacsv');
    },
    porAprobar() {
      this.$router.push('/poraprobar');
    },
    yaAprobada() {
      this.$router.push('/aprobadas');
    },

    backTikets() {
      this.$router.push('/back_tikets');
    },
    enEjecucion() {
      this.$router.push('/enejecucion');
    },
    yaTerminada() {
      this.$router.push('/terminadas');
    },
    zonaConsultas() {
      this.$router.push('/terminadas');
    },
    logout() {
      // Eliminar el token de autenticación del almacenamiento local
      localStorage.removeItem('token');
      // Redirigir al usuario a la página de inicio de sesión
      this.$router.push('/login');
    },


  }
};
</script>


<style scoped>
@import url("../style/styles.css");

.custom-table {
  width: 100% !important;
  border-collapse: collapse;
  background: none;
}

.custom-table th,
.custom-table td {
  border: none;
}


.card-container {
  margin: 0;
}

.card {
  border: none;
  box-shadow: none;
  width: 100% !important;
  padding: 10px;
}

.card img {
  width: 100% !important;
}

.button {
  font-size: 10px;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  /* Ajusta la altura según sea necesario */
}
</style>