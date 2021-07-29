const { Model } = require('objection');

class Comments extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Comments';
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id', 'author_id'],

      properties: {
        id: { type: 'integer' },
        post_id: { type: 'integer' },
        parent_id: { type: ['integer', 'null'] },
        author_id: { type: 'integer' },
        date: { type: 'string',
          format: "date-time" },
        content: { type: 'text' },
        content_type: { type: 'string' },
        image_path: { type: 'string' },
      },
    };
  }
}

module.exports = Comments;