const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const authRouter = require('./routs/auth.routs.js')

const app = express();

const PORT = config.get('serverPort')

app.use(express.json())
app.use('/api/auth', authRouter)

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