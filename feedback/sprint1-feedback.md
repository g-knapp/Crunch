# Feedback for XanaduXolo

## Sprint 1

(X) Tagged commit
(-) closed user stories assigned to sprint
( ) working deployment on Heroku
(X) Travis passing
( ) personal evals completed
(X) demo

### Assessment

Checklist: BE
User stories: ME
Agility/scrum: ME
Integration: ME
Implementation: ME
Functionality: ME

### Discussion

**Checklist**: Your heroku installation is still the original template project. While you have moved your user stories to a "complete" stack, they are not, in fact, closed. I am also missing evals from Griffin, Jake, Alex, Scott, and Sabrina.

**User stories**: Your users stories are ok, but could be better. It would be good to attach sketches and CRC cards to features. It would be good to include acceptance tests, so you know when they are accomplished. Most of them lack the 'relevant' component. Some are lacking the 'so' clause altogether, others are just circular ("I want to see a list of groups so I can navigate to groups"). I will keep harping on this -- your project has some conventional expectations, but I want you to examine them with fresh eyes. Keep asking why.

**Agility/scrum**: Your process seems to have served you well. You had a little bit of a slow start, judging by commits, but then I see pretty steady work for most of the sprint. I think you could work a little more on scoring, or breaking up tasks judging by the fact that virtually everything has a 4. You should also be closing issues as you complete work.

**Integration**: I see reasonable use of PRs, with at least two people involved with each instance. I might recommend getting more pairs of eyes on the PRs. It would be good if a couple folks weighed in with 'looks good' or something before you make the merge. Contemplate as well linking pull requests to issues to automatically close them. You should also be cleaning up your branches. Unless the feature is actively being developed, delete after a successful merge.

**Implementation**: The implementation looks okay -- I can see the influence of SimplePedia writ large, but that is okay (that is what it is for). I can see that you have already started to demonstrate some of the difficulties with documentation. In `Comment`, possibly the simplest component possible, you already have a disagreement between the comments and the code. There are a couple of tests, and they look reasonable so far. Don't neglect the integration tests (testing the pages or the site as a whole, for example). You should also be carful about placeholders and big blocks of commented out code. They can make you feel more advanced than you are (I'm looking at half of the tests, all of which just say 'Hi').

**Functionality**: Functionality-wise, you have the bare bones up and running. You have posts, you have a page for submitting new posts. Other than submitting posts, it seems to work. I think it would have been good to get post submissions working, but I know we haven't talked about communicating between "pages". Styling and design are going to be important parts of future sprints. I would advise another round of design sketches, this time detailed enough to work out where buttons go (like 'Submit post'), how the sidebar works, how you will handle more than 14 posts, what a post page actually looks like (it would be nice to be able to read the memes, for example...), etc... It would be easy to just plow ahead with the server, and the infrastructure, but I don't think you want to wait too long to figure out what it will really look like or you will risk making it more difficult for it to shape up as you imagine.
