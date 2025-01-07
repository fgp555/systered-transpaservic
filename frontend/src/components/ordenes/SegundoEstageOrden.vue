<template>
  <div class="page">
  <header class="appbar" style="margin-top: 45px !important;">
    <div class="container">
          <h4  style="color: #EDE2E2;">TranspaServic</h4>
        </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
  </header>
     <div class="container">
     
          <section class="main">
<div class="main-top">
  <h1 style="color: aliceblue;">Aprobar Tikets</h1>
  <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 150px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); align-items: left !important;">

</div>


<form @submit.prevent="register" class="form">
<table  border="2">

  <tr style="background-color: indianred;">
    <td colspan="2" style="width: 20px!important;">
          <label for="campo16" style="color: whitesmoke;">Información Básica</label>
          
      </td>
  </tr>
    <!-- Primera fila con 4 columnas -->
    <tr >
        <td>
            <label for="campo1">Contrato de Trasnporte</label>
            <input readonly style="height: 24px;" type="text" v-model="orden.contrato_transporte"  class="input"  >
        </td>
        <td>
            <label for="campo2">Numero de Orden</label>
            <input readonly type="text"  v-model="orden.numero_orden" required class="input"  >
        </td>
        
        <td>
            <label for="campo4">Diagnostico Principal</label>
            <input readonly type="text" v-model="orden.diagnostico_principal" class="input"  >
        </td>
       
        
    </tr>
    <tr>
      <td>
            <label for="campo5">Cliente</label><br>
            <input readonly type="text" v-model="orden.cliente" class="input"  >
        </td>
        <td>
            <label for="campo6">Nombre Paciente</label>
            <input readonly type="text" v-model="orden.nombre_paciente" class="input"  >
        </td>
        <td>
            <label for="campo7">Cedula</label><br>
            <input readonly type="text" v-model="orden.cedula" class="input"  >
        </td>
        <td>
            <label for="campo7">Telefono</label><br>
            <input readonly type="text" v-model="orden.telefono" class="input"  >
        </td>
    </tr>
    <tr style="background-color: #EDE2E2;border: none;"><td style="border: bisque;"></td><td></td><td></td><td></td><td></td><td></td></tr>
    
    <!-- Segunda fila con 4 columnas -->
    <tr style="background-color: indianred;">
    <td colspan="2" style="width: 20px!important;">
          <label for="campo16" style="color:linen;">Información de Viaje</label>
          
      </td>
  </tr>
    <!-- Primera fila con 4 columnas -->
    <tr >
      <td>
          <label for="campo1">Origen</label>
          <input readonly style="height: 24px;" type="text" v-model="orden.origen"  class="input"  >
      </td>
      <td>
          <label for="campo2">Destino</label>
          <input readonly type="text" v-model="orden.destino"  required class="input"  >
      </td>
      <td style="width: 200px !important;">
          <label for="campo4">Itinerario</label>
          <input readonly type="text" v-model="orden.itinerario"  class="input"  >
      </td>


        <td>
            <label for="campo5">Cantidad</label><br>
            <input readonly type="text" v-model="orden.cantidad" class="input"  >
        </td>       
        
    </tr>
    
    <tr >
        <td>
            <label for="campo1">Observaciones</label>
            <input readonly style="height: 24px;" type="text-area" v-model="orden.observaciones"  class="input"  >
        </td>
        <td>
            <label for="campo2">Fecha de Viaje</label>
            <input readonly type="text"    v-model="formattedFechaViaje" required class="input"  >
        </td>
        
        <td>
            <label for="campo4">Correo No</label>
            <input readonly type="text" v-model="orden.correo_numero" class="input" >
        </td>
        <td>
            <label for="campo5">Fecha</label><br>
            <input readonly type="text" v-model="formattedFecha" class="input"  >
        </td>
        
    </tr>
    <tr style="background-color: #EDE2E2;"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr style="background-color: indianred;">
    <td colspan="2" style="width: 20px!important;">
          <label for="campo16" style="color: whitesmoke;">Información Monetaria</label>
          
      </td>
  </tr>
    <!-- Primera fila con 4 columnas -->
    <tr >
        <td>
            <label for="campo1">Chequeo</label>
            <input readonly style="height: 24px;" type="text" v-model="orden.chequeo"  class="input"  >
        </td>
               
        <td>
            <label for="campo4">Valor</label>
            <input readonly type="text" v-model="orden.valor" class="input"  >
        </td>
        <td>
            <label for="campo5">Valor Neto Pax</label><br>
            <input readonly type="text" v-model="orden.valor_neto_pax" class="input"  >
        </td>
       
        
    </tr>
    <tr style="background-color: #EDE2E2;"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr style="background-color: indianred;">
    <td colspan="2" style="width: 20px!important;">
          <label for="campo16" style="color: whitesmoke;">Empresa Prestadora del Servicios </label>
          
      </td>
  </tr>
  
    <!-- Primera fila con 4 columnas -->
    <tr >
        <td>
          <input readonly v-model="orden.prestadora" name="empresa"  >  

        </td>
        <td>
          <label for="campo16" style="color: black;">Serial de Empresa </label>
          <input type="text" v-model="serial" name="empresa">  

        </td>
        <td>
          <label for="campo16" style="color: black;">Valor Tikete Prestadora</label>
          <input  type="text" v-model="valor_prestadora" name="empresa">  

        </td>
               
              
    </tr>
    <tr>
      <td>
        <h5 style="color: black; text-align: left;">Ingrese la imagen del tikete fisico</h5>
        <input type="file" style="width: 500px;" @change="handleFileUpload" class="input"><br>
      </td>
    </tr>
    
    <tr style="background-color: #EDE2E2;"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    
    <!-- Segunda fila con 4 columnas -->
    
