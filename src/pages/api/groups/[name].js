import nc from 'next-connect';
import {
    getGroupPosts,
    addGroup,
} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const { name } = req.query;
    const postResponse = await getGroupPosts(name);
    res.status(200).json(postResponse);
  })

  .post(async (req, res) => {
  const newPost = req.body;
  const addedPost = await addGroup(newPost);
  res.status(200).json(addedPost);
  //res.statusCode(200).end();
  });

export default handler;