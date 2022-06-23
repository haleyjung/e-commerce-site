/**
 * Integration Test
 */
const path = require('path');
const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = 'http://localhost:3000';

describe('Get Reviews', () => {
  it('Should return valid values', () =>
    frisby
      .get(path.join(baseUrl, '/reviews?product_id=37311'))
      .expect('status', 200)
      .expect(
        'bodyContains',
        'review_id',
        'rating',
        'summary',
        'recommend',
        'response',
        'body',
        'date',
        'reviewer_name',
        'reported',
        'helpfulness',
        'photos',
      ));

  it('Should return error with extra column', () =>
    frisby
      .get(path.join(baseUrl, '/reviews?product_id=37311'))
      .expect('status', 200)
      .expect(
        'bodyContains',
        'id',
        'review_id',
        'rating',
        'summary',
        'recommend',
        'response',
        'body',
        'date',
        'reviewer_name',
        'reported',
        'helpfulness',
        'photos',
      ));
});

describe('Get Reviews Metadata', () => {
  it('Should return valid data types', () =>
    frisby
      .get(path.join(baseUrl, '/reviews/meta?product_id=37311'))
      .expect('status', 200)
      .expect('jsonTypes', {
        ratings: {
          1: Joi.number(),
          2: Joi.number(),
          3: Joi.number(),
          4: Joi.number(),
          5: Joi.number(),
        },
        recommended: {
          false: Joi.number(),
          true: Joi.number(),
        },
        characteristics: {
          Quality: {
            id: Joi.number(),
            value: Joi.number(),
          },
          Comfort: {
            id: Joi.number(),
            value: Joi.number(),
          },
          Length: {
            id: Joi.number(),
            value: Joi.number(),
          },
          Fit: {
            id: Joi.number(),
            value: Joi.number(),
          },
        },
      }));

  it('Should return error with wrong data type', () =>
    frisby
      .get(path.join(baseUrl, '/reviews/meta?product_id=37311'))
      .expect('status', 200)
      .expectNot('jsonTypes', {
        recommended: {
          false: Joi.string(),
          true: Joi.string(),
        },
      }));
});

describe('Mark Helpful and Mark Reported', () => {
  it('Should return status 200 when marked helpful', () =>
    frisby.put(path.join(baseUrl, '/reviews/1/helpful')).expect('status', 200));
  it('Should return status 200 when marked reported', () =>
    frisby.put(path.join(baseUrl, '/reviews/1/report')).expect('status', 200));
});

describe('Post reviews', () => {
  it('Should return status 201 when successful posted a review', () =>
    frisby
      .post(path.join(baseUrl, '/reviews'), {
        body: {
          product_id: 37315,
          rating: 5,
          summary: 'Unit Test',
          body: 'Unit Test',
          recommend: true,
          name: 'Testy',
          email: 'test@email.com',
          photos: ['url', 'url'],
          characteristics: {
            125044: 5,
            125045: 4,
            125046: 3,
            125047: 2,
          },
        },
      })
      .expect('status', 201));
});
