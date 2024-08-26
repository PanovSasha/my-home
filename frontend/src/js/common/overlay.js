import {
  $BODY,
  $DOCUMENT,
  $TOPLINE,
  BODY_LOCK_CLASS,
  BORDER_BOTTOM_CLASS,
  DIRECTIONS_MENU_CLASS,
  SHOW_CLASS,
  YA_POPUP_CLASS,
} from '../lib/constants'
import { isEscPressed } from '../lib/utils'

export const closeOverlay = () => {
  const $overlay = $('.js-overlay')
  const $overlay_items = $('.js-overlay-item')

  $overlay.removeClass(SHOW_CLASS).removeClass(YA_POPUP_CLASS)
  $overlay_items.removeClass(SHOW_CLASS)
}

export function overlaysFunctions() {
  const $overlay = $('.js-overlay')
  const $overlayItems = $('.js-overlay-item')
  const $BTNS = $('.js-show-overlay-btn')

  const checkMeteorMenuStatus = () => {
    if ($overlay.hasClass(SHOW_CLASS)) {
      $BODY.addClass(BODY_LOCK_CLASS)
      $TOPLINE.addClass(BORDER_BOTTOM_CLASS)
    } else {
      $BODY.removeClass(BODY_LOCK_CLASS)
      $TOPLINE.removeClass(BORDER_BOTTOM_CLASS).removeClass(DIRECTIONS_MENU_CLASS)
    }
  }

  const openOverlay = () => {
    $BTNS.on('click', function (event) {
      const $btn = $(this)
      const $overlayVal = $btn.attr('data-overlay')

      $overlay.addClass(SHOW_CLASS)
      $overlayItems.removeClass(SHOW_CLASS)
      $(`div[data-overlay="${$overlayVal}"]`).addClass(SHOW_CLASS)

      if ($overlayVal === 'd-menu') {
        $TOPLINE.addClass(DIRECTIONS_MENU_CLASS)
      }

      checkMeteorMenuStatus()
    })
  }

  const closeOverlayByActions = () => {
    $overlay.on('click', ({ target }) => {
      if ($(target).hasClass('js-overlay')) {
        closeOverlay()
        checkMeteorMenuStatus()
      }
    })

    $DOCUMENT.on('keyup', (event) => {
      if (isEscPressed(event)) {
        closeOverlay()
        checkMeteorMenuStatus()
      }
    })
  }

  const closeOverlayByCloseBtn = () => {
    const $closeBtn = $('.js-overlay-close-btn')

    $closeBtn.on('click', function () {
      closeOverlay()
      checkMeteorMenuStatus()
    })
  }

  openOverlay()
  closeOverlayByActions()
  closeOverlayByCloseBtn()
}
