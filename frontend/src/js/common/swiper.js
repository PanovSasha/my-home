import Swiper from 'swiper/bundle'
import { SHOW_CLASS } from '../lib/constants'

export const swiperFunctions = () => {
  const ACTIVE_SLIDER_CLASS = 'active-slide'

  const housesSliderFns = () => {
    const housesSlider = new Swiper('.js-houses-slider', {
      // slidesPerView: 3,
      // spaceBetween: 2,

      breakpoints: {
        // 1024: {
        //   slidesPerView: 3,
        //   spaceBetween: 2,
        // },

        1280: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
      speed: 500,
      // pagination: {
      //   el: '.js-pro-nav-fraction',
      //   type: 'fraction',
      // },
      //
      // navigation: {
      //   prevEl: '.js-pro-nav-btn-prev',
      //   nextEl: '.js-pro-nav-btn-next',
      // },
    })
  }

  const detailSliderFns = () => {
    const copyPreviewImgToThumbsSlides = () => {
      const $slideImages = $('.js-swiper-slide')
      const $thumbsWrapper = $('.js-detail-sls-thumbs-wrapper')
      const $thumbsContainer = $('.detail-sls__thumbs-container')

      if ($slideImages.length && $slideImages.length > 1) {
        $thumbsContainer.addClass(SHOW_CLASS)

        $.each($slideImages, function (i, el) {
          const $slide = $(el)
          const thumbsSlide = $slide
            .clone()
            .removeClass()
            .addClass('swiper-slide detail-sls-thumbs__slide' + ' js-detail-sls-thumbs-slide')

          if (i === 0) {
            thumbsSlide.addClass('swiper-slide-thumb-active')
          }

          const thumbsSlideImg = thumbsSlide.find('img').removeClass().addClass('detail-sls-thumbs__slide-img')

          thumbsSlide.html(`<div class="detail-sls-thumbs__slide-img-container">${thumbsSlideImg[0].outerHTML}</div>`)
          $thumbsWrapper.append(thumbsSlide)
        })
      } else {
        $thumbsContainer.hide()
      }
    }

    copyPreviewImgToThumbsSlides()

    const bimDThumbs = new Swiper('.js-detail-sls-thumbs', {
      spaceBetween: 8,
      slidesPerView: 8,
    })

    const bimDPreview = new Swiper('.js-detail-sls-preview', {
      pagination: {
        el: '.js-detail-sls-preview-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.js-detail-sls-thumbs-btn-prev',
        nextEl: '.js-detail-sls-thumbs-btn-next',
      },
      thumbs: {
        swiper: bimDThumbs,
      },
    })

    const fixChangeHeaderSliderThumbs = () => {
      const $THUMBS = $('.js-boiler-sls-thumbs-slide')

      $THUMBS.on('click', function () {
        const $t = $(this)

        if (!$t.hasClass(ACTIVE_SLIDER_CLASS)) {
          $.each($THUMBS, (i, el) => {
            if (this === el) {
              bimDThumbs.slideTo(i)
              bimDThumbs.allowSlideNext = true

              bimDPreview.slideTo(i)
              bimDPreview.allowSlideNext = true

              $THUMBS.removeClass(ACTIVE_SLIDER_CLASS)
              $t.addClass(ACTIVE_SLIDER_CLASS)
            }
          })
        }
      })
    }

    fixChangeHeaderSliderThumbs()
  }

  detailSliderFns()
  housesSliderFns()
}
