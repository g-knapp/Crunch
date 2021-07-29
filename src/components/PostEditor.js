/*
 * PostEditor.js
 *
 * PostEditor is a page for editing/adding post to the website.
 *
 * props:
 *	post is an optional object.
 */

import PropTypes from 'prop-types';

import FileBase64 from 'react-file-base64';

// import saveImageFile from './saveImageFile';

import { useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styler from '../styles/editor.module.css';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { PageContext } from '../pages/_app';
import { useContext } from 'react';

const personalTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#ffffff',
    },
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 500,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function PostEditor({ post, complete }) {
  const classes = useStyles();
  const { groups } = useContext(PageContext);
  const [newBody, setBody] = useState(post ? post.extract : '');
  const [newTitle, setTitle] = useState(post ? post.title : '');
  const [fileData, setFileData] = useState();
  const [newImage, setImage] = useState(post ? post.image_path : '');
  const [imgPath, setPath] = useState();

  const handleImage = async () => {
    //make sure we have an image file
    if (/\.(jpe?g|png)$/i.test(fileData.name)) {
      // create our payload
      const imageData = {
        name: fileData.name,
        image: fileData.base64
      }

      // send it to the server
      const response = await fetch('/api/image', {
        method: 'POST',
        body: JSON.stringify(imageData),
        headers: new Headers({ 'Content-type': 'application/json' }),
      });

      if (response.ok) {
        const data = await response.json();
        setImage(data.img);
        setPath(data.path);
      }
    }
  }

  // Temporary state. GroupSelector should be its own component that exists above the PostEditor in the submit page
  const [newGroup, setGroup] = useState(post ? post.group : '');


  const checkPost = function () {
    const currentTime = new Date().toISOString();

    //TODO add values for author_id and type fields (corresponds to hardcoding in submit.js)
    if (post) {
      complete({ ...post, group: newGroup, title: newTitle, extract: newBody, date: currentTime });
    }
    else {
      // const imgName = `${Date.now()}`;
      // saveImageFile(imgName, newImage);
      complete({ group: newGroup, image_path: imgPath, title: newTitle, extract: newBody, date: currentTime });
    }

    // Post should return the title, the content, and the timestamp
    // content may be of type video, text, or picture
    // each must be handled accordingly
  }
  let groupPath;
  if (newGroup) {
    groupPath = `${process.env.NEXT_PUBLIC_HOSTNAME}groups/${newGroup}`
  } else {
    groupPath = `${process.env.NEXT_PUBLIC_HOSTNAME}`;
  }

  const handleGroup = (event) => {
    setGroup(event.target.value);
  };

  return (
    <div>
      <div className={styler.container}>
        <ThemeProvider theme={personalTheme}>
          <TextField
            className={classes.root}
            select
            id="Groups"
            label="Choose a Group"
            value={newGroup}
            onChange={handleGroup}
          >
            {groups.map((group) => <MenuItem key={group.name} value={group.name}>{group.name}</MenuItem>)}
          </TextField>
          <br />
          <TextField
            className={classes.root}
            id="Title"
            label="Give a Title"
            aria-label="title"
            value={newTitle}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            color="primary"
            width="25px"
          />
          <br />
          <TextField
            className={classes.root}
            id="Text"
            label="Input Text"
            aria-label="text"
            value={newBody}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            color="primary"
            multiline={true}
            fullWidth={true}

          />
          <br />
          {/* <TextField
          className = {classes.root}
          id="Image"
          label="Link to Image"
          aria-label="image"
          value={imgPath}
          onChange={(event) => {
            setImage(event.target.value);
          }}
          color = "primary"
        /> */}
          <FileBase64 multiple={false} onDone={setFileData} />
          <input type="button" value="Load" onClick={handleImage} data-testid="Load" />
          <br />
        </ThemeProvider>
      </div>
      <br />
      <Button
        data-testid="Submit"
        variant="contained"
        onClick={() => checkPost()} disabled={!(newBody && newTitle && newImage)}
        href={groupPath}
      >
        Submit Post
    </Button>

      <br />
      <h2>Preview</h2>
      <h2>{newTitle}</h2>
      {newImage && <img src={newImage} />}
      <p>{newBody}</p>
    </div>
  );
}
/*
 * Post fields:
 * title
 * content type
 * content (link if img)
 * timestamp
 * OP
 */

PostEditor.propTypes = {
  post: PropTypes.object,
  complete: PropTypes.func.isRequired
};
