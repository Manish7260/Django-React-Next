const prefixRouteV1 = (route) => {
  return `v1/${route}`
}

const apiRouter = {
  SIGNUP: prefixRouteV1('auth/signup'),
  FORGOTPASS: prefixRouteV1('auth/forgot-password'),
  RESETPASS: prefixRouteV1('auth/reset-password'),
  LOGIN: 'user/login',
  SOCIALLOGIN: prefixRouteV1('auth/social-login'),
  REFRESHTOKEN: 'user/refresh-token',
  USER: prefixRouteV1('user'),
}

export default apiRouter
