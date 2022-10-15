import { darken, lighten, complement, transparentize, rgba } from 'polished'

// https://www.htmlcsscolor.com
const black = '#000000'
const black05 = rgba(black, 0.05)
const black25 = rgba(black, 0.25)
const black75 = rgba(black, 0.75)
const crimson = '#DC143C'
const dodgerBlue = '#157DFB'
const dodgerBlue30 = transparentize(0.3, dodgerBlue)
const dodgerBlueDark = darken(0.2, dodgerBlue)
const dodgerBlueLight = lighten(0.2, dodgerBlue)
const dodgerBlueUltraLight = lighten(0.42, dodgerBlue)
const kellyGreen = '#3CDC14'
const matterhorn = '#575757'
const nero = '#222222'
const nightRider = '#333333'
const nobel = '#999999'
const persianBlue = '#143CDC'
const sunFlower = '#DCB414'
const white = '#FFFFFF'

const colors = {
  black,
  black05,
  black25,
  black75,
  crimson,
  dodgerBlue,
  kellyGreen,
  matterhorn,
  nero,
  nightRider,
  nobel,
  persianBlue,
  sunFlower,
  white,
}

export default colors
