import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Layout from '../../components/Layout';
import { Grid } from '@material-ui/core';
//import CreateComment from '../../components/CreateComment.js';
//import Comment from '../../components/Comment.js';
import styles from '../../styles/post-detailview.module.css';
import Navbar from '../../components/Navbar.js';
import CommentContainer from '../../components/CommentContainer';
import LandingPage from '../../components/LandingPage';
import IconButton from '@material-ui/core/IconButton';
import Munch from '@material-ui/icons/Fastfood';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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


export default function Post() {
    const [session, loading] = useSession();
    const [post, setPost] = useState();
    //const [setComments] = useState([]);
    const [postUser, setPostUser] = useState();
    const [ableToMunch, setAbleToMunch] = useState();
    const [munchArray, setMunchArray] = useState([]);
    const router = useRouter();

    //This snippet makes sure that there isn't an error on reloading the page
    //or directly accessing it, since otherwise it will first try to load post/undefined
    const { query = {} } = router || {};
    const { id = 0 } = query || {};

    useEffect(() => {
          const findIfMunched = async () => {
            //if changed to postId this would be postId
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/users/munched`, {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json' }),
    
            });
            if (!response.ok){
                throw new Error(response.statusText);
            } 
            const user = await response.json();
            const munchedArray = user;
            setMunchArray(Array.from(munchedArray))
        };
        findIfMunched();
        
      }, [])
    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/posts/${router.query.id}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const postData = await response.json();

								if (postData.id !== router.query.id) {
									router.push(`/post/${postData.id}`);
								}
								

                setPost(postData);
            };

            fetchPost();
/*
            const fetchComments = async () => {
                const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/comments/${router.query.id}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const commentData = await response.json();
                setComments(commentData);
            }

            fetchComments();
            */
            //if(post !== undefined) {
            //}
        }

    }, [router.query.id]);

    // useEffect(() => {
    //     const findIfMunched = async () => {
    //         //if changed to postId this would be postId
    //         console.log("username" + userId);
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/users/munched/${userId}`, {
    //             method: 'GET',
    //             headers: new Headers({ 'Content-type': 'application/json' }),
    
    //         });
    //         if (!response.ok){
    //             throw new Error(response.statusText);
    //         } 
    //         const user = await response.json();
    //         const munchedArray = user;
    //         //console.log("munched" + munchedArray)
    //         setMunchArray(Array.from(munchedArray))
    //     };
    //     findIfMunched();
    // }, [])
    
    useEffect(() => {
        if (post !== undefined){
            // console.log(post.id)
        
            if(munchArray===[]) {
                setAbleToMunch(true);
            }
            else if(munchArray.includes(post.id)){
                setAbleToMunch(false);
            }
            else {
                setAbleToMunch(true);
            }
            // setAbleToMunch(!(munchArray===[]));
            // console.log(munchArray)
        }
    }, [post, munchArray])

    if (loading) {
        return null;
    } else if ((!loading && !session) || !session.user.email) {
        return (
            <LandingPage />
        )
    } else if (session.user.email) {
        const emailSplit = session.user.email.split('@');
        if (emailSplit[emailSplit.length - 1].toLowerCase() !== 'middlebury.edu') {
            return (
                <LandingPage />
            )
        }
    }
/*
    const sendComment = async (comment) => {
        //TODO for now we give these default values to prevent errors
        //commenter_id should be based somehow off of the id of the user
        //content_type should be chosen by the user, but a default assumption that is is text is probably ok
        const newComment = { "content": comment, "author_id": Number(comment.author_id), "post_id": Number(router.query.id) };
        newComment.date = new Date();
        newComment.content_type = 'text';
        const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/comments/${router.query.id}`;
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
        const newCommentResponse = await response.json();

        const newCommentData = comments.concat(newCommentResponse);
        setComments(newCommentData);
    };
    */

    const munched = async () => {
        //console.log(post.munches);
        const newPost = { ...post, munches: post.munches + 1 };

        const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/posts/${router.query.id}`;
        const response = await fetch(url,
            {
                method: 'PUT',
                //body: JSON.stringify({post}),
                body: JSON.stringify(newPost),
                headers: new Headers({ 'Content-type': 'application/json' }),
            }
        )
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //call the put function for adding post to munched
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/users/munched`,
            {
              method: 'PUT',
              body: JSON.stringify(post.id),
              headers: new Headers({ 'Content-type': 'application/json' }),
            }
          )
          if (!response2.ok) {
              throw new Error(response2.statusText);
          }
          const munchedArray = await response2.json();
        //   console.log(munchedArray);
        //   console.log(ableToMunch);
          setMunchArray(Array.from(munchedArray));

        //console.log(response);
        //console.log(post.munches);
        //const newestPost = await response.json();
    };

    const fetchUser = async () => {
        if (post !== undefined) {
            const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/users/${post.author_id}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const tempUser = await response.json();

            setPostUser(tempUser.name);
            //return tempUser;
        }
    };
    fetchUser();

    const stylesAuthor = {
        color: 'grey',
        fontWeight: 'bold'
    };


    let content;
    if (post !== undefined) {
        content = (
            <ThemeProvider theme={personalTheme}>
            <Grid container spacing={3}>
                <Grid item xs={6}>

                    <Grid item xs={12}>
                        <h3>{post.title}</h3>
                    </Grid>

                    <Grid item xs={12}>
                        <a target={"_blank"} rel={'noreferrer'} href={`${post.image_path}`}>
                            <img className={styles.img} src={`${post.image_path}`} alt={post.extract} />
                        </a>

                        <p style={stylesAuthor}> {postUser} </p>
                        <p className={styles.text}>{post.extract}</p>
                        <IconButton onClick={() => { munched() } } disabled = {!ableToMunch} disableFocusRipple = {!ableToMunch} disableRipple = {!ableToMunch}>
                        <Munch className ={ableToMunch? styles.icon : styles.iconDisabled}/>
                        </IconButton>
                    </Grid >

                    <Grid item xs={12} >
                        <div className={styles.date}>
                            <p>{new Date(post.date).toLocaleString()}</p>
                        </div>
                    </Grid>

                </Grid >

                <Grid item xs={4}>
                    <CommentContainer post_id={router.query.id} />
                </Grid>

            </Grid >
            </ThemeProvider>
        );
    } else {
        content = (<p>Loading...</p>);
    }

    const navbarButtonClicked = (button) => {
        if (button === 'home') {
            router.push(`/`);
        } else if (button === 'forward') {
            router.push(`/post/${post.id + 1}`);

        } else if (button === 'previous') {
            router.push(`/post/${post.id - 1}`);
        }
    }

    return (
        <Layout>
            <Navbar handleClick={navbarButtonClicked} />
            {content}
        </Layout>
    )
}
