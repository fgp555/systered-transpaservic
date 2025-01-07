<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - TranspaServic </h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">
      <nav>
        <ul>
          <li><a href="#" class="logo">
              <span class="nav-item">Orden de Trabajo</span>

            </a></li>
          <div v-for="user in (userData)" :key="user.id">
            <img :src="user.image" style="width: 20%;" alt="">

            <p> {{ user.name }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
          </div>
          <li><a href="#">
              <i class="fas fa-home"></i>
              <span class="nav-item">Inicio</span>
            </a></li>
          <li><a href="">
              <i class="fas fa-user"></i>
              <span class="nav-item">Perfil</span>
            </a></li>
          <li><a href="">
              <i class="fas fa-wallet"></i>
              <span class="nav-item">Trabajos</span>
            </a></li>
          <li><a href="">
              <i class="fas fa-chart-bar"></i>
              <span class="nav-item">Gastos</span>
            </a></li>
          <li><a href="">
              <i class="fas fa-tasks"></i>
              <span class="nav-item">Productos</span>
            </a></li>
          <li><a href="">
              <i class="fas fa-cog"></i>
              <span class="nav-item">Configuración</span>
            </a></li>
          <li><a href="">
              <i class="fas fa-question-circle"></i>
              <span class="nav-item">Ayuda</span>
            </a></li>
          <li><a href="" class="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span class="nav-item">Salir</span>
            </a></li>
        </ul>
      </nav>
      <section class="main">
        <section class="main">
          <div class="main-top">
            <h1>Agregar Permisos a la orden</h1>
            <i class="fas fa-file-alt"></i>
          </div>


          <form class="form-order" @submit.prevent="crearPermiso">
            <div class="form-group">
              <h4 class="subtitulo">Cargar Permiso</h4>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16">Permiso</label>
                <input style="width: 200px;" type="file" @change="handleFileUpload" class="input"><br> <!-- Nuevo campo para cargar imagen -->

              </td>
              <div class="input-group">
                <label for="nombre">Notas</label>
                <input type="text" v-model="notas" class="input-field">
              </div>
              <div class="input-group">
                <label for="fecha">Fecha de Carga :</label>
                <input type="date" v-model="fecha" class="input-field" readonly>
              </div>




            </div>

            <div class="form-group">
              <button type="submit" class="button">Agregar Permiso</button>
              <button @click="atras" class="button2">Regresar</button>
            </div>
          </form>


        </section>
        <label> Lista de Permisos </label><br>
        <table class="small-table">
          <thead>
            <tr>
              <th>fecha de carga</th>
              <th>Notas</th>
              <th>Descargar Documento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in permisos" :key="producto.id">
              <td>{{ producto.fecha }}</td>
              <td>{{ producto.notas }}</td>
              <td> <a :href="producto.doc1" target="_blank">Ver Documento Anexado</a></td> <!-- Asegúrate de mostrar el valor total, no el precio -->
            </tr>
          </tbody>

        </table><br><br>

      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      nombre: '',
      cantidad: '',
      valortotal: '',
      fecha: this.obtenerFechaActual(),
      estado: 'aprobado',
      usuarios: [],
      userData: null,
      productos1: [],
      notas: '',
      permisos: [],

    };
  },
  computed: {
    idOrden() {
      return this.$route.params.idOrden;
    },
    totalProductos() {
      // Suma los precios de todas las adiciones
      return this.productos1.reduce((total, productos1) => total + parseFloat(productos1.precio), 0);
    },
  },
  created() {
    // Recuperar la información del usuario del localStorage
    const userData = localStorage.getItem('userData');
    console.log(userData);


    if (userData) {
      //alert('Hola Bienvenido al sistema - proceda con sus ordenes '+ JSON.stringify(userData));
      // Si la información del usuario existe en el localStorage,
      // asignarla a una variable de datos del componente.
      this.userData = JSON.parse(userData);
    } else {
      alert('La contraseña es incorrecta');
    }
  },
  methods: {

    cargarUsuarios() {
      // Aquí debes realizar una solicitud HTTP para obtener la lista de usuarios
      // Por ejemplo, usando axios:
      axios.get('http://192.168.1.18:3000/api/users/optenersupervisores')
        .then(response => {
          this.usuarios = response.data;
        })
        .catch(error => {
          console.error('Error al cargar usuarios:', error);
        });
    },


    obtenerFechaActual() {
      const fechaActual = new Date();
      // Formatear la fecha en el formato YYYY-MM-DD requerido por el input type="date"
      const year = fechaActual.getFullYear();
      let month = fechaActual.getMonth() + 1;
      let day = fechaActual.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      return `${year}-${month}-${day}`;
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
      const orderId = this.$route.params.idOrden;
      this.$router.push(`/tercerEstage/${orderId}`);
    },
    async buscarPermisos() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://192.168.1.18:3000/api/products/getpermisos/${idOrden}`);

        // Verifica si la respuesta contiene datos
        if (response.data && response.data.length > 0) {
          // Asigna los productos a la propiedad 'productos1'
          this.permisos = response.data;
        } else {
          console.log('No se encontraron productos para esta orden.');
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },

    crearPermiso() {
      const userData = localStorage.getItem('userData');

      if (userData) {
        const userDataObj = JSON.parse(userData);

        if (userDataObj && userDataObj.data && userDataObj.data.id) {
          const orderId = this.$route.params.idOrden;
          const ordenData = new FormData(); // Utiliza FormData para enviar archivos

          // Agregar los datos de la orden al FormData

          ordenData.append('id', orderId);
          ordenData.append('notas', this.notas);


          // Agregar el documento adjunto al FormData
          if (this.image) {
            ordenData.append('image', this.image);
          }

          axios.post(`http://192.168.1.18:3000/api/permisos/create`, ordenData)
            .then(response => {
              console.log('Orden registrada exitosamente:', response.data.data);
              alert('Se agrego la adicion a la orden');
              window.location.reload();
              // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
            })
            .catch(error => {
              console.error('Error al registrar orden:', error.response.data.message);
              alert('Error al registrar adicion: ' + error.response.data.message);
              window.location.reload();
            });
        } else {
          console.error('No se pudo obtener el ID de usuario del localStorage.');
        }
      } else {
        console.error('No hay datos de usuario en el localStorage.');
      }
    },

    handleFileUpload(event) {
      // Actualizar el estado 'image' con el archivo seleccionado por el usuario
      this.image = event.target.files[0];
    },


  },
  mounted() {
    this.buscarPermisos();
  },

}

</script>


<style scoped></style>