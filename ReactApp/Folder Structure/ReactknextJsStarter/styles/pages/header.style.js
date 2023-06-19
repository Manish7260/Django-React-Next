import styled, {css} from "styled-components";
import theme from '../global/theme';
import { mediaQueries } from "../../utils/mediaQuery";
// header section css file start// 
export const LineIcon = styled.div`
	background: ${theme.color.primary};
    cursor: pointer;
	display: none;
	width: 29px;
    height: 2px;
    border-radius: 10px;
    transition: all 0ms 300ms;
    position:relative;
    transform: translateY(0px);
	${mediaQueries("xl")`
		display: block;
    `}
    &:before{
        position: absolute;
        content: '';
        background: ${theme.color.primary};
        width: 29px;
        height: 2px; 
        left: 0;
	    bottom: 8px;
        transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    &:after{
        position: absolute;
        content: '';
        background: ${theme.color.primary};
        width: 29px;
        height: 2px;
        left: 0;
	    top: 8px;
        transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1); 
    }
`;
export const HeaderBarMain = styled.div`
	padding: 15px 0;
	background:${theme.color.white};
    right: 0;
    left: 0;
    top: 0;
    z-index: 2;
	border-bottom: 1px solid ${theme.color.border};
	&.boat-header-bar{
		background: rgb(0 0 0 / 28%);
		border: 1px solid #979797;
		position: absolute;
		transition: all 0.3s ease-in-out;
		ul{
			li{
				a{
					color: ${theme.color.white};
				}
			}
		}
		${LineIcon}{
			background: ${theme.color.white};
			&:before{
				background: ${theme.color.white};
			}
			&:after{
				background: ${theme.color.white};
			}
		}
	}
`;
export const NavBarMain = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: center;
	width:100%;
`;
export const NavLogoandFilterBar = styled.div`
	display: inline-flex;
	form{
		margin-left: 15px;
		${mediaQueries("xs")`
			display: none;
			margin-left: 0px;
		`}
		.search-and-miles-filter{
			display: inline-flex;
			.form-main-cover-block{
				margin-bottom: 0px;
				${mediaQueries("sm")`
					width: 100px;
				`}
			}
			.yoyo-radius-form{
				width: 170px;
    			margin-left: 15px;
				margin-bottom: 0px;
				${mediaQueries("sm")`
					width: 130px;
				`}
			}
		}
	}
`;
export const NavBarLogo = styled.div`
	transition: all 0.3s ease-in-out;
    cursor: pointer;
    width: 123px;
    height: auto;
	display: inline-flex;
    overflow: hidden;
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
 
export const NavMenuListMain = styled.div`
    flex:1;
	margin-left: 20px;
	display:flex;
	align-items:center;
	justify-content: flex-end;
`;

export const DashboardHeaderBar = styled.div`
	display: flex;
    justify-content: space-between;
    width: 100%;
	${mediaQueries("xl")`
		display: none;
    `}
	ul{
		&:last-child{
			li{
				&:last-child{
					margin-right: 0px;
				}
			}
		}
	}
	${(props) => props.isLandingPageHeader && css`
		justify-content: flex-end;
	`}
`;
export const MenuUL = styled.ul`
	display: inline-flex;
	align-items: center;
	${(props) => props.isListYourBoatProfile && css`
		${mediaQueries("xl")`
			flex-direction: unset !important;
		`}
	`}	 
`;
export const MenuLI = styled.li`
	margin: 0px 15px;
	display: flex;
	align-items: center; 
	position: relative;
	${mediaQueries("xl")`
		margin: 0px 15px 15px;
    `}
	${(props) => props.isProfileIcon && css`
		flex-direction: column;
		position: relative;
	`}
	&.active{
		position: relative;
		&:before{
			position: absolute;
			content: '';
			width: 100%;
			height: 2px;
			background: ${theme.color.primary};
			bottom: -30px;
			${mediaQueries("xl")`
				bottom: -3px;
			`}
			${mediaQueries("xs")`
				bottom: 10px;
			`}
		}
	}
`;

export const DropdownMenu = styled.div`
	background: ${theme.color.white};
    box-shadow: 0 2px 48px 0 rgb(0 0 0 / 6%);
    border-radius: 4px;
	position: absolute;
    top: 60px;
    right: 0;
	border: 1px solid #D4DAE3;
	width: 100%;
    min-width: 160px;
	display: inline-flex;
    flex-direction: column;
	overflow: hidden;
`;


export const SupportWrapper = styled.div`
	display: flex;
    flex-direction: column;
    text-align: end;
	a{
		font-size: 15px;
		color: ${theme.color.lightblack};
		font-weight: normal;
		${'' /* font-family: ${theme.font.fontFamilyCircularStdBook}; */}
	}
`;
export const SupportText = styled.h5`
	font-size: 12px;
	color: #5E6874;
	font-weight: normal;
	font-family: ${theme.font.fontFamilyCircularStdBook};
`;

export const ToggleMenuWrapper = styled.div`
	display: flex;
    flex-direction: column;
    margin-left: 24px;
    cursor: pointer;
    padding: 12px 0px;
`;


// header section css file end// 
