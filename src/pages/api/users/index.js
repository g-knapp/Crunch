import nc from 'next-connect';

import {
    addUser,
    deleteUser
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
    .use(cors)
    .post(async (req, res) => {
        //const { id } = req.query;
        const newUser = req.body;
        const response = await addUser(newUser);
        res.status(200).json(response);
    })
    .delete(async (req, res) => {
        const { id } = req.query;
        const count = await deleteUser(id);
        if (count === 0) {
            res.status(404).end(`User with id ${id} not found`);
        } else {
            res.status(200).end();
        }
    });

export default handler;