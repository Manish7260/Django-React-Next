import React, { Fragment, useEffect, useRef, useState } from 'react'
import SeoComponent from '../components/SeoComponent'
import Select from 'react-select'

import { Container, Row, Col } from 'react-awesome-styled-grid'

import { useForm, Controller } from 'react-hook-form'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'

import moment from 'moment'
import { useRouter } from 'next/router'
import Link from 'next/link'
import router from '../utils/router'
import apiRouter from '../utils/apiRouter'
import { axiosGet, axiosPost } from '../utils/axois'
import { pasengerOptions, searchRadiusOptions } from '../utils/constant'
import {
  ChooseBoatMainBlock,
  ChooseBoatSubBlock,
  ChooseBoatsubItem,
  DiscoverDetailsBlockMain,
  SignUpFooterMain,
  SignUpWrapperBlock,
  SearchInput,
} from '../styles/pages/landing.style'
import {
  Button,
  Title,
  SubTitle,
  Image,
  Form,
  Label,
  FormGroup,
  FormBlcok,
  Input,
  IconLocatin,
  ErrorMsg,
  LadingBannerMain,
  LadingBannerImage,
  LadingBannerDetails,
  MainHowItWorks,
  MainHowItWorksDetails,
  TabbarDetailsWrapper,
  TabbarDetailsUl,
  TabbarHeaderLI,
  TabbarDetailsLI,
  TabbarDetailsText,
  Pintnumber,
  LadingBannerDetailsBlock,
  BannerDetailsText,
  MainBlock,
  TabbarHeaderUL,
  TabbarHeaderWrapper,
  BoatCategory,
} from '../styles/global/main.style'

import toaster from '../utils/toaster'
import { useSession } from 'next-auth/client'

let refContainer = null

