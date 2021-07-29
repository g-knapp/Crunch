import Layout from '../components/Layout';
import PostContainer from '../components/PostContainer';
import { useState, useEffect, useContext } from "react";
import { useSession } from 'next-auth/client';
import Navbar from '../components/Navbar.js';
import LandingPage from '../components/LandingPage';
import { PageContext } from './_app.js';
//import {useRouter} from 'next/router';
//import { userInfo } from 'os';


export default function Home() {
  const [session, loading] = useSession();
  const [posts, setPosts] = useState([]);
  //const router = useRouter();
  const [hotLink, setHotLink] = useState(['/'])
  //TODO below commented out to avoid linter errors, since these
  //have yet to be used
  //const [groups, setGroups] = useState([]);
  const { setPage } = useContext(PageContext);
  const { page } = useContext(PageContext);
  const [homeposts, setHomePosts] = useState(posts);

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

  const navbarButtonClicked = (button) => {
    if (button === 'home') {
      //reload postcontainer with most recent posts
      setPage([0, 4]);
    } else if (button === 'forward' && (page[0] < (posts.length - 9))) {
      setPage([page[1], page[1] + 9]);
    } else if (button === 'previous' && page[0] > 0) {
      setPage([(page[0] - 9), page[0]]);
    } else if (button === 'hot') {
      //router.push(hotButton());
    }
  }


  useEffect(() => {

    const getHotLink = async () => {
      //HotPosts;
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/hotposts`,
        {
          method: 'GET',
          headers: new Headers({ 'Content-type': 'application/json' }),
        }
      )
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const hotPosts = await response.json();
      let random;
      if (hotPosts.length === 0) {
        setHotLink(`${process.env.NEXT_PUBLIC_HOSTNAME}`);
      } else if (hotPosts.length < 5) {
        setHotLink(`${process.env.NEXT_PUBLIC_HOSTNAME}post/${hotPosts.length}`);
      } else {
        random = Math.floor(Math.random() * 5);
        setHotLink(`${process.env.NEXT_PUBLIC_HOSTNAME}post/${hotPosts[random].id}`);
      }
    };

    const getData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/posts`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const postData = await response.json();

      setPosts(postData);

      const groupResponse = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/groups`);

      if (!groupResponse.ok) {
        throw new Error(groupResponse.statusText);
      }

      await groupResponse.json();
      // setGroups(groupData);
    };
    getHotLink();
    getData();
  }, []);

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

  return (
    <Layout>
      <div>
        <Navbar handleClick={navbarButtonClicked} hotLink={hotLink} atHome={true} />
      </div>
      <div>
        <PostContainer posts={homeposts} group={"Home"} />
      </div>
    </Layout>

  );
}
