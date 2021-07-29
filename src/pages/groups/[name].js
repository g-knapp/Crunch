import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Layout from '../../components/Layout';
import PostContainer from '../../components/PostContainer';
import Navbar from '../../components/Navbar.js';
import { PageContext } from '../_app.js';
import LandingPage from '../../components/LandingPage';

export default function Group() {
  const [session, loading] = useSession();
  const [posts, setPosts] = useState([]);
  const [homeposts, setHomePosts] = useState(posts);
  const router = useRouter();
  let content;
  const { setPage } = useContext(PageContext);
  const { page } = useContext(PageContext);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/groups/${router.query.name}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const postData = await response.json();
      setPosts(postData);
    };
    getData();

  }, [router.query.name]);

  //sorting posts by recent date
  useEffect(() => {
    const sortedPosts = posts.sort((post1, post2) => {
      if (post1.date < post2.date) {
        return 1;
      }
      if (post1.date > post2.date) {
        return -1;
      }
      //return 0;

    });

    setPosts(sortedPosts);
    const home = posts.slice(page[0], page[1]);
    setHomePosts(home);

  }, [posts, page]);

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


  const navbarButtonClicked = (button) => {
    if (button === 'home') {
      //reload postcontainer with most recent posts
      setPage([0, 4]);
    } else if (button === 'forward' && (page[0] < (posts.length - 6))) {
      setPage([page[1], page[1] + 6]);
    } else if (button === 'previous' && page[0] > 0) {
      setPage([(page[0] - 6), page[0]]);
    }
  }

  if (posts !== undefined) {
    content =
      <div>
        <PostContainer posts={homeposts} group={router.query.name} />
      </div>
  }
  else {
    content = (<></>)
  }

  return (
    <Layout>
      <div>
        <Navbar handleClick={navbarButtonClicked} />
      </div>
      {content}
    </Layout>
  );
}