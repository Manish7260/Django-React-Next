export const seoDetail = {
  title: '',
  canonical: '',
  desc: '',
  image: '/images/YoYoBoat_Logo.png',
  keywords: 'Yoyoboat, boat, rental',
  siteName: '',
  siteIcon: '',
}

export const boatYear = () => {
  let currentYear = new Date().getFullYear()
  let years = []
  let startYear = 1940
  for (let year = currentYear; year >= startYear; year--) {
    years.push({ value: year, label: year })
  }
  return years
}

export const pasengerOptions = () => {
  let passengerArr = []
  for (var digit = 1; digit <= 100; digit++) {
    passengerArr.push({ value: digit, label: digit })
  }
  return passengerArr
}

export const monthArray = [
  { value: '1', label: 'Jan' },
  { value: '2', label: 'Feb' },
  { value: '3', label: 'Mar' },
  { value: '4', label: 'Apr' },
  { value: '5', label: 'May' },
  { value: '6', label: 'Jun' },
  { value: '7', label: 'Jul' },
  { value: '8', label: 'Aug' },
  { value: '9', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
]

export const searchRadiusOptions = [
  { value: 10, label: '10 miles' },
  { value: 25, label: '25 miles' },
  { value: 50, label: '50 miles' },
  { value: 100, label: '100 miles' },
  { value: 0, label: 'Anywhere' },
]

export const cardBrand = {
  Visa: { image: '/images/visa.svg' },
  MasterCard: { image: '/images/maestro.svg' },
  'American Express': { image: '/images/american-express.svg' },
  JCB: { image: '/images/JCB-logo-card.svg' },
  'Diners Club': { image: '/images/diners-club-seeklogo.svg' },
  Discover: { image: '/images/discover.svg' },
  UnionPay: { image: '/images/UnionPay-card.svg' },
  noImage: { image: '/images/svg/credit-card-icon.svg' },
}

export const passenger = Array.from(Array(100).keys())
