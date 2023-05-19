const {Router} = require("express");
const msgControl = require("../controllers/msgControl");
const { CHANNEL_SLACK} = process.env;


const mainRouter = Router();  

mainRouter.get('/', async (req, res) => {
    await msgControl(req,res)
});

module.exports = mainRouter;