import Swiper from 'swiper/bundle'
import { $WINDOW, TABLET_WIDTH } from '../lib/constants'
import { runFnByWinResize } from '../lib/utils'

export const swiperFunctions = () => {
  const switchOnOffSlider = (slider) => {
    if ($WINDOW.width() <= TABLET_WIDTH) {
      slider.disable()
    } else {
      slider.enable()
    }
  }

  const topSliderFns = () => {
    const topProjects = new Swiper('.js-top-projects', {
      slidesPerView: 1,
      speed: 1200,
      breakpoints: {
        1: {
          pagination: {
            el: '.js-top-slider-pagination',
            clickable: true,
          },
        },
        1024: {
          pagination: {
            el: '.js-top-slider-nav-fraction',
            type: 'fraction',
          },
        },
      },

      navigation: {
        prevEl: '.js-top-slider-nav-btn-prev',
        nextEl: '.js-top-slider-nav-btn-next',
      },
    })

    const setButtonsLeftOffset = () => {
      const $nav = $('.js-top-slider-nav')

      if ($nav.length && $WINDOW.width() > TABLET_WIDTH) {
        const $anchor = $('.swiper-slide-active .js-top-slider-slide-info-img-shell')

        $nav.css('left', `${$anchor.outerWidth() + 40}px`)
      }
    }

    setButtonsLeftOffset()

    $WINDOW.on('resize', function () {
      setButtonsLeftOffset()
    })
  }

  const objectsSliderFns = () => {
    const objectsSlider = new Swiper('.js-objects-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 2,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 2,
        },
      },
      speed: 1200,
      pagination: {
        el: '.js-objects-slider-nav-fraction',
        type: 'fraction',
      },

      navigation: {
        prevEl: '.js-objects-slider-nav-btn-prev',
        nextEl: '.js-objects-slider-nav-btn-next',
      },
    })

    switchOnOffSlider(objectsSlider)
    runFnByWinResize(() => {
      switchOnOffSlider(objectsSlider)
    })
  }

  const mediaSliderFns = () => {
    const mediaSlider = new Swiper('.js-media-slider', {
      slidesPerView: 'auto',
      spaceBetween: 2,
      breakpoints: {
        640: {
          spaceBetween: 2,
        },
        1024: {
          spaceBetween: 2,
        },
      },
      speed: 1200,
      pagination: {
        el: '.js-media-slider-nav-fraction',
        type: 'fraction',
      },

      navigation: {
        prevEl: '.js-media-slider-nav-btn-prev',
        nextEl: '.js-media-slider-nav-btn-next',
      },
    })
  }

  const projectsSliderFns = () => {
    const projectSlider = new Swiper('.js-pro-slider', {
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 2,
        },

        1280: {
          slidesPerView: 4,
          spaceBetween: 2,
        },
      },
      speed: 1200,
      pagination: {
        el: '.js-pro-nav-fraction',
        type: 'fraction',
      },

      navigation: {
        prevEl: '.js-pro-nav-btn-prev',
        nextEl: '.js-pro-nav-btn-next',
      },
    })

    const showMoreSlidesByMoreBtnPress = () => {
      let clickCount = 1

      const checkHiddenSlides = function () {
        clickCount++

        $.each($slides, function (i, el) {
          const $el = $(el)

          if (i >= 4 * clickCount) {
            $el.hide()
          } else {
            $el.show()
          }
        })

        if (4 * clickCount >= $slides.length) {
          $moreBtn.hide()
        }

        return clickCount
      }

      const $proShell = $('.js-pro')
      const $moreBtn = $proShell.find('.js-pro-btn-more')
      const $slides = $proShell.find('.js-pro-slide')

      $moreBtn.on('click', function () {
        checkHiddenSlides(clickCount)
      })
    }

    switchOnOffSlider(projectSlider)
    runFnByWinResize(() => {
      switchOnOffSlider(projectSlider)
    })

    showMoreSlidesByMoreBtnPress()
  }

  const teamSliderFns = () => {
    const teamSlider = new Swiper('.js-team-slider', {
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 2,
        },
      },
      speed: 1200,
      pagination: {
        el: '.js-team-nav-fraction',
        type: 'fraction',
      },

      navigation: {
        prevEl: '.js-team-nav-btn-prev',
        nextEl: '.js-team-nav-btn-next',
      },
    })

    switchOnOffSlider(teamSlider)
    runFnByWinResize(() => {
      switchOnOffSlider(teamSlider)
    })
  }

  topSliderFns()
  objectsSliderFns()
  mediaSliderFns()
  projectsSliderFns()
  teamSliderFns()
}
