# Feedback for XanaduXolo

## Sprint 2

(X) Tagged commit
(X) closed user stories assigned to sprint
(X) working deployment on Heroku
(X) Travis passing
( ) personal evals completed
(X) demo

### Assessment

Checklist: ME
User stories: ME/BE
Agility/scrum: ME
Integration: ME
Implementation: ME
Functionality: ME

### Discussion

**Checklist**: Better than the last sprint. I am just missing feedback from Griffin and Scott.

**User stories**:
I'll admit that you user stories are a bit of a mixed bag. You are following the form, and _appear_ to be doing everything right. They are tagged and rated. They have some attached documentations (though more sketches would be good). They have acceptance tests. However... I don't know that they are actually helping you.

I think you need to break them down farther. I'm looking, for example, at #49, which includes the interface on the client, the database, the server API, and authentication. That is _a lot_ for one user story (especially one you gave a 2). More to the point, you closed the issue and most of those things were not in place. I opened a few more issues and found a similar situation. #46 even lists buttons that should be in the interface and aren't.

So, my fear is that you are maintaining the user stories to keep me happy and not actually paying attention to them as you get on with the development.

Here is some advice for your final sprint. Keep your user stories to one action (e.g., randomly browsing posts, adding a picture, making a group). A user story should be the smallest possible interaction the user could have with the site. If it is more than one action (or even not an action, like theming), make it an epic, and label it so. If you find that you have a collection of different things that you need to accomplish to satisfy a user story, break it into sub-tasks, and label those as well. It could well be that you only have a couple of user stories, but a lot of sub-tasks. That is okay, but you should aim to finish user stories by the end of a sprint.

It would be okay for "As a user, I want to be able to compose a post to share this funny meme I found." to be one story (which is satisfied by the act of creating a post), and "As a user, I would like others to see the post that I wrote because I want to share the funny I discovered" (which is satisfied by persisting posts on a server), to be separate.

**Agility/scrum**: Your process seems okay, though the pattern of commits seems lower than last time.

**Integration**: Everything seems to be working correctly here, though I see relatively few pull requests. Contemplate merging more frequently. Breaking tasks down further might help that.

**Implementation**: This is looking fine. I'm starting to see some tests in here, not just placeholders (though you still have a few of those).

**Functionality**:
The site doesn't feel more than superficially different from sprint 1. The styling is improving, but you still have some work to do. There are places where you have black text on a dark blue background, for example. The posting page has a strange line stretching across it, and the header seems a bit... stark.

My bigger concern is that it feels like your interface is still not really fleshed out... like you are waiting for features to be written to make decisions. For example, what will happen when you enable authentication? What will change? Or, I see in the code that you have a page for adding groups, but it isn't in the interface.

This is most obvious to me in the scalability question I was pushing on a bit during the demo. I think that this will look quite different when you have two hundred groups and thousands of posts. You should be planning for that. Super-size your seeding efforts (duplication is okay). Scalability issues show up in a number of small ways, like "picking a group", which currently requires a user to type in a group name.

I think you would have done well to do more "fake it til you make it". For example, you could be persisting posts on the client until the user reloads the page. That would have allowed you to examine the process of creating new posts and seeing them show up on the page. Then when the server is added, you just have one little place to change. I am worried that by kicking this down the road you are setting yourself up for a lot of work in the last sprint with surprises (which we don't want)
