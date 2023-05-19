const {Router} = require("express");
const msgControl = require("../controllers/msgControl");
const mainRouter = Router();  
const { CHANNEL_SLACK} = process.env;

mainRouter.get('/', async (req, res) => {
    await msgControl(req,res)
});