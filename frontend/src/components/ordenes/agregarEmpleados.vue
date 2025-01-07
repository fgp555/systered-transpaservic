<template>
    <div class="page">
    <header class="appbar">
      <div class="container">
            <h2 class="title">Administración - TranspaServic </h2>
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
    <h1>Agregar Empleados a la Orden</h1>
    <i class="fas fa-file-alt"></i>
  </div>
  

  <form class="form-order" @submit.prevent="crearEmpleado">
      <div class="form-group">      
        <div class="input-group">
          <label>Empleados Disponibles Registrados</label><br>
          <select v-model="idempleado">
            <option disabled selected>Seleccione un supervisor</option>
            <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">{{ usuario.name }}</option>
          </select>

        </div>
        <div class="input-group">
        <label for="direccion">Reseña o Incaciones</label>
        <input textarea rows="8" style="height: 130px !important; width: 185px;" cols="50" placeholder="Ingresa tu texto aquí" v-model="resena" >
      </div>
      
        
        
        
       
          
      </div>
      
      <div class="form-group">
        <button type="submit" class="button">Agregar Empleado</button>
        <button @click="atras" class="button2">Regresar</button>
      </div>
    </form>


    </section>
    <label>Lista de Empleados</label><br>
              <table class="small-table">
                <thead>
                <tr>
                  <th>idEmpleado</th>
                  <th>Reseña </th>
                  
                </tr>
              </thead>
              <tbody>
        <tr v-for="empleados in empleado" :key="empleados.id">
          <td>{{ empleados.nombre_empleado }}</td>
          <td>{{ empleados.resena }}</td>
           <!-- Asegúrate de mostrar el valor total, no el precio -->
        </tr>
      </tbody>
      </table>
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
            id:'',
            nombre: '',
            direccion: '',
            descripcion: '',
            fecha: '',
            status: '',
            supervisor: '',
            encargado:'',
            estado:'aprobado'
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
          idempleado:'',
          resena:'',
      
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
          }else{
            alert('La contraseña es incorrecta');
          }
        },  
      methods: {
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
        async crearEmpleado() {

        // Construir el objeto con los datos de la orden
            const empleado = {          
             
              idempleado: this.idempleado,
              resena: this.resena,
              id_orden:this.$route.params.idOrden
              // Agrega aquí cualquier otro campo que necesites enviar
            };

            try {
              // Realizar la petición POST al servidor
              const response = await axios.post('http://192.168.1.18:3000/api/products/createempleado', empleado);
              
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
  

        cargarUsuarios() {
          // Aquí debes realizar una solicitud HTTP para obtener la lista de usuarios
          // Por ejemplo, usando axios:
          axios.get('http://192.168.1.18:3000/api/users/optenerempleados')
            .then(response => {
              this.usuarios = response.data;
            })
            .catch(error => {
              console.error('Error al cargar usuarios:', error);
            });
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
          const orderId = this.$route.params.idOrden;
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
        
          
        },
        mounted() {
    // Llama al método para obtener los detalles de la orden cuando el componente se monta
          this.buscarempleados();
          this.cargarUsuarios();
        },
            
      }
    
    </script>
    
    
    <style scoped>

    </style>
    