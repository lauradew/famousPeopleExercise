const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

dbQuery = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text OR first_name = $1::text", [dbQuery], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0]);
    client.end();
  });
});

