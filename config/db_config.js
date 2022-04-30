let dbOption

// dbOption = {
//   connectionLimit: 10,
//   host: "database-ece568group1-1.cftcsmfksauc.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: 'ece568group1',
//   port: "3306",
//   database: "ece568"
// }

dbOption = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: 'root',
  port: "3306",
  database: "online-store"
}

module.exports = dbOption;
