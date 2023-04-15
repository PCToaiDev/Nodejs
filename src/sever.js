//const express = require('express')

import  express  from 'express';

import configviewEngine from './configs/configviewEngine';

const app = express();
const port = 3000

configviewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.get('/about', (req, res) => {
  res.send('Hello World2!')
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})