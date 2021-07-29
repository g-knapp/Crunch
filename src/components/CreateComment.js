import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CreateComment.module.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileBase64 from 'react-file-base64';
//import {useRouter} from 'next/router';

/*
CreateComment.js

The user creates a comment that will then be embedded in <Post/>

I'm thinking we won't need props, since this will already be displayed
on a post we can just pull the post id from the url

*/

// eslint-disable-next-line no-unused-vars
export default function CreateComment( { sendComment, postId } ) {
    const[text, setText] = useState('');
    const [fileData, setFileData] = useState();
    const [imgPath, setPath] = useState();

    const completeAndSend = () => {
      setText('');
      sendComment({content:text, image_path:imgPath});
    }

    const handleImage = async () => {
        //make sure we have an image file
        if (/\.(jpe?g|png)$/i.test(fileData.name)) {
          // create our payload
          const imageData = {
            name:fileData.name,
            image:fileData.base64
          }
    
          // send it to the server
          const response = await fetch('/api/image',{
            method:'POST',
            body:JSON.stringify(imageData),
            headers: new Headers({'Content-type': 'application/json'}),
          });
    
          if (response.ok){
            const data = await response.json();
            setPath(data.path);
          }
        }
      }
    // NEED TO INCLUDE: toggle for if comment is child of other comment and noting which comment is parent comment
    return( 
        <div className={ styles.container }>
            <TextField 
              id = "comment block" 
              aria-label = "text" 
              data-testid="content"
              size = "medium"  
              multiline = "true" 
              label = "Add your thoughts" 
              multiline-rows = {4} 
              value = {text} 
              onChange = {(event) => { setText(event.target.value);}}
            />
            <div>
                <FileBase64 multiple={false} onDone={setFileData} />
                <input type="button" value="Load" onClick={handleImage} />
            </div>
            <div>
                <Button
                variant = "outlined"
                data-testid="post"
                disabled={!text} 
                onClick={ () => completeAndSend() }>Post</Button>
            </div>
        </div>
    );
}

CreateComment.propTypes = {
    sendComment: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
}