</table>


   
     <input type="text"  value="PENDIENTE" placeholder="PENDIENTE POR REVISIÓN Y APROBACIÓN " v-model="estado"  class="input"><br><br>
      <button style="background-color: darkgray;" type="submit" class="button">Aprobar Tikete</button><br>
      <button @click="atras()" class="button2">Regresar</button>
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
          id:'',
          contrato_transporte: '',
          numero_orden: '',
          diagnostico_principal: '',
          cliente: '',
          nombre_paciente: '',
          cedula: '',
          origen: '',
          destino: '',
          itinerario: '',
          cantidad: '',
          observaciones: '',
          fecha_viaje: '',
          correo_numero: '',
          fecha: '',
          chequeo: '',
          valor: '',
          valor_neto_pax: '',
          prestadora: '',
          estado: 'Por aprobar por el Prestador del Servicio',
          telefono:'',
        
      },
      contrato_transporte: '',
          numero_orden: '',
          diagnostico_principal: '',
          cliente: '',
          nombre_paciente: '',
          cedula: '',
          origen: '',
          destino: '',
          itinerario: '',
          cantidad: '',
          observaciones: '',
          fecha_viaje: '',
          correo_numero: '',
          fecha: '',
          chequeo: '',
          valor: '',
          valor_neto_pax: '',
          prestadora: '', 
          serial:'',
          valor_prestadora:'',  
          estado: 'Por aprobar por el Prestador del Servicio',
          telefono:'',
        
        
      };
    },
    computed: {
      idOrden() {
        return this.$route.params.idOrden;
      },
      formattedFecha() {
      // Obtener la fecha sin la parte de la hora
      const fechaSinHora = this.orden.fecha.split('T')[0];
      return fechaSinHora;
    },
    formattedFechaViaje() {
      // Obtener la fecha sin la parte de la hora
      const fechaSinHora = this.orden.fecha_viaje.split('T')[0];
      return fechaSinHora;
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
      register() {
        const userData = localStorage.getItem('userData');

        if (userData) {
            const userDataObj = JSON.parse(userData);

            if (userDataObj && userDataObj.data && userDataObj.data.id) {
                const orderId = this.$route.params.idOrden;
                const ordenData = new FormData(); // Utiliza FormData para enviar archivos

                // Agregar los datos de la orden al FormData
                ordenData.append('id', orderId);
                ordenData.append('serial', this.serial);
                ordenData.append('valor_prestadora', this.valor_prestadora);               

                // Agregar el documento adjunto al FormData
                if (this.image) {
                    ordenData.append('image', this.image);
                }

                axios.post(`http://138.197.94.5:3000/api/ordenes/aprobartikete/${orderId}`, ordenData)
                    .then(response => {
                        console.log('Orden registrada exitosamente:', response.data.data);
                        alert('se actualizo el estado del tikete');
                        this.$router.push('/poraprobar');   
                        
                        // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
                    })
                    .catch(error => {
                        console.error('Error al registrar orden:', error.response.data.message);
                        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                        alert('orden actualizada en ejecución ' );
                        this.$router.push('/poraprobar'); 
                    });
            } else {
                console.error('No se pudo obtener el ID de usuario del localStorage.');
            }
        } else {
            console.error('No hay datos de usuario en el localStorage.');
        }
      },

      

     
      async obtenerDetallesOrden() {
            try {
              const idOrden = this.$route.params.idOrden;

              const response = await axios.get(`http://138.197.94.5:3000/api/ordenes/tiketsporaprobar/${idOrden}`);
              
              // Accede al primer elemento del arreglo de respuesta
              const orden = response.data[0];
              console.log('La orden es:', JSON.stringify(this.orden, null, 2));
              this.orden.id=orden.id,
              this.orden.contrato_transporte=orden.contrato_transporte,
              this.orden.numero_orden=orden.numero_orden,
              this.orden.diagnostico_principal=orden.diagnostico_principal,
              this.orden.cliente=orden.cliente,
              this.orden.nombre_paciente=orden.nombre_paciente,
              this.orden.cedula=orden.cedula,
              this.orden.origen=orden.origen,
              this.orden.destino=orden.destino,
              this.orden.itinerario=orden.itinerario,
              this.orden.cantidad=orden.cantidad,
              this.orden.observaciones=orden.observaciones,
              this.orden.fecha_viaje=orden.fecha_viaje,
              this.orden.correo_numero=orden.correo_numero,
              this.orden.fecha=orden.fecha,
              this.orden.chequeo=orden.chequeo,
              this.orden.valor=orden.valor,
              this.orden.valor_neto_pax=orden.valor_neto_pax,
              this.orden.prestadora=orden.prestadora, 
              this.orden.telefono=orden.telefono,  
             
              

              console.log(orden.doc1);

            } catch (error) {
              console.error('Error al obtener los detalles de la orden:', error);
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
        // Función para la tercera opción del menú Appbar izquierdo
        this.$router.push('/poraprobar');
      },
      agregarProducto() {
        this.productos.push({ productoSeleccionado: '', cantidad: 1 });
      },
      calcularTotal() {
        // Esta función calcula el total multiplicando la cantidad por el precio del producto seleccionado
        // Aquí debes implementar la lógica para obtener el precio del producto seleccionado desde tu base de datos
        return 4 * 4;
      },
      handleFileUpload(event) {
        // Actualizar el estado 'image' con el archivo seleccionado por el usuario
        this.image = event.target.files[0];
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
          const response = await axios.post('http://138.197.94.5:3000/api/ordenes/create', orden);
          
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
        
      
      },
          
    }
  
  </script>
  
  
  <style scoped>
 
 @import url("../../style/styles.css");

  </style>
  