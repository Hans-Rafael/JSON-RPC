const { ethers } = require('ethers');
require('dotenv').config();
const readline = require('readline');

// URL del proveedor de Sepolia desde el archivo .env
const sepoliaUrl = process.env.SEPOLIA_URL;

// Crear un proveedor usando la URL de Sepolia
const provider = new ethers.JsonRpcProvider(sepoliaUrl);

// Cargar la billetera desde una clave privada
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Crear una interfaz para leer entradas del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

async function sendTransaction() {
    // Preguntar al usuario por la dirección de destino
    rl.question('Ingrese la dirección de destino: ', async (TARGET_ADDRESS) => {
        if (!ethers.isAddress(TARGET_ADDRESS)) {
          console.error('Dirección inválida.');
          rl.close();
          
          return;
        }

    //si la dir. es correcta, enviar la transaccion
    //tx es un objeto con los datos de la transaccion
  const tx = {
    to: TARGET_ADDRESS, // Dirección de destino a especificar
    value: ethers.parseEther('0.0001'), // Cantidad a enviar en ETH
    gasLimit: 21000,
    // gasPrice: opcional, puedes dejar que el proveedor determine el precio adecuado
  };

  try {
    const txResponse = await wallet.sendTransaction(tx);
    console.log('Transacción enviada:', txResponse.hash);

    // Esperar a que la transacción sea validada
    const receipt = await txResponse.wait();
    console.log('Transacción validada:', receipt);
  } catch (e) {
    console.error('Error al enviar la transacción', e);
  } finally {
    rl.close();
  }
  });
}

sendTransaction();
