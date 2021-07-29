import knexConfig from '../../knexfile';
import knexInitializer from 'knex';
import { Model } from 'objection';
import Comments from '../../models/Comments';
import Post from '../../models/Post';
import Groups from '../../models/Groups';
import User from '../../models/User';


export const knex = knexInitializer(
    knexConfig[process.env.NODE_ENV || 'development']
);

// Bind all Models to a knex instance.
Model.knex(knex);

/*
 * Find all comments for the given post id
 *
 * @param {number} postid
 * returns list of comments
 */
export async function getComments(postid) {
    const comments = await Comments.query().where(
        'post_id', postid);
    return comments;
}

export async function getChildComments(parentid) {
    const children = await Comments.query().where('parent_id', parentid);
    return children;
}

export async function getAllPosts() {
    const posts = await Post.query();
    return posts;
}
/*
 * Add a comment to the data storage
 *
 * @param {number} id
 * returns the comment
 */
export async function addComment(comment) {
    const newComment = await Comments.query().insertAndFetch(comment);
    return newComment;
}

/*
 * Remove the comment associated with the provided id from the data storage
 *
 * @param {number} id
 * returns the number of comments deleted
 */
export async function deleteComment(commentid) {
    const deleted = await Comments.query().deleteById(commentid);
    return deleted;
}

/*
 * Find post with given post id
 *
 * @param {number} postid
 * returns one post
 */
export async function getPostById(postid) {
		const count = await Post.query().count();
		if ((count[0]['count(*)']) < postid) {
			const post = await Post.query().findById(1);
			return post;
		}
		else if (postid < 1) {
			const post = await Post.query().findById(count[0]['count(*)']);
			return post;
		}
		else {
			const post = await Post.query().findById(postid);
			return post;
		}
}

export async function getPostByUserId(userid) {
    const posts = await Post.query().where('author_id', userid);
    return posts;
}

/*
 * Find post with given group id
 *
 * @param {number} groupName
 * returns list of posts
 */
export async function getGroupPosts(groupName) {
    const posts = await Post.query().where('group', groupName);
    return posts;
}

/*
 * Add a post to the data storage
 *
 * @param {number} id
 * returns the post
 */
export async function addPost(post) {
    const newPost = await Post.query().insertAndFetch(post);
    return newPost;
}

/*
 * Remove the comment associated with the provided id from the data storage
 *
 * @param {number} id
 * returns the number of posts deleted
 */
export async function deletePost(postid) {
    const deleted = await Post.query().deleteById(postid);
    return deleted;
}

/*
* Add a Group to the collection of groups
*
*
*
*/

export async function addGroup(group) {
    const newGroup = await Groups.query().insert(group);
    return newGroup;
}

/*
 * Get all groups
 */
export async function getAllGroups() {
    const groups = await Groups.query();
    return groups;
}

 
/*
 * Get all posts a user has munched
 *
 * @param {number} userId
 * returns an array of munched post Ids
 */
export async function getMunchedById(userId) {
    // console.log(userId);
    const user = await User.query().findById(userId);
    if(!user.munched){
        user.munched = JSON.stringify([]);
    }
    // console.log(user)
    //console.log(user);
    //return JSON.parse(user.munched);
    return JSON.parse(user.munched);
}
/*
 * Add a new munched post to munched posts
 *
 * @param {number} postId
 * @param {number} userId
 * returns the updated user.munched
 */

export async function addMunchedById(userId, postId) {
    // if (userId === undefined) {
    //     return(JSON.stringify([]));
    // }
    const user = await User.query().findById(userId);
    // console.log(user);
    // console.log("what it should be");
    // console.log(JSON.parse(JSON.stringify([0])));
    let updatedMunch;
    if(!user.munched){
        user.munched = JSON.stringify([postId]);
        updatedMunch = user.munched;
    }
    else{
        const munched = JSON.parse(user.munched);
        munched.push(postId);
        updatedMunch = JSON.stringify(munched);
        user.munched = updatedMunch;
    }
    //console.log("before" + user.munched)
    
    //console.log("after" + munched);
    //const art = Article.query().patch(article).findById(article.id);
    await User.query().patch(user).findById(userId);
    return JSON.parse(updatedMunch);
    
}
/*
 * Find post with given post id
 *
 * @param {number} postid
 * returns one post
 */
export async function getUserById(userId) {
    const user = await User.query().findById(userId);
    return user;
}

export async function getUserByEmail(userEmail) {
    const user = await User.query().where('email', userEmail).then((rows) => {
        if (rows.length === 0) {
            return User.query().insertAndFetch({name: userEmail.split('@')[0], email: userEmail})
        } else {
            return User.query().where('email', userEmail);
        }
    });
    if (Array.isArray(user)) {
        return user[0];
    } else {
        return user;
    }
}

/*
 * Add a post to the data storage
 *
 * @param {number} id
 * returns the post
 */
export async function addUser(user) {
    const newUser = await User.query().insertAndFetch(user);
    return newUser;
}

/*
 * Remove the comment associated with the provided id from the data storage
 *
 * @param {number} id
 * returns the number of posts deleted
 */
export async function deleteUser(userId) {
    // TODO: delete posts and comments of deleted user
    const deletedUser = await User.query().deleteById(userId);
    return deletedUser;
}


export async function getHotPosts() {
    const orderedPosts = await Post.query().orderBy('munches');
    return orderedPosts;
}
