// src/services/backend.js

import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://138.197.94.5:3000/api', // Reemplaza esto con la URL de tu backend
});

export default backend;
