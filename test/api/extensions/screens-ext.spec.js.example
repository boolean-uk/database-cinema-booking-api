// const supertest = require('supertest');
// const app = require('../../../src/server.js');
// const prisma = require('../../../src/utils/prisma');

// describe('Screens Endpoint', () => {
//     describe('POST /screens', () => {
//         it('will create a new screen', async () => {
//             const movie1 = await prisma.movie.create({
//                 data: { title: 'The Matrix', runtimeMins: 120 },
//             });

//             const request = {
//                 number: 10,
//                 screenings: [
//                     {
//                         movieId: movie1.id,
//                         startsAt: '2022-06-11T18:30:00.000Z',
//                     },
//                     {
//                         movieId: movie1.id,
//                         startsAt: '2022-06-11T21:30:00.000Z',
//                     },
//                 ],
//             };

//             const response = await supertest(app)
//                 .post('/screens')
//                 .send(request);

//             expect(response.status).toEqual(201);
//             expect(response.body.screen).not.toEqual(undefined);
//             expect(response.body.screen.number).toEqual(10);
//             expect(response.body.screen.screenings.length).toEqual(2);
//         });
//     });
// });
