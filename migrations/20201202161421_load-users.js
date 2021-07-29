/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function(knex) {
  return knex.schema.createTable('Users', (table) => {
    table.increments('id').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.json('munched');
  });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Users');
};
  
