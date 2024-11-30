const { ethers } = require("ethers");
require('dotenv').config();

// Reemplaza con tu URL de Alchemy
// Acceder a las variables de entorno
const alchemyUrl = process.env.ALCHEMY_URL;

// Crear un proveedor usando la URL de Alchemy
const provider = new ethers.JsonRpcProvider(alchemyUrl);

// Obtener el número de bloque actual
async function getBlockNumber() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("Número de bloque actual:", blockNumber);
  } catch (e) {
    console.error("Error al obtener el número de bloque", e);
  }
}

getBlockNumber();