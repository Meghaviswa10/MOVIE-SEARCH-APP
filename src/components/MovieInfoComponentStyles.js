import styled from "styled-components";

export const Container = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

export const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color:rgb(23, 23, 23);
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;

export const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color:rgb(0, 0, 0); 
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;

export const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: darkgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    background: lightgrey;
  }
`;

export const LoadingMessage = styled.span`
  font-size: 18px;
  color: gray;
`;

export const ErrorMessage = styled.span`
  font-size: 18px;
  color: red;
`;
