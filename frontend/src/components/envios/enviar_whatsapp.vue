<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TrasnpaServic </h4>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">
      <section class="main">
        <section class="main">
          <div class="main-top">
            <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 250px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);align-self: center !important;">
          </div>
          <div>
            <h2 style="color: aliceblue !important;">Enviar Mensaje de WhatsApp</h2><br><br>
            <div>
              <label for="phoneNumber" style="color: wheat !important;">Número de Contacto:</label><br><br>
              <input style="width: 35% !important;" type="text" v-model="phoneNumber" id="phoneNumber"><br><br>
            </div>
            <div>
              <label for="message" style="color: wheat !important;">Mensaje:</label><br><br>
              <textarea style="width: 35% !important;" placeholder="Mensaje predeterminado" v-model="message" id="message"></textarea>
            </div>
            <button @click="sendWhatsAppMessage">Enviar Mensaje</button>
          </div>
        </section>
        <div class="form-group">
          <button @click="atras" class="button2">Regresar</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      message: 'Hola, Como estas?, se ha generado un tiket a tu nombre, puedes consultarlo en https://transpaservic.com.co/usuarios/consultas o puedes ir personalmente a la oficina mas cercana, !Muchas Gracias¡'
    };
  },
  methods: {
    sendWhatsAppMessage() {
      // Construir el enlace de WhatsApp
      const url = `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(this.message)}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(url, '_blank');
      this.$router.push('/home');
    }
  }
};
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