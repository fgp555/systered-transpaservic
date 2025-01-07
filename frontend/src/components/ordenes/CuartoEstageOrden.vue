<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h2 class="title">Administración - TranspaServic </h2>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">

      <section class="main">
        <div class="main-top">
          <h1>Administrar Orden de Trabajo</h1>
          <i class="fas fa-file-alt"></i>
        </div>


        <form class="form-order" style="margin-left: -1pc !important;" @submit.prevent="register"><br>
          <table border="1" style="width: 1000px !important;">
            <!-- Primera fila con 4 columnas -->
            <tr>
              <td>
                <label for="campo1">Fecha Elaboración</label>
                <input style="height: 24px;" type="text" readonly required class="input" v-model="orden.fecha">

              </td>
              <td>
                <label for="campo2">Orden Pedido</label>
                <input type="text" v-model="orden.id" readonly required class="input">
              </td>

            </tr>
            <tr>
              <td>
                <label for="campo3">Cotización</label>
                <a :href="orden.doc2" target="_blank">Ver Documento Anexado</a>

              </td>
              <td>
                <label for="campo4">Ciudad</label>
                <input type="text" readonly v-model="orden.ciudad">
              </td>
            </tr>
            <!-- Segunda fila con 4 columnas -->
            <tr>
              <td>
                <label for="campo5">Elabora</label>
                <input type="text" readonly v-model="orden.elabora">
              </td>
              <td>
                <label for="campo6">Entrega Pactada</label>
                <input type="text" readonly v-model="orden.entregapactada">
              </td>

            </tr>
            <tr>
              <td>
                <label for="campo7">Entrega Real</label>
                <input type="text" readonly v-model="orden.entregareal">
              </td>
              <td>
                <label for="campo8">Tipo Proyecto</label>
                <input type="text" readonly v-model="orden.tipoproyecto">
              </td>
            </tr>
            <!-- Tercera fila con 2 columnas -->
            <tr>
              <td>
                <label for="campo9">Cliente:</label>
                <input type="text" readonly v-model="orden.cliente">
              </td>
              <td>
                <label for="campo9">Solicitado Por</label>
                <input type="text" readonly v-model="orden.solicitadopor">
              </td>
            </tr>
            <!-- Cuarta fila con 5 columnas -->
            <tr>
              <td>
                <label for="campo10">Diseño diseñador</label>
                <input type="text" readonly v-model="orden.nombre_disenador">
              </td>
              <td>
                <label for="campo14">Horas requeridas</label>
                <input type="text" readonly v-model="orden.horasrequeridas">
              </td>

            </tr>
            <!-- Quinta fila con 1 columna -->
            <tr>

            </tr>
            <!-- Sexta fila con 1 columna -->
            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16">Planos y archivos</label>
                <a :href="orden.doc1" target="_blank">Ver Documento Anexado</a>
              </td>


            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16">Archivo de Cotización</label>
                <a :href="orden.doc2" target="_blank">Ver Documento Anexado</a>
              </td>
            </tr>
            <!-- Séptima fila con 3 columnas -->


            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important; background-color:beige">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16">Fechas de Inicio y Entrega Proyecto</label>

              </td>
            </tr>
            <tr>
              <td>
                <label for="campo11">Fecha asignac</label>
                <input type="text" readonly v-model="orden.fechaasignacion">
              </td>
              <td>
                <label for="campo12">Promesa de entrega</label><br>
                <input type="text" readonly v-model="orden.promesaentrega">
              </td>

            </tr>
            <tr>
              <td>
                <label for="campo13">Entrega Producción</label>
                <input type="text" readonly v-model="orden.entregaproduccion">
              </td>
            </tr>
            <tr>
              <td>
                <label>Fecha Inicio Proyecto</label><br>
                <input type="text" readonly v-model="orden.fechainicio" required>
              </td>
              <td>
                <label>Fecha estimada de Entrega Proyecto</label><br>
                <input type="text" readonly v-model="orden.fechafin" required>
                <p>Ingresar una nueva fecha</p>
                <input type="date" v-model="orden.fechafin">
              </td>
            </tr>

            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important; background-color:beige">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16">Zona de Personal</label>

              </td>
            </tr>
            <tr>
              <td>

                <label> Diseñador Responsable </label><br>
                <input type="text" readonly v-model="orden.nombre_disenador">
              </td>
              <td>
                <label>Supervisor Responsable</label><br>
                <input type="text" readonly v-model="orden.nombre_supervisor">
              </td>

            </tr>
            <tr>
              <td>
                <label>Lista de Empleados</label><br>

                <button style="margin-top: 5px; background-color:darkslateblue ;" @click="empleados" class="button2">Administrar</button>
              </td>
              <td>
                <label>Encargado de la Aprobación </label><br>
                <div v-for="user in (userData)" :key="user.id">
                  <p> {{ user.name }}</p>

                </div>
              </td>



            </tr>

            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important; background-color:beige">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td>
                <label>Lista de Permisos</label><br>

                <button style="margin-top: 5px; background-color:darkslateblue ;" @click="permisos" class="button2">Administrar</button>
              </td>
              <td>
                <label for="campo22">Fase de la Orden</label>
                <input type="text" readonly v-model="orden.status">
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important;background-color:beige">
                <label for="campo16"></label>

              </td>
            </tr>
            <tr>
              <td colspan="2" style="width: 20px!important;">
                <label for="campo16">Valores de la Orden</label>

              </td>
            </tr>
            <tr>
              <td>
                <label for="campo17">Valor inicial proyecto</label>
                <input type="number" readonly v-model="orden.valorinicial">
              </td>
              <td>
                <label for="campo18">Valor Adiciones proyecto</label>

                <input type="number" v-model="totaltotalAdeciones" readonly>
                <button style="margin-top: 5px; background-color:darkslateblue ;" @click="crearadiciones" class="button2">Administrar</button>

              </td>

            </tr>

            <tr>
              <td>
                <label for="campo18">Costo Productos usados en proyecto</label>

                <input type="text" v-model="totalProductos" readonly>

                <button style="margin-top: 5px; background-color:darkslateblue ;" @click="productos" class="button2">Administrar</button>
              </td>
              <td>
                <label> Costos y Gastos Totales </label><br>
                <input type="number" v-model="totalCostos" readonly> <br>

                <button style="margin-top: 5px; background-color:darkslateblue ;" @click="iracostos" class="button2">Administrar</button>
              </td>


            </tr>
            <tr>
              <td>
                <label for="campo19">Valor total proyecto antes de iva (inicial + adiciones)</label>
                <input type="text" readonly :value="parseFloat(orden.valorinicial) + parseFloat(calcularTotalAdiciones())">

              </td>
            </tr>

            <tr>
              <td>
                <label for="campo20">Gasto MAximo</label>
                <input type="number" readonly v-model="sumaProductosYCostos">

              </td>

              <td>
                <label for="campo22">Rentabilidad antes de impuesto </label>
                <input type="text" readonly v-model="rentabilidadAntesImpuestos">
              </td>
            </tr>

            <tr>

            </tr>
          </table><br><br>


          <div class="form-group">
            <button type="submit" class="button">Terminar Orden </button><br>
            <button style="margin-top: 5px;" @click="atras" class="button2">Regresar</button>
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
        fecha: '',
        cotizacion: '',
        ciudad: '',
        elabora: '',
        entregapactada: '',
        entregareal: '',
        tipoproyecto: '',
        cliente: '',
        solicitadopor: '',
        supervisor: '',
        disenador: '',
        fechaasignacion: '',
        promesaentrega: '',
        entregaproduccion: '',
        horasrequeridas: '',
        valorinicial: '',
        aciciones: '',
        valortotal: '',
        gastomaximo: '',
        sumagastos: '',
        rentabilidad: '',
        estado: 'en ejecucion',
        status: '',
        nombre_disenador: '',
        nombre_supervisor: '',
        fechainicio: '',
        fechafin: '',

      },
      producto: {
        nombre: '',
        cantidad: '',
        valortotal: '',

      },
      id: '',
      menuOpen: false,
      nombre: '',
      direccion: '',
      fecha: '',
      descripcion: '',
      supervisor: '',
      diseñador: '',
      encargado: '',
      fechaCreacion: '',
      estado: 'en ejecución',
      usuarios: [],
      usuarios2: [],
      userData: null,
      status: 'en ejecución',
      productos1: [],
      fechainicio: '',
      fechafin: '',
      adiciones: [],
      costos: [],
      permisos1: [],
      valortotal: '',
      gastomaximo: '',
      rentabilidad: ''

    };
  },
  computed: {
    filters: {
      formatDate(value) {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    },
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

          // Obtener el ID de la orden de la ruta
          const orderId = this.$route.params.idOrden;

          // Crear el objeto de datos de la orden
          const ordenData = {
            id: orderId,
            adiciones: parseFloat(this.orden.valorinicial) + parseFloat(this.calcularTotalAdiciones()),
            valortotal: parseFloat(this.orden.valorinicial) + parseFloat(this.calcularTotalAdiciones()),
            gastomaximo: this.totalCostos,
            rentabilidad: this.rentabilidadAntesImpuestos,
            fechafin: this.orden.fechafin,
          };

          // Realizar la petición POST al servidor
          axios.post(`http://138.197.94.5:3000/api/ordenes/terminar/${orderId}`, ordenData)
            .then(response => {
              console.log('Orden registrada exitosamente:', response.data.data);
              alert('Se dio por terminada la orden "');
              this.$router.push('/terminadas');                  // Aquí puedes manejar la respuesta del servidor, como redireccionar a otra página o mostrar un mensaje de éxito
            })
            .catch(error => {
              console.error('Error al registrar orden:', error.response.data.message);
              alert('Se dio por terminada la orden . rre ');
              this.$router.push('/terminadas');

              // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            });
        } else {
          console.error('No se pudo obtener el ID de usuario del localStorage.');
        }
      } else {
        console.error('No hay datos de usuario en el localStorage.');
      }
    },


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





    cargarUsuarios() {
      // Aquí debes realizar una solicitud HTTP para obtener la lista de usuarios
      // Por ejemplo, usando axios:
      axios.get('http://138.197.94.5:3000/api/users/optenersupervisores')
        .then(response => {
          this.usuarios = response.data;
        })
        .catch(error => {
          console.error('Error al cargar usuarios:', error);
        });
    },
    cargarDisenadores() {
      // Aquí debes realizar una solicitud HTTP para obtener la lista de usuarios
      // Por ejemplo, usando axios:
      axios.get('http://138.197.94.5:3000/api/users/optenerdisenadores')
        .then(response => {
          this.usuarios2 = response.data;
        })
        .catch(error => {
          console.error('Error al cargar usuarios:', error);
        });
    },


    async buscarPermisos() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://138.197.94.5:3000/api/products/getpermisos/${idOrden}`);

        // Verifica si la respuesta contiene datos
        if (response.data && response.data.length > 0) {
          // Asigna los productos a la propiedad 'productos1'
          this.permisos1 = response.data;
        } else {
          console.log('No se encontraron productos para esta orden.');
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },

    async buscarProductos() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://138.197.94.5:3000/api/products/getproducts/${idOrden}`);

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

    async buscarcostos() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://138.197.94.5:3000/api/products/getcostos/${idOrden}`);

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

    async buscarempleados() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://138.197.94.5:3000/api/products/getempleados/${idOrden}`);

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
    async buscaradiciones() {
      const idOrden = this.$route.params.idOrden;
      try {
        const response = await axios.get(`http://138.197.94.5:3000/api/products/adiciones/${idOrden}`);

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

        const response = await axios.get(`http://138.197.94.5:3000/api/ordenes/stage1/${idOrden}`);

        // Accede al primer elemento del arreglo de respuesta
        const orden = response.data[0];
        console.log('La orden es:', JSON.stringify(this.orden, null, 2));

        // Asigna los valores a las propiedades del componente Vue

        this.supervisor = orden.supervisor;
        this.estado = orden.estado;
        this.orden.doc2 = orden.doc2;
        this.orden.doc1 = orden.doc1;
        // Asigna otros valores si es necesario
        this.orden.id = orden.id;
        this.orden.fecha = orden.fecha;
        this.orden.cotizacion = orden.cotizacion;
        this.orden.ciudad = orden.ciudad;
        this.orden.elabora = orden.elabora;
        this.orden.entregapactada = orden.entregapactada;
        this.orden.entregareal = orden.entregareal;
        this.orden.tipoproyecto = orden.tipoproyecto;
        this.orden.cliente = orden.cliente;
        this.orden.solicitadopor = orden.solicitadopor;
        this.orden.disenador = orden.disenador;
        this.orden.fechaasignacion = orden.fechaasignacion;
        this.orden.promesaentrega = orden.promesaentrega;
        this.orden.entregaproduccion = orden.entregaproduccion;
        this.orden.horasrequeridas = orden.horasrequeridas;
        this.orden.valorinicial = orden.valorinicial;
        this.orden.aciciones = orden.aciciones;
        this.orden.valortotal = orden.valortotal;
        this.orden.gastomaximo = orden.gastomaximo;
        this.orden.sumagastos = orden.sumagastos;
        this.orden.rentabilidad = orden.rentabilidad;
        this.orden.estado = orden.estado;
        this.orden.supervisor = orden.supervisor;
        this.orden.disenador = orden.disenador;
        this.orden.status = orden.status;
        this.orden.nombre_disenador = orden.nombre_disenador;
        this.orden.nombre_supervisor = orden.nombre_supervisor;
        this.orden.fechainicio = orden.fechainicio;
        this.orden.fechafin = orden.fechafin;

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
      this.$router.push('/aprobadas');
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
    this.buscarempleados();
    this.buscarcostos();
    this.buscarProductos();
    this.buscaradiciones();
    this.buscarPermisos();
    this.totalAdiciones();
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