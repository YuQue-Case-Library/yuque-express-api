const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const qs = require('qs');

const app = express();
const router = express.Router();

// logger
app.use(morgan("dev"));

const ajax = axios.create({
  baseURL: "https://www.yuque.com/api/v2",
  headers: {
    'X-Auth-Token': 'gd0a7eiGTEjXQ7NAichYrHKeeS6jRjhuJfRujCtk'
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

ajax.interceptors.request.use((config) => {
  if (config.method === "post") {
    config.data = qs.stringify(config.data);
  }
  return config;
});

router.all("/user", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");

  ajax({
    method: req.method.toLowerCase(),
    url: req.originalUrl,
    data: req.body
  })
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
      console.log(req.body);
    })
    .catch(err => {
      console.log(err);
    });

  if (req.method == "OPTIONS") {
    res.send(200);
  }
});

app.use(router)

app.listen(3000, () => console.log("Example app listening on port 3000!"));
