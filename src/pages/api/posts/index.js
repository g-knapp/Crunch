import nc from 'next-connect';
import { getAllPosts,
    addPost
 } from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc( {onError} )
    .use(cors)
    .get(async (req, res) => {
        //res.status(200).json(Array.from(posts.values()));
        const posts = await getAllPosts();
        res.status(200).json(Array.from(posts));
    })
    .post(async(req, res) => {
        const newPost = req.body;
        const addedPost = await addPost(newPost);
        res.status(200).json(addedPost);
        //res.statusCode(200).end();
    }
    
);

export default handler;