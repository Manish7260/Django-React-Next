import styled, {css} from "styled-components";
import theme from '../global/theme';
import {  NavLink, } from "../../styles/global/main.style";
// footer section css file start// 
export const FooterBarMain = styled.div`
	border-top: 1px solid #dfe4e7; 
`;
export const FooterDetailsMain = styled.div`
	padding: 50px 0;
	border-bottom: 1px solid #EEEEEE;
`;
export const FooterLogo = styled.div`
	transition: all 0.3s ease-in-out;
    cursor: pointer;
    width: 123px;
    height: auto;
	display: inline-flex;
    overflow: hidden;
    margin-bottom: 24px;
	&:hover{
		opacity: 0.8;
	}
	img{
		width: 100%;
		height: auto;
		object-fit: contain;
		object-position: center;
	}
`;
export const FooterLink = styled.div`
	display: inline-block;
	font-size: 14px;
	color: #77838F;
	line-height: normal; 
	font-family: ${theme.font.fontFamilyCircularStdBook};
	line-height: 27px;
	margin-bottom: 8px;
	${(props) => props.isCopyRightLink && css`
		margin: 0;
		text-align: center;
		display: flex;
		justify-content: center;
    `}
	${(props) => props.isFooterText && css`
	    width:360px;
		max-width: 100%;
    `}
	${'' /* a{
		transition: all 0.3s ease-in-out;
		color: #77838F;
		&:hover{
			opacity: 0.8;
		}
	} */}
	img{
		width: 8px;
		height: auto;
		margin-right: 11px;
		object-fit: contain;
		object-position: center;
		cursor: pointer;
	}
`;
export const FooterTitle = styled.h5`
	display: inline-block;
	font-size: 16px;
	color: #1E2022;
	line-height: normal; 
	font-family: ${theme.font.fontFamilyCircularStdBook};
	line-height: 27px;
	margin-bottom: 12px;
	font-weight: 400;
`;
export const CopyLink = styled.div`
	padding: 15px 0;
`;
// footer section css file end// 
