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
            <h1>Agregar Productos a la orden</h1>
            <i class="fas fa-file-alt"></i>
          </div>


          <form class="form-order" @submit.prevent="crearProducto">
            <div class="form-group">
              <h4 class="subtitulo">Datos Básicos</h4>
              <div class="input-group">
                <label for="nombre">Nombre del Producto:</label>
                <input type="text" v-model="nombre" class="input-field">
              </div>
              <div class="input-group">
                <label for="direccion">cantidad :</label>
                <input type="number" v-model="cantidad" class="input-field">
              </div>
              <div class="input-group">
                <label for="direccion">Valor Total :</label>
                <input type="text" v-model="valortotal" class="input-field">
              </div>



            </div>

            <div class="form-group">
              <button type="submit" class="button">Agregar Producto</button>
              <button @click="atras" class="button2">Regresar</button>
            </div>
          </form>


        </section>
        <label> Lista de productos </label><br>
        <table class="small-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos1" :key="producto.id">
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.cantidad }}</td>
              <td>{{ producto.precio }}</td> <!-- Asegúrate de mostrar el valor total, no el precio -->
            </tr>
          </tbody>

        </table><br><br>
        <label> Valor Total de productos </label><br>
        <input type="text" v-model="totalProductos" readonly>
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

      estado: 'aprobado',
      usuarios: [],
      userData: null,
      productos1: []

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

    async buscarProductos() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://192.168.1.18:3000/api/products/getproducts/${idOrden}`);

        // Verifica si la respuesta contiene datos
        if (response.data && response.data.length > 0) {
          // Asigna los productos a la propiedad 'productos1'
          this.productos1 = response.data;
        } else {
          console.log('No se encontraron productos para esta orden.');
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
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

    async crearProducto() {

      // Construir el objeto con los datos de la orden
      const producto = {
        nombre: this.nombre,
        cantidad: this.cantidad,
        valortotal: this.valortotal,
        id_orden: this.$route.params.idOrden
        // Agrega aquí cualquier otro campo que necesites enviar
      };

      try {
        // Realizar la petición POST al servidor
        const response = await axios.post('http://192.168.1.18:3000/api/products/create', producto);

        // Manejar la respuesta del servidor
        console.log('Producto creado exitosamente:', response.data);
        alert('Se agrego el producto a la orden');
        window.location.reload();

        // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
      } catch (error) {
        // Manejar errores de la petición
        console.error('Error al crear el producto:', error);
        alert('Error al registrar producto: ' + error.response.data.message);
        window.location.reload();

        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    },


  },
  mounted() {
    // Llama al método para obtener los detalles de la orden cuando el componente se monta
    this.buscarProductos()
  },

}

</script>


<style scoped></style>