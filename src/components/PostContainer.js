/*
  PostContainer.js
  Displays an array of posts
  Props: full post list,
*/

// import PostSnippet from './PostSnippet.js';
import PropTypes from 'prop-types';
import styles from '../styles/PostContainer.module.css';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
//import Container from '@material-ui/core/Container';
// import Grid from '@'

import Link from 'next/link';


const useStyles = makeStyles(() => {
  {
    'flex'
    'wrap'
    'space-between'
    'hidden'
  }
});

//maybe currentGroup as a callback prop
// add {selectPost} as a prop
export default function PostContainer({ posts }) {
  
  // assign each post to an image size (currently based on how many comments)
  const newArray = posts.map((post) => {
    
    const newPost = {...post, imagesize: 0};
    return (newPost)
  });

  //find max number of munches for image sizing
  const munchesOnly = newArray.map((post) =>{
    return (post.munches)
  });
  const maxMunches = Math.max(...munchesOnly);

  const snippetArray = newArray.map((post) => {
    //find the breakpoints for 5 different image sizes
    const breakPoints = Math.floor(maxMunches/5);
    if (post.munches >= 0 && post.munches < breakPoints){
      post.imagesize = 3;
    }
    else if(post.munches >= breakPoints && post.munches < 2*breakPoints){
      post.imagesize = 4;
    }
    else if(post.munches >= 2*breakPoints && post.munches < 3*breakPoints){
      post.imagesize = 5;
    }
    else if(post.munches >= 3*breakPoints && post.munches < 4*breakPoints){
      post.imagesize = 6;
    }
    else{
      post.imagesize = 7;
    }
    
    return (
        <Link href={`/post/${post.id}`} key={post.image_path}><a>
          <img alt={post.title} src={`${post.image_path}`} height={`${50*post.imagesize}`} width={`${50*post.imagesize}`} className={styles.photo} data-testid="Photo"/>
        </a></Link>
    );
  });
  const classes = useStyles();
  //const post = posts[0];
  return (
    <div className={classes.root}>
      {/* <Container maxWidth="md" > */}
        <p />
        <GridList spacing={20} className={styles.grid_container} >
          {snippetArray}
        </GridList>

      {/* </Container> */}
    </div>
  )

}
PostContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  // group: PropTypes.string.isRequired,
};