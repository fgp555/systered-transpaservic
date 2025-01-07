<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - Plan de Trabajo </h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">

      <section class="main" style="height: auto;">
        <div class="main-top">
          <h1>Agregar Nuevo Rol al Usuario</h1>
          <i class="fas fa-file-alt"></i>
        </div>


        <form class="form-order" @submit.prevent="crearEmpleado">
          <div class="form-group">
            <div class="input-group">
              <label>Seleccione un Rol de usuario </label><br>
              <select v-model="idrol">
                <option disabled selected>Seleccione un supervisor</option>
                <option :value="3">Administrador</option>
                <option :value="2">Creador</option>

              </select>

            </div>






          </div>

          <div class="form-group">
            <button type="submit" class="button">Agregar Rol a Empleado</button><br>
            <button @click="atras" class="button2">Regresar</button>
          </div>
        </form>


      </section>


    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orden: {
        id: '',
        nombre: '',
        direccion: '',
        descripcion: '',
        fecha: '',
        status: '',
        supervisor: '',
        encargado: '',
        estado: 'aprobado'
      },
      menuOpen: false,
      nombre: '',
      direccion: '',
      fecha: '',
      descripcion: '',
      supervisor: '',
      encargado: '',
      fechaCreacion: '',
      estado: 'aprobado',
      usuarios: [],
      userData: null,
      idempleado: '',
      resena: '',
      rol: ''

    };
  },
  computed: {
    idOrden() {
      return this.$route.params.idOrden;
    }
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

    async crearEmpleado() {

      // Construir el objeto con los datos de la orden
      const rol = {

        idrol: this.idrol,
        idUsuario: this.$route.params.userid,
        // Agrega aquí cualquier otro campo que necesites enviar
      };

      try {
        // Realizar la petición POST al servidor
        const response = await axios.post('http://138.197.94.5:3000/api/user/createrolT', rol);

        // Manejar la respuesta del servidor
        console.log('Producto creado exitosamente:', response.data);
        alert('Se agrego el empleado a la orden');
        window.location.reload();

        // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
      } catch (error) {
        // Manejar errores de la petición
        console.error('Error al crear el producto:', error);
        alert('Error al registrar empleado: ' + error.response.data.message);
        window.location.reload();

        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    },





    aprobarOrden() {
      // Lógica para aprobar la orden
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
      const idusuario2 = this.$route.params.userid;
      this.$router.push(`/usuarios/administrar/${idusuario2}`);
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

  },

}

</script>


<style scoped></style>