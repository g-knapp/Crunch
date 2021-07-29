import nc from 'next-connect';
import { getSession } from 'next-auth/client';

import {
    getMunchedById,
    addMunchedById,
    getUserByEmail,
}  from '../../../../lib/backend-utils'
import { onError, cors } from '../../../../lib/middleware';

let user;
// let getData;
// const [session, loading] = useSession();

const handler = nc({ onError })
  .use(cors)
  .get(async (req, res) => {
    const session = await getSession({req});
    if (session) {
      const emailSplit = session.user.email.split('@');
      if (emailSplit[emailSplit.length - 1].toLowerCase() === 'middlebury.edu') {
          user = await getUserByEmail(session.user.email);
      }
    }
    const response = await getMunchedById(user.id);
    res.status(200).json(response);

  })
  .put(async (req, res) => {
    // getData();
    const session = await getSession({req});
    if (session) {
      const emailSplit = session.user.email.split('@');
      if (emailSplit[emailSplit.length - 1].toLowerCase() === 'middlebury.edu') {
          user = await getUserByEmail(session.user.email);
      }
    }
    const postId = req.body;
    const response = await addMunchedById(user.id, postId);
    res.status(200).json(response);
  });

export default handler;
