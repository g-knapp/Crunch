import { render, screen, fireEvent } from "@testing-library/react";
import PostEditor from "./PostEditor";
import { PageContext } from '../pages/_app';

describe("Post Editor", () => {
  let post;
  const handler = jest.fn();
  const groups = [{owner:'Griff', name: 'Hiking', date: 'Today'}, {owner: 'Griff', name: 'Tacos', date: "Today"}];
  
  beforeEach(() => {
    post = {
      title: "this is the heading of the post",
      extract: "Witty caption for the photo",
      image_path: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F1645150%2Fimages%2Fo-RICK-ASTLEY-NEVER-GONNA-WAKE-UP-facebook.jpg&f=1&nofb=1",
      date: new Date(),
      group: "Tacos",
    };
    
  });

    test("Submit disabled if fields are not filled in", () => {
      render(
        <PageContext.Provider value={{groups}}>
          <PostEditor complete={handler} />
        </PageContext.Provider>
      );
      const submitButton = screen.getByTestId("Submit");
      //test material ui button diabled attributes in a really roundabout way: below
      expect(submitButton.attributes.getNamedItem("aria-disabled").value).toBe("true");
    
    });


    test("Content loads on Editor if passed", () => {
      
      render(
        <PageContext.Provider value={{groups}}>
          <PostEditor complete={handler} post={post} />
        </PageContext.Provider>
      );

      expect(screen.queryByText(post.title)).toBeVisible();
    });


    test("Submit enabled if fields are filled in", () => {
      render(
        <PageContext.Provider value={{groups}}>
          <PostEditor post={post} complete={handler}/>
        </PageContext.Provider>
      );

      const submitButton = screen.getByTestId("Submit");
      expect(submitButton.attributes.getNamedItem("aria-disabled").value).toBe("false");
    });


    test("Submit calls the complete function", () => {
      render(
      <PageContext.Provider value={{groups}}>
        <PostEditor complete={handler}/>
      </PageContext.Provider>
      );
      const submitButton = screen.getByTestId("Submit");
      fireEvent.click(submitButton);
      expect(handler).toHaveBeenCalled();
    });
});
