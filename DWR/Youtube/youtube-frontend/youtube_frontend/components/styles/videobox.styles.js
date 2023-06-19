import styled from "styled-components";

export const MiniPlayer = styled.div`
  max-width: 360px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const Logo = styled.a`
  width: 35px;
  background-color: green;
  height: 35px;
  border-radius: 50%;
  margin-top: 3px;
  color: white;
  padding-top: 8px;
  font-weight: bold;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 10px;
  margin-top: 05px;
  font-weight: bold;
  width: 300px;
`;

export const Description = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Channel = styled.p`
  margin-top: 5px;
  margin-left: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #606060;
`;
