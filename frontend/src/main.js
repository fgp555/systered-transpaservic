// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import LoginForm from "./components/Auth/LoginForm.vue";
import RegisterFormen from "./components/Auth/RegisterFormen.vue";
import Dashboard from "./components/DashboardHome.vue";
import OrderTrabajoHome from "./components/OrderTrabajoHome.vue";
import CrearOrden from "./components/ordenes/CrearOrden.vue";
import YaAprobadas from "./components/ordenes/YaAprobadas.vue";
import PorAprobar from "./components/ordenes/PorAprobar.vue";
import SegundoEstageOrden from "./components/ordenes/SegundoEstageOrden.vue";
import TercerEstageOrdenVue from "./components/ordenes/TercerEstageOrden.vue";
import updateOrden1 from "./components/ordenes/updateOrden1.vue";
import agregarProductos from "./components/ordenes/agregarProductos.vue";
import ListaUsuarios from "./components/usuarios/listaUsuarios.vue";
import administrarUsuarios from "./components/usuarios/administrarUsuarios.vue";
import agregarRol from "./components/usuarios/agregarRol.vue";
import YaTerminadas from "./components/ordenes/YaTerminadas.vue";
import TerminadoEstageOrden from "./components/ordenes/TerminadoEstageOrden.vue";
import enviar_whatsapp from "./components/envios/enviar_whatsapp.vue";
import consulta_usuarios from "./components/ordenes/consulta_usuarios.vue";
import zonaConsultas from "./components/ordenes/zonaConsultas.vue";
import consultarFecha from "./components/consultas/consultarFecha.vue";
import consultarProbeedor from "./components/consultas/consultarProbeedor.vue";
import consultarEstado from "./components/consultas/consultarEstado.vue";
import consultarTodos from "./components/consultas/consultarTodos.vue";
import cargaCsv from "./components/ordenes/cargaCsv.vue";
import backTiketsDist from "./components/ordenes/backTiketsDist.vue";
import tikectBackStage from "./components/ordenes/tikectBackStage.vue";
import editarUsuario from "./components/usuarios/editarUsuario.vue";
import cambiarContraseña from "./components/usuarios/cambiarContrasena.vue";
import Politicasemarte from "./components/politicasEmarte.vue";

const routes = [
  { path: "/login", component: LoginForm },
  { path: "/register", component: RegisterFormen },
  { path: "/home", component: Dashboard },
  { path: "/ordenes", component: OrderTrabajoHome },
  { path: "/crear-ordenes", component: CrearOrden },
  { path: "/updateOrden1", component: updateOrden1 },
  { path: "/poraprobar", component: PorAprobar },
  { path: "/aprobadas", component: YaAprobadas },
  { path: "/terminadas", component: YaTerminadas },
  { path: "/terminadoEstage/:idOrden", component: TerminadoEstageOrden },
  { path: "/segundoEstage/:idOrden", component: SegundoEstageOrden },
  { path: "/tercerEstage/:idOrden", component: TercerEstageOrdenVue },
  { path: "/agregarProducto/:idOrden", component: agregarProductos },
  { path: "/usuarios/lista", component: ListaUsuarios },
  { path: "/enviar_whatsapp", component: enviar_whatsapp },
  { path: "/usuarios/administrar/:userid", component: administrarUsuarios },
  { path: "/usuarios/agregarRol/:userid", component: agregarRol },
  { path: "/usuarios/consultas", component: consulta_usuarios },
  { path: "/ordenes/consultas", component: zonaConsultas },
  { path: "/ordenes/consultas/fecha", component: consultarFecha },
  { path: "/ordenes/consultas/probeedor", component: consultarProbeedor },
  { path: "/ordenes/consultas/estado", component: consultarEstado },
  { path: "/ordenes/consultas/todos", component: consultarTodos },
  { path: "/ordenes/cargacsv", component: cargaCsv },
  { path: "/back_tikets", component: backTiketsDist },
  { path: "/tiketcBackStage/:idOrden", component: tikectBackStage },
  { path: "/editarUsuario/:userid", component: editarUsuario },
  { path: "/cambiarContrasena/:userid", component: cambiarContraseña },
  { path: "/politicasemarte", component: Politicasemarte },

  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHashHistory(), // Cambia createWebHistory por createWebHashHistory
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path !== "/login" && !token && to.path !== "/usuarios/consultas" && to.path !== "/politicasemarte") {
    // Si no hay un token y el usuario intenta acceder a una ruta protegida,
    // redirigirlo al inicio de sesión
    next("/login");
  } else {
    // De lo contrario, permite que el usuario continúe navegando
    next();
  }
});

const app = createApp(App); // Crea la aplicación

app.use(router); // Usa el enrutador

app.mount("#app"); // Monta la aplicación en el elemento con el id 'app'
