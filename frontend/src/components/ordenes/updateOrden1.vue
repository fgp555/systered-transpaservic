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
            <li>
              <span class="nav-item">Orden de Trabajo</span>
              <div  v-for="user in (userData)" :key="user.id">
                <img :src="user.image" style="width: 20%;" alt="">
              
                <p> {{ user.name }}</p>
                <p>{{ user.email }}</p>
                <p>{{ user.phone }}</p>
              </div>
            </li>
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
    <h1>Crear Orden de Trabajo</h1>
    <i class="fas fa-file-alt"></i>
  </div>

      <form @submit.prevent="register" class="form">
        <input type="text" v-model="nombre" placeholder="Nombre de la Solicitud" required class="input"><br>
        <input type="text" v-model="direccion" placeholder="Direccion de la Orden " required class="input"><br>
        <input type="date" id="fecha" :value="getTodayDate()"  required readonly class="input">
        <textarea id="descripcion" class="input" v-model="descripcion" required placeholder="Describa en detalle el trabajo a realizar"></textarea>
        <input type="text"  value="PENDIENTE" placeholder="PENDIENTE POR REVISIÓN Y APROBACIÓN " v-model="estado" readonly class="input"><br><br>
        <input type="file" @change="handleFileUpload" class="input"><br> <!-- Nuevo campo para cargar imagen -->
        <button type="submit" class="button">Crear Nueva Orden</button><br>
        <button @click="goToLogin" class="button2">Regresar</button>
      </form>
    </section>
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
            nombre: '',
            direccion: '',
            descripcion: '',
            fecha: '',
            status: 'PENDIENTE',
            estado:'PENDIENTE'
          },
          image: null,
          userData: null,
          menuOpen: false,                   
        };
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

        register() {
        const formData = new FormData();
        formData.append('orden', JSON.stringify({
          id_usuariocreador:2, // Nuevo formato de datos para enviar al servidor
          nombre: this.nombre,
          direccion: this.direccion,
          fecha: this.getTodayDate(),
          descripcion: this.descripcion,
          estado: this.estado
        }));
        formData.append('image', this.image); // Adjuntar la imagen al formulario

        // Petición POST al servidor para registrar al usuario
        axios.post('http://192.168.1.18:3000/api/ordenes/create2', formData)     

        .then(response => {
          console.log('Usuario registrado exitosamente:', response.data.data);
          // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error.response.data.message);
          // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        });
      
        },
        goToLogin() {
          // Redirecciona a la página de inicio de sesión
          this.$router.push('/login');
        },

        
        handleFileUpload(event) {
          // Actualizar el estado 'image' con el archivo seleccionado por el usuario
          this.image = event.target.files[0];
        },
        toggleMenu() {
          this.menuOpen = !this.menuOpen;
        },
        goToList() {
          this.$router.push('/buscar');
        },
        goToCreate() {
          this.$router.push('/agregar');
        },
        customFunction() {
          this.$router.push('/');
        },
        atras() {
          this.$router.push('/ordenes');
        },
        agregarProducto() {
          this.productos.push({ productoSeleccionado: '', cantidad: 1 });
        },
        calcularTotal() {
          return 4 * 4;
        },
        async crearOrden() {
          const formData = new FormData();
          formData.append('orden', JSON.stringify(this.orden));
          formData.append('image', this.image);

          try {
            const response = await axios.post('http://192.168.1.18:3000/api/ordenes/create', formData);
            console.log('Orden creada exitosamente:', response.data);
          } catch (error) {
            console.error('Error al crear la orden:', error);
          }
        },
       
        getTodayDate() {
          const today = new Date();
          const year = today.getFullYear();
          let month = today.getMonth() + 1;
          let day = today.getDate();

          // Agregar un cero delante del mes y el día si son menores que 10
          month = month < 10 ? `0${month}` : month;
          day = day < 10 ? `0${day}` : day;
          // Formatear la fecha como yyyy-mm-dd para el campo de fecha HTML
          return `${year}-${month}-${day}`;
        },
      }
    };
</script>

    
    
    <style scoped>
   

