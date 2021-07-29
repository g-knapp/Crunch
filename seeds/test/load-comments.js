/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = async function(knex) {
  const contents = fs.readFileSync('./public/data/comment-test-data.json');
  const data = JSON.parse(contents);

  // load sample comments
  await knex('Comments').del();
  await knex.batchInsert('Comments', data, 100);
};