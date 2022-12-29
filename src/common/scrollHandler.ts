// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

const preventDefault = (e) => {
  e.preventDefault()
}

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

const checkSupport = () => {
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true
        },
      }),
    )
  } catch (e) {
    console.log(e)
  }

  const wheelOpt = supportsPassive ? { passive: false } : false
  const wheelEvent =
    'onwheel' in window.document.createElement('div') ? 'wheel' : 'mousewheel'
  return { wheelEvent, wheelOpt }
}

export const disableScroll = () => {
  const { wheelEvent, wheelOpt } = checkSupport()
  window.addEventListener('DOMMouseScroll', preventDefault, false)
  window.addEventListener(wheelEvent, preventDefault, wheelOpt)
  window.addEventListener('touchmove', preventDefault, wheelOpt)
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}

export const enableScroll = () => {
  const { wheelEvent, wheelOpt } = checkSupport()
  window.removeEventListener('DOMMouseScroll', preventDefault, false)
  // @ts-ignore
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
  // @ts-ignore
  window.removeEventListener('touchmove', preventDefault, wheelOpt)
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
}