.main {
  width: 80%; /* Adjust width as needed */
  margin: 50px auto; /* Center the form horizontally */
  background-color: #e5fad8; /* Light background color */
  border-radius: 5px; /* Rounded corners for a softer look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 20px; /* Inner padding for content breathing room */
  margin-left: 20px;
}

.main-top {
  display: flex; /* Align heading and icon horizontally */
  justify-content: space-between; /* Space evenly between elements */
  align-items: center; /* Vertically center elements */
  padding-bottom: 4px; /* Add some space after the top section */
  border-bottom: 1px solid #ddd; /* Light border to separate sections */
}

.main-top h1 {
  margin: 0; /* Remove default top margin */
  font-size: 24px;
  color: #333; /* Darker text for better contrast */
}

.main-skills {
  display: flex;
  flex-wrap: wrap; /* Wrap cards if they don't fit in a row */
  justify-content: space-between; /* Space cards evenly */
}

.card {
  width: calc(25% - 20px); /* Adjust card width as needed */
  margin: 10px;
  background-color: #fff; /* White card background */
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center text within the card */
  padding: 20px;
}

.card i {
  font-size: 3em; /* Increase icon size for prominence */
  color: #333; /* Match icon color to text */
  margin-bottom: 10px; /* Add space between icon and text */
}

.card h3 {
  font-size: 18px;
  margin: 5px 0; /* Small margin above and below heading */
  font-weight: normal; /* Regular font weight for readability */
}

.card p {
  font-size: 14px;
  margin-bottom: 15px; /* Space between paragraph and button */
  color: #777; /* Slightly lighter text for readability */
}

.card button {
  background-color: #4CAF50; /* Green button color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth hover effect */
}

.card button:hover {
  background-color: #3e8e41; /* Darker green on hover */
}

