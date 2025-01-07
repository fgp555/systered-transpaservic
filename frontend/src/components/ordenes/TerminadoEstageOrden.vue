<template>
  <div class="page">
    <header class="appbar" style="margin-top: 45px !important;">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TranspaServic </h4>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">

      <section class="main">
        <div class="main-top">
          <h5 style="color: aliceblue !important;">Detalles Tikets - TrasnpaServic </h5>
          <i class="fas fa-file-alt"></i>
        </div>


        <form @submit.prevent="register" class="form">
          <table border="2">

            <tr style="background-color: indianred;">
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16" style="color: whitesmoke;">Información Básica</label>

              </td>
            </tr>
            <!-- Primera fila con 4 columnas -->
            <tr>
              <td>
                <label for="campo1">Contrato de Trasnporte</label>
                <input readonly style="height: 24px;" type="text" v-model="orden.contrato_transporte" class="input">
              </td>
              <td>
                <label for="campo2">Numero de Orden</label>
                <input readonly type="text" v-model="orden.numero_orden" required class="input">
              </td>

              <td>
                <label for="campo4">Diagnostico Principal</label>
                <input readonly type="text" v-model="orden.diagnostico_principal" class="input">
              </td>


            </tr>
            <tr>
              <td>
                <label for="campo5">Cliente</label><br>
                <input readonly type="text" v-model="orden.cliente" class="input">
              </td>
              <td>
                <label for="campo6">Nombre Paciente</label>
                <input readonly type="text" v-model="orden.nombre_paciente" class="input">
              </td>
              <td>
                <label for="campo7">Cedula</label><br>
                <input readonly type="text" v-model="orden.cedula" class="input">
              </td>
            </tr>
            <tr style="background-color: #EDE2E2;border: none;">
              <td style="border: bisque;"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <!-- Segunda fila con 4 columnas -->
            <tr style="background-color: indianred;">
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16" style="color:linen;">Información de Viaje</label>

              </td>
            </tr>
            <!-- Primera fila con 4 columnas -->
            <tr>
              <td>
                <label for="campo1">Origen</label>
                <input readonly style="height: 24px;" type="text" v-model="orden.origen" @input="calcularIterario()" class="input">
              </td>
              <td>
                <label for="campo2">Destino</label>
                <input readonly type="text" v-model="orden.destino" @input="calcularIterario()" required class="input">
              </td>
              <td style="width: 200px !important;">
                <label for="campo4">Itinerario</label>
                <input type="text" v-model="orden.itinerario" class="input" readonly>
              </td>


              <td>
                <label for="campo5">Cantidad</label><br>
                <input readonly type="text" v-model="orden.cantidad" class="input">
              </td>

            </tr>

            <tr>
              <td>
                <label for="campo1">Observaciones</label>
                <input readonly style="height: 24px;" type="text-area" v-model="orden.observaciones" class="input">
              </td>
              <td>
                <label for="campo2">Fecha de Viaje</label>
                <input readonly type="text" v-model="orden.fecha_viaje" required class="input">
              </td>

              <td>
                <label for="campo4">Correo No</label>
                <input readonly type="text" v-model="orden.correo_numero" class="input">
              </td>
              <td>
                <label for="campo5">Fecha</label><br>
                <input readonly type="text" v-model="orden.fecha" class="input">
              </td>

            </tr>
            <tr style="background-color: #EDE2E2;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style="background-color: indianred;">
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16" style="color: whitesmoke;">Información Monetaria</label>

              </td>
            </tr>
            <!-- Primera fila con 4 columnas -->
            <tr>
              <td>
                <label for="campo1">Chequeo</label>
                <input readonly style="height: 24px;" type="text" v-model="orden.chequeo" class="input">
              </td>

              <td>
                <label for="campo4">Valor</label>
                <input readonly type="text" v-model="orden.valor" class="input">
              </td>
              <td>
                <label for="campo5">Valor Neto Pax</label><br>
                <input readonly type="text" v-model="orden.valor_neto_pax" class="input">
              </td>


            </tr>
            <tr style="background-color: #EDE2E2;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style="background-color: indianred;">
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16" style="color: whitesmoke;">Empresa Prestadora del Servicios </label>

              </td>
            </tr>

            <!-- Primera fila con 4 columnas -->
            <tr>
              <td>
                <input readonly v-model="orden.prestadora" name="empresa">

              </td>
              <td>
                <label for="campo16" style="color: black;">Serial de Empresa </label>
                <input readonly type="text" v-model="orden.serial" name="empresa">

              </td>
              <td>
                <label for="campo16" style="color: black;">Valor Tikete Prestadora</label>
                <input readonly type="text" v-model="orden.valor_prestadora" name="empresa">

              </td>


            </tr>
            <tr>
              <td>
                <h5 style="color: black; text-align: left;">Pantallazo del Tikete</h5>
                <a style="color: black;" :href="orden.doc1" target="_blank">Ver Documento Anexado</a>

              </td>
            </tr>

            <tr style="background-color: #EDE2E2;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style="background-color: indianred;">
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16" style="color: whitesmoke;">Imformacion Nueva Compra de Tikete </label>

              </td>
            </tr>
            <tr>
              <td>
                <h5 style="color: black; text-align: left;">Fecha Compra Nueva</h5>
                <input type="text" v-model="orden.fecha_nueva">

              </td>
              <td>
                <h5 style="color: black; text-align: left;">Prestadora Nueva</h5>
                <input readonly type="text" v-model="orden.prestadora2" name="empresa">


              </td>
              <td>
                <h5 style="color: black; text-align: left;">Precio Tikete</h5>
                <input type="text" v-model="orden.valor_nuevo">

              </td>
            </tr>

            <!-- Segunda fila con 4 columnas -->

          </table>



          <input type="text" value="PENDIENTE" placeholder="PENDIENTE POR REVISIÓN Y APROBACIÓN " v-model="estado" readonly class="input"><br><br>

        </form>
        <button @click="exportToExcel()" class="button3">Exportar Excel</button><br>
        <button @click="atras()" class="button2">Regresar</button>

      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';


