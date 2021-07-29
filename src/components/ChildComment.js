import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import PropTypes from 'prop-types';

export default function ChildComment({ child }) {
    const [author, setAuthor] = useState(undefined);

    const fetchUser = async () => {
        const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/users/${child.author_id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const tempUser = await response.json();
        setAuthor(tempUser.name);
    };

    fetchUser();
    return (
        <div>
            <Divider />
            <Typography variant="caption">
                {author}
            </Typography>
            <Typography paragraph noWrap={false}>
                {child.content}
            </Typography>
        </div>
    );
}
ChildComment.propTypes = {
    child: PropTypes.object.isRequired,
    // group: PropTypes.string.isRequired,
  };