//const express = require('express')

import  express  from 'express';

import configviewEngine from './configs/configviewEngine';

import initWedroute from './route/wed';


require('dotenv').config();


const app = express();
const port = process.env.PORT ||6789;

// setup viewEngine
configviewEngine(app);

// init wed route
initWedroute(app);






app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})