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

dbQuery = process.argv[2];

function formatDate(dateObj) {
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate = "'" + year + "-" + month + "-" + day + "'";
    return newDate;
}

knex('famous_people').where({
  first_name: dbQuery
}).orWhere({
  last_name:  dbQuery
}).select('*').asCallback(function (err, rows) {
  if (err) {
    return console.error("error running query". err);
  }
  console.log("Searching ...");
  console.log("Found " + rows.length + " person(s) by the name '" + dbQuery + "':");
  for (const row of rows) {
  const newDate = formatDate(row.birthdate);
  const output = "- " + row.id + ": " + row.first_name + " " + row.last_name + ", born " + newDate;
  console.log(output);
  }
  knex.destroy();
})