@media (max-width: 768px) {
  .main-skills {
    flex-direction: column; /* Stack cards vertically on small screens */
  }

  .card {
    width: 100%; /* Full-width cards on small screens */
    margin: 0 10px 10px 0; /* Adjust margin for vertical layout */
  }
}
    
    /* Estilos de la página */
    .page {
        /* Establece la imagen de fondo */
        background-image: url('../../imagen/fondo.jpg');
        /* Ajusta el tamaño y la posición de la imagen */
        background-size: cover;
        background-position: center;
        /* Establece la altura mínima para ocupar toda la pantalla */
        min-height: 100vh;
        /* Otros estilos, como alineación, márgenes, etc. */
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 105%;
        margin-top: -150px;
        margin-bottom: -45px;
      }
      /* Estilos del appbar superior */
      .appbar {
        background-color: #1616165d;
        color: #cdcf41;
        align-items: center;
        text-align: center;
        width: 100%;
        margin-top: 5px !important;
        font-size: 30px;
        background-attachment: fixed;
      }
      .appbar .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1280px;
        padding: -20px;
      }
      .appbar-button {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
      }
      /* Estilos del formulario */
      .container {
        max-width: 80%;
        margin: 5px auto;
        margin-top: 40px;
        padding: 15px;
        background-color: #3683366c;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        align-items: left;
        width: 120%;
      }
      .container2 {
        max-width: 80%;
        margin: 5px auto;
        padding: 15px;
        background-color: #3683366c;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        align-items: center;
        width: 50%;
        padding-left: 155px;
      }
      .title {
        text-align: center;
        margin-bottom: 20px;
        text-align: left; 
        font-family: Baskerville; 
        font-weight:bold; 
        font-size: 30px; 
        color: #EBD758; 
        text-shadow: -1px 0 #414D68, 0 1px #414D68, 1px 0 #414D68, 0 -1px #414D68, -2px 2px 0 #414D68, 2px 2px 0 #414D68, 1px 1px #414D68, 2px 2px #414D68, 3px 3px #414D68, 4px 4px #414D68, 5px 5px #414D68;
      }
      .form {
        display: flex;
        flex-direction: column;
      }
      .input {
        width: 60%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .button {
        width: 60%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #b4be26;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .button2 {
      width: 60%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #13300ec7;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
    }
      .button:hover {
        background-color: #0056b3;
      }
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700");
    *{
      margin: 0;
      padding: 0;
      outline: none;
      border: none;
      text-decoration: none;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }
    body{
      background: #dfe9f5;
    }
    .container{
      display: flex;
    }
    nav{
      position: relative;
      top: 0;
      bottom: 0;
      height: 100vh;
      left: 0;
      background: #fff;
      width: 280px;
      overflow: hidden;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
      align-items: center !important;
    }
    .logo{
      text-align: center;
      display: flex;
      margin: 10px 0 0 10px;
    }
    .logo img{
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .logo span{
      font-weight: bold;
      padding-left: 15px;
      font-size: 18px;
      text-transform: uppercase;
    }
    a{
      position: relative;
      color: rgb(85, 83, 83);
      font-size: 14px;
      display: table;
      width: 280px;
      padding: 10px;
    }
    nav .fas{
      position: relative;
      width: 70px;
      height: 40px;
      top: 14px;
      font-size: 20px;
      text-align: center;
    }
    .nav-item{
      position: relative;
      top: 12px;
      align-items: center;
      padding-right: 70px;
    }
    a:hover{
      background: #eee;
    }
    .logout{
      position: absolute;
      bottom: 0;
    }
    
    /* Main Section */
    .main{
      position: relative;
      padding: 20px;
      width: 100%;
    }
    .main-top{
      display: flex;
      width: 100%;
    }
    .main-top i{
      position: absolute;
      right: 0;
      margin: 10px 30px;
      color: rgb(110, 109, 109);
      cursor: pointer;
    }
    .main-skills{
      display: flex;
      margin-top: 20px;
    }
    .main-skills .card{
      width: 25%;
      margin: 10px;
      background: #fff;
      text-align: center;
      border-radius: 20px;
      padding: 10px;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
    }
    .main-skills .card h3{
      margin: 10px;
      text-transform: capitalize;
    }
    .main-skills .card p{
      font-size: 12px;
    }
    .main-skills .card button{
      background: orangered;
      color: #fff;
      padding: 7px 15px;
      border-radius: 10px;
      margin-top: 15px;
      cursor: pointer;
    }
    .main-skills .card button:hover{
      background: rgba(223, 70, 15, 0.856);
    }
    .main-skills .card i{
      font-size: 22px;
      padding: 10px;
    }
    
    /* Courses */
    .main-course{
      margin-top:20px ;
      text-transform: capitalize;
    }
    .course-box{
      width: 100%;
      height: 300px;
      padding: 10px 10px 30px 10px;
      margin-top: 10px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
    }
    .course-box ul{
      list-style: none;
      display: flex;
    }
    .course-box ul li{
      margin: 10px;
      color: gray;
      cursor: pointer;
    }
    .course-box ul .active{
      color: #000;
      border-bottom: 1px solid #000;
    }
    .course-box .course{
      display: flex;
    }
    .box{
      width: 33%;
      padding: 10px;
      margin: 10px;
      border-radius: 10px;
      background: rgb(235, 233, 233);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
    }
    .box p{
      font-size: 12px;
      margin-top: 5px;
    }
    .box button{
      background: #000;
      color: #fff;
      padding: 7px 10px;
      border-radius: 10px;
      margin-top: 3rem;
      cursor: pointer;
    }
    .box button:hover{
      background: rgba(0, 0, 0, 0.842);
    }
    .box i{
      font-size: 7rem;
      float: right;
      margin: -20px 20px 20px 0;
    }
    .html{
      color: rgb(25, 94, 54);
    }
    .css{
      color: rgb(104, 179, 35);
    }
    .js{
      color: rgb(28, 98, 179);
    }



    .form-order {
  max-width: 500px;
  margin: 0 auto;
}

/* Estilos para los campos del formulario */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Estilos para los botones */
.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}

.button2 {
  background-color: #f44336;
}

.button2:hover {
  background-color: #d32f2f;
}

/* Estilos para el título y subtítulo */
.subtitulo {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.subtitulo + p {
  margin-top: 5px;
}

/* Estilos para los input de tipo file */
.input {
  margin-bottom: 10px;
}

/* Estilos para los mensajes de error */
.error-message {
  color: #f44336;
  font-size: 0.8em;
  margin-top: 5px;
}
    </style>
    