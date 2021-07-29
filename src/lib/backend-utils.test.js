import sampleComments from '../../public/data/comment-test-data.json';
import samplePosts from '../../public/data/posts-test-data.json';
//import sampleUsers from '../../public/data/users-test-data.json';
import {
    getComments,
    addComment,
    deleteComment,
    addPost,
    getPostById,
    getPostByUserId,
    getGroupPosts,
    deletePost,
    getUserById,
    getUserByEmail,
    getMunchedById,
    addMunchedById,
    knex,
    addUser,
} from "./backend-utils";

describe("Tests of the database utility functions", () => {
    //rollback latest migration, run migration again to get clean table, reseed
    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    describe('get post by id', () => {
        test('getPostById returns the corresponding post', async () => {
            const sample = samplePosts[0];

            const post = await getPostById(1);
            expect(post.ex)
            expect(post.id).toEqual(sample.id);
            expect(post.title).toBe(sample.title);
            expect(post.extract).toBe(sample.extract);
            expect(post.author_id).toEqual(sample.author_id);
            expect(post.group).toBe(sample.group);
            expect(post.image_path).toBe(sample.image_path);
            expect(post.munches).toBe(sample.munches);
        })
    })
    describe('get munched posts by user id', () => {
        test('getMunchedByUserId returns the corresponding set of posts that have been munched', async () => {
            const munches = await getMunchedById(1);
            // const user = await getUserById(1);
            expect(munches).toEqual([]);
        })
    })
    describe('add a post to munched by user id and post id', () => {
        test('addMunchedById returns the updated user', async () => {

            const munches = await addMunchedById(1, 3);

            expect(munches).toEqual([3]);
        })
    })
    describe('get post by user id', () => {
        test('getPostByUserId returns the corresponding set of posts', async () => {
            const posts = await getPostByUserId(23);
            posts.forEach((item) => {
                expect(item.author_id).toBe(23);
            })
        })
    })

    describe('get posts by group', () => {
        test('getGroupPosts returns all the posts in a group', async () => {
            const group_posts = await getGroupPosts("Hiking Group");
            group_posts.forEach((item) => {
                expect(item.group).toBe("Hiking Group");
            })
        })

        test('getGroupPosts returns 0 posts when given nonexistant group', async () => {
            const group_posts = await getGroupPosts("zanthar");
            expect(group_posts.length).toEqual(0);
        })
    })

    describe('add post', () => {
        test('addPost returns a post with new id', async () => {
            const sample = {
                title: 'my first post',
                date: '2020-11-15T19:24:01.405Z',
                type: 'text',
                extract: 'so excited to be on crunch!',
                author_id: 1,
                munches: 0
            }

            const post = await addPost(sample);
            expect(post.id).toBeGreaterThanOrEqual(0);
            expect(post.title).toBe(sample.title);
            expect(post.date).toBe(sample.date);
            expect(post.type).toBe(sample.type);
            expect(post.extract).toBe(sample.extract);
            expect(post.author_id).toEqual(sample.author_id);
            expect(post.munches).toBe(sample.munches);
        })

        test('addPost rejects post without authorid', async () => {
            expect.assertions(1);
            const sample = {
                title: 'my first post',
                date: '2020-11-15T19:24:01.405Z',
                type: 'text',
                extract: 'so excited to be on crunch!',
            }
            try {
                await addPost(sample);
            } catch (e) {
                expect(e.toString()).toContain("Error");
            }
        })

        test('addPost should reject with bad date', async () => {
            expect.assertions(1);
            const sample = {
                title: 'my first post',
                date: '4',
                type: 'text',
                extract: 'so excited to be on crunch!',
                author_id: 1,
                munches: 0,
            }
            try {
                await addPost(sample);
            } catch (e) {
                expect(e.toString()).toContain("Error");
            }
        })
    })

    describe('delete post', () => {
        test("deletePost deletes post", async () => {
            const sample = samplePosts[0];

            const count = await deletePost(sample.id);
            expect(count).toBe(1);
            const rows = await knex('Posts').where({ id: sample.id }).select();
            expect(rows).toHaveLength(0);
        })

        test("deletePost on missing post returns 0", async () => {
            const count = await deletePost(-1);
            expect(count).toBe(0);
        })
    })

    describe('get comments', () => {
        test("getComments gets all comments for a post", async () => {
            const comments = await getComments(1);
            expect(comments).toEqual(sampleComments);
            //sampleArticles.sort((a, b) => a.title.localeCompare(b.title));
            //articles.sort((a, b) => a.title.localeCompare(b.title))

            //SORTING (date, number of child comments)
        });
    });

    describe('add comment', () => {
        test("addComment returns a comment with new id", async () => {
            //TODO figure out bug where when parent_id=null, error !!!
            const sample = {
                post_id: 1,
                parent_id: 1,
                author_id: 1,
                date: "2020-11-13T19:55:28.387Z",
                content: "Laurie Patton would love this!",
                content_type: "text",
            };

            const comment = await addComment(sample);
            expect(comment.post_id).toEqual(sample.post_id);
            expect(comment.parent_id).toEqual(sample.parent_id);
            expect(comment.author_id).toEqual(sample.author_id);
            expect(comment.date).toBe(sample.date);
            expect(comment.content).toBe(sample.content);
            expect(comment.content_type).toBe(sample.content_type);
            expect(comment.id).toBeGreaterThanOrEqual(0);
        });

        test("addComment should accept comment with parentid null", async () => {
            const sample = {
                post_id: 1,
                parent_id: null,
                author_id: 1,
                date: "2020-11-13T19:55:28.387Z",
                content: "Laurie Patton would love this!",
                content_type: "text",
            };

            const comment = await addComment(sample);
            expect(comment.post_id).toEqual(sample.post_id);
            expect(comment.parent_id).toEqual(sample.parent_id);
            expect(comment.author_id).toEqual(sample.author_id);
            expect(comment.date).toBe(sample.date);
            expect(comment.content).toBe(sample.content);
            expect(comment.content_type).toBe(sample.content_type);
            expect(comment.id).toBeGreaterThanOrEqual(0);
        })

        test("addComment should reject comment with no postid", async () => {
            expect.assertions(1);
            const sample = {
                parent_id: null,
                author_id: 1,
                date: "2020-11-13T19:55:28.387Z",
                content: "Laurie Patton would love this!",
                content_type: "text",
            };

            try {
                await addComment(sample);
            } catch (e) {
                expect(e.toString()).toContain("Error");
            }

        })

        test("addComment should have null parentid by default", async () => {
            const sample = {
                post_id: 1,
                author_id: 1,
                date: "2020-11-13T19:55:28.387Z",
                content: "Laurie Patton would love this!",
                content_type: "text",
            };
            const comment = await addComment(sample);
            expect(comment.post_id).toEqual(sample.post_id);
            expect(comment.author_id).toEqual(sample.author_id);
            expect(comment.date).toBe(sample.date);
            expect(comment.content).toBe(sample.content);
            expect(comment.content_type).toBe(sample.content_type);
            expect(comment.parent_id).toEqual(null);
        })

        test("addComment should reject comment with bad date", async () => {
            expect.assertions(1);
            const sample = {
                post_id: 1,
                parent_id: null,
                author_id: 1,
                date: "4",
                content: "Laurie Patton would love this!",
                content_type: "text",
            };

            try {
                await addComment(sample);
            } catch (e) {
                expect(e.toString()).toContain("Error");
            }
        })

    });

    describe('delete comment', () => {

        test("deleteComment deletes comment", async () => {
            const sample = sampleComments[0];

            const count = await deleteComment(sample.id);
            expect(count).toBe(1);
            const rows = await knex('Comments').where({ id: sample.id }).select();
            expect(rows).toHaveLength(0);
        });

        test("deleteComment on missing comment returns 0", async () => {
            const count = await deleteComment(-1);
            expect(count).toBe(0);
        });

    });

    describe('addUser', () => {
        test('addUser returns a new user', async () => {
            const user = await addUser({ name: '', email: 'test@middlebury.edu' });
            expect(user.email).toBe('test@middlebury.edu');
            expect(user.id).toEqual(6);
        })
    })

    describe('getUserById', () => {
        test("getUserById returns the corresponding user", async () => {
            const user = await getUserById(1);
            expect(user.email).toBe('candrews@middlebury.edu');
            expect(user.id).toEqual(1);
        })
    })

    describe('getUserByEmail', () => {

        test("getUserByEmail finds the corresponding id", async () => {
            const user = await getUserByEmail('slinux@middlebury.edu');
            expect(user.email).toBe('slinux@middlebury.edu');
            expect(user.id).toEqual(2);
        })

        test('getUserByEmail creates new account', async () => {
            const user = await getUserByEmail('test@middlebury.edu');
            expect(user.email).toBe('test@middlebury.edu');
        })

    })

});
