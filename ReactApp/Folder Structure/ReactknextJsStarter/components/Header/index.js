import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container, Row, Col } from 'react-awesome-styled-grid'
import { useSession, signOut } from 'next-auth/client'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import router from '../../utils/router'
import { searchRadiusOptions } from '../../utils/constant'
import {
  HeaderBarMain,
  NavBarMain,
  NavBarLogo,
  NavMenuListMain,
  MenuUL,
  MenuLI,
  DropdownMenu,
  SupportWrapper,
  SupportText,
  NavLogoandFilterBar,
  DashboardHeaderBar,
  ToggleMenuWrapper,
  LineIcon,
} from '../../styles/pages/header.style'
import {
  Button,
  Form,
  FormBlcok,
  FormGroup,
  IconLocatin,
  Image,
  Input,
  NavLink,
} from '../../styles/global/main.style'
import { profileSelector } from '../../redux/profileSlice'

let refContainer = null
const Header = () => {
  const routers = useRouter()
  const [session, loading] = useSession()
  const [profileMenu, setProfileMenu] = useState(false)
  const [isSetBodyClass, setBodyClass] = useState(false)
  const { profileImage, dashboardMenuShow } = useSelector(profileSelector)
  const [navToggle, setNavToggle] = useState(false)
  const handleNavClickToggle = (value) => {
    setNavToggle(value)
    if (value) {
      document.querySelector('body').classList.add('toggleMenuOpen')
      setBodyClass(true)
    } else {
      document.querySelector('body').classList.remove('toggleMenuOpen')
      setBodyClass(false)
    }
  }

  const onLoad = (ref) => (refContainer = ref)

  useEffect(() => {
    document.addEventListener(
      'click',
      (e) => handleClickOutside(e, profileMenu),
      true
    )
    return () => {
      document.removeEventListener(
        'click',
        (e) => handleClickOutside(e, profileMenu),
        true
      )
    }
  }, [profileMenu])

  const handleClickOutside = (event, profileMenu) => {
    if (event && event.target && event.target.id === 'menu') {
      setProfileMenu(!profileMenu)
    } else if (
      event.target &&
      event.target.id &&
      event.target.id === 'logout'
    ) {
      signOut()
    } else setProfileMenu(false)
  }

  const onPlacesChanged = () => {
    let places = refContainer.getPlaces()
    if (places.length > 0) {
      places = places[0]
      const currentQuery = routers.query
      currentQuery.latitude = places.geometry.location.lat()
      currentQuery.longitude = places.geometry.location.lng()
      currentQuery.address = places.formatted_address
      delete currentQuery.nwlat
      delete currentQuery.nwlng
      delete currentQuery.swlng
      delete currentQuery.swlat
      routers.push({
        pathname: router.SEARCHBOAT,
        query: currentQuery,
      })
    }
  }

  const searchRadiusHandler = (e) => {
    const currentQuery = routers.query
    if (e.value != 0) currentQuery.miles = e.value
    else delete currentQuery.miles

    routers.push({
      pathname: router.SEARCHBOAT,
      query: currentQuery,
    })
  }

  const contactSupportMenu = () => (
    <SupportWrapper>
      <SupportText>Contact Owner Support</SupportText>
      <Link href="tel:1-800-555-5555">
        <a>1-800-555-5555</a>
      </Link>
    </SupportWrapper>
  )

  const renterMenu = () => (
    <DashboardHeaderBar isLandingPageHeader>
      <MenuUL>
        {loading == false && session && (
          <>
            {(dashboardMenuShow ||
              (session &&
                session.user &&
                session.user.isBoatListed == '1')) && (
              <MenuLI>
                <Link href={router.DASHBOARD} passHref>
                  <NavLink
                    onClick={() => {
                      handleNavClickToggle(false)
                    }}
                    to="/">
                    Dashboard
                  </NavLink>
                </Link>
              </MenuLI>
            )}
            <MenuLI
              className={routers.pathname == router.SAVEDBOAT ? 'active' : ''}>
              <Link href={router.SAVEDBOAT} passHref>
                <NavLink
                  onClick={() => {
                    handleNavClickToggle(false)
                  }}
                  to="/">
                  Saved
                </NavLink>
              </Link>
            </MenuLI>
            <MenuLI
              className={
                routers.asPath == `${router.PASTUPCOMINGTRIP}/upcoming` ||
                routers.asPath == `${router.PASTUPCOMINGTRIP}/past` ||
                routers.asPath == `${router.PASTUPCOMINGTRIP}/cancelled`
                  ? 'active'
                  : ''
              }>
              <Link href={`${router.PASTUPCOMINGTRIP}/upcoming`} passHref>
                <NavLink
                  onClick={() => {
                    handleNavClickToggle(false)
                  }}
                  to="/">
                  Trips
                </NavLink>
              </Link>
            </MenuLI>
          </>
        )}
        <MenuLI>
          <Link
            href={
              routers.pathname == router.LISTYOURBOAT ||
              routers.pathname == router.HOME
                ? '#how_it_works'
                : '/'
            }
            passHref>
            <NavLink to="/">How it works</NavLink>
          </Link>
        </MenuLI>
        {loading == false && !session && (
          <>
            <MenuLI>
              <Link href={router.LOGIN} passHref>
                <NavLink
                  onClick={() => {
                    handleNavClickToggle(false)
                  }}
                  to="/">
                  Log in
                </NavLink>
              </Link>
            </MenuLI>
            <MenuLI>
              <Link href={router.SIGNUP} passHref>
                <NavLink
                  onClick={() => {
                    handleNavClickToggle(false)
                  }}
                  to="/">
                  Sign up
                </NavLink>
              </Link>
            </MenuLI>
          </>
        )}
      </MenuUL>
      {commonMenu()}
    </DashboardHeaderBar>
  )

  const ownerMenu = () => (
    <DashboardHeaderBar>
      <MenuUL>
        <MenuLI
          className={routers.pathname == router.DASHBOARD ? 'active' : ''}>
          <Link href={router.DASHBOARD} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Dashboard
            </NavLink>
          </Link>
        </MenuLI>
        <MenuLI
          className={
            routers.asPath == `${router.BOOKING}pending` ||
            routers.asPath == `${router.BOOKING}confirmed` ||
            routers.asPath == `${router.BOOKING}completed` ||
            routers.asPath == `${router.BOOKING}cancelled`
              ? 'active'
              : ''
          }>
          <Link href={`${router.BOOKING}pending`} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Bookings
            </NavLink>
          </Link>
        </MenuLI>
        <MenuLI
          className={
            routers.asPath == router.INBOX || routers.query.userId
              ? 'active'
              : ''
          }>
          <Link href={router.INBOX} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Inbox
            </NavLink>
          </Link>
        </MenuLI>
        <MenuLI className={routers.pathname == router.CALENDAR ? 'active' : ''}>
          {/* <Link href={router.CALENDAR} passHref> */}
          <Link href={router.CALENDAR} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Calender
            </NavLink>
          </Link>
        </MenuLI>
        <MenuLI
          className={routers.pathname == router.BOATLISTING ? 'active' : ''}>
          <Link href={router.BOATLISTING} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Listings
            </NavLink>
          </Link>
        </MenuLI>
        <MenuLI
          className={
            routers.pathname == router.PERFORMANCEARNING ||
            routers.pathname == router.PERFORMANCEREVIEW
              ? 'active'
              : ''
          }>
          <Link href={router.PERFORMANCEARNING} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Performance
            </NavLink>
          </Link>
        </MenuLI>
        <MenuLI>
          {/* <Link href={router.DOCUMENTS} passHref> */}
          <Link href={router.DASHBOARD} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/">
              Documents
            </NavLink>
          </Link>
        </MenuLI>
      </MenuUL>
      {commonMenu()}
    </DashboardHeaderBar>
  )

  const commonMenu = () => (
    <>
      <MenuUL isListYourBoatProfile>
        <MenuLI>
          <Link href={router.LISTYOURBOAT} passHref>
            <NavLink
              onClick={() => {
                handleNavClickToggle(false)
              }}
              to="/"
              isListYourBoatBtn>
              List Your Boat
            </NavLink>
          </Link>
        </MenuLI>
        {loading == false && session && (
          <MenuLI isProfileIcon>
            <NavLink to="/">
              <Image
                isUserAvatar
                src={`${
                  profileImage ||
                  (session && session.user.userImageFullPath
                    ? session.user.userImageFullPath
                    : '/images/user-avatar.png')
                }`}
                alt=""
                id="menu"
              />
            </NavLink>
            {profileMenu && (
              <DropdownMenu>
                <Link href={router.RENTERMESSAGE} passHref>
                  <NavLink
                    onClick={() => {
                      handleNavClickToggle(false)
                    }}
                    isProfileMenuList
                    to="/">
                    Messages
                  </NavLink>
                </Link>
                <Link href={router.PROFILE} passHref>
                  <NavLink
                    onClick={() => {
                      handleNavClickToggle(false)
                    }}
                    isProfileMenuList>
                    Profile
                  </NavLink>
                </Link>
                <Link href={router.PAYOUTPREFERENCES} passHref>
                  <NavLink
                    onClick={() => {
                      handleNavClickToggle(false)
                    }}
                    isProfileMenuList>
                    Settings
                  </NavLink>
                </Link>
                <Link href={router.DASHBOARD} passHref>
                  <NavLink
                    onClick={() => {
                      handleNavClickToggle(false)
                    }}
                    isProfileMenuList
                    to="/">
                    Hosting
                  </NavLink>
                </Link>
                <NavLink
                  onClick={() => {
                    handleNavClickToggle(false)
                  }}
                  isProfileMenuList
                  id="logout">
                  Sign out
                </NavLink>
              </DropdownMenu>
            )}
          </MenuLI>
        )}
      </MenuUL>
    </>
  )
  return (
    <HeaderBarMain
      // isInnerHeader={routers.pathname == "/" ? "abc" : ""}
      className={
        routers.pathname == '/' || routers.pathname == router.LISTYOURBOAT
          ? 'boat-header-bar'
          : ''
      }>
      <Container>
        <NavBarMain>
          <NavLogoandFilterBar>
            <Link href={router.HOME} passHref>
              <NavBarLogo>
                <img src="/images/YoYoBoat_Logo.png" alt="" />
              </NavBarLogo>
            </Link>
            {routers.pathname == router.SEARCHBOAT && (
              <>
                <Form>
                  <div className="search-and-miles-filter">
                    <div className="yoyo-radius-form">
                      <FormGroup>
                        <FormBlcok>
                          <IconLocatin isUserIcon>
                            <img src="/images/mappin-icon.svg" alt="" />
                          </IconLocatin>
                          <Select
                            options={searchRadiusOptions}
                            value={searchRadiusOptions.filter(
                              (option) => option.value == routers.query.miles
                            )}
                            onChange={searchRadiusHandler}
                          />
                        </FormBlcok>
                      </FormGroup>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </NavLogoandFilterBar>
          <NavMenuListMain>
            {routers.pathname == router.BOATREGISTRATIONONE ||
            routers.pathname == router.BOATREGISTRATIONTWO ||
            routers.pathname == router.BOATREGISTRATIONTHREE
              ? contactSupportMenu()
              : routers.pathname.startsWith(router.DASHBOARD)
              ? ownerMenu()
              : renterMenu()}
            <ToggleMenuWrapper
              onClick={() => {
                handleNavClickToggle(!navToggle)
              }}>
              <LineIcon />
            </ToggleMenuWrapper>
          </NavMenuListMain>
        </NavBarMain>
      </Container>
    </HeaderBarMain>
  )
}

export default Header
