require('dotenv').config();
const { sequelize } = require("./configDB");
const { server } = require('./app');
const PORT = process.env.PORT



sequelize.sync({ force: false}).then(async () => {


})

server.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
  });
  