import nc from 'next-connect';
import { getHotPosts } from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc( {onError} )
    .use(cors)
    .get(async (req, res) => {
        const posts = await getHotPosts();
        res.status(200).json(Array.from(posts));
    });

export default handler;