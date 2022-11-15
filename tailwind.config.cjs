/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const {
  darken,
  lighten,
  invert,
  complement,
  transparentize,
  rgba,
} = require('polished')

// https://www.htmlcsscolor.com
const black = '#000000'
const black05 = rgba(black, 0.05)
const black25 = rgba(black, 0.25)
const black75 = rgba(black, 0.75)
const crimson = '#DC143C'
const dodgerBlue = '#157DFB'
const kellyGreen = '#3CDC14'
const matterhorn = '#575757'
const nero = '#222222'
const nightRider = '#333333'
const nobel = '#999999'
const persianBlue = '#143CDC'
const sunFlower = '#DCB414'
const white = '#FFFFFF'
const transparent = rgba(255, 255, 255, 0)

// USES
const background = white
const border = lighten(0.7, nightRider)
const borderLight = lighten(0.5, nightRider)
const copy = matterhorn
const copyLight = nobel
const copyDark1 = nero
const copyDark0 = black
const linkColor = copy
// const primary = crimson
const primary = dodgerBlue
const primary30 = transparentize(0.3, primary)
const primaryDark = darken(0.2, primary)
const primaryLight = lighten(0.2, primary)
const primaryUltraLight = lighten(0.42, primary)
const accent = complement(lighten(0.2, primary))

const COLORS = {
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
  transparent,
  white,
}

const USES = {
  accent,
  dm: {
    background: {
      DEFAULT: nero,
    },
    border: {
      DEFAULT: invert(border),
      light: invert(borderLight),
    },
    copy: {
      DEFAULT: white,
      dark1: invert(copyDark1),
      dark0: invert(copyDark0),
      light: invert(copyLight),
      white: black,
    },
  },
  background: {
    DEFAULT: background,
  },
  border: {
    DEFAULT: border,
    light: borderLight,
  },
  copy: {
    DEFAULT: copy,
    dark1: copyDark1,
    dark0: copyDark0,
    light: copyLight,
    white,
  },
  primary: {
    op30: primary30,
    ultraLight: primaryUltraLight,
    light: primaryLight,
    DEFAULT: primary,
    dark: primaryDark,
  },
  status: {
    error: crimson,
    info: persianBlue,
    success: kellyGreen,
    warn: sunFlower,
  },
}

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      ...COLORS,
      ...USES,
    },
    fontFamily: {
      sans: 'futura-pt, Arial, sans-serif',
      serif: 'proxima-nova serif',
      mono: 'Menlo, Monaco, Lucida Console, Courier New, monospace',
    },
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
      },
      fontSize: {
        p: [
          '1.1rem',
          {
            fontWeight: 300,
            lineHeight: '1.8em',
          },
        ],
        link: [
          '90%',
          {
            fontWeight: 300,
            letterSpacing: '2px',
            lineHeight: '1',
          },
        ],
        h1: [
          '2rem',
          {
            fontWeight: 300,
            letterSpacing: '0.06em',
            lineHeight: '1.5em',
          },
        ],
        h2: [
          '1.5rem',
          {
            fontWeight: 400,
            letterSpacing: '0.1em',
            lineHeight: '1.5em',
          },
        ],
        h3: [
          '0.875rem',
          {
            fontWeight: 400,
            letterSpacing: '0.4em',
            lineHeight: '1.75em',
          },
        ],
      },
    },
  },
  plugins: [],
}
