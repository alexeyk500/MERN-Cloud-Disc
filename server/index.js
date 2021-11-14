const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileupload = require('express-fileupload');

const authRouter = require('./routes/auth.routes.js');
const fileRouter = require('./routes/file.routes');
const corsMiddleware = require('./middleware/cors.middleware.js');
const filePathMiddleware = require('./middleware/filepath.middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const pathToUsersFiles = path.resolve(__dirname, 'files');
const pathToStaticFiles = path.resolve(__dirname, 'static');

app.use(fileupload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(pathToUsersFiles, pathToStaticFiles));
app.use(express.json());
app.use(express.static('./static'));

app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
  try {
    await mongoose.connect(
      config.get('dbUrl'),
      {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    )
    app.listen(PORT, () => {
      console.log(`Server started on Port=${PORT}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()