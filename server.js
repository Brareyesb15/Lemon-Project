require('dotenv').config();
const { sequelize } = require("./configDB");
const { server } = require('./app');
const PORT = 5500

sequelize.sync({ force: false}).then(async () => {
})

server.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
  });
  