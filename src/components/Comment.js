import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FollowingContext from "../contexts/followingContext";

function Comment({ commentOwnerId, username, text, avatar, postOwnerId }) {
  const { followingArr } = useContext(FollowingContext);

  function showStatus() {
    if (postOwnerId === commentOwnerId) {
      return <span className="status">• post's author</span>;
    } else if (followingArr !== null && followingArr.includes(commentOwnerId)) {
      return <span className="status">• following</span>;
    } else {
      return <></>;
    }
  }

  const navigate = useNavigate();

  function redirect(id) {
    navigate(`/users/${id}`);
  }

  return (
    <Wrapper>
      <CommentContainer>
        <CommentAvatar src={avatar} alt="user-avatar" />
        <ContentContainer>
          <UserInfo>
            <span className="username" onClick={() => redirect(commentOwnerId)}>{username}</span>
            {showStatus()}
          </UserInfo>
          <Text>{text}</Text>
        </ContentContainer>
      </CommentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: #1e1e1e;
  border-radius: 16px;
  display: flex;
  justify-content: center;
`;

const CommentContainer = styled.div`
  width: 92%;
  min-height: 71px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #353535;
  @media (max-width: 611px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 26.5px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 611px) {
    width: 278px;
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: "Lato";
  font-style: normal;
  gap: 4px;

  .username {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
    cursor: pointer;
  }

  .username:hover{
       color: #bfbfbf;
    }
  .status {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
  }

  @media (max-width: 611px) {
    .username,
    .status {
      font-size: 11px;
    }
  }
`;

const Text = styled.span`
  width: 100%;
  font-size: 14px;
  line-height: 17px;
  color: #acacac;

  @media (max-width: 611px) {
    font-size: 11px;
  }
`;

export { Comment, CommentAvatar, Wrapper };
