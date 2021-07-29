import { useEffect, useState } from 'react';
import CreateComment from './CreateComment.js';
//import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import Comment from './Comment.js';
import styler from '../styles/CommentContainer.module.css';
import { useSession } from 'next-auth/client';


export default function CommentContainer({ post_id }) {
    const router = useRouter();
    const [parentComments, setParentComments] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [userId, setUserId] = useState(undefined);
    const [session] = useSession();

    useEffect(() => {
        if (session) {
            const emailSplit = session.user.email.split('@');
            if (emailSplit[emailSplit.length - 1].toLowerCase() === 'middlebury.edu') {
              const getData = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/users/email/${session.user.email}`);
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                const userData = await response.json();
                setUserId(userData.id);
              }
              getData();
            }
          }
        const getParentComments = async () => {
            const response = await fetch(`/api/comments/${post_id}`);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const parentCommentData = await response.json();
            setParentComments(parentCommentData);
        };
        getParentComments();
    }, [refetch,router.query.id]);

    const sendComment = async (comment) => {
        //TODO for now we give these default values to prevent errors
        //commenter_id should be based somehow off of the id of the user
        //content_type should be chosen by the user, but a default assumption that is is text is probably ok
        const newComment = {...comment};
        newComment.date = new Date();
        newComment.content_type = 'text';
        newComment.author_id = Number(userId);
        newComment.post_id = Number(router.query.id)
        const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/comments/${post_id}`;
        const response = await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: new Headers({ 'Content-type': 'application/json' }),
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        setRefetch(!refetch);

    };

    const commentcomps = parentComments.map(e => {
        return (<Comment comment={e} key={e.id} />);
    });

    const content = (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <CreateComment sendComment={sendComment} />
                </Grid>
            </Grid>
            <br/>
            <div className={styler.div}>
            {commentcomps}
            </div>
        </div>
    );

    return content;
}
