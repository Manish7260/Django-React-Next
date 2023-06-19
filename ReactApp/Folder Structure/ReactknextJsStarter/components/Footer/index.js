import Link from "next/link";
import React, { memo } from "react";
import { Container, Row, Col } from "react-awesome-styled-grid";
import { NavLink } from "../../styles/global/main.style";
import { FooterBarMain, FooterDetailsMain, FooterLogo, FooterLink, FooterTitle, CopyLink } from "../../styles/pages/footer.style";
import router from "../../utils/router";
const Footer = () => {
    return (
        <FooterBarMain>
            <Container>
                <FooterDetailsMain>
                    <Row>
                        <Col lg={4}>
                            <FooterLogo>
                                <Link href={router.HOME} passHref>
                                    <img src="/images/YoYoBoat_Logo.png" alt="" />
                                </Link>
                            </FooterLogo>

                            <FooterLink isFooterText={true}>
                                Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet
                                ullamcorper.
                            </FooterLink>
                        </Col>
                        <Col offset={{ lg: 1 }} lg={2}>
                            <FooterTitle>Policies</FooterTitle>
                            <FooterLink>
                                <img src="/images/linkArrow.svg" alt="" />
                                <NavLink isFooterTextLink={true} to="/">
                                    Terms of Service
                                </NavLink>
                            </FooterLink>
                            <FooterLink>
                                <img src="/images/linkArrow.svg" alt="" />
                                <NavLink isFooterTextLink={true} to="/">
                                    Privacy
                                </NavLink>
                            </FooterLink>
                        </Col>
                        <Col lg={2}>
                            <FooterTitle>Helpful Links</FooterTitle>
                            <FooterLink>
                                <img src="/images/linkArrow.svg" alt="" />
                                <NavLink isFooterTextLink={true} to="/">
                                    How it works
                                </NavLink>
                            </FooterLink>
                            <FooterLink>
                                <img src="/images/linkArrow.svg" alt="" />
                                <Link href={router.LISTYOURBOAT} passHref>
                                    <NavLink isFooterTextLink={true} to="/">
                                        List your boat
                                    </NavLink>
                                </Link>
                            </FooterLink>
                            <FooterLink>
                                <img src="/images/linkArrow.svg" alt="" />
                                <Link href={router.LOGIN} passHref>
                                    <NavLink isFooterTextLink={true} to="/">
                                        Log in
                                    </NavLink>
                                </Link>
                            </FooterLink>
                            <FooterLink>
                                <img src="/images/linkArrow.svg" alt="" />
                                <Link href={router.SIGNUP} passHref>
                                    <NavLink isFooterTextLink={true} to="/">
                                        Sign up
                                    </NavLink>
                                </Link>
                            </FooterLink>
                        </Col>
                        <Col lg={3}>
                            <FooterTitle>Contact Us</FooterTitle>
                            <FooterLink>16688 7th Street South</FooterLink>
                            <FooterLink>Lakeland, MN 55043</FooterLink>
                            <FooterLink>
                                <NavLink isFooterTextLink={true} to="/" href="tel:(651) 303-1146">
                                    Phone: (651) 303-1146
                                </NavLink>
                            </FooterLink>
                            <FooterLink>
                                <NavLink isFooterTextLink={true} to="/" href="mailto:info@yoyoboat.com">
                                    E-Mail: info@yoyoboat.com
                                </NavLink>
                            </FooterLink>
                        </Col>
                    </Row>
                </FooterDetailsMain>
                <CopyLink>
                    <FooterLink isCopyRightLink={true}>
                        ©{new Date().getFullYear()}{" "}
                        <Link href={router.HOME} passHref>
                            <NavLink to="/" isFooterCopyLink={true}>
                                {" "}
                                YoYoBoat
                            </NavLink>
                        </Link>
                        , Inc. All Rights Reserved.
                    </FooterLink>
                </CopyLink>
            </Container>
        </FooterBarMain>
    );
};
export default memo(Footer);
