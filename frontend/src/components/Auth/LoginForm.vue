<template>
  <div class="page">
     <!-- Appbar superior -->
     <header class="appbar" style="margin-top: 45px !important;">
      <div class="container">
        <h2 class="title" style="color: aliceblue !important;">Administración - Tikets </h2>
        
      </div>
    </header>

    <!-- Contenido del formulario de inicio de sesión -->
    <div class="container" style="background-color: #ff040485;">
     
     
      <form @submit.prevent="handleSubmit" class="form">
        <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width:260px;height:80px;  border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); align-items: left !important;">

      <div class="form-group">
        <label for="username" style="color: aliceblue;">Nombre de usuario</label>
        <input type="text" id="username" class="input" v-model="username" required />
      </div><br>
      <div class="form-group">
        <label for="password" style="color: aliceblue;">Contraseña</label>
        <div class="password-input">
          <input type="password" id="password" class="input" v-model="password" required />
          <button @click.prevent="togglePasswordVisibility" class="toggle-button"><br>
              <label class="toggle-label">Ver / Ocultar Contraseña</label>
              <img style="margin-left: 15px !important;" src="https://firebasestorage.googleapis.com/v0/b/servibamby.appspot.com/o/pass_see.png?alt=media&token=bc716699-3bb0-4003-b1c5-cf34fb8f210f" alt="Mostrar Contraseña" class="toggle-image">

            </button>

        </div>
      </div>

      


      <button type="submit" class="button">Iniciar Sesión</button>
     
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
   
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'


export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
    
  },
  methods: {
    
    async handleSubmit(data) {
      this.error = null; // Limpiar errores previos

      try {
        const response = await axios.post('http://138.197.94.5:3000/api/users/loginT', {
          email: this.username, // Usar email para consistencia con el backend
          password: this.password,
        });

        if (response.status === 201) {
          const { data } = response;
          const token = data.session_token;
          localStorage.setItem('token', token);

          console.log('Usuario autenticado con éxito:', data); 

          // Almacenar datos de usuario y token en localStorage
          localStorage.setItem('userData', JSON.stringify(data));

          // Redireccionar a DashboardHome.vue
          this.$router.push('/home');
        } else {
          this.error = data.message || 'Error al iniciar sesión';
          alert(this.error); // Mostrar alerta en caso de error
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Manejar errores específicos
        if (error.response && error.response.data && error.response.data.message) {
          alert(`Error al iniciar sesión: ${error.response.data.message}`);
        } else {
          alert('Error de red o del servidor');
        }
      } finally {
        // Restablecer campos del formulario (opcional)
        this.username = '';
        this.password = '';
      }
    },


    goToRegister() {
      // Redirecciona a la página de inicio de sesión
      this.$router.push('/register');
    },
    togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia entre true y false
    const passwordInput = document.getElementById('password'); // Obtén el input de la contraseña
    passwordInput.type = this.showPassword ? 'text' : 'password'; // Cambia el tipo de input según el valor de showPassword
  }
  },
};
</script>


<style scoped>
@import url("../../style/styles.css");


.form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  color: #0a0a0a;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #666;
  background-color: #e6dbf8;
  color: #080808;
}

.input:focus {
  outline: none;
  border-color: #070707;
}

.button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.error-message {
  margin-top: 10px;
  padding: 5px;
  background-color: #ff3333;
  border-radius: 5px;
  color: #fff;
}

.input-with-toggle {
  display: flex;
  align-items: center;
}

.toggle-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px; /* Ajusta el margen para que no esté pegado al input */
}

.toggle-image {
  width: 20px; /* Ajusta el tamaño según tus necesidades */
  height: 20px; /* Ajusta el tamaño según tus necesidades */
}

.toggle-label {
  margin-left: 5px; /* Ajusta el margen para separar la imagen del texto */
  color: aliceblue; /* Cambia el color del texto si es necesario */
}

.logo {
  width: 260px;
  height: 80px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: left !important;
}
</style>
