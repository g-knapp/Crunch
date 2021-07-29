/* tests to make sure that the comment is visible */
import Comment from './Comment';
import { render } from '@testing-library/react';
//import comments from "../../public/data/comment-test-data.json";

describe('Sidebar tests', () => {
    //let selectFunction;
    let commentary;
  
    beforeEach(() => {
        commentary = {
        "post_id": 1,
        "parent_id": 1,
        "author_id": 2,
        "id": 2,
        "date": "2020-11-13T19:16:13.989Z",
        "content": "I disagre strongly, but respectfully",
        "content_type": "text"
    };
      //selectFunction = jest.fn();
      //render(<Comment comment={commentary} user={2}/>);
    });

    test.skip('Fetches and Includes Comment ', async () => {
        const { getByText } = render(<Comment comment={commentary.content} user={commentary.author_id}/>);
        expect(getByText(commentary.content)).toBeInTheDocument();
        //expect(getByText(commentary.content)).toBeVisible();
    });

    test.skip('Fetches and Includes Author ', async () => {
        const { getByText } = render(<Comment comment={commentary.content} user={commentary.author_id}/>);
        expect(getByText("Chuck Norris")).toBeInTheDocument();
        //expect(getByText(commentary.content)).toBeVisible();
    });

});