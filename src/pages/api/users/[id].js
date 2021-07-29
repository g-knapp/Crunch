import nc from 'next-connect';

import {
  getUserById
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const { id } = req.query;
    const response = await getUserById(id);
    res.status(200).json(response);
  });

export default handler;
