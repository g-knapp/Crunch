const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'Users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'munched'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                munched: { type: 'json' , default: JSON.stringify([0])} //initialize arrays with value of zero
            }
        }
    }
}

module.exports = User;