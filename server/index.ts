const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

const PORT = config.get('serverPort')

const start = async () => {
  try {
    await mongoose.connect(
      config.get('dbUrl'),
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    app.listen(PORT, ()=>{
      console.log(`Server started on Port=${PORT}`)
    })
  } catch (e) {
      console.log(e.message)
  }
}

start()