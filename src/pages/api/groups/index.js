import nc from 'next-connect';
import { getAllGroups, addGroup} from '../../../lib/backend-utils';
import { onError, cors } from '../../../lib/middleware';

const handler = nc( {onError} )
    .use(cors)
    .get(async (req, res) => {
        //res.status(200).json(Array.from(groups.values()));
        const groups = await getAllGroups();
        res.status(200).json(Array.from(groups));
    })

    .post(async (req, res) => {
        const newPost = req.body;
        const addedPost = await addGroup(newPost);
        res.status(200).json(addedPost);
        //res.statusCode(200).end();
    });
    // .post(async(req, res) => {
    //     const newPost = req.body;
    //     const addedPost = await addPost(newPost);
    //     res.status(200).json(addedPost);
    //     //res.statusCode(200).end();
    // })

export default handler;