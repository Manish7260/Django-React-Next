import styled, { css } from "styled-components";
import theme from "./theme";
import { mediaQueries } from "../../utils/mediaQuery";

export const Button = styled.button`
  background: ${theme.color.primary};
  padding: 15px;
  font-size: 15px;
  color: #fff;
  border: none;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: inline-block;
  outline: none;
  box-shadow: none;
  font-weight: 500;
  font-family: ${theme.font.fontFamilyCircularStd};
  border: 1px solid ${theme.color.primary};
	${mediaQueries("md")`
		padding: 9px 15px; 
	`}
  &:hover {
    opacity: 0.7;
  }

  ${(props) =>
    props.linebutton &&
    css`
    border:1px solid ${theme.color.primary};
    color:${theme.color.primary};
    background-color:transparent;

    &:hover{
      color:${theme.color.white};
    background-color:${theme.color.primary};
    }
  `}
  ${(props) =>
    props.smallbtn &&
    css`
    max-width: 187px;
    padding: 13px 15px;
    font-size:14px;
    `} 
  ${(props) =>
    props.isSmallBtn &&
    css`
      width: 200px;
    `}
    ${(props) =>
      props.isEditBtn &&
      css`
        width: 80px;
        font-weight: normal;
        font-family: ${theme.font.fontFamilyAvenir};
        border-color: ${theme.color.border};
      `}
    ${(props) =>
      props.contactbtn &&
      css`
        width: 148px;
      `}
  ${(props) =>
    props.isGoBackBtn &&
    css`
		width: 150px;
      	background: ${theme.color.border};
      	color: #656f7a;
		border-color: ${theme.color.border};
		${mediaQueries("xs")`
			margin-right: 15px; 
		`}
    `}
  ${(props) =>
    props.isNewsLetterBtn &&
    css`
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 5px;
      padding: 0px;
      width: 95px;
    `}
	${(props) =>
    props.isLoginButton &&
    css`
      background: ${theme.color.blue};
      font-weight: 600;
      box-shadow: 0 5px 10px 0 #e0e4ee;
	  border:none;
    `}
	${(props) =>
    props.isGoogleLoginBtn &&
    css`
      background: ${theme.color.white};
      font-weight: 600;
      box-shadow: 0 5px 10px 0 #e0e4ee;
      color: #233b58;
      margin-bottom: 20px;
      display: inline-flex;
      justify-content: center;
	  border:none;
    `}

	${(props) => props.isCompleteListingBtn && css`
		background: ${theme.color.white};
		color: ${theme.color.primary};
    `}

	${(props) => props.isApplyBtn && css`
        width: 120px;
		background: #016FFF;
		border-color: #016FFF;
    `}
	${(props) => props.isClearBtn && css`
		color: #5E6874;
		background: transparent;
		border-color: transparent;
		width: 120px;
		text-align: start;
    `}
    ${(props) => props.isChangeBtnDanger && css`
       color: #FF0000;
    `}
  &.disabled-button{
    cursor: not-allowed;
    background-color: #F5F5F5;
    border-color: #d5d5d5;
    color: #b7b5b5;
    &:hover{
      opacity: 1;
    }
  }
`;
export const PagesLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const Title = styled.h2`
	font-size: 30px;
	font-weight: 600;
	color: #000;
	margin-bottom: 20px;
	${mediaQueries("xl")`
		font-size: 28px;
	`}
	${mediaQueries("lg")`
		font-size: 26px;
	`}
	${mediaQueries("md")`
		font-size: 22px;
	`}
	${mediaQueries("sm")`
		font-size: 20px;
	`}
	${mediaQueries("xs")`
		font-size: 18px;
	`}			
	${(props) => props.isBannerTitle && css`
		font-size: 36px;
		margin-bottom: 15px;
		${mediaQueries("xl")`
			font-size: 32px;
		`}
		${mediaQueries("lg")`
			font-size: 30px;
		`}
		${mediaQueries("md")`
			font-size: 26px;
		`}	
		${mediaQueries("sm")`
			font-size: 22px; 
		`}
	`}
	${(props) => props.isBoatRegisTitleMain && css`
		margin-bottom: 8px;
    `}
	${(props) => props.isBookingsTitleMain && css`
		margin-top: 30px;
    `}
`;
export const SubTitle = styled.h3`
	font-size: 21px;
	font-weight: 500;
	color: #000;
	line-height: normal;
	${mediaQueries("lg")`
		font-size: 19px;
	`}
	${mediaQueries("md")`
		font-size: 17px;
	`}
	${mediaQueries("sm")`
		font-size: 15px;
	`}
	${props => props.isMessagePageTitle && css`
		font-size: 16px;
	`}
  ${props => props.isEarningNumberSize && css`
		font-size: 24px;
	`}
	${props => props.RatingImg && css`
		img{
			margin-right:10px;
		}
	`}
	${(props) =>
		props.isBoatPlaceText &&
		css`
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 25px;
		text-align: center;
		padding: 10px;
	`}
   
	${(props) =>
		props.isSignUpSection &&
		css`
		width: 550px;
		max-width: 100%;
		${mediaQueries("md")`
			text-align: center;
			margin: auto; 
		`}
	`}
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  ${(props) =>
    props.isUserAvatar &&
    css`
      width: 45px;
      height: 45px;
      border-radius: 100px;
      overflow: hidden;
      background: #ffffff;
      border: 1px solid #ffffff;
    `}
`;
export const SelectTwoBox = styled.div`
    margin-bottom: 30px;
	${mediaQueries("sm")`
        margin-bottom: 15px;
    `}
	.css-2b097c-container {
		.css-yk16xz-control {
			margin-bottom: 0 !important;
			height: 50px !important;
			border-color: ${theme.color.inputBorder};
			background: transparent !important;
			> div {
				padding-left: 10px !important;
				.css-1uccc91-singleValue {
					font-weight: normal;
					font-family: ${theme.font.fontFamilyCircularStdBook} !important;
					color: ${theme.color.lightblack} !important;
				}
				> div{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.css-1hb7zxy-IndicatorsContainer {
				.css-1okebmr-indicatorSeparator {
					display: none !important;
				}
			}
		}
	}
	.css-1pahdxg-control {
		margin-bottom: 0 !important;
		height: 50px !important;
		border-color: ${theme.color.inputBorder};
		background: transparent !important;
		> div {
			padding-left: 10px !important;
		}
		.css-1hb7zxy-IndicatorsContainer {
				.css-1okebmr-indicatorSeparator {
					display: none !important;
				}
			}
	}
	${(props) =>
		props.isModalSelectBox &&
		css`
		${mediaQueries("xs")`
        	margin-bottom: 15px;
    	`}
	`}
`;
export const Form = styled.form`
	${(props) =>
		props.isBoatRegistrationForm &&
		css`
		margin-top: 10px;
	`}
	.characters-text-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 14px;
		p {
			font-size: 14px;
			color: #99a2aa;
			font-family: ${theme.font.fontFamilyAvenir};
			font-weight: normal;

			${mediaQueries("xs")`
				font-size: 12px; 
			`}
		}
  	}
	.css-2b097c-container {
		width: 100%;
		.css-yk16xz-control {
			height: 53px;
			margin-bottom: 15px;
			background: transparent !important;
				border-color: ${theme.color.inputBorder};
				&:hover{
					border-color: ${theme.color.inputBorder};
				}
			> div{
				outline: none;
				box-shadow: none;
				padding-left: 36px;
				.css-1uccc91-singleValue {
					font-size: 14px;
					color: #77838f !important;
					font-weight: 500;
				}
			}
      .css-1hb7zxy-IndicatorsContainer {
				.css-1okebmr-indicatorSeparator {
					display: none !important;
				}
			}
			.css-1okebmr-indicatorSeparator{
				width: 0px;
			}
		}
		.css-1pahdxg-control {
			height: 53px;
			margin-bottom: 15px;
			outline: none;
			box-shadow: none;
			border-color: ${theme.color.inputBorder};
			background: transparent !important;
			> div{
				padding: 0;
				padding-left: 36px;
			}
      .css-1hb7zxy-IndicatorsContainer {
				.css-1okebmr-indicatorSeparator {
					display: none !important;
				}
			}
		}
  	}
  .react-datepicker-wrapper {
    width: 100%;
    .react-datepicker__input-container {
      input {
        background: #ffffff;
        border: 1px solid ${theme.color.inputBorder};
        border-radius: 4px;
        font-size: 14px;
        width: calc(100% - 45px);
        padding: 18px 12px 18px 30px;
        outline: none;
        box-shadow: none;
        color: #77838f;
        font-weight: 600;
        &:focus {
          border: 1px solid ${theme.color.inputBorder} !important;
        }
      }
    }
  }
  .react-datepicker__tab-loop {
    .react-datepicker-popper {
      .react-datepicker {
        border: 1px solid ${theme.color.inputBorder};
        .react-datepicker__triangle {
          border-bottom-color: #ffffff;
        }
        .react-datepicker__month-container {
          .react-datepicker__header {
            background: transparent;
            .react-datepicker__current-month {
              font-size: 14px;
              color: #77838f;
            }
            .react-datepicker__day-names {
              .react-datepicker__day-name {
                font-size: 14px;
                line-height: normal;
                font-weight: 600;
                color: #717171;
              }
            }
          }
          .react-datepicker__month {
            .react-datepicker__week {
              .react-datepicker__day {
                font-size: 14px;
                font-weight: 600;
                color: #222222;
                border-radius: 100px;
                &.react-datepicker__day--keyboard-selected {
                  color: #fff;
                  background: ${theme.color.themeBG};;
                }
              }
            }
          }
        }
      }
    }
  }
	.form-main-cover-block {
		margin-bottom: 15px;
		&.profile-page-address-input{
			margin-bottom: 0px;
		}
		div {
			width: calc(100% - 15px);
		}
		&.boat-regis-address{
			div {
				width: calc(100% - 16px);
			}
		}
	}
	.yoyo-radius-form{
		margin-bottom:15px;
		i{
			top: 0;
		}
		.css-2b097c-container {
			width: 100%;
			.css-yk16xz-control{
				margin-bottom: 0px;
			}
			.css-1pahdxg-control{
				margin-bottom: 0px;
			}
		}
	}
	.yoyo-departure-and-return-box{
		margin-bottom:15px; 
	}
	.DayPicker-Months{
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: unset;
		flex-wrap: unset;
		-webkit-justify-content: center;
		justify-content: center;
		width: 100%;
	}	
`;

