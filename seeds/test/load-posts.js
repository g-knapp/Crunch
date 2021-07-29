/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = async function (knex) {
  const contents = fs.readFileSync('./public/data/posts-test2.json');
  const data = JSON.parse(contents);

  // load sample posts
  await knex('Posts').del();
  await knex.batchInsert('Posts', data, 100);
};