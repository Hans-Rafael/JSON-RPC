const { ethers } = require("ethers");
require("dotenv").config();
const readline = require("readline");

// Configuración de la URL de Alchemy desde las variables de entorno
const alchemyUrl = process.env.ALCHEMY_URL;

// Crear un proveedor usando la URL de Alchemy
const provider = new ethers.JsonRpcProvider(alchemyUrl);

// Dirección por defecto
const defaultAddress = "0xFF7A370ff091f3f38966CA882559205Ad3B24829";

// Crear interfaz de readline para pedir entrada al usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `Ingrese la dirección de la cuenta que desea consultar (presione Enter para usar la dirección por defecto: ${defaultAddress}): `,
  async (inputAddress) => {
    const address = inputAddress.trim() || defaultAddress;

    try {
      // Obtener el saldo de la cuenta
      const balance = await provider.getBalance(address);
      console.log(
        `Saldo de la cuenta ${address}:`,
        ethers.formatEther(balance),
        "ETH"
      );
    } catch (e) {
      console.error("Error al obtener el saldo de la cuenta:", e.message);
    } finally {
      rl.close(); // Cierra la interfaz readline
    }
  }
);

