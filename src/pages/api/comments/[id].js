import nc from 'next-connect';

import {
  getComments,
  addComment,
  deleteComment,
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const { id } = req.query;
    const commentResponse = await getComments(id);
    res.status(200).json(commentResponse);
  })
  .post(async (req, res) => {
    //const { id } = req.query;
    const newComment = req.body;
    const comment = await addComment(newComment);
    res.status(200).json(comment);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const count = await deleteComment(id);
    if (count === 0) {
      res.status(404).end(`Comment with id ${id} not found`);
    } else {
      res.status(200).end();
    }
  });

export default handler;
