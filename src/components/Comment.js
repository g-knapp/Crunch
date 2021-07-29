//import PropTypes from 'prop-types';
//import Accordion from '@material-ui/core/Accordion';
//import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import Button from '@material-ui/core/Button';

import { useEffect, useState } from 'react';
import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChildComment from './ChildComment';
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';


const personalTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#75A3CD',
    }

  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    backgroundColor: '#75A3CD',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Comment({ comment }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [children, setChildren] = useState([]);
  const [replyText, setReply] = useState(undefined);
  const [author, setAuthor] = useState('');
  const [refetch, setRefetch] = useState(false);
  const [session] = useSession();
  const [userId, setUserId] = useState(undefined);


  const sendComment = async () => {
    //TODO for now we give these default values to prevent errors
    //commenter_id should be based somehow off of the id of the user
    //content_type should be chosen by the user, but a default assumption that is is text is probably ok
    const newComment = { "content": replyText, "author_id": Number(userId), "post_id": Number(comment.post_id), "parent_id": Number(comment.id) };
    newComment.date = new Date();
    newComment.content_type = 'text';
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/comments/${comment.post_id}`;
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

  const completeAndSend = () => {
    sendComment();
    setExpanded(true);
    setReply('');
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/users/${comment.author_id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const tempUser = await response.json();
      setAuthor(tempUser.name);
    }
    fetchUser();
    
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

    const getChildren = async () => {
      const response = await fetch(`/api/commentChildren/${comment.id}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const childrenCommentData = await response.json();
      setChildren(childrenCommentData);
    };
    getChildren();

  }, [refetch]);

  const childrenComments = children.map(kid => {
    return (<ChildComment key={kid.id} child={kid} />);
  });


let media; 
if(comment.image_path){
  media = <CardMedia
            className={classes.media}
            image={comment.image_path}
            />
} else {
  media = <></>
}

if(comment.parent_id) {
  return <></>;
}
  return (
    <ThemeProvider theme={personalTheme}>
    <Card raised={true} className={classes.root}>
      <CardHeader
        title={author}
        subheader={new Date(comment.date).toLocaleString()}
      />
      {media}
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {comment.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <TextField
          label="Reply..."
          aria-label="replyinput"
          value={replyText}
          onChange={(event) => {
            setReply(event.target.value);
          }}
          color="primary"

        />
        <Button aria-label="reply" onClick={() => {
          completeAndSend();
        }}>
          Reply
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent width="100%">
          {childrenComments}
        </CardContent>
      </Collapse>
    </Card>
    <br/>
    </ThemeProvider>
  );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.number.isRequired
};


