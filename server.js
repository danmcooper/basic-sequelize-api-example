const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');


const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");

const apiPost = require("./api/post");
const apiAuthor = require("./api/author");



const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
});

const authorModel = require("./models/author")(database, Sequelize)
const postModel = require("./models/post")(database, Sequelize);

// database
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

apiPost(app, postModel);
apiAuthor(app, authorModel);

// Create database and listen
const port = process.env.SERVER_PORT || 3001;

database.sync({force: true}).then(() => {
  // populate author table with dummy data
  authorModel.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  );
  // populate post table with dummy data
  postModel.bulkCreate(
    times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 10)
    }))
  );
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});


