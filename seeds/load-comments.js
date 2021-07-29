/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = function(knex, Promise) {
  const contents = fs.readFileSync('public/data/commentSeed.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex('Comments')
    .del()
    .then(() => knex.batchInsert('Comments', data, 100));
};
