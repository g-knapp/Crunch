import Layout from '../../components/Layout';
import PostContainer from '../../components/PostContainer';
import { useState, useEffect, useContext } from "react";
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar.js';
import LandingPage from '../../components/LandingPage';
import { PageContext } from '../_app.js';

export default function User() {
    const [session, loading] = useSession();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const { setPage } = useContext(PageContext);
    const { page } = useContext(PageContext);
    const router = useRouter();

    const navbarButtonClicked = (button) => {
        if (button === 'home') {
            //reload postcontainer with most recent posts
            setPage([0, 4]);
        } else if (button === 'forward' && (page[0] < (posts.length - 9))) {
            setPage([page[1], page[1] + 9]);
        } else if (button === 'previous' && page[0] > 0) {
            setPage([(page[0] - 9), page[0]]);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/posts/user/${router.query.id}`);

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

            if (router.query.id) {
                const userResponse = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/users/${router.query.id}`)
                if (!userResponse.ok) {
                    throw new Error(userResponse.statusText);
                }
                const userData = await userResponse.json();
                setUser(userData);
            }
            // setGroups(groupData);
        };
        getData();
    }, [router.query.id]);

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
                <Navbar handleClick={navbarButtonClicked} />
            </div>
            <div>
                {user.name && <h2>{user.name}</h2>}
                {user && <h4>{user.email}</h4>}
            </div>
            <div />
            <div>
                <PostContainer posts={posts} group={"Home"} />
            </div>
        </Layout>

    );
}
