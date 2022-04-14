const app = express();
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const axios = require('axios');
const  {apiRequest}  = require('./helper_test.js');
require('dotenv').config();

// MIDDLEWARE
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = process.env.PORT;

// GET uses query or params
// POST and PUT uses body

// -------------------------------------Product Routes-----------------------------
// Gets a single product
app.get('/product', (req, res) => {
  let endpoint = `products/${req.query.productId}/`;
  apiRequest('get', endpoint)
    .then((response) => res.status(200).send(response.data))
    // .then((response) => console.log(response.data))
    .catch((err) => console.log('catch on server side - product info'));
})

// Gets a list of styles from a product
app.get('/product/styles', (req, res) => {
  const endpoint = `products/${req.query.productId}/styles`;
  apiRequest('get', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('catch on server side - styles'));
});

app.get('/product/related', (req, res) => {
  const endpoint = `products/${req.query.productId}/related`;
  apiRequest('get', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('catch on server side - related'));
});

// ----------------------------------------Q&A Routes-----------------------------
// GET to /qa
app.get('/qa', (req, res) => {
  const endpoint = `qa/questions?product_id=${req.query.productId}`
  apiRequest('get', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in /qa GET'));
});

// POST - Add a question
app.post('/qa/q/add', (req, res) => {
  const endpoint = `/qa/questions/`;
  apiRequest('put', endpoint)
    .then(({data}) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in QA - POST: add qs'));
});

// PUT - Mark Question as Helpful
app.put('/qa/q/helpful', (req, res) => {
  const endpoint = `/qa/questions/${req.body.questionId}/helpful`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in QA - PUT: mark qs as helpful'));
});

// PUT - Report Question
app.put('/qa/q/report', (req, res) => {
  const endpoint = `/qa/questions/${req.body.questionId}/report`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in QA - PUT: report qs'));
});

// POST - Add an an answer
app.post('/qa/a/add', (req, res) => {
  const endpoint = `/qa/questions/${req.body.questionId}/answers`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in QA - POST: add an answer'));
});

// PUT - Mark Answer as Helpful
app.put('/qa/a/helpful', (req, res) => {
  const endpoint = `/qa/answers/${req.body.answerId}/helpful`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in QA - PUT: mark answer helpful'));
});

// PUT - Report Answer
app.put('/qa/a/report', (req, res) => {
  const endpoint = `/qa/answers/${req.body.answerId}/report`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.log('ERROR in QA - PUT: report an answer'));
});

// ----------------------------------------Ratings & Reviews Routes-----------------------------
app.get('/product/reviews', (req, res) => {
  const endpoint = `/reviews/meta?product_id=${req.query.productId}`;
  apiRequest('get', endpoint)
    .then(({ data }) => {res.status(200).send(data)})
    .catch((err) => console.log('ERRORRRRRRRRRRR in /product/reviewss GET'));
});

// get reviews
app.get('/ratingsReviews/reviews', (req, res) => {
  const endpoint = `reviews?page=1&count=1000&sort=relevant&product_id=${req.query.productId}`;
  apiRequest('get', endpoint)
    .then(({ data }) => {res.send(data)})
    .catch((err) => console.log('ERRORRRRRRRRRRR in /ratingsReviews/reviewss GET'));
});
// get meta data
app.get('/ratingsReviews/meta', (req, res) => {
  const endpoint = `reviews/meta?product_id=${req.query.productId}`;
  apiRequest('get', endpoint)
    .then(({ data }) => {res.send(data)})
    .catch((err) => console.log('ERRORRRRRRRRRRR in /RatingsReviews/reviewss GET'));
});
// handle review helpful
app.put('/ratingsReviews/helpful', (req, res) => {
  const endpoint = `reviews/${req.body.reviewId}/helpful`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.send(data))
    .catch((err) => console.log('ERROR in ratingsReviews - PUT: helpful'));
});
// handle review report
app.put('/ratingsReviews/report', (req, res) => {
  const endpoint = `reviews/${req.body.reviewId}/report`;
  apiRequest('put', endpoint)
    .then(({ data }) => res.send(data))
    .catch((err) => console.log('ERROR in ratingsReviews - PUT: report'));
});
// handle review sort
app.get('/ratingsReviews/sort', (req, res) => {
  const endpoint = `reviews?page=1&count=1000&sort=${req.query.dropDown}&product_id=${req.query.productId}`;
  apiRequest('get', endpoint)
    .then(({ data }) => {res.send(data)})
    .catch((err) => console.log('ERRORRRRRRRRRRR in /RatingsReviews/reviewss GET'));
});

app.listen(PORT, () => {
  console.log(`To get started, visit: http://localhost:${PORT}`);
});