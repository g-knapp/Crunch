const { Model } = require('objection');

class Post extends Model {
    static get tableName() {
        return 'Posts';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'date', 'type', 'author_id', 'munches'],

            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                date: { type: 'string',
                    format: "date-time" },
                type: { type: 'string', default: 'text' },
                extract: { type: 'text' },
                author_id : { type: 'integer' },
                group: { type: 'string' },
                image_path: { type: 'string' },
                munches: { type: 'integer'},
            }
        }
    }
}

module.exports = Post;