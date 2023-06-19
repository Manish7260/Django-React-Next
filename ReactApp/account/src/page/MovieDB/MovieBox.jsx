import React from "react";
import styled from "styled-components";
import Button from "../../styledcomponent/Button";
import P from "../../styledcomponent/P";
import Container from "../../styledcomponent/Container";
import Card from "../../styledcomponent/Card";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Image = styled.img`
    width: 100%;    
`

const A = styled.a`
    text-decoration: none;
    color: black;
    display :inline-block;
    &hover{
        color: white;
    }
`

const MovieBox = ({title, poster_path, id}) => {
    return (
        <>
        <Card>
            <Image src={API_IMG+poster_path}/>
            <P>{title}</P>
            <Container>
            <Button><A href={`/detail/${id.toString()}`} target="_blank" >View More</A></Button>
            </Container>
        </Card>
        </>
    );
}

export default MovieBox;