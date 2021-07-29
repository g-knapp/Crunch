/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = function(knex, Promise) {
  const contents = fs.readFileSync('public/data/posts.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex('Posts')
    .del()
    .then(() => knex.batchInsert('Posts', data, 100));
};
