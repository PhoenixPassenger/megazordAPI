module.exports = {
  "type" : "postgres",
  "host" : "ec2-52-6-143-153.compute-1.amazonaws.com",
  "port" : 5432,
  "username" : "ocwdaddoqslscc",
  "password" : "47c982aeb01c4be9810b1804c26ed8fd679a82cbb92072deab533fa32227e6ab",
  "database" : "dcupemtc0s9tl8",
  "extra": {
    "ssl": true
    },
  "entities": [
    "./dist/models/*.js"
  ],
  "migrations" : [
    "./dist/database/migrations/*.js"
  ],
  "cli":{
    "migrationsDir" : "./src/database/migrations"
}
}
