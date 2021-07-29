/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function(knex) {
  return knex.schema.createTable('Groups', (table) => {
    table.string('date').notNullable();
    table.string('name').notNullable();
    table.text('purpose').notNullable();
    table.integer('owner').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Groups');
};
