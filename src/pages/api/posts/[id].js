import nc from 'next-connect';
import {
  getPostById,
  addPost,
  deletePost
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const { id } = req.query;
    const postResponse = await getPostById(id);
    if (!postResponse) {
      res.status(404).json().end(`Post with id ${id} not found`);
    }
    else {
      res.status(200).json(postResponse);
    }
  })

  .post(async (req, res) => {
    const newPost = req.body;
    const addedPost = await addPost(newPost);
    res.status(200).json(addedPost);
    //res.statusCode(200).end();
  })

  .put(async(req, res) => {
    const { id } = req.query;
    const newPost = req.body;
    await deletePost(id);
    const count = await addPost(newPost);
    if (count === 0) {
      res.status(404).end(`Post with id ${id} not found`);
    } else {
      res.status(200).end();
    }
  });

export default handler;
