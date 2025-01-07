<template>
  <div class="page">
  <header class="appbar">
    <div class="container">
          <h2 class="title">Administración -TranspaServic </h2>
        </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
  </header>
     <div class="container">
      <nav>
        <ul>
          <li><a href="#" class="logo">
            <span class="nav-item">Orden de Trabajo</span>
            
          </a></li>
          <div  v-for="user in (userData)" :key="user.id">
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
  <h1>Agregar Gastos a la Orden</h1>
  <i class="fas fa-file-alt"></i>
</div>


<form class="form-order" @submit.prevent="crearCostos">
    <div class="form-group">
      <h4 class="subtitulo">Datos Básicos</h4>
      <div class="input-group">
        <label for="nombre">Nombre del Gasto:</label>
        <input type="text"  v-model="nombre" class="input-field" >
      </div>
      <div class="input-group">
        <label for="direccion">Descripción :</label>
        <input type="text" v-model="descripcion" class="input-field">
      </div>
      <div class="input-group">
        <label for="direccion">Valor Total :</label>
        <input type="text"  v-model="valortotal" class="input-field">
      </div>
      
     
        
    </div>
    
    <div class="form-group">
      <button type="submit" class="button">Agregar Costo</button>
      <button @click="atras" style="background-color: aquamarine !important;" class="button2">Regresar</button>
    </div>
  </form>


  </section><br>
  <label> Lista de Costos  </label><br>
              <table class="small-table">
                <thead>
                <tr>
                  <th>Costo</th>
                  <th>Descripción </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
        <tr v-for="costo in costos" :key="costo.id">
          <td>{{ costo.nombre }}</td>
          <td>{{ costo.descripcion }}</td>
          <td>{{ costo.precio }}</td> <!-- Asegúrate de mostrar el valor total, no el precio -->
        </tr>
      </tbody>

        </table><br><br>

        <input type="text" v-model="totalCostos" readonly> 
  </section>
        
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        nombre:'',
        descripcion:'',
        valortotal:'',
        menuOpen: false,       
        fecha: '',     
        supervisor: '',
        encargado: '',
        fechaCreacion: '',
        estado: 'aprobado',
        usuarios: [],
        userData: null,
        adiciones:[],
        costos:[]
    
      };
    },
    computed: {
      idOrden() {
        return this.$route.params.idOrden;
      },
      totalCostos() {
        // Suma los precios de todas las adiciones
        return this.costos.reduce((total, costos) => total + parseFloat(costos.precio), 0);
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
        }else{
          alert('La contraseña es incorrecta');
        }
      },  
    methods: {
      

        
      async buscarcostos() {
          const idOrden = this.$route.params.idOrden;
          try {
            const response = await axios.get(`http://192.168.1.18:3000/api/products/getcostos/${idOrden}`);
            
            // Verifica si la respuesta contiene datos
            if (response.data && response.data.length > 0) {
              // Asigna los productos a la propiedad 'productos1'
              this.costos = response.data;
            } else {
              console.log('No se encontraron productos para esta orden.');
            }
          } catch (error) {
            console.error('Error al obtener los productos:', error);
          }
        },

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

          async crearCostos() {

              const costo = {           
                nombre: this.nombre,
                descripcion: this.descripcion,
                valortotal: this.valortotal,
                id_orden:this.$route.params.idOrden
                // Agrega aquí cualquier otro campo que necesites enviar
              };

              try {
                // Realizar la petición POST al servidor
                const response = await axios.post('http://192.168.1.18:3000/api/costos/create', costo);
                
                // Manejar la respuesta del servidor
                console.log('Producto creado exitosamente:', response.data);
                alert('Se agrego el Costo a la orden');
              window.location.reload();
                
                // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
              } catch (error) {
                // Manejar errores de la petición
                console.error('Error al crear el producto:', error);
                alert('Error al registrar el Costo: ' + error.response.data.message);
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
        this.$router.go(-1);
      },
      agregarProducto() {
        this.productos.push({ productoSeleccionado: '', cantidad: 1 });
      },
      calcularTotal() {
        // Esta función calcula el total multiplicando la cantidad por el precio del producto seleccionado
        // Aquí debes implementar la lógica para obtener el precio del producto seleccionado desde tu base de datos
        return 4 * 4;
      },
      async crearOrden() {
    // Construir el objeto con los datos de la orden
        const orden = {
          id_usuariocreador: 2, // Ajusta el ID del usuario creador según corresponda
          nombre: this.nombre,
          direccion: this.direccion,
          fechaorden: this.fecha,
          descripcion: this.descripcion,
          supervisor: this.supervisor,
          estatus: this.estado,
          valorcotizado: this.valorCotizado,
          costototal: this.costoTotal,
          margenganancia: this.margenGanancia
          // Agrega aquí cualquier otro campo que necesites enviar
        };

        try {
          // Realizar la petición POST al servidor
          const response = await axios.post('http://192.168.1.18:3000/api/ordenes/create', orden);
          
          // Manejar la respuesta del servidor
          console.log('Orden creada exitosamente:', response.data);
          
          // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
        } catch (error) {
          // Manejar errores de la petición
          console.error('Error al crear la orden:', error);
          
          // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        }
      },
      
        
      },
      mounted() {
  // Llama al método para obtener los detalles de la orden cuando el componente se monta
        this.obtenerDetallesOrden();
        this.cargarUsuarios();
        this.buscarcostos();
      },
          
    }
  
  </script>
  
  
  <style scoped>
 


  </style>
  