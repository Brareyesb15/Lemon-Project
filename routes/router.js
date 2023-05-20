const {Router} = require("express");
const msgControl = require("../controllers/msgControl");
const { CHANNEL_SLACK} = process.env;
const completePetition = require("../integrationAi")


const mainRouter = Router();  

mainRouter.get('/', async (req, res) => {
    await msgControl(req,res)
});

mainRouter.get("/prueba", async (req,res)=> {
    console.log("Estoy andando")
  const response = await completePetition(); 
  res.send(response)
})
module.exports = mainRouter;