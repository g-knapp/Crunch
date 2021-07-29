import Head from 'next/head';
import { useSession } from 'next-auth/client';
import { useState, useEffect } from "react";
// import data from '../../public/data/posts.json';
import styles from '../styles/Home.module.css';
import PostEditor from '../components/PostEditor.js';
import { Grid } from '@material-ui/core'
import Sidebar from '../components/Sidebar.js';
import Navbar from '../components/Navbar.js';
import LandingPage from '../components/LandingPage';
import {useRouter} from 'next/router';
import { PageContext } from './_app';
import { useContext } from 'react';

export default function Home() {
  const [session, loading] = useSession();
  const [userId, setUserId] = useState();
  const { groups } = useContext(PageContext);
  //const [posts, setPosts] = useState(data);
  const router = useRouter();

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
  })

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

  const submitPost = async (post) => {
    //TODO make sure these aren't hardcoded
    post.author_id = userId;
    post.munches = 0;
    post.type = 'text';
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/posts`;
    const response = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({ 'Content-type': 'application/json' }),
      }
    )

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //const newPost = await response.json();

    //setPosts([ ...posts, post]);
  }

  const navbarButtonClicked = (button) => {
    if (button === 'home') {
        router.push(`/`);
    } else if (button === 'forward' ){
        router.push(`/`);
    } else if (button === 'previous') {
        router.push(`/`);
    }
  }
  
  return (
    <div className={styles.container}>
        <Head>
            <title>Crunch</title>
            <link rel="icon" href="/CrunchIcon.ico" />
        </Head>

        <main>
            <h1 className="title">Crunch</h1>
            <Grid container>
                <Grid item xs={2}>
                    <div className = {styles.sidebar}>
                      <Sidebar groupings={groups}/>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className = {styles.content}>
                      <PostEditor complete={(post) => submitPost(post)} />
                      <Navbar handleClick = {navbarButtonClicked}/>
                    </div>
                </Grid>
            </Grid>
        </main>
        <footer>A CS 312 Project</footer>
  </div>
);
}
