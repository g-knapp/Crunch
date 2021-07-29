/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function(knex) {
    return knex.schema.createTable('Posts', (table) => {
        table.string('title').notNullable();
        table.string('date').notNullable();
        table.text('extract');
        table.integer('author_id').notNullable();
        table.increments('id').notNullable();
        table.string('group');
        table.string('image_path');
        table.string('type').notNullable();
        table.integer('munches');
    });
   };
   
   exports.down = function(knex) {
     return knex.schema.dropTableIfExists('Posts');
   };