const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

//take in first_name, last_name, and birthdate in command line
//inserts person to famous_people database

const first = process.argv[2];
const last = process.argv[3];
const birth = process.argv[4];

knex.insert([
  {first_name: first,
  last_name: last,
  birthdate: birth}])
  .into('famous_people').then(function () {
    console.log("done");
  })
knex.destroy();