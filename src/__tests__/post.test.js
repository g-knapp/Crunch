//post test, still in progress
import { render, screen } from "@testing-library/react";
import PostContainer from "../components/PostContainer";
describe('detail view tests', () => {
    let samplePost, samplePost1;
    // const router = jest.spyOn(require("next/router"), "useRouter");
    beforeEach(() => {
        samplePost = {
            title: "post title",
            extract: "an extract would go here",
            image: "https://image.shutterstock.com/image-photo/british-shorthair-kitten-silver-color-600w-1510641710.jpg",
            date: new Date(),
            post_id: 1
        },
        samplePost1 =  {
            title: "title",
            extract: "an extract",
            image: "https://en.wikipedia.org/wiki/Kitten#/media/File:Juvenile_Ragdoll.jpg",
            date: new Date(),
            post_id: 2
        };
        
        
    });
    test.skip('test that clicking on a post opens the correct page', () => {
        
        render(<PostContainer posts={[samplePost, samplePost1]}/>);
        //render(<PostContainer selectPost = {handler}/>);
        const title  = screen.queryByText(samplePost.title);
        expect(screen.queryByText(samplePost.extract)).not.toBeInTheDocument();
        expect(title).toBeInTheDocument();
        //fireEvent.click(title);
        //expect(screen.queryByText(samplePost.extract)).toBeVisible();
        //console.log(router.query.id);
        //expect(router.query.id).toEqual(1);
    });
    
});