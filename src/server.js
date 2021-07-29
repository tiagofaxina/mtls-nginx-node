'use strict';

const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.status(200)
        .json(`You are consuming a endpoint with no mTLS requested`);
});

app.get('/test', (req, res) => {
    res.status(200)
        .json(`You are consuming a endpoint ("/test") with no mTLS requested`);
});

app.get('/webhook', (req, res) => {
    res.status(200)
        .json(`Hello ${req.header("ssl_client")}, your certificate was issued by ${req.header("SSL_Client_Issuer")}!`);
});

app.listen(port, () => {
  console.log(`.. server up and running and listening on ${port} ..`);
})