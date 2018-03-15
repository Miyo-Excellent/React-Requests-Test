// Dependencies
import express from "express";
import axios from 'axios';

// Posts
// import test from './data/test/test.json';

const api = express.Router();

api
  .post('/test/login', (req, res) => axios.post(req.body.url, {email: req.body.email, password: req.body.password}, { headers: { 'Content-Type': 'application/json' }, withCredentials: true, 'Access-Control-Allow-Origin': 'https://qroom.biz'})
    .then(response => axios.get(`https://qroom.biz/api/v1/tests/data?token=${response.data.token}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true, 'Access-Control-Allow-Origin': 'https://qroom.biz'})
      .then(response2 => {

        if (req.body.log) {
          console.log(response2.data.entities);
        }

        res.json({
          message: 'Datos obtenidos con exito',
          payload: response2.data.entities,
          requesteInfo: req.body
        });

        res.end();
      })
      .catch(error => console.log(`FATAL ::: Problemas con la conexion al servidor remoto ::: ${error}`)))
    .catch(error => console.log(`FATAL ::: Los datos enviados son invalidos ::: ${error}`)));

export default api;