const Home = (props) => {
  const [session, loading] = useSession()
  const { boatUsedList } = props
  const routers = useRouter()
  const { register, errors, handleSubmit, control, setValue, clearErrors } =
    useForm({ mode: 'onBlur' })
  const {
    register: registerDiscount,
    errors: errorsDiscount,
    handleSubmit: handleSubmitDiscount,
  } = useForm({
    mode: 'onBlur',
  })

  const [startDate, setStartDate] = useState(new Date())
  const [isLoading, setLoading] = useState(false)
  const [isSubscribeLoading, setSubscribeLoading] = useState(false)
  const [botType, setBotType] = useState('rent')
  const [boatUsedType, setBoatUsedType] = useState(null)
  const [addLatLng, setAddLatLng] = useState(null)
  const [rangeDate, setRangeDate] = useState({
    departureDate: undefined,
    returnDate: undefined,
  })

  const { departureDate, returnDate } = rangeDate
  const modifiers = { start: departureDate, end: returnDate }
  const returnDateRef = useRef(null)

  const onLoad = (ref) => (refContainer = ref)

  const onPlacesChanged = () => {
    let places = refContainer.getPlaces()
    if (places.length > 0) {
      places = places[0]
      setAddLatLng({
        lat: places.geometry.location.lat(),
        lng: places.geometry.location.lng(),
      })
    }
  }

  const onSubmit = async (values) => {
    setLoading(true)
    values.departureDate = moment(values.departureDate).format('YYYY-MM-DD')
    values.returnDate = moment(values.returnDate).format('YYYY-MM-DD')
    if (values.miles) values.miles = values.miles.value
    if (values.passengers) values.passengers = values.passengers.value
    routers.push({
      pathname: router.SEARCHBOAT,
      query: values,
    })
  }
  const topDestinations = async (latitude, longitude, address) => {
    setLoading(true)
    const currentQuery = routers.query
    currentQuery.latitude = latitude
    currentQuery.longitude = longitude
    currentQuery.miles = 50
    currentQuery.address = address
    routers.push({
      pathname: router.SEARCHBOAT,
      query: currentQuery,
    })
  }
  const boatUsedTypeHandler = (id) => {
    setBoatUsedType(id)
  }

  const onSubmitNewsLetter = async (values, e) => {
    setSubscribeLoading(true)
    const { data, status, message } = await axiosPost(
      apiRouter.SUBSCRIBE,
      values
    )
    setSubscribeLoading(false)
    if (status == false) toaster('error', message)
    else {
      toaster('success', data.message)
      e.target.reset()
    }
  }

  const rangeDateHandler = (date, type) => {
    if (type == 'departure') {
      setValue('departureDate', date)
      setRangeDate({ ...rangeDate, departureDate: date })
      clearErrors('departureDate')
    } else {
      setValue('returnDate', date)
      setRangeDate({ ...rangeDate, returnDate: date })
      clearErrors('returnDate')
    }
  }

  useEffect(() => {
    if (!departureDate) return

    if (!returnDate) return

    if (moment(departureDate).isSameOrAfter(returnDate)) {
      setRangeDate({ ...rangeDate, returnDate: undefined })
    }
  }, [JSON.stringify(rangeDate)])

  return (
    <MainBlock>
      <SeoComponent metaDetail={{ title: 'Yoyoboat', desc: 'Yoyoboat' }} />
      <LadingBannerMain>
        <LadingBannerImage>
          <Image src="/images/landing-page-banner-img.png" alt="" />
        </LadingBannerImage>
        <LadingBannerDetails>
          <Container>
            <LadingBannerDetailsBlock>
              <Title isBannerTitle>Find your boat rental</Title>
              <BannerDetailsText>
                We're not everywhere yet, but take a look and experience the
                magic of a day on the water with a growing selection of boat
                rentals.
              </BannerDetailsText>
              <Form onSubmit={handleSubmit(onSubmit)} name="register">
                <Row>
                  <Col xs={6} sm={8} md={8} lg={12}>
                    <div className="form-main-cover-block">
                      <FormGroup>
                        <FormBlcok>
                          <IconLocatin>
                            <img src="/images/mappin-icon.svg" alt="" />
                          </IconLocatin>
                        </FormBlcok>
                        {errors.address && (
                          <ErrorMsg>Address is required</ErrorMsg>
                        )}
                        <input
                          type="hidden"
                          name="latitude"
                          value={(addLatLng && addLatLng.lat) || ''}
                          ref={register}
                        />
                        <input
                          type="hidden"
                          name="longitude"
                          value={(addLatLng && addLatLng.lng) || ''}
                          ref={register}
                        />
                        <input
                          type="hidden"
                          name="boatUsedType"
                          value={boatUsedType || ''}
                          ref={register}
                        />
                      </FormGroup>
                    </div>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={6}>
                    <div className="yoyo-radius-form">
                      <FormGroup>
                        <FormBlcok>
                          <IconLocatin isUserIcon>
                            <img src="/images/mappin-icon.svg" alt="" />
                          </IconLocatin>
                          <Controller
                            as={Select}
                            options={searchRadiusOptions}
                            name="miles"
                            rules={{ required: true }}
                            control={control}
                            placeholder="Radius"
                          />
                        </FormBlcok>
                        {errors.miles && (
                          <ErrorMsg>Radius is required</ErrorMsg>
                        )}
                      </FormGroup>
                    </div>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={6}>
                    <div className="">
                      <FormGroup>
                        <FormBlcok>
                          <IconLocatin isUserIcon>
                            <img src="/images/user-icon.svg" alt="" />
                          </IconLocatin>
                          <Controller
                            as={Select}
                            options={pasengerOptions()}
                            name="passengers"
                            placeholder="Passengers"
                            // rules={{ required: true }}
                            control={control}
                          />
                        </FormBlcok>
                        {/* {errors.pasenger && <ErrorMsg>pasenger is required</ErrorMsg>} */}
                      </FormGroup>
                    </div>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={6}>
                    <div className="yoyo-departure-and-return-box">
                      <FormGroup>
                        <FormBlcok>
                          <IconLocatin>
                            <img src="/images/calendar.svg" alt="" />
                          </IconLocatin>
                          <Controller
                            control={control}
                            name="departureDate"
                            render={(props) => (
                              <DayPickerInput
                                component={React.forwardRef((props, ref) => (
                                  <Input ref={ref} {...props} />
                                ))}
                                placeholder="Departure"
                                onDayChange={(day) => {
                                  rangeDateHandler(day, 'departure')
                                }}
                                onBlur={(day) =>
                                  rangeDateHandler(day, 'departure')
                                }
                                // formatDate={formatDate}
                                // parseDate={parseDate}
                                dayPickerProps={{
                                  selectedDays: [
                                    departureDate,
                                    { departureDate, returnDate },
                                  ],
                                  disabledDays: { before: new Date() },
                                  fromMonth: returnDate,
                                  modifiers,
                                  numberOfMonths: 2,
                                  onDayClick: () =>
                                    returnDateRef.current.focus(),
                                }}
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </FormBlcok>
                        {errors.departureDate && (
                          <ErrorMsg>Departure is required</ErrorMsg>
                        )}
                      </FormGroup>
                    </div>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={6}>
                    <div className="yoyo-departure-and-return-box">
                      <FormGroup>
                        <FormBlcok>
                          <IconLocatin>
                            <img src="/images/calendar.svg" alt="" />
                          </IconLocatin>
                          <Controller
                            control={control}
                            name="returnDate"
                            render={(props) => (
                              <DayPickerInput
                                component={React.forwardRef((props, ref) => (
                                  <Input ref={returnDateRef} {...props} />
                                ))}
                                placeholder="Return"
                                onDayChange={(day) => {
                                  rangeDateHandler(day, 'returnDate')
                                }}
                                value={returnDate}
                                // formatDate={formatDate}
                                // parseDate={parseDate}
                                dayPickerProps={{
                                  selectedDays: [
                                    departureDate,
                                    { departureDate, returnDate },
                                  ],
                                  disabledDays: { before: departureDate },
                                  modifiers,
                                  month: departureDate,
                                  fromMonth: departureDate,
                                  numberOfMonths: 2,
                                }}
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </FormBlcok>
                        {errors.returnDate && (
                          <ErrorMsg>Return date is required</ErrorMsg>
                        )}
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                <Row>
                  {boatUsedList.length > 0 &&
                    boatUsedList.map((type) => (
                      <Col sm={2} md={2} lg={3} key={type.id}>
                        <BoatCategory
                          onClick={() => boatUsedTypeHandler(type.id)}
                          className={`${
                            boatUsedType == type.id ? 'active' : ''
                          }`}>
                          <img src={type.boatIconFullPath} alt="" />
                          <p>{type.name}</p>
                        </BoatCategory>
                      </Col>
                    ))}
                </Row>
                <Button type="submit">
                  {isLoading ? (
                    <i className="fa fa-spinner fa-spin" />
                  ) : (
                    'Search'
                  )}
                </Button>
              </Form>
            </LadingBannerDetailsBlock>
          </Container>
        </LadingBannerDetails>
      </LadingBannerMain>
      <Container>
        <ChooseBoatMainBlock>
          <Row>
            <Col offset={{ md: 0.5, lg: 1 }} md={7} lg={10}>
              <Title>Choose your experience.</Title>
              <Row>
                {boatUsedList.length > 0 &&
                  boatUsedList.map((type) => (
                    <Col sm={2.66} md={2} lg={3} key={type.id}>
                      <Link
                        href={{
                          pathname: router.SEARCHBOAT,
                          query: { boatUsedType: type.id },
                        }}>
                        <ChooseBoatSubBlock>
                          <ChooseBoatsubItem>
                            <Image src={type.boatImageFullPath} alt="" />
                          </ChooseBoatsubItem>
                          <SubTitle>{type.name}</SubTitle>
                        </ChooseBoatSubBlock>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </ChooseBoatMainBlock>
      </Container>
      <MainHowItWorks>
        <Container>
          <Title id="how_it_works">Here’s how it works.</Title>
          <MainHowItWorksDetails>
            <TabbarHeaderWrapper>
              <TabbarHeaderUL>
                <TabbarHeaderLI
                  className={`${botType == 'rent' ? 'active' : ''}`}
                  onClick={() => setBotType('rent')}>
                  Rent a boat
                </TabbarHeaderLI>
                <TabbarHeaderLI
                  className={`${botType != 'rent' ? 'active' : ''}`}
                  onClick={() => setBotType('list')}>
                  List my boat
                </TabbarHeaderLI>
              </TabbarHeaderUL>
            </TabbarHeaderWrapper>
            {botType == 'rent' ? (
              <>
                <TabbarDetailsWrapper>
                  <TabbarDetailsUl>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>1</SubTitle>
                      </Pintnumber>
                      <SubTitle>Find the perfect boat</SubTitle>
                      <TabbarDetailsText>
                        Search for boats with the amenities you are looking for.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>2</SubTitle>
                      </Pintnumber>
                      <SubTitle>Book your boat</SubTitle>
                      <TabbarDetailsText>
                        Send the boat owner a booking request for your selected
                        dates.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>3</SubTitle>
                      </Pintnumber>
                      <SubTitle>Go to boat location</SubTitle>
                      <TabbarDetailsText>
                        Arrange a pick up time with the owner.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>4</SubTitle>
                      </Pintnumber>
                      <SubTitle>Hit the water!</SubTitle>
                      <TabbarDetailsText>
                        Enjoy the freedom of the open water and the assurance of
                        24./7 assistance.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>5</SubTitle>
                      </Pintnumber>
                      <SubTitle>Return</SubTitle>
                      <TabbarDetailsText>
                        After your great adventure, return the boat to its owner
                        inthsame condiction you received it.{' '}
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                  </TabbarDetailsUl>
                </TabbarDetailsWrapper>
                <Link href={router.SEARCHBOAT}>
                  <Button isSmallBtn>Search Boats</Button>
                </Link>
              </>
            ) : (
              <>
                <TabbarDetailsWrapper>
                  <TabbarDetailsUl>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>1</SubTitle>
                      </Pintnumber>
                      <SubTitle>Find the perfect boat</SubTitle>
                      <TabbarDetailsText>
                        Search for boats with the amenities you are looking for.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>2</SubTitle>
                      </Pintnumber>
                      <SubTitle>Book your boat</SubTitle>
                      <TabbarDetailsText>
                        Send the boat owner a booking request for your selected
                        dates.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>3</SubTitle>
                      </Pintnumber>
                      <SubTitle>Go to boat location</SubTitle>
                      <TabbarDetailsText>
                        Arrange a pick up time with the owner.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                    <TabbarDetailsLI>
                      <Pintnumber>
                        <SubTitle>4</SubTitle>
                      </Pintnumber>
                      <SubTitle>Hit the water!</SubTitle>
                      <TabbarDetailsText>
                        Enjoy the freedom of the open water and the assurance of
                        24./7 assistance.
                      </TabbarDetailsText>
                    </TabbarDetailsLI>
                  </TabbarDetailsUl>
                </TabbarDetailsWrapper>
                <Link href={router.LISTYOURBOAT} passHref>
                  <Button isSmallBtn>List my boat</Button>
                </Link>
              </>
            )}
          </MainHowItWorksDetails>
        </Container>
      </MainHowItWorks>
      <DiscoverDetailsBlockMain>
        <Container>
          <Row>
            <Col offset={{ md: 0.5, lg: 1 }} md={7} lg={10}>
              <Title>Discover our top destinations.</Title>
              <Row>
                <Col
                  xs={4}
                  sm={2.66}
                  md={2.66}
                  lg={4}
                  onClick={() =>
                    topDestinations(44.9778, -93.258133, 'Minneapolis, MN')
                  }>
                  <ChooseBoatSubBlock isBoatPlace>
                    <ChooseBoatsubItem isOverlyBefore>
                      <Image src="/images/discover_01.png" alt="" />
                    </ChooseBoatsubItem>
                    <SubTitle isBoatPlaceText>Minneapolis, MN</SubTitle>
                  </ChooseBoatSubBlock>
                </Col>
                <Col
                  xs={4}
                  sm={2.66}
                  md={2.66}
                  lg={4}
                  onClick={() =>
                    topDestinations(46.355934, -94.201408, 'Brainerd Lakes, MN')
                  }>
                  <ChooseBoatSubBlock isBoatPlace>
                    <ChooseBoatsubItem isOverlyBefore>
                      <Image src="/images/discover_02.png" alt="" />
                    </ChooseBoatsubItem>
                    <SubTitle isBoatPlaceText>Brainerd Lakes, MN</SubTitle>
                  </ChooseBoatSubBlock>
                </Col>
                <Col
                  xs={4}
                  sm={2.66}
                  md={2.66}
                  lg={4}
                  onClick={() =>
                    topDestinations(46.827316, -95.84816, 'Detroit Lakes, MN')
                  }>
                  <ChooseBoatSubBlock isBoatPlace>
                    <ChooseBoatsubItem isOverlyBefore>
                      <Image src="/images/discover_03.png" alt="" />
                    </ChooseBoatsubItem>
                    <SubTitle isBoatPlaceText>Detroit Lakes, MN</SubTitle>
                  </ChooseBoatSubBlock>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </DiscoverDetailsBlockMain>
      <SignUpFooterMain>
        <Container>
          <Row>
            <Col offset={{ md: 0.5, lg: 1 }} md={7} lg={10}>
              <SignUpWrapperBlock>
                <SubTitle isSignUpSection>
                  Be the first to get doses of destination inspiration, and
                  discount codes.
                </SubTitle>
                <Form
                  onSubmit={handleSubmitDiscount(onSubmitNewsLetter)}
                  name="newsletter">
                  <FormGroup>
                    <FormBlcok>
                      <Input
                        isNewsInput
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        ref={registerDiscount({ required: true })}
                      />
                      <Button
                        isNewsLetterBtn
                        disabled={isSubscribeLoading}
                        type="submit">
                        Sign up
                      </Button>
                    </FormBlcok>
                    {errorsDiscount.newsemail && (
                      <ErrorMsg>Email is required</ErrorMsg>
                    )}
                  </FormGroup>
                </Form>
              </SignUpWrapperBlock>
            </Col>
          </Row>
        </Container>
      </SignUpFooterMain>
    </MainBlock>
  )
}

export const getServerSideProps = async (ctx) => {
  const { req } = ctx
  let boatUsedList = []

  const boatUsedResult = await axiosGet(apiRouter.BOATUSEDTYPELIST)

  if (boatUsedResult.data && boatUsedResult.data.data) {
    boatUsedList = boatUsedResult.data.data
  }
  return {
    props: {
      boatUsedList,
    },
  }
}
export default Home
