import nc from 'next-connect';
import {
  getPostByUserId,
} from '../../../../lib/backend-utils';
import { onError, cors } from '../../../../lib/middleware';

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const { id } = req.query;
    const postResponse = await getPostByUserId(id);
    if (!postResponse) {
      res.status(404).json().end(`Posts with user id ${id} not found`);
    }
    else {
      res.status(200).json(Array.from(postResponse));
    }
});

export default handler;