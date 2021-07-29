/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = async function (knex) {
  const contents = fs.readFileSync('./public/data/users-test-data.json');
  const data = JSON.parse(contents);

  // load sample users
  await knex('Users').del();
  await knex.batchInsert('Users', data, 100);
};