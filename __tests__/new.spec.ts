import request from "supertest";
import app from "../app";

test('getNews', async () => {
  request(app)
    .get('/getNews')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
    });
})