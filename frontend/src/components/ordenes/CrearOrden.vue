<template>
  <div class="page">
    <header class="appbar">
      <div class="container">
        <h4 style="color: aliceblue !important;">Administración - TranspaServic </h4>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </header>
    <div class="container">



      <section class="main">
        <div class="main-top">
          <h1 style="color: aliceblue;">Crear Tikete</h1>
          <img src="https://firebasestorage.googleapis.com/v0/b/catering-c8372.appspot.com/o/logo.jpeg?alt=media&token=6fe2c884-6bc6-4fe4-bb6f-002be1580d8f" alt="Descripción de la imagen" style="width: 150px; height: auto; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); align-items: left !important;">
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
                <input style="height: 24px;" type="text" v-model="contrato_transporte" class="input">
              </td>
              <td>
                <label for="campo2">Numero de Orden</label>
                <input type="text" v-model="numero_orden" required class="input">
              </td>

              <td>
                <label for="campo4">Diagnostico Principal</label>
                <input type="text" v-model="diagnostico_principal" class="input">
              </td>


            </tr>
            <tr>
              <td>
                <label for="campo5">Cliente</label><br>
                <input type="text" v-model="cliente" class="input">
              </td>
              <td>
                <label for="campo6">Nombre Paciente</label>
                <input type="text" v-model="nombre_paciente" class="input">
              </td>
              <td>
                <label for="campo7">Cedula</label><br>
                <input type="text" v-model="cedula" class="input">
              </td>
              <td>
                <label for="campo7">Telefono</label><br>
                <input type="text" v-model="telefono" class="input">
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
                <input type="text" v-model="search" placeholder="Buscar municipio">
                <ul v-if="filteredMunicipios.length">
                  <li v-for="municipio in filteredMunicipios" :key="municipio" @click="selectMunicipio(municipio)">
                    {{ municipio }}
                  </li>
                </ul>
              </td>

              <td>
                <label for="campo2">Destino</label>
                <input type="text" v-model="search_destino" placeholder="Buscar municipio">
                <ul v-if="filteredDestino.length">
                  <li v-for="municipio in filteredDestino" :key="municipio" @click="selectDestino(municipio)">
                    {{ municipio }}
                  </li>
                </ul>
              </td>
              <td style="width: 200px !important;">
                <label for="campo4">Itinerario</label>
                <input type="text" v-model="itinerarioConcatenado" class="input" disabled>
              </td>




            </tr>

            <tr>
              <td>
                <label for="campo1">Observaciones</label>
                <input style="height: 24px;" type="text-area" v-model="observaciones" class="input">
              </td>
              <td>
                <label for="campo2">Fecha de Viaje</label>
                <input type="date" v-model="fecha_viaje" required class="input">
              </td>

              <td>
                <label for="campo4">Correo No</label>
                <input type="text" v-model="correo_numero" class="input">
              </td>
              <td>
                <label for="campo5">Fecha</label><br>
                <input type="date" v-model="fecha" class="input">
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
                <label for="campo5">Cantidad</label><br>
                <input type="text" v-model="cantidad" class="input" @input="calcularValorNetoPax">

              </td>

              <td>
                <label for="campo4">Valor Unitario </label>
                <input type="text" v-model="valor" class="input" @input="calcularValorNetoPax">

              </td>
              <td>
                <label for="campo5">Valor Neto Pax</label><br>
                <input type="text" v-model="valor_neto_pax" class="input">
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
                <select v-model="prestadora" name="empresa">
                  <option value="Copetran">copetran</option>
                  <option value="Cootransunidos">cootransunidos</option>
                  <option value="Cotaxi">cotaxi</option>
                  <option value="Cootransmagdalena">cootransmagdalena</option>
                  <option value="Transsander">transsander</option>
                  <option value="Concorde">concorde</option>
                  <option value="Transricaurte">transricaurte</option>
                  <option value="Catatumbo">catatumbo</option>
                  <option value="Cotrans">cotrans</option>
                  <option value="Sotracor">sotracor</option>
                  <option value="Traescor">traescor</option>
                  <option value="Ballegom">ballegom</option>
                  <option value="Cotransar">cotransar</option>
                  <option value="Cootransmor">cootransmor</option>
                  <option value="Sotramagdalena">sotramagdalena</option>
                  <option value="Cotrasangil">cotrasangil</option>
                  <option value="Cotrasaravita">cotrasaravita</option>
                  <option value="Cotranstame">cotranstame</option>
                  <option value="Cotranal">cotranal</option>
                  <option value="Motilones">motilones</option>
                  <option value="Cooptmotilon">cooptmotilon</option>
                </select>

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

            <!-- Segunda fila con 4 columnas -->

          </table>



          <input type="text" value="PENDIENTE" placeholder="PENDIENTE POR REVISIÓN Y APROBACIÓN " v-model="estado" readonly class="input"><br><br>
          <div class="button-container">
            <button style="background-color: darkgray;" type="submit" class="button3">Crear Tikete</button><br><br>
            <button @click="atras()" class="button2">Regresar</button>
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
      search: '',
      search_destino: '', // Inicializar search
      selectedMunicipio: '',
      selectedDestino: '',
      municipios: [
        'Leticia',
        'Puerto Nariño',
        'Abejorral',
        'Abriaquí',
        'Alejandría',
        'Amaga',
        'Amalfi',
        'Andes',
        'Angelópolis',
        'Angostura',
        'Anorí',
        'Anzá',
        'Apartadó',
        'Arboletes',
        'Argelia',
        'Armenia',
        'Barbosa',
        'Bello',
        'Belmira',
        'Betania',
        'Betulia',
        'Briceño',
        'Buriticá',
        'Cáceres',
        'Caicedo',
        'Caldas',
        'Campamento',
        'Cañasgordas',
        'Caracolí',
        'Caramanta',
        'Carepa',
        'Carolina Del Principe',
        'Caucasia',
        'Chigorodó',
        'Cisneros',
        'Ciudad Bolívar',
        'Cocorná',
        'Concepción',
        'Concordia',
        'Copacabana',
        'Dabeiba',
        'Don Matías',
        'Ebéjico',
        'El Bagre',
        'El Carmen De Viboral',
        'El Peñol',
        'El Retiro',
        'Entrerríos',
        'Envigado',
        'Fredonia',
        'Frontino',
        'Giraldo',
        'Girardota',
        'Gómez Plata',
        'Granada',
        'Guadalupe',
        'Guarne',
        'Guatapé',
        'Heliconia',
        'Hispania',
        'Itagüí',
        'Ituango',
        'Jardín',
        'Jericó',
        'La Ceja Del Tambo',
        'La Estrella',
        'La Pintada',
        'La Unión',
        'Liborina',
        'Maceo',
        'Marinilla',
        'Medellín',
        'Montebello',
        'Murindó',
        'Mutatá',
        'Nariño',
        'Nechí',
        'Necoclí',
        'Olaya',
        'Peque',
        'Pueblorrico',
        'Puerto Berrio',
        'Puerto Nare',
        'Puerto Triunfo',
        'Remedios',
        'Rionegro',
        'Sabanalarga',
        'Sabaneta',
        'Salgar',
        'San Andrés De Cuerquia',
        'San Carlos',
        'San Francisco',
        'San Jerónimo',
        'San José De La Montaña',
        'San Juan De Urabá',
        'San Luis',
        'San Pedro De Los Milagros',
        'San Pedro De Urabá',
        'San Rafael',
        'San Roque',
        'San Vicente',
        'Santa Bárbara',
        'Santa Rosa De Osos',
        'Santafe De Antioquia',
        'Santo Domingo',
        'Santuario',
        'Segovia',
        'Sonsón',
        'Sopetrán',
        'Támesis',
        'Tarazá',
        'Tarso',
        'Titiribí',
        'Toledo',
        'Turbo',
        'Uramita',
        'Urrao',
        'Valdivia',
        'Valparaíso',
        'Vegachí',
        'Venecia',
        'Vigía Del Fuerte',
        'Yalí',
        'Yarumal',
        'Yolombó',
        'Yondo',
        'Zaragoza',
        'Arauca',
        'Arauquita',
        'Cravo Norte',
        'Fortul',
        'Puerto Rondón',
        'Saravena',
        'Tame',
        'Baranoa',
        'Barranquilla',
        'Campo De La Cruz',
        'Candelaria',
        'Galapa',
        'Juan De Acosta',
        'Luruaco',
        'Malambo',
        'Manatí',
        'Palmar De Varela',
        'Piojo',
        'Polonuevo',
        'Ponedera',
        'Puerto Colombia',
        'Repelón',
        'Sabanagrande',
        'Sabanalarga',
        'Santa Lucía',
        'Santo Tomas',
        'Soledad',
        'Suan',
        'Tubará',
        'Usiacurí',
        'Achí',
        'Altos  Del Rosario',
        'Arenal',
        'Arjona',
        'Arroyohondo',
        'Barranco De Loba',
        'Calamar',
        'Cantagallo',
        'Cartagena de Indias',
        'Cicuco',
        'Clemencia',
        'Córdoba',
        'El Carmen De Bolívar',
        'El Guamo',
        'El Peñon',
        'Hatillo De Loba',
        'Magangué',
        'Mahates',
        'Margarita',
        'María La Baja',
        'Montecristo',
        'Morales',
        'Norosí',
        'Pinillos',
        'Regidor',
        'Rioviejo',
        'San Cristóbal',
        'San Estanislao',
        'San Fernando',
        'San Jacinto',
        'San Jacinto Del Cauca',
        'San Juan Nepomuceno',
        'San Martín De Loba',
        'San Pablo',
        'Santa Catalina',
        'Santa Cruz De Mompós',
        'Santa Rosa Del Norte',
        'Santa Rosa Del Sur',
        'Simití',
        'Soplaviento',
        'Talaigua Nuevo',
        'Tiquisio',
        'Turbaco',
        'Turbana',
        'Villanueva',
        'Zambrano',
        'Almeida',
        'Aquitania',
        'Arcabuco',
        'Bel',
        'Berb',
        'Betéiti',
        'Boavi',
        'Boya',
        'Brice',
        'Buenavis',
        'Busban',
        'Cald',
        'Campohermo',
        'Cerin',
        'Chinavi',
        'Chiquinqui',
        'Chíqui',
        'Chisc',
        'Chi',
        'Chitaraq',
        'Chiva',
        'Chiv',
        'Ciéne',
        'Cómbi',
        'Cop',
        'Corral',
        'Covarach',
        'Cuba',
        'Cucai',
        'Cuíti',
        'Duita',
        'Cocuy',
        'Espino',
        'Firavito',
        'Flores',
        'Gachanti',
        'Gáme',
        'Garag',
        'Guacamay',
        'Guateq',
        'Guaya',
        'Güic',
        'I',
        'Jenesa',
        'Jeri',
        'Capilla',
        'Uvita',
        'Victoria',
        'Labranzagran',
        'Macan',
        'Mari',
        'Miraflor',
        'Mong',
        'Mong',
        'Moniqui',
        'Motavi',
        'Mu',
        'Nob',
        'Nue Colón',
        'Oica',
        'Otanc',
        'Pachavi',
        'Pá',
        'Pai',
        'Pajari',
        'Panque',
        'Pau',
        'Pa',
        'P De Río',
        'Pes',
        'Pis',
        'Puerto Boyacá',
        'Quípa',
        'Ramiriq',
        'Ráqui',
        'Rond',
        'Sabo',
        'Sáchi',
        'Sama',
        'San Eduardo',
        'San José De Pare',
        'San Luis De Gaceno',
        'San Mateo',
        'San Miguel De Sema',
        'San Pablo De Borbur',
        'San María',
        'San Rosa De Viterbo',
        'San Sofía',
        'Santa',
        'Sativanor',
        'Sativas',
        'Siachoq',
        'Soa',
        'Soc',
        'Soco',
        'Sogamo',
        'Somondo',
        'So',
        'Sora',
        'Sotaqui',
        'Susac',
        'Sutamarch',
        'Sutaten',
        'Tas',
        'Ten',
        'Tiba',
        'Tibaso',
        'Tinja',
        'Tipacoq',
        'To',
        'Tog',
        'Tópa',
        'To',
        'Tun',
        'Tunung',
        'Turmeq',
        'Tuta',
        'Tutazá',
        'Úmbita',
        'Ventaquemada',
        'Villa De Leyva',
        'Viracachá',
        'Zetaquirá',
        'Aguadas',
        'Anserma',
        'Aranzazu',
        'Belalcazar',
        'Chinchiná',
        'Filadelfia',
        'La Dorada',
        'La Merced',
        'Manizales',
        'Manzanares',
        'Marmato',
        'Marquetalia',
        'Marulanda',
        'Neira',
        'Norcasia',
        'Pacora',
        'Palestina',
        'Pensilvania',
        'Riosucio',
        'Risaralda',
        'Salamina',
        'Samaná',
        'San José',
        'Supía',
        'Victoria',
        'Villamaría',
        'Viterbo',
        'Albania',
        'Belén De Los Andaquies',
        'Cartagena Del Chairá',
        'Curillo',
        'El Doncello',
        'El Paujil',
        'Florencia',
        'La Montañita',
        'Milán',
        'Morelia',
        'Puerto Rico',
        'San José Del Fragua',
        'San Vicente Del Caguán',
        'Solano',
        'Solita',
        'Valparaíso',
        'Aguazul',
        'Chameza',
        'Hato Corozal',
        'La Salina',
        'Maní',
        'Monterrey',
        'Nunchía',
        'Orocué',
        'Paz De Ariporo ',
        'Pore',
        'Recetor',
        'Sabanalarga',
        'Sácama',
        'San Luis De Palenque',
        'Támara',
        'Tauramena',
        'Trinidad',
        'Villanueva',
        'Yopal',
        'Almaguer',
        'Argelia',
        'Balboa',
        'Bolívar',
        'Buenos Aires',
        'Cajibio',
        'Caldono',
        'Caloto',
        'Corinto',
        'El Tambo',
        'Florencia',
        'Guachené',
        'Guapi',
        'Inzá',
        'Jambaló',
        'La Sierra',
        'La Vega',
        'López De Micay',
        'Mercaderes',
        'Miranda',
        'Morales',
        'Padilla',
        'Páez',
        'Patía',
        'Piamonte',
        'Piendamó',
        'Popayán',
        'Puerto Tejada',
        'Puracé',
        'Rosas',
        'San Sebastián',
        'Santa Rosa',
        'Santander De Quilichao',
        'Silvia',
        'Sotará',
        'Suárez',
        'Sucre',
        'Timbío',
        'Timbiquí',
        'Toribio',
        'Totoró',
        'Villa Rica',
        'Aguachica',
        'Agustín Codazzi',
        'Astrea',
        'Becerril',
        'Bosconia',
        'Chimichagua',
        'Chiriguaná',
        'Curumaní',
        'El Copey',
        'El Paso',
        'Gamarra',
        'González',
        'La Gloria',
        'La Jagua De Ibirico',
        'La Paz',
        'Manaure Balcón Del César',
        'Pailitas',
        'Pelaya',
        'Pueblo Bello',
        'Rio De Oro',
        'San Alberto',
        'San Diego',
        'San Martín',
        'Tamalameque',
        'Valledupar',
        'Acandí',
        'Alto Baudó',
        'Atrato',
        'Bagadó',
        'Bahía Solano',
        'Bajo Baudó',
        'Bojayá',
        'Carmen Del Darién',
        'Cértegui',
        'Condoto',
        'El Cantón de San Pablo',
        'El Carmen De Atrato',
        'El Litoral De San Juan',
        'Istmina',
        'Juradó',
        'Lloró',
        'Medio Atrato',
        'Medio Baudó',
        'Medio San Juan',
        'Nóvita',
        'Nuquí',
        'Quibdó',
        'Río Iró',
        'Río Quito',
        'Riosucio',
        'San José de Tadó',
        'San José Del Palmar',
        'Sipí',
        'Ungüía',
        'Unión Panamericana',
        'Ayapel',
        'Buenavista',
        'Canalete',
        'Cereté',
        'Chimá',
        'Chinú',
        'Ciénaga De Oro ',
        'Cotorra',
        'La Apartada',
        'Los Córdobas',
        'Momil',
        'Montelibano',
        'Montería',
        'Moñitos',
        'Planeta Rica',
        'Pueblo Nuevo',
        'Puerto Escondido',
        'Puerto Libertador',
        'Purísima',
        'Sahagún',
        'San Andrés De Sotavento',
        'San Antero',
        'San Bernardo Del Viento',
        'San Carlos',
        'San José De Uré',
        'San Pelayo',
        'Santa Cruz De Lorica',
        'Tierralta',
        'Tuchín',
        'Valencia',
        'Agua De Dios ',
        'Albán',
        'Anapoima',
        'Anolaima',
        'Apulo',
        'Arbeláez',
        'Beltrán',
        'Bituima',
        'Bogotá  D.C.',
        'Bojacá',
        'Cabrera',
        'Cachipay',
        'Cajicá',
        'Caparrapí',
        'Cáqueza',
        'Carmen De Carupa',
        'Chaguaní',
        'Chía',
        'Chipaque',
        'Choachí',
        'Chocontá',
        'Cogua',
        'Cota',
        'Cucunubá',
        'El Colegio',
        'El Peñón',
        'El Rosal',
        'Facatativá',
        'Fómeque',
        'Fosca',
        'Funza',
        'Fúquene',
        'Fusagasugá',
        'Gachalá',
        'Gachancipá',
        'Gachetá',
        'Gama',
        'Girardot',
        'Granada',
        'Guachetá',
        'Guaduas',
        'Guasca',
        'Guataquí',
        'Guatavita',
        'Guayabal De Siquima',
        'Guayabetal',
        'Gutierrez',
        'Jerusalen',
        'Junín',
        'La Calera',
        'La Mesa',
        'La Palma',
        'La Peña',
        'La Vega',
        'Lenguazaque',
        'Machetá',
        'Madrid',
        'Manta',
        'Medina',
        'Mosquera',
        'Nariño',
        'Nemocón',
        'Nilo',
        'Nimaima',
        'Nocaima',
        'Pacho',
        'Paime',
        'Pandi',
        'Paratebueno',
        'Pasca',
        'Puerto Salgar',
        'Pulí',
        'Quebradanegra',
        'Quetame',
        'Quipile',
        'Ricaurte',
        'San Antonio Del Tequendama',
        'San Bernardo',
        'San Cayetano',
        'San Francisco',
        'San Juan De Rioseco',
        'Sasaima',
        'Sesquilé',
        'Sibaté',
        'Silvania',
        'Simijaca',
        'Soacha',
        'Sopó',
        'Subachoque',
        'Suesca',
        'Supatá',
        'Susa',
        'Sutatausa',
        'Tabio',
        'Tausa',
        'Tena',
        'Tenjo',
        'Tibacuy',
        'Tibirita',
        'Tocaima',
        'Tocancipá',
        'Topaipi',
        'Ubalá',
        'Ubaque',
        'Ubate',
        'Une',
        'Útica',
        'Venecia',
        'Vergara',
        'Vianí',
        'Villagomez',
        'Villapinzón',
        'Villeta',
        'Viotá',
        'Yacopí',
        'Zipacón',
        'Zipaquirá',
        'Barrancominas',
        'Inirida',
        'Calamar',
        'El Retorno',
        'Miraflores',
        'San José Del Guaviare',
        'Acevedo',
        'Agrado',
        'Aipe',
        'Algeciras',
        'Altamira',
        'Baraya',
        'Campoalegre',
        'Colombia',
        'Elías',
        'Garzón',
        'Gigante',
        'Guadalupe',
        'Hobo',
        'Iquira',
        'Isnos',
        'La Argentina',
        'La Plata',
        'Nátaga',
        'Neiva',
        'Oporapa',
        'Paicol',
        'Palermo',
        'Palestina',
        'Pital',
        'Pitalito',
        'Rivera',
        'Saladoblanco',
        'San Agustín',
        'Santa María',
        'Suaza',
        'Tarqui',
        'Tello',
        'Teruel',
        'Tesalia',
        'Timaná',
        'Villavieja',
        'Yaguará',
        'Albania',
        'Barrancas',
        'Dibulla',
        'Distracción',
        'El Molino',
        'Fonseca',
        'Hatonuevo',
        'La Jagua Del Pilar',
        'Maicao',
        'Manaure',
        'Riohacha',
        'San Juan Del Cesar',
        'Uribia',
        'Urumita',
        'Villanueva',
        'Algarrobo',
        'Aracataca',
        'Ariguaní',
        'Cerro De San Antonio',
        'Chivolo',
        'Ciénaga',
        'Concordia',
        'El Banco',
        'El Piñón',
        'El Retén',
        'Fundación',
        'Guamal',
        'Nueva Granada',
        'Pedraza',
        'Pijiño Del Carmen',
        'Pivijay',
        'Plato',
        'Puebloviejo',
        'Remolino',
        'Sabanas De San Ángel',
        'Salamina',
        'San Sebastián De Buenavista',
        'San Zenón',
        'Santa Ana',
        'Santa Bárbara De Pinto',
        'Santa Marta',
        'Sitionuevo',
        'Tenerife',
        'Zapayán',
        'Zona Bananera',
        'Acacías',
        'Barranca De Upía',
        'Cabuyaro',
        'Castilla La Nueva',
        'Cubarral',
        'Cumaral',
        'El Calvario',
        'El Castillo',
        'El Dorado',
        'Fuente De Oro',
        'Granada',
        'Guamal',
        'La Macarena',
        'Lejanias',
        'Mapiripán',
        'Mesetas',
        'Puerto Concordia',
        'Puerto Gaitán',
        'Puerto Lleras',
        'Puerto López',
        'Puerto Rico',
        'Restrepo',
        'San Carlos De Guaroa',
        'San Juan De Arama',
        'San Juanito',
        'San Martín De Los Llanos',
        'Uribe',
        'Villavicencio',
        'Vista',
        'Alban',
        'Aldana',
        'Ancuyá',
        'Arboleda',
        'Barbacoas',
        'Belén',
        'Buesaco',
        'Chachagüí',
        'Colón',
        'Consacá',
        'Contadero',
        'Córdoba',
        'Cuaspud',
        'Cumbal',
        'Cumbitara',
        'El Charco',
        'El Peñol',
        'El Rosario',
        'El Tablón De Gómez',
        'El Tambo',
        'Francisco Pizarro',
        'Funes',
        'Guachucal',
        'Guaitarilla',
        'Gualmatán',
        'Iles',
        'Imués',
        'Ipiales',
        'La Cruz',
        'La Florida',
        'La Llanada',
        'La Tola',
        'La Unión',
        'Leiva',
        'Linares',
        'Los Andes',
        'Magüi Payán',
        'Mallama',
        'Mosquera',
        'Nariño',
        'Olaya Herrera',
        'Ospina',
        'Policarpa',
        'Potosí',
        'Providencia',
        'Puerres',
        'Pupiales',
        'Ricaurte',
        'Roberto Payán',
        'Samaniego',
        'San Bernardo',
        'San Juan De Pasto',
        'San Lorenzo',
        'San Pablo',
        'San Pedro De Cartago',
        'Sandoná',
        'Santa Bárbara',
        'Santacruz',
        'Sapuyes',
        'Taminango',
        'Tangua',
        'Tumaco',
        'Túquerres',
        'Yacuanquer',
        'Abrego',
        'Arboledas',
        'Bochalema',
        'Bucarasica',
        'Cáchira',
        'Cácota',
        'Chinácota',
        'Chitagá',
        'Convención',
        'Cucutilla',
        'Durania',
        'El Carmen',
        'El Tarra',
        'El Zulia',
        'Gramalote',
        'Hacarí',
        'Herrán',
        'La Esperanza',
        'La Playa De Belén',
        'Labateca',
        'Los Patios',
        'Lourdes',
        'Mutiscua',
        'Ocaña',
        'Pamplona',
        'Pamplonita',
        'Puerto Santander',
        'Ragonvalia',
        'Salazar De Las Palmas',
        'San Calixto',
        'San Cayetano',
        'San José De Cúcuta',
        'Santiago',
        'Sardinata',
        'Silos',
        'Teorama',
        'Tibú',
        'Toledo',
        'Villa Caro',
        'Villa Del Rosario',
        'Colón',
        'Mocoa',
        'Orito',
        'Puerto Asís',
        'Puerto Caicedo',
        'Puerto Guzmán',
        'Puerto Leguizamo',
        'San Francisco',
        'San Miguel',
        'Santiago',
        'Sibundoy',
        'Valle Del Guamuez',
        'Villagarzón',
        'Armenia',
        'Buenavista',
        'Calarcá',
        'Circasia',
        'Córdoba',
        'Filandia',
        'Génova',
        'La Tebaida',
        'Montenegro',
        'Pijao',
        'Quimbaya',
        'Salento',
        'Apía',
        'Balboa',
        'Belén De Umbría',
        'Dosquebradas',
        'Guática',
        'La Celia',
        'La Virginia',
        'Marsella',
        'Mistrato',
        'Pereira',
        'Pueblo Rico',
        'Quinchía',
        'Santa Rosa De Cabal',
        'Santuario',
        'Providencia',
        'Aguada',
        'Albania',
        'Aratoca',
        'Barbosa',
        'Barichara',
        'Barrancabermeja',
        'Betulia',
        'Bolívar',
        'Bucaramanga',
        'Cabrera',
        'California',
        'Capitanejo',
        'Carcasí',
        'Cepita',
        'Cerrito',
        'Charalá',
        'Charta',
        'Chimá',
        'Chipatá',
        'Cimitarra',
        'Concepción',
        'Confines',
        'Contratación',
        'Coromoro',
        'Curití',
        'El Carmen De Chucurí',
        'El Guacamayo',
        'El Peñón',
        'El Playón',
        'Encino',
        'Enciso',
        'Florián',
        'Floridablanca',
        'Galán',
        'Gambita',
        'Girón',
        'Guaca',
        'Guadalupe',
        'Guapota',
        'Guavatá',
        'Güepsa',
        'Hato',
        'Jesús María',
        'Jordán',
        'La Belleza',
        'La Paz',
        'Landázuri',
        'Lebrija',
        'Los Santos',
        'Macaravita',
        'Málaga',
        'Matanza',
        'Mogotes',
        'Molagavita',
        'Ocamonte',
        'Oiba',
        'Onzaga',
        'Palmar',
        'Palmas Del Socorro',
        'Paramo',
        'Piedecuesta',
        'Pinchote',
        'Puente Nacional',
        'Puerto Parra',
        'Puerto Wilches',
        'Rionegro',
        'Sabana De Torres',
        'San Andrés',
        'San Benito',
        'San Gil',
        'San Joaquin',
        'San José De Miranda',
        'San Miguel',
        'San Vicente Del Chucurí',
        'Santa Bárbara',
        'Santa Helena De Opon',
        'Simacota',
        'Socorro',
        'Suaita',
        'Sucre',
        'Surata',
        'Tona',
        'Valle De San José',
        'Vélez',
        'Vetas',
        'Villanueva',
        'Zapatoca',
        'Buenavista',
        'Caimito',
        'Chalan',
        'Coloso',
        'Corozal',
        'Coveñas',
        'El Roble',
        'Galeras',
        'Guaranda',
        'La Unión',
        'Los Palmitos',
        'Majagual',
        'Morroa',
        'Ovejas',
        'San Antonio De Palmito',
        'Sampues',
        'San Benito Abad',
        'San Juan De Betulia',
        'San Marcos',
        'San Onofre',
        'San Pedro',
        'Sincé',
        'Sincelejo',
        'Sucre',
        'Santiago De Tolú',
        'Toluviejo',
        'Alpujarra',
        'Alvarado',
        'Ambalema',
        'Anzoátegui',
        'Armero',
        'Ataco',
        'Cajamarca',
        'Carmen De Apicalá',
        'Casabianca',
        'Chaparral',
        'Coello',
        'Coyaima',
        'Cunday',
        'Dolores',
        'El Espinal',
        'Falan',
        'Flandes',
        'Fresno',
        'El Guamo',
        'Herveo',
        'Honda',
        'Ibagué',
        'Icononzo',
        'Lérida',
        'Libano',
        'Mariquita',
        'Melgar',
        'Murillo',
        'Natagaima',
        'Ortega',
        'Palocabildo',
        'Piedras',
        'Planadas',
        'Prado',
        'Purificación',
        'Rioblanco',
        'Roncesvalles',
        'Rovira',
        'Saldaña',
        'San Antonio',
        'San Luis',
        'Santa Isabel',
        'Suarez',
        'Valle  De San Juan',
        'Venadillo',
        'Villahermosa',
        'Villarrica',
        'Alcalá',
        'Andalucía',
        'Ansermanuevo',
        'Argelia',
        'Bolívar',
        'Buenaventura',
        'Guadalajara De Buga',
        'Bugalagrande',
        'Caicedonia',
        'Calima Del Darién',
        'Candelaria',
        'Cartago',
        'Dagua',
        'El Águila',
        'El Cairo',
        'El Cerrito',
        'El Dovio',
        'Florida',
        'Ginebra',
        'Guacarí',
        'Jamundí',
        'La Cumbre',
        'La Unión',
        'La Victoria',
        'Obando',
        'Palmira',
        'Pradera',
        'Restrepo',
        'Riofrio',
        'Roldanillo',
        'San Pedro',
        'Santiago De Cali',
        'Sevilla',
        'Toro',
        'Trujillo',
        'Tuluá',
        'Ulloa',
        'Versalles',
        'Vijes',
        'Yotoco',
        'Yumbo',
        'Zarzal',
        'Caruru',
        'Mitú',
        'Taraira',
        'Cumaribo',
        'La Primavera',
        'Puerto Carreño',
        'Santa Rosalía',
      ],
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
      estado: 'PENDIENTE',
      telefono: '',
      loading: false,
      image: null,
      image2: null,
      userData: null,
      menuOpen: false
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
    } else {
      alert('La contraseña es incorrecta');
    }
  },
  computed: {
    filteredMunicipios() {
      if (this.search.length === 0) return [];
      return this.municipios.filter(municipio => {
        const searchLower = this.search.toLowerCase();
        const municipioLower = municipio.toLowerCase();
        // Preferir coincidencias exactas al inicio de la palabra
        return municipioLower.startsWith(searchLower) || municipioLower.includes(searchLower);
      }).slice(0, 5);  // Limitar a 5 resultados para ser más manejable
    },
    filteredDestino() {
      if (this.search_destino.length === 0) return [];
      return this.municipios.filter(municipio => {
        const searchLower = this.search_destino.toLowerCase();
        const municipioLower = municipio.toLowerCase();
        return municipioLower.startsWith(searchLower) || municipioLower.includes(searchLower);
      }).slice(0, 5);
    },

    itinerarioConcatenado() {
      return `${this.selectedMunicipio || 'Origen'} - ${this.selectedDestino || 'Destino'}`;
    }
  },
  watch: {
    search() {
      // Reiniciar selectedMunicipio cuando se cambia el valor de search
      this.selectedMunicipio = '';
    },
  },

  methods: {
    selectMunicipio(municipio) {
      this.selectedMunicipio = municipio;
      this.search = municipio;
    },
    selectDestino(municipio) {
      this.selectedDestino = municipio;
      this.search_destino = municipio;
    },
    register() {
      // Crear el FormData y adjuntar los datos
      const formData = new FormData();
      formData.append('orden', JSON.stringify({
        contrato_transporte: this.contrato_transporte,
        numero_orden: this.numero_orden,
        diagnostico_principal: this.diagnostico_principal,
        cliente: this.cliente,
        nombre_paciente: this.nombre_paciente,
        cedula: this.cedula,
        telefono: this.telefono,
        origen: this.selectedMunicipio,
        destino: this.selectedDestino,
        itinerario: this.itinerarioConcatenado,
        cantidad: this.cantidad,
        observaciones: this.observaciones,
        fecha_viaje: this.fecha_viaje,
        correo_numero: this.correo_numero,
        fecha: this.fecha,
        chequeo: this.chequeo,
        valor: this.valor,
        valor_neto_pax: this.valor_neto_pax,
        prestadora: this.prestadora
      }));
      formData.append('image', this.image);

      // Realizar la petición POST al servidor
      axios.post('http://138.197.94.5:3000/api/ordenes/createtiket', formData)
        .then(response => {
          console.log('Tiket registrada exitosamente:', response.data.data);
          alert('Tiket registrada exitosamente');
          this.$router.push('/ordenes');
        })
        .catch(error => {
          const errorMessage = error.response.data.message;

          // Mostrar alerta personalizada basada en el mensaje de error recibido
          if (error.response.status === 409) {
            alert('Error: ' + errorMessage);  // Error específico de duplicado
          } else {
            alert('Error al registrar Tiket: ' + errorMessage);  // Otros errores
          }

          console.error('Error al registrar Tiket:', errorMessage);
          this.loading = false; // Ocultar el indicador de carga en caso de error
        });
    },

    goToLogin() {
      // Redirecciona a la página de inicio de sesión
      this.$router.push('/login');
    },
    calcularValorNetoPax() {
      // Verificar si tanto la cantidad como el valor son números válidos
      if (!isNaN(this.cantidad) && !isNaN(this.valor)) {
        // Calcular el valor neto por pasajero multiplicando la cantidad por el valor
        this.valor_neto_pax = parseFloat(this.cantidad) * parseFloat(this.valor);
      } else {
        // Si la cantidad o el valor no son números válidos, establecer el valor neto por pasajero como vacío
        this.valor_neto_pax = '';
      }
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
        const response = await axios.post('http://138.197.94.5:3000/api/ordenes/create', formData);
        console.log('Tiket creado exitosamente:', response.data);
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


<style>
@import url("../../style/styles.css");

.autocomplete-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  position: absolute;
  z-index: 1000;
}

.autocomplete-list li {
  padding: 8px;
  cursor: pointer;
}

.autocomplete-list li:hover {
  background-color: #f0f0f0;
}
</style>
