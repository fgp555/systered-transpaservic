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
            <h1>Agregar Adiciones a la Orden</h1>
            <i class="fas fa-file-alt"></i>
          </div>


          <form class="form-order" @submit.prevent="crearAdiciones">
            <div class="form-group">
              <h4 class="subtitulo">Datos Básicos</h4>
              <div class="input-group">
                <label for="nombre">Nombre a Adicionar:</label>
                <input type="text" v-model="nombre" class="input-field">
              </div>
              <div class="input-group">
                <label for="direccion">Descripción :</label>
                <input type="text" v-model="descripcion" class="input-field">
              </div>
              <div class="input-group">
                <label for="direccion">Valor Total :</label>
                <input type="text" v-model="valortotal" class="input-field">
              </div>



            </div>

            <div class="form-group">
              <button type="submit" class="button">Agregar Adiciones</button>
              <button @click="atras" style="background-color: aquamarine !important;" class="button2">Regresar</button>
            </div>
          </form>


        </section>
        <table class="small-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="adicion in adiciones" :key="adicion.id">
              <td>{{ adicion.nombre }}</td>
              <td>{{ adicion.descripcion }}</td>
              <td>{{ adicion.precio }}</td> <!-- Asegúrate de mostrar el valor total, no el precio -->
            </tr>
          </tbody>
        </table>
        <br><br>
        <input type="text" v-model="totalAdiciones" readonly>
      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: '',
      descripcion: '',
      valortotal: '',
      menuOpen: false,
      fecha: '',
      supervisor: '',
      encargado: '',
      fechaCreacion: '',
      estado: 'aprobado',
      usuarios: [],
      userData: null,
      adiciones: [],

    };
  },
  computed: {
    idOrden() {
      return this.$route.params.idOrden;
    },
    totalAdiciones() {
      // Suma los precios de todas las adiciones
      return this.adiciones.reduce((total, adicion) => total + parseFloat(adicion.precio), 0);
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
    register() {
      // Obtener la información del usuario del localStorage
      const userData = localStorage.getItem('userData');

      // Verificar si userData está definido antes de intentar acceder a sus propiedades
      if (userData) {
        // Convertir userData de JSON a objeto JavaScript
        const userDataObj = JSON.parse(userData);

        // Verificar si userData.data está definido antes de intentar acceder a su propiedad 'id'
        if (userDataObj && userDataObj.data && userDataObj.data.id) {
          // Obtener el ID del usuario
          const userId = userDataObj.data.id;

          // Obtener el ID de la orden de la ruta
          const orderId = this.$route.params.idOrden;

          // Crear el objeto de datos de la orden
          const ordenData = {
            id: orderId,
            encargado: userId,
            supervisor: this.orden.supervisor,
            estado: this.orden.estado
          };

          // Realizar la petición POST al servidor
          axios.post(`http://192.168.1.18:3000/api/ordenes/aprobar/${orderId}`, ordenData)
            .then(response => {
              console.log('Orden registrada exitosamente:', response.data.data);
              // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
            })
            .catch(error => {
              console.error('Error al registrar orden:', error.response.data.message);
              // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            });
        } else {
          console.error('No se pudo obtener el ID de usuario del localStorage.');
        }
      } else {
        console.error('No hay datos de usuario en el localStorage.');
      }
    },


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
    async buscaradiciones() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://192.168.1.18:3000/api/products/adiciones/${idOrden}`);

        // Verifica si la respuesta contiene datos
        if (response.data && response.data.length > 0) {
          // Asigna los productos a la propiedad 'productos1'
          this.adiciones = response.data;
        } else {
          console.log('No se encontraron empleados para esta orden.');
        }
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    },

    async obtenerDetallesOrden() {
      try {
        const idOrden = this.$route.params.idOrden;

        const response = await axios.get(`http://192.168.1.18:3000/api/ordenes/stage1/${idOrden}`);

        // Accede al primer elemento del arreglo de respuesta
        const orden = response.data[0];

        // Asigna los valores a las propiedades del componente Vue
        this.orden.nombre = orden.nombre;
        this.orden.direccion = orden.direccion;
        const fechaOrden = new Date(orden.fechaorden);
        const formattedFechaOrden = fechaOrden.toISOString().split('T')[0];
        this.orden.fechaorden = formattedFechaOrden;
        this.orden.descripcion = orden.descripcion;
        this.supervisor = orden.supervisor;
        this.estado = orden.estado;
        this.valorCotizado = orden.valorcotizado;
        this.costoTotal = orden.costototal;
        this.margenGanancia = orden.margenganancia;
        this.orden.doc1 = orden.doc1;
        // Asigna otros valores si es necesario

        console.log(orden.doc1);

      } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);
      }
    },

    async crearAdiciones() {

      const adiciones = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        valortotal: this.valortotal,
        id_orden: this.$route.params.idOrden
        // Agrega aquí cualquier otro campo que necesites enviar
      };

      try {
        // Realizar la petición POST al servidor
        const response = await axios.post('http://192.168.1.18:3000/api/adiciones/create', adiciones);

        // Manejar la respuesta del servidor
        console.log('Producto creado exitosamente:', response.data);
        alert('Se agrego la adicion a la orden');
        window.location.reload();


        // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
      } catch (error) {
        // Manejar errores de la petición
        console.error('Error al crear el producto:', error);
        alert('Error al registrar la adicion: ' + error.response.data.message);
        window.location.reload();

        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    },

    desaprobarOrden() {
      // Lógica para desaprobar la orden
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
    agregarProducto() {
      this.productos.push({ productoSeleccionado: '', cantidad: 1 });
    },
    calcularTotal() {
      // Esta función calcula el total multiplicando la cantidad por el precio del producto seleccionado
      // Aquí debes implementar la lógica para obtener el precio del producto seleccionado desde tu base de datos
      return 4 * 4;
    },


  },
  mounted() {
    // Llama al método para obtener los detalles de la orden cuando el componente se monta
    this.obtenerDetallesOrden();
    this.cargarUsuarios();
    this.buscaradiciones();
  },

}

</script>


<style scoped></style>