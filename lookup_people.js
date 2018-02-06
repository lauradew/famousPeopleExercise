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
    console.log("Searching ...");
    console.log("Found " + result.rows.length + " person(s) by the name '" + dbQuery + "':");
    for (const row of result.rows) {
    const dateObj = row.birthdate;
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate = "'" + year + "-" + month + "-" + day + "'";
    const output = "- " + row.id + ": " + row.first_name + " " + row.last_name + ", born " + newDate;
    console.log(output);
    }
    client.end();
  });
});