export const FormGroup = styled.div`
  	position: relative;
	${(props) =>
		props.isLoginFormGroup &&
		css`
			margin-bottom: 21px;
			${mediaQueries("sm")`
				margin-bottom: 10px;
			`}
		`}
		.StripeElement{
			border: 1px solid #dedede;
			border-radius: 4px;
			padding: 15px;
		.InputElement{
			font-family: ${theme.font.fontFamilyAvenir} !important;
		}
    }
    .ProfileFormInput{
		${mediaQueries("sm")`
			margin-bottom: 15px;
		`}
	}
`;

export const FormBlcok = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	${(props) =>
		props.boatDetailCustomDayPickerInput &&
			css
			`
				.DayPickerInput-Overlay{
					left: auto !important;
					right: 0 !important;;
				}
			`
		}

	.DayPickerInput{
		width: calc(100% - 63px);
		input{
			outline: none;
			box-shadow: none;
			padding: 18px 26px;
			padding-left: 36px;
			
		}
		.DayPickerInput-OverlayWrapper{
			.DayPickerInput-Overlay{
				${'' /* left: auto;
    			right: 0; */}
				.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
					background-color: ${theme.color.themeBG};
					color: white;
				}
				.DayPicker{
					.DayPicker-wrapper{
						.DayPicker-NavBar{
							span{
								outline:none;
								box-shadow:none;
							}
						}
						&:focus {
							outline: -webkit-focus-ring-color auto 0px;
						}
						.DayPicker-Months{
							.DayPicker-Month{
								.DayPicker-Caption{
									> div{
										font-size: 13px;
									}
								}
							}
							.DayPicker-Weekdays{
								.DayPicker-WeekdaysRow{
									> div{
										font-size: 12px;
										color: #717171;
										padding: 0;
									}
								}
							}
							.DayPicker-Body{
								.DayPicker-Week{
									.DayPicker-Day{
										font-size: 13px;
										font-weight: 600;
										border-radius: 100px;
										transition: all 0.3s ease-in-out;
										padding: 6px 8px;
										&.DayPicker-Day--today{
											background-color: ${theme.color.primary};
											color: white;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
export const EyeIcon = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto;
	right: 15px;
	display: flex;
	align-items: center;
	z-index: 1;
	i {
		&.pw-off-view-icon {
			background: url("../images/Eye-Off.svg") no-repeat;
			background-position: center center;
			background-size: contain;
			width: 24px;
			height: 19px;
		}
		&.pw-view-icon {
			background: url("../images/Eye-view.svg") no-repeat;
			background-position: center center;
			background-size: contain;
			width: 24px;
			height: 17px;
		}
	}
`;
export const IconLocatin = styled.i`
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto;
	left: 15px;
	display: flex;
	align-items: center;
	${'' /* z-index: 1; */}
	img {
		width: auto;
		height: 14px;
	}
	${(props) => props.isUserIcon && css`
		top: -15px;
		height: 53px;
	`}
	${props => props.ratingStar && css`
		left: -22px;
	`}
`;
export const Input = styled.input`
  background: ${theme.color.white};
  border: 1px solid ${theme.color.inputBorder};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  padding: 15px;
  outline: none;
  box-shadow: none;
  appearance: none; 
  -webkit-appearance: none;
  -moz-appearance: none;
  color: ${theme.color.inputTextColor};
  font-weight: 600;
  &:focus {
    border: 1px solid ${theme.color.inputBorder} !important;
  }
  ${(props) =>
    props.isNewsInput &&
    css`
      padding-right: 110px;
    `}
  ${(props) =>
    props.isSearchLocation &&
    css`
      padding-left: 30px;
      height: 22px;
    `}
	${(props) =>
    props.isInputFontLight &&
    css`
      font-weight: normal;
      font-family: ${theme.font.fontFamilyCircularStdBook};
      background: ${theme.color.formBgColor};
      border-color: ${theme.color.formBgColor};
      color: #27292c;
      &:focus {
        border-color: ${theme.color.white} !important;
        background: ${theme.color.white};
        box-shadow: 0 5px 10px 0 #e0e4ee;
      }
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 50px ${theme.color.white} inset;
        -webkit-text-fill-color: ${theme.color.inputTextColor};
        border-color: ${theme.color.white} !important;
      }
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 50px ${theme.color.white} inset;
        -webkit-text-fill-color: ${theme.color.inputTextColor};
        border-color: ${theme.color.white} !important;
      }
    `} 
	${(props) =>
    props.isInnerPageInput &&
    css`
      font-weight: normal;
      font-family: ${theme.font.fontFamilyCircularStdBook};
      color: ${theme.color.lightblack};
    `}
`;
export const Label = styled.label`
	font-size: 14px;
	color: #a4a4a4;
	font-weight: normal;
	font-family: ${theme.font.fontFamilyCircularStdBook};
	margin-bottom: 3px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

  ${(props) =>
    props.isInnerPageLabel &&
    css`
      color: ${theme.color.lightblack};
	  	${mediaQueries("xs")`
			font-size: 12px; 
		`}
    `}
`;
export const Textarea = styled.textarea`
  background: ${theme.color.white};
  border: 1px solid ${theme.color.inputBorder};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  padding: 15px;
  outline: none;
  box-shadow: none;
  color: ${theme.color.inputTextColor};
  font-weight: 400;
  height: 120px;
  resize: none;
  font-family: ${theme.font.fontFamilyCircularStdBook};
  &:focus {
    border: 1px solid ${theme.color.inputBorder} !important;
  }
`;
export const ForgotLink = styled.a`
  margin: 0 0 35px;
  display: inline-block;
  color: ${theme.color.blue};
  font-size: 14px;
  font-family: ${theme.font.fontFamilyCircularStdBook};
`;
export const NavLink = styled.a`
  display: inline-block;
  font-size: 16px;
  color: ${theme.color.lightblack};
  line-height: normal;
  font-family: ${theme.font.fontFamilyCircularStdBook};
  cursor: pointer;
  ${mediaQueries("sm")`
        margin-bottom: 15px;
        margin-left: 0 !important;
    `}
  ${(props) =>
    props.isFooterTextLink &&
    css`
      color: #77838f;
      font-size: 14px;
    `}
  ${(props) =>
    props.isFooterCopyLink &&
    css`
      line-height: 27px;
      font-size: 14px;
      color: ${theme.color.primary};
      margin-left: 5px;
    `}
	${(props) =>
    props.isListYourBoatBtn &&
    css`
      background: ${theme.color.primary};
      padding: 15px;
      border: none;
      width: 100%;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      display: inline-block;
      outline: none;
      box-shadow: none;
      font-weight: 500;
      font-family: ${theme.font.fontFamilyCircularStd};
      color: ${theme.color.white};
      &:hover {
        opacity: 0.7;
      }
    `}
	${(props) =>
    props.isProfileMenuList &&
    css`
      color: ${theme.color.lightblack} !important;
      padding: 12px 15px;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: ${theme.color.primary};
        color: ${theme.color.white} !important;
        font-family: ${theme.font.fontFamilyCircularStdBook};
      }
    `}
`;

// error msg //
export const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
`;
// error msg //
export const GoogleLoginFooter = styled.div`
  padding-top: 20px;
  img {
    width: auto;
    height: 18px;
    object-fit: contain;
    margin-right: 10px;
  }
`;
export const Close = styled.a`
    position: absolute;
	top: 28px;
    left: 25px;
    display: inline-flex;
    cursor: pointer;
    transition: all 0.3s ease-in-out
    &:hover{
      opacity:0.8;
    }
    img{
      width:20px;
      height:20px;
      object-fit:contain;
    }
`;

export const MainBlock = styled.div`
  min-height: 600px;
`;
// tabbar section commen file //
// banner section css file start//
export const LadingBannerMain = styled.div`
  	position: relative;
	width: 100%;
	height: 90vh;
	${mediaQueries("sm")`
		height: 110vh;	 
	`}
`;
export const LadingBannerImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const LadingBannerDetails = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 50px;
  bottom: 0;
  display: flex;
  align-items: center;
`;
export const MainHowItWorks = styled.div`
  	padding: 80px 0;
	${mediaQueries("lg")`
		padding: 60px 0;
	`}
	${mediaQueries("md")`
		padding: 50px 0;
	`}
`;
export const TabbarHeaderLI = styled.li`
	font-size: 19px;
	font-weight: 500;
	color: rgb(39 41 44 / 80%);
	width: 200px;
	position: relative;
	padding: 15px 15px 15px 0;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	${mediaQueries("lg")`
		font-size: 18px;	 
	`}
	${mediaQueries("md")`
		font-size: 17px;
		padding: 12px 12px 12px 0;	 
	`}
	${mediaQueries("sm")`
		font-size: 16px;
		overflow: unset;
	`}
	&::before {
		position: absolute;
		content: "";
		background: transparent;
		width: 100%;
		height: 2px;
		bottom: 0;
		right: 0;
		left: 0;
	}
	&.active {
		color: ${theme.color.themeBG};
		&::before {
		background: ${theme.color.themeBG};
		}
	}
	&:hover {
		opacity: 0.7;
		&.active {
		opacity: 0.7;
		}
	}
`;
export const MainHowItWorksDetails = styled.div`
.OwnerProfileTitle{
	margin-top: 30px;
}
`;
export const TabbarHeaderWrapper = styled.div``;

export const TabbarHeaderUL = styled.ul`
  display: inline-flex;
  width: 100%;
  border-bottom: 1px solid #dfe4e7;
  ${mediaQueries("sm")`
		overflow-x: scroll;
	`}
`;

export const TabbarDetailsWrapper = styled.div`
  margin-bottom: 15px;
`;
export const Pintnumber = styled.div`
  border: 2px solid #27292c;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
export const TabbarDetailsLI = styled.li`
  flex-basis: 19%;
  max-width: 19%;
  padding: 25px 15px 25px 0;
  ${mediaQueries("lg")`
		flex-basis: 30%;
		max-width: 30%;
	`}
  ${mediaQueries("md")`
		flex-basis: 45%;
		max-width: 45%;
	`}
	${mediaQueries("sm")`
		flex-basis: 100%;
		max-width: 100%;
	`}	
    ${(props) =>
    props.isMyPrifileDetails &&
    css`
      flex-basis: unset;
      max-width: 815px;
      width: 100%;
      padding: 20px 0;
	  margin-bottom:30px;
      ${mediaQueries("lg")`
			flex-basis: 100%;
			max-width: 100%;
		`}
      ${mediaQueries("md")`
			flex-basis: 100%;
			max-width: 100%;
		`}
    `}
`;
export const TabbarDetailsUl = styled.ul`
  display: inline-flex;
  width: 100%;
  justify-content: start;
  ${mediaQueries("lg")`
		flex-wrap: wrap;
	`}
`;
export const TabbarDetailsText = styled.p`
  font-size: 16px;
  color: #373b3e;
  line-height: normal;
  margin-top: 12px;
  font-family: ${theme.font.fontFamilyAvenir};
  font-weight: normal;
	${mediaQueries("sm")`
		font-size: 14px; 
	`}
	span{
		color:${theme.color.themeBG};
	}
	a{
		color:${theme.color.primary};
	}
	${(props) => props.isPricingRulesText && css`
		margin-bottom: 30px;
    `}
`;
export const LadingBannerDetailsBlock = styled.div`
    background: ${theme.color.white};
    padding: 45px;
    box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    max-width: 525px;
    width: 100%;
    ${mediaQueries("md")`
		margin: auto;
		width: auto;
		padding: 20px;
	`}
	${mediaQueries("sm")`
		padding: 40px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	`}
  ${mediaQueries("xs")`
		padding: 20px;
	`}
    ${(props) =>
      props.isListYourBoatBanner &&
      css`
        max-width: 100%;
        display: flex;
        width: auto;
        align-items: center;
        justify-content: space-between;
	`}
`;
export const BannerDetailsText = styled.p`
	font-size: 20px;
	color: #596470;
	font-family: ${theme.font.fontFamilyAvenir};
	font-weight: normal;
	margin-bottom: 30px;
	line-height: 30px;
	width: 95%;
	${mediaQueries("md")`
		width: 100%;
		font-size: 18px;
		line-height: 26px; 
	`}
	${mediaQueries("sm")`
		font-size: 16px; 
	`}
	${mediaQueries("xs")`
		line-height: 24px;
	`}
	a{
		color: ${theme.color.themeBG};
	}
  span{
    font-weight: 600;
    color: ${theme.color.lightblack};
  }
  ${(props) => props.isEarningModalData && css`
		margin-bottom: 10px;
	`}
`;
// banner section css file end//
// tabbar section commen file //

export const CheckboxWrapper = styled.div`
	padding: 21px 0 0;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	
	${(props) => props.isFullWidthCheckbox && css`
		label{
			max-width: 100% !important;
			flex-basis: 100% !important;
		}
	`}
	${(props) => props.isRadioBtn && css`
		flex-direction: column;
		label{
			margin-bottom: 0px !important;
		}
	`}
	label {
		max-width: 30%;
		flex-basis: 30%;
		margin-bottom: 24px;
		${mediaQueries("sm")`
			max-width: 50%;
			flex-basis: 48%;
		`}
		.icheckbox_square-blue,
		.iradio_square-blue {
			background-image: none !important;
			width: 22px;
			height: 22px;
			border: 1px solid ${theme.color.border};
			border-radius: 4px;
			margin-right: 10px;
			transition: all 0.3s ease-in-out;
			background: ${theme.color.white};
			cursor: pointer;
			&.hover {
				border-color: ${theme.color.primary};
			}
			&.checked {
				background: ${theme.color.primary};
				border-color: ${theme.color.primary};
				position: relative;
				&:before {
					position: absolute;
					content: "";
					background: url("../images/checkboxarrow.svg") no-repeat;
					background-position: center;
					background-size: contain;
					width: 12px;
					height: 9px;
					right: 0;
					left: 0;
					bottom: 0;
					top: 0;
					margin: auto;
				}
			}
		}
		span {
			font-size: 14px;
			line-height: normal;
			color: ${theme.color.lightblack};
			font-weight: 400;
			font-family: ${theme.font.fontFamilyAvenir};
			cursor: pointer;
			${mediaQueries("xs")`
				font-size: 13px; 
			`}
		}
		.iradio_square-blue{
			border-radius: 100px;
			width: 26px;
			height: 26px;
			position: relative;
				&:before {
					position: absolute;
					content: '';
					width: 12px;
					height: 12px;
					border-radius: 100px;
					right: 0;
					left: 0;
					bottom: 0;
					top: 0;
					margin: auto;
					background:${theme.color.border};
					transition: all 0.3s ease-in-out;
				}
			&.checked{
				background: ${theme.color.white};
				border-color:${theme.color.primary};
				&:before{
					background-image: none !important;
					width: 12px;
					height: 12px;
					background:${theme.color.primary};
				}
			}
			&.hover {
				&:before {
					background:${theme.color.primary};
				}
			}
		}
	}
`;
export const RefundText = styled.div`
	margin-left: 45px;
	p{
		font-size: 14px;
		color: #6F7883;
		line-height: normal;
		font-family: ${theme.font.fontFamilyAvenir};
		font-weight: normal;
		margin-bottom: 5px;
	}
`;


export const BoatCategory = styled.div`
 	background: #FFFFFF;
	border: 1px solid ${theme.color.inputBorder};
	border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	height: 45px;
	padding: 4px;
	cursor:pointer;
    margin-bottom: 15px;
	transition: all 0.3s ease-in-out;
  &.active{
    border-color: ${theme.color.themeBG};    
  }
	img{
		width: 47px;
		height: auto;
	}
	p{
		font-size: 10px;
		font-weight: 400;
		color: #5E6874;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		text-align: center;
	}
	&:hover{
		border-color: #0071FF; 
	}
`;


export const BoatBookView = styled.div`
    background: ${theme.color.white};
    box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 20px;
    width: auto;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 55px;
	${mediaQueries("sm")`
		height: auto;
	`}
    img {
        width: 90px;
        height: auto;
        margin-bottom: 10px;
        object-fit: contain;
    }
    p {
        margin-bottom: 18px;
    }
`;



