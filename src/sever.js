//  const express = require('express')

import  express  from 'express';

import configviewEngine from './configs/configviewEngine';

import initWedroute from './route/wed';

import initAPIRoute from './route/API';

import pool from './configs/connectDB';

require('dotenv').config();

var morgan = require('morgan');







const app = express();
const port = process.env.PORT ||6789;

app.use(morgan('combined'));

// Hỗ trợ gửi data từ clien lên sever và lấy data 1 cách đơn giản
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup viewEngine
configviewEngine(app);

// init wed route
initWedroute(app);

// init API route
initAPIRoute(app);










// handle 404 not fould
app.use((req,res ) =>{
 return res.render('404.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})