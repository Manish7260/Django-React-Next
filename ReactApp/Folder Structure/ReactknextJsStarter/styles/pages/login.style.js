import styled, { css } from 'styled-components'
import theme from '../global/theme'
import { mediaQueries } from '../../utils/mediaQuery'
// login page css file start //
export const LoginPageWrapper = styled.div`
  background: ${theme.color.lightblue};
  padding: 20px;
  height: 96vh;
  display: flex;
  align-items: center;
  position: relative;
  ${mediaQueries('sm')`
        flex-direction: column;
        height: 100%;
    `}
`
export const LoginFormWrapper = styled.div`
  height: 90%;
  overflow: auto;
  max-width: 350px;
  margin-left: 140px;
  width: 100%;
  margin-right: 125px;
  ${mediaQueries('xl')`
        max-width: 320px;
        margin-left: 80px;
        margin-right: 80px;
    `}
  ${mediaQueries('lg')`
        margin-left: 0;
        margin-right: 25px;
    `}
    ${mediaQueries('md')`
        max-width: 250px;
    `}	
    ${mediaQueries('sm')`
        padding: 70px 0 30px;
        max-width: 100%;
        margin-right: 0;
    `}
`
export const LoginImageBlock = styled.div`
  background: ${theme.color.white};
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  ${mediaQueries('sm')`
        height: 270px;
    `}
`
export const AccountLink = styled.p`
  font-size: 14px;
  font-family: ${theme.font.fontFamilyCircularStdBook};
  color: ${theme.color.lightblack};
  margin-top: 15px;
  a {
    margin-left: 5px;
  }
`
// login page css file start //
