/* tests to make sure the new comment is added correctly to the post */
import { render, screen, fireEvent } from "@testing-library/react";
import CreateComment from "./CreateComment";

describe('Comment object is created', () => {
    let group, post, comment;
    const handler = jest.fn();

    beforeEach(() => {
        group = {
          name: "TestGroup",
          purpose: "Group for Testing",
          dateCreated: new Date("2020-06-10T14:54:40Z").toISOString(),
        };

        post = {
            title: "this is the heading of the test post",
            extract: "caption of our test post: contains post used for testing",
            image_path: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F1645150%2Fimages%2Fo-RICK-ASTLEY-NEVER-GONNA-WAKE-UP-facebook.jpg&f=1&nofb=1",
            date: new Date(),
            group: group,
            id: 1
        };

        comment = {
            id: 1,
            post_id: 1,
            content: "this is a test comment"
        };
    
        handler.mockReset();
      });

      test("Post disabled if content is not filled in", () => {
        render(
            <CreateComment sendComment={handler} postId={post.id} />
        );
        const postButton = screen.getByTestId("post");
        expect(postButton).toHaveAttribute('disabled');
      
      });

    test('new Comment formed on post', () => {
        render(<CreateComment sendComment={handler} postId={post.id} />);
        const contentInput = screen.getByTestId("content").querySelector('textarea');
        fireEvent.change(contentInput, { target: { value: comment.content } });


        const postButton = screen.getByTestId("post");
        fireEvent.click(postButton);

        expect(handler).toHaveBeenCalled();
        
        // const newComment = handler.mock.calls[0][0]; // value the handler was called with

        // expect(newComment.content).toEqual(comment.content);
    });
});