/*
Tests to make sure that the PostContainer works correctly based on currentGroup, Posts, 
That it works with
*/
import { render, screen } from "@testing-library/react";
import PostContainer from "./PostContainer";

describe('Post tests', () => {
    let posts;
    beforeEach(() => {
        const post1 = {
          title: "this is my dog!",
          extract: "okay it's not really my dog it's just a stock photo",
          image_path: "https://i.ytimg.com/vi/Vp7nW2SP6H8/maxresdefault.jpg",
          date: new Date(),
          group: "Pets",
          munches: 1
        };
        const post2 = {
            title: "padma",
            extract: "spotted?",
            image_path: "https://upload.wikimedia.org/wikipedia/commons/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg",
            date: new Date(),
            group: "Campus Updates",
            munches: 2
        };
        const post3 = {
            title: "chicken nuggets",
            extract: "right?",
            image_path: "https://barkpost.com/wp-content/uploads/2016/03/labdoodlefriedchicken.jpg",
            date: new Date(),
            group: "Memes",
            munches: 3
        };
        const post4 = {
            title: "dragon",
            extract: "hp 150",
            image_path: "https://i.pinimg.com/originals/b1/75/e3/b175e3cdd4ff9b9e9a45204efcfe364b.png",
            date: new Date(),
            group: "Pets",
            munches: 4
        };
        const post5 = {
            title: "love my dog",
            extract: "but he keeps crawling around eating dirt",
            image_path: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5802/5802801cv11d.jpg",
            date: new Date(),
            group: "Pets",
            munches: 5
          };
        posts = [post1, post2, post3, post4, post5]
    });
    test('post image is displayed', () => {
        render(<PostContainer posts = {posts}/>);
        const images = screen.getAllByTestId("Photo")
        expect(images[0]).toBeVisible();
        expect(images[1]).toBeVisible();
        expect(images[2]).toBeVisible();
        expect(images[3]).toBeVisible();
        expect(images[4]).toBeVisible();
    });
    test('image sizing', () => {
        render(<PostContainer posts = {posts}/>);
        const images = screen.getAllByTestId("Photo")
        expect(images[0].height).toBe(50*4);
        expect(images[1].height).toBe(50*5);
        expect(images[2].height).toBe(50*6);
        expect(images[3].height).toBe(50*7);
        expect(images[4].height).toBe(50*7);
        
    });
    test.skip('post container works with group', () => {
        // eslint-disable-next-line no-undef
        console.log("hi");
        //group seems to be disconnected from post container
    });
});

