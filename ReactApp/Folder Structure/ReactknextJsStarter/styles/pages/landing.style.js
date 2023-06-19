import styled, {css} from "styled-components";
import theme from '../global/theme';
import { mediaQueries } from "../../utils/mediaQuery";

// banner section css file start// 
 
// banner section css file start// 
export const ChooseBoatMainBlock = styled.div`
	padding: 100px 0 0;
	${mediaQueries("xl")`
		padding: 80px 0 0;
    `}
	${mediaQueries("md")`
		padding: 60px 0 0;
    `}
`;
export const ChooseBoatSubBlock = styled.div`
    margin-bottom: 30px;
	${(props) =>
    props.isBoatPlace &&
    css`
	margin-bottom: 0px;
	position:relative;
    `}
`;
export const ChooseBoatsubItem = styled.div`
	width:100%; 
	height: 350px;
	overflow: hidden;
	transition: all 0.3s ease-in-out;
	cursor: pointer;
	background: #fff;
	border-radius: 5px;
    overflow: hidden;
	margin-bottom: 15px;
	box-shadow: 0 20px 80px 0 rgba(0,0,0,0.10);
	${mediaQueries("xl")`
		height: 300px;
		margin-bottom: 20px;
    `}
	${mediaQueries("md")`
		height: 270px;
		margin-bottom: 15px;
    `}
	${mediaQueries("sm")`
		height: 220px;
		margin-bottom: 15px;
    `}
	&:hover{
		opacity: 0.8;
	}
	${(props) => props.isOverlyBefore && css`
	    position:relative;
		&::before{
			position:absolute;
			content: '';
			width:100%;
			height: 100%;
			opacity: 0.2;
			background-image: linear-gradient(180deg, rgba(0,0,0,0.04) 50%, #000000 100%);
			right: 0;
			left: 0;
			top: 0;
			bottom: 0;
		}
		&::after{
			position:absolute;
			content: '';
			width:100%;
			height: 100%;
			opacity: 0.2;
			background-image: linear-gradient(180deg, rgba(0,0,0,0.04) 50%, #000000 100%);
			right: 0;
			left: 0;
			top: 0;
			bottom: 0;
		}
    `}
`;


export const DiscoverDetailsBlockMain = styled.div`
    padding: 70px 0 80px; 
	border-top: 1px solid #DFE4E7;
	${mediaQueries("lg")`
		padding:30px 0 70px; 
    `}
`;
  
// SignUpFooterMain css file start//
export const SignUpFooterMain = styled.div`
    padding:85px 0; 
	background: #F7FAFD;
	${mediaQueries("lg")`
		padding:70px 0; 
    `}
	${mediaQueries("md")`
		padding:50px 0; 
    `}
`;
export const SignUpWrapperBlock = styled.div`
	display: flex;
    justify-content: space-between;
	${mediaQueries("md")`
		flex-direction: column;
    `}
	form{
		width: 448px;
    	max-width: 100%;
		${mediaQueries("md")`
			margin: auto;
			margin-top: 30px;
		`}
	}
`;
// SignUpFooterMain css file and// 