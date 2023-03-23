const {getConnection} = require('./db/db-connection-mongo');
const express = require('express')
const cors = require('cors');
const app = express()

const port = 5000;

//process.evn.port ||
app.use(cors());
getConnection();

//Parseo Json
app.use(express.json());

app.use('/Usuario',require('./router/Usuario'));
app.use('/MarcaEquipo',require('./router/MarcaEquipo'));
app.use('/EstadoEquipo',require('./router/EstadoEquipo'));
app.use('/TipoEquipo',require('./router/TipoEquipo'));
app.use('/inventory',require('./router/inventory'));
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  /*app.listen(3000, () => {
    console.log('arranco puerto: 3000')
})*/