const { Model } = require('objection');

class Groups extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Groups';
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['owner', 'name', 'date'],

      properties: {
        name: { type: 'string' },
        owner: { type: 'integer' },
        purpose: { type: 'text' },
        date: { type: 'string',
          format: "date-time" },
      },
    };
  }
}

module.exports = Groups;