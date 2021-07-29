import nc from 'next-connect';

import {
    getUserByEmail,
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
    .use(cors)
    .get(async (req, res) => {
        const { email } = req.body;
        const response = await getUserByEmail(email);
        res.status(200).json(response);
    });

export default handler;
