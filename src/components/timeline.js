// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../repository/API";
import Header from "./Header";

import authComponents from "./authStyle";
import Publish from "./Publish";
const { Right, Left, AllPosts, OnePost } = authComponents;

export default function Timeline() {
  const avatar = localStorage.getItem("image");

  const [posts, setPosts] = useState(null);

  console.log(posts);

  //   const navigate = useNavigate();

  useEffect(() => {
    const promise = API.getPosts();
    promise
      .then(answer => {
        console.log(answer.data);
        setPosts(answer.data);
      })
      .catch(err => {
        console.error(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  function TimelinePosts() {
    if (posts === null) {
      return <h4>Loading...</h4>;
    } else {
      if (posts.length === 0) {
        return <h4>There are no posts yet</h4>;
      } else {
        return posts.map(element => {
          return (
            <PutOnePost
              propName={element.name}
              propComent={element.coment}
              propLink={element.link}
              linkImage={element.image}
              linkTitle={element.title}
              linkDescription={element.description}
            />
          );
        });
      }
    }
  }

  function PutOnePost({
    propName,
    propComent,
    propLink,
    linkImage,
    linkTitle,
    linkDescription
  }) {
    return (
      <OnePost>
        <Left>
          <img src={avatar} alt="profile" />
        </Left>
        <Right>
          <div className="name">
            <h1>{propName}</h1>
          </div>
          <div className="coment">
            <h2>{propComent}</h2>
          </div>
          <div
            className="link"
            onClick={() => {
              window.location.href = "https//google.com";
            }}
          >
            <h2>{linkTitle}</h2>
            <h3>{linkDescription}</h3>
            <p>{propLink}</p>
            <img src={linkImage} alt="link_image" />
          </div>
        </Right>
      </OnePost>
    );
  }

  return (
    <>
      <Header />
      <Publish setPosts={setPosts} />
      <AllPosts>
        <TimelinePosts />
      </AllPosts>
    </>
  );
}
