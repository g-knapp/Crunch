import nc from 'next-connect';

import {
  getChildComments,
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const { id } = req.query;
    const commentResponse = await getChildComments(id);
    res.status(200).json(commentResponse);
  });

export default handler;