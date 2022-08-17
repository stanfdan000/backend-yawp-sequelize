const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/models');


describe('movie routes', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    try {
      await db.genres.bulkCreate([
        {
            
          name: 'action',
          createdAt: new Date(),
          updatedAt: new Date(),
              
            
        }]);

      await db.Movie.bulkCreate([
        {
          title: 'Batman Doesn\'t Return',
          description: 'He leaves and doesn\'t come back',
          image: '',
          releaseYear: 2007,
          genre_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        
        },
     
      ]);
    } catch (e) {
      console.log(e);
    }
  });
  afterAll(async () => {
    await db.sequelize.close();
  });



  it('#GET /movies/:id should return the movie and genre with nested genres', async () => {
    const resp = await request(app).get('/api/v1/movies');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      title: 'Batman Doesn\'t Return',
      description: 'He leaves and doesn\'t come back',
      image: '',
      releaseYear: 2007,
      genre_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1,
      genre: {
        name: expect.any(String),

      }
        
        
     
    });
  });
  
 
  
});






   


