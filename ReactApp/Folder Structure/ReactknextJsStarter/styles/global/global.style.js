import theme from "../global/theme";
import { DashboardHeaderBar, MenuUL, HeaderBarMain, LineIcon,NavLogoandFilterBar } from "../../styles/pages/header.style";
import { mediaQueries } from "../../utils/mediaQuery";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin:0;
        box-sizing: border-box;
        font-weight: 400;
        height: 100%;
        font-size: 14px;
        line-height: 1.5;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        overflow-x: hidden;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #000;
        background: #fff;
        appearance: auto;
        -moz-appearance: auto;
        -webkit-appearance: auto;
        font-family: ${theme.font.fontFamilyCircularStd};
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a,
    ul{
        margin: 0;
        padding: 0;
        line-height: normal;
        list-style-type: none;
        text-decoration: none !important;
    }
    a{
        transition: all 0.3s ease-in-out;
        &:hover{
		    opacity: 0.8;
	    }
    }
    .react-confirm-alert-overlay{
        background: rgb(0 0 0 / 50%);
    }
    .react-responsive-modal-root{
        z-index:2;
    }
    .react-responsive-modal-modal{
        padding: 50px 30px;
        border-radius: 4px;
        ${mediaQueries("sm")`
            width: auto;
        `}
        ${mediaQueries("xs")`
            padding: 50px 20px;
        `}
        .yoyoboat-modal-trip{
            max-width: 100%;
            width: 500px;
            ${mediaQueries("md")`
                width: auto;
            `}

        }

        .react-responsive-modal-closeButton{
            left: 25px;
            top: 20px;
            right:auto;
            transition: all 0.3s ease-in-out;
            path{
                fill: #27292C;
            }
            &:hover{
                opacity: 0.7;
            }
        }

        form{
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
                            ${mediaQueries("sm")`
                                flex-direction: column;
                            `}
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
            h3{
                margin: 10px 0px;
            }
            button{
                margin: 20px 0px;
            }
        }

    }
    .ReviewModalDesign{
        width: 700px;
        max-width: 100%;
        ${mediaQueries("lg")`
            width: 670px;
        `}
        ${mediaQueries("md")`
            width: auto;
        `}
    }
    .pagination{
        display: inline-flex;
        padding: 15px 0;
        li{
            border: 1px solid #D8D8D8;
            position:relative;
            cursor:pointer;
            a{
                font-size: 14px;
                padding: 10px 20px;
                font-weight: normal;
                display: inline-flex;
                font-family: ${theme.font.fontFamilyCircularStd};
                outline: none;
                box-shadow: none;
            }
        }
        li.active{
            color: ${theme.color.primary};
        }
        li.active:before{
            background: ${theme.color.primary};

        }
        li:before{
            position: absolute;
            content: "";
            background: transparent;
            width: 100%;
            height: 2px;
            bottom: 0;
            right: 0;
            left: 0;
        }
    }
    .gmnoprint{
        ${"" /* background: #fff;
        padding: 10px 20px; */}
        .gm-style-mtc{
            button{
                box-shadow: none !important;
            }
        }
    }
    .mapbox-checkbox{
        position: relative;
        justify-content: center;
        display: flex;
        top: 25px;
        > div{
            display: flex;
            width: auto;
            padding: 0;
            label{
                flex-basis: 100%;
                max-width: 100%;
                display: flex;
                background: white;
                padding: 8px;
                align-items: center;
                border-radius: 4px;
                span{
                    z-index: 0;
                    font-weight: 500;
                }
            }
        }
    }
    .toggleMenuOpen{
        overflow: hidden;
        padding-right:15px;
        ${HeaderBarMain}{
            height: 100%;
            background: ${theme.color.white};
            border: none;
            position: absolute;
            ${DashboardHeaderBar}{
                display: flex;
                position: absolute;
                left: 10px;
                top: 90px;
                right: 0;
                justify-content: start;
                margin: auto;
                flex-direction: column;
            }
            ${MenuUL}{
                flex-direction: column;
                align-items: start;
            }
        }
        .boat-header-bar{
            height: 100%;
            background: #000000;
            border: none;
            ${DashboardHeaderBar}{
                display: flex;
                position: absolute;
                left: 10px;
                top: 90px;
                right: 0;
                justify-content: start;
                margin: auto;
                flex-direction: column;
            }
            ${MenuUL}{
                flex-direction: column;
                align-items: start;
            }
            ${LineIcon}{
                background:transparent;
            }
        }
        ${LineIcon}{
            background:transparent;
            &:before {
                bottom: 0;
                transform: rotate(-45deg);
                transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
            }
            &:after {
                top: 0;
                transform: rotate(45deg);
                transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
            }
        }
        ${NavLogoandFilterBar}{
            ${'' /* flex-direction: column;
            form{
                display: block;
                .search-and-miles-filter{
                    flex-direction: column;
                }
            } */}
        }
    }
    .CenterPartBorder{
		border-right: 1px solid #dedede;
		border-left: 1px solid #dedede;
        ${mediaQueries("md")`
            border-right: none;
            border-left: none;
            border-top: 1px solid #dedede;
            border-bottom: 1px solid #dedede;
            margin: 10px 0;
        `}
	}
    .MessageBoatDetail{
        padding: 10px;
        .RightDetailBookingTitle{
            margin-bottom: 30px;
        }
    }

		.rv-discrete-color-legend-item{
			align-items: center;
			display: inline-flex !important;
			.rv-discrete-color-legend-item__title{
					margin-left: 15px !important;
					font-size: 20px;
					font-weight: 200;
					font-family: ${theme.font.fontFamilyCircularStdBook};
					color: #1E2022;
			}
	}
	.rv-xy-plot {
			margin-left:15px;
			svg{
					.rv-xy-plot__axis--vertical {
							transform: translate(92%, 0px) !important;
					}
					.rv-xy-plot__axis--horizontal {
						transform: translate(0px, 250px) !important;
				}
				.rv-xy-plot__series--bar{
					transform: translate(0px, 0px) !important;

				}
			}
	}
`;
// export default GlobalStyle;
