/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function(knex, Promise) {
 return knex.schema.createTable('Comments', (table) => {
     table.increments('id').notNullable();
     table.integer('post_id').notNullable();
     table.integer('parent_id');
     table.integer('author_id').notNullable();
     table.string('date').notNullable();
     table.text('content').notNullable();
     table.string('content_type').notNullable();
     table.string('image_path');
 });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Comments');
  
};
