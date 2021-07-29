/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = function(knex, Promise) {
  const contents = fs.readFileSync('public/data/users.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(() => knex.batchInsert('Users', data, 100));
};