export default {
  data() {
    return {
      orden: {
        id: '',
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
        estado: '',
        serial: '',
        valor_prestadora: '',
        doc1: '',
        fecha_nueva: '',
        prestadora2: '',
        valor_nuevo: '',

      },
      id: '',
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
      serial: '',
      valor_prestadora: '',
      estado: 'APROBADO',
      fecha_nueva: '',
      prestadora2: '',
      valor_nuevo: '',

    };
  },
  computed: {
    idOrden() {
      return this.$route.params.idOrden;
    },
    calculateProfit() {
      // Calcula la rentabilidad antes de impuestos
      return this.totalValorTotal - this.sumaProductosYCostos;
    },

    totalValorTotal() {
      // Suma el valor inicial y el total de adiciones
      return parseFloat(parseFloat(this.orden.valorinicial) + parseFloat(this.totalAdiciones));
    },

    totalProductos() {
      // Suma los precios de todas las adiciones
      return this.productos1.reduce((total, productos1) => total + parseFloat(productos1.precio), 0);
    },
    totaltotalAdeciones() {
      // Suma los precios de todas las adiciones
      return this.adiciones.reduce((total, adiciones) => total + parseFloat(adiciones.precio), 0);
    },
    totalCostos() {
      // Suma los precios de todas las adiciones
      return this.costos.reduce((total, costos) => total + parseFloat(costos.precio), 0);
    },
    sumaProductosYCostos() {
      // Calcula la suma de totalProductos() y totalCostos()
      const totalProductosFloat = parseFloat(this.totalProductos);
      const totalCostosFloat = parseFloat(this.totalCostos);

      // Verifica si los valores son números válidos
      if (!isNaN(totalProductosFloat) && !isNaN(totalCostosFloat)) {
        // Si ambos valores son números válidos, devuelve la suma
        return totalProductosFloat + totalCostosFloat;
      } else {
        // Si alguno de los valores no es un número válido, devuelve 0 o NaN, según prefieras
        return 0; // o NaN, según lo que necesites en tu caso específico
      }
    },
    totalRentabilidad() {
      // Obtén los valores flotantes de totalValorTotal y sumaProductosYCostos
      const totalValorTotalFloat = parseFloat(this.totalValorTotal);
      const sumaProductosYCostosFloat = parseFloat(this.sumaProductosYCostos);

      // Verifica si los valores son números válidos
      if (!isNaN(totalValorTotalFloat) && !isNaN(sumaProductosYCostosFloat)) {
        // Si ambos valores son números válidos, realiza la resta y devuelve el resultado
        return totalValorTotalFloat - sumaProductosYCostosFloat;
      } else {
        // Si alguno de los valores no es un número válido, devuelve 0 o NaN, según prefieras
        return 0; // o NaN, según lo que necesites en tu caso específico
      }
    },
    rentabilidadAntesImpuestos() {
      // Calcula la rentabilidad antes de impuestos
      return parseFloat(parseFloat(this.orden.valorinicial) + parseFloat(this.calcularTotalAdiciones())) - parseFloat(this.sumaProductosYCostos);
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
  calculateProfit() {
    // Calcula la rentabilidad antes de impuestos
    return this.totalValorTotal - this.sumaProductosYCostos;
  },


  methods: {

    calcularTotalAdiciones() {
      let total = 0;
      this.adiciones.forEach(adicion => {
        total += parseFloat(adicion.precio);
      });
      return total.toFixed(2); // Redondear el total a dos decimales
    },
    totalAdiciones() {
      // Suma los precios de todas las adiciones
      return this.adiciones.reduce((total, adicion) => total + parseFloat(adicion.precio), 0);
    },



    register() {
      const userData = localStorage.getItem('userData');

      if (userData) {
        const userDataObj = JSON.parse(userData);

        if (userDataObj && userDataObj.data && userDataObj.data.id) {

          const orderId = this.$route.params.idOrden;

          const ordenData = {
            id: orderId,
            estado: this.orden.estado
          };

          axios.post(`http://138.197.94.5:3000/api/ordenes/aprobartiketfin/${orderId}`, ordenData)
            .then(response => {
              console.log('Orden registrada exitosamente:', response.data.data);
              alert('se actualizo el estado del tikete y esta disponible para la consulta del usuario');
              this.$router.push('/aprobadas');                  // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
            })
            .catch(error => {
              console.error('Error al registrar orden:', error.response.data.message);
              alert('se actualizo el estado del tikete y esta disponible para la consulta del usuario.,,..');
              this.$router.push('/aprobadas');

              // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
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

        const response = await axios.get(`http://138.197.94.5:3000/api/ordenes/tiketsaprobados/${idOrden}`);

        // Accede al primer elemento del arreglo de respuesta
        const orden = response.data[0];
        console.log('La orden es:', JSON.stringify(this.orden, null, 2));

        this.orden.id = orden.id;
        this.orden.contrato_transporte = orden.contrato_transporte;
        this.orden.numero_orden = orden.numero_orden;
        this.orden.diagnostico_principal = orden.diagnostico_principal;
        this.orden.cliente = orden.cliente;
        this.orden.nombre_paciente = orden.nombre_paciente;
        this.orden.cedula = orden.cedula;
        this.orden.origen = orden.origen;
        this.orden.destino = orden.destino;
        this.orden.itinerario = orden.itinerario;
        this.orden.cantidad = orden.cantidad;
        this.orden.observaciones = orden.observaciones;
        this.orden.fecha_viaje = orden.fecha_viaje;
        this.orden.correo_numero = orden.correo_numero;
        this.orden.fecha = orden.fecha;
        this.orden.chequeo = orden.chequeo;
        this.orden.valor = orden.valor;
        this.orden.valor_neto_pax = orden.valor_neto_pax;
        this.orden.prestadora = orden.prestadora;
        this.orden.serial = orden.serial;
        this.orden.valor_prestadora = orden.valor_prestadora;
        this.orden.doc1 = orden.doc1;
        this.orden.fecha_nueva = orden.fecha_nueva;
        this.orden.prestadora2 = orden.prestadora2;
        this.orden.valor_nuevo = orden.valor_nuevo;

        console.log(orden.doc1);


      } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);
      }
    },

    exportToExcel() {
      const wb = XLSX.utils.book_new();
      // Crear una hoja de cálculo
      const ws = XLSX.utils.aoa_to_sheet([
        // Primera fila de datos
        ['Orden ID', 'Contrato Transporte', 'Número Orden', 'Diagnóstico Principal', 'Cliente'],
        [this.orden.id, this.orden.contrato_transporte, this.orden.numero_orden, this.orden.diagnostico_principal, this.orden.cliente],
        [],
        // Segunda fila de datos
        ['Nombre Paciente', 'Cédula', 'Origen', 'Destino', 'Itinerario'],
        [this.orden.nombre_paciente, this.orden.cedula, this.orden.origen, this.orden.destino, this.orden.itinerario],
        [],
        // Tercera fila de datos
        ['Cantidad', 'Observaciones', 'Fecha Viaje', 'Correo/Número', 'Fecha'],
        [this.orden.cantidad, this.orden.observaciones, this.orden.fecha_viaje, this.orden.correo_numero, this.orden.fecha],
        [],
        // Cuarta fila de datos
        ['Chequeo', 'Valor', 'Valor Neto Pax', 'Prestadora', 'Serial', 'Valor Prestadora'],
        [this.orden.chequeo, this.orden.valor, this.orden.valor_neto_pax, this.orden.prestadora, this.orden.serial, this.orden.valor_prestadora],
        [],
        ['Fecha Nueva Compra', 'Nueva Prestadora', 'Valor Nuevo'],
        [this.orden.fecha_nueva, this.orden.prestadora2, this.orden.valor_nuevo,],

        // Quinta fila de datos

      ]);

      // Establecer el título de la hoja de cálculo como el valor de wsName
      const wsName = 'tiket_transpaservic_#' + this.orden.id;

      // Estilos para las celdas
      ws['!cols'] = [
        // Define el ancho de cada columna (en unidades de caracteres)
        { wch: 20 }, // Ancho de la primera columna
        { wch: 20 }, // Ancho de la segunda columna
        { wch: 20 }, // Ancho de la tercera columna
        { wch: 20 }, // Ancho de la cuarta columna
        { wch: 20 }, // Ancho de la quinta columna
        { wch: 20 }, // Ancho de la sexta columna
        { wch: 20 }, // Ancho de la séptima columna
        { wch: 20 }, // Ancho de la octava columna
        { wch: 20 }, // Ancho de la novena columna
        { wch: 20 }  // Ancho de la décima columna
      ];

      // Añadir hoja de cálculo al libro
      XLSX.utils.book_append_sheet(wb, ws, wsName);

      // Descargar archivo Excel
      XLSX.writeFile(wb, wsName + '.xlsx'); // Nombre del archivo será el mismo que el de la hoja de cálculo
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
      this.$router.go(-1);
    },
    permisos() {
      // Función para la tercera opción del menú Appbar izquierdo
      const orderId = this.$route.params.idOrden;
      this.$router.push(`/agregarPermisos/${orderId}`);
    },
    empleados() {
      // Función para la tercera opción del menú Appbar izquierdo
      const orderId = this.$route.params.idOrden;
      this.$router.push(`/agregarEmpleado/${orderId}`);
    },
    crearadiciones() {
      // Función para la tercera opción del menú Appbar izquierdo
      const orderId = this.$route.params.idOrden;
      this.$router.push(`/agregarAdiciones/${orderId}`);
    },
    productos() {
      // Función para la tercera opción del menú Appbar izquierdo
      const orderId = this.$route.params.idOrden;
      this.$router.push(`/agregarProducto/${orderId}`);
    },
    iracostos() {
      // Función para la tercera opción del menú Appbar izquierdo
      const orderId = this.$route.params.idOrden;
      this.$router.push(`/agregarGasto/${orderId}`);
    },
    agregarProducto() {

      this.productos.push({ productoSeleccionado: '', cantidad: 1 });
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


.small-table {
  width: 5px !important;
  /* Ajusta el ancho de la tabla según sea necesario */
  border-collapse: collapse;
  /* Combina los bordes de las celdas */
}

.small-table th,
.small-table td {
  border: 1px solid #ddd;
  /* Añade bordes a las celdas */
  padding: 8px;
  /* Ajusta el espacio interno de las celdas */
  text-align: left;
  /* Alinea el texto a la izquierda */
}

.small-table th {
  background-color: #f2f2f2;
  /* Color de fondo para las cabeceras */
}
</style>