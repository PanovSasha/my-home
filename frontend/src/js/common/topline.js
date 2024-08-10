import {
  $BODY,
  $DOCUMENT,
  $LOCAL_MENU,
  $TOPLINE,
  $WINDOW,
  BODY_LOCK_CLASS,
  LOCAL_SITE_MENU_CLASS,
  OVERFLOW_HIDDEN_CLASS,
  ROTATE_CLASS,
  S_DESKTOP_WIDTH,
  SCROLL_CLASS,
  SHOW_CLASS,
  TABLET_WIDTH,
} from '../lib/constants'

import { closeLocalMenu, isEscPressed } from '../lib/utils'

const $BURGER_BTN = $('.js-topline-burger')

const $NAV_MENU = $('.js-topline-nav')
const $SUBMENU_CONTAINERS = $('[data-menu-dock]')

export const closeAllSubMenu = () => {
  $SUBMENU_CONTAINERS.removeClass(SHOW_CLASS)
  $NAV_MENU.removeClass(OVERFLOW_HIDDEN_CLASS)
}

export const isToplineScroll = () => {
  if ($WINDOW.scrollTop() > 2) {
    $TOPLINE.addClass(SCROLL_CLASS)
  }
}

const toggleToplineShadow = () => {
  $WINDOW.on('scroll', () => {
    $TOPLINE.toggleClass(SCROLL_CLASS, $WINDOW.scrollTop() > 2)
  })

  isToplineScroll()
}

const closeLocalMenuByEscAndClickPress = () => {
  $DOCUMENT.on('click', function ({ target }) {
    if (
      $LOCAL_MENU !== target &&
      $TOPLINE.hasClass(LOCAL_SITE_MENU_CLASS) &&
      $BURGER_BTN !== target &&
      !$(target).parents('.js-topline').length
    ) {
      closeLocalMenu()
      $BODY.removeClass(BODY_LOCK_CLASS)

      checkLocalMenuStatus()
    }
  })

  $DOCUMENT.on('keyup', (event) => {
    if (isEscPressed(event) && $TOPLINE.hasClass(LOCAL_SITE_MENU_CLASS)) {
      closeLocalMenu()
      $BODY.removeClass(BODY_LOCK_CLASS)

      checkLocalMenuStatus()
    }
  })
}

const checkLocalMenuStatus = () => {
  if ($TOPLINE.hasClass(LOCAL_SITE_MENU_CLASS)) {
    $TOPLINE.removeClass(SCROLL_CLASS)
    $BODY.addClass(BODY_LOCK_CLASS)
  } else {
    isToplineScroll()
    closeAllSubMenu()
    $BODY.removeClass(BODY_LOCK_CLASS)
  }
}

const toggleLocalMenu = () => {
  $BURGER_BTN.on('click', function () {
    $TOPLINE.toggleClass(LOCAL_SITE_MENU_CLASS)
    $LOCAL_MENU.toggleClass(SHOW_CLASS)
    checkLocalMenuStatus()
  })
}

const copyLocalMenuItemsWithSubMenuToSubmenu = () => {
  const $items = $('.js-topline-nav-item-with-submenu')

  $.each($items, function (_, el) {
    const $item = $(el)
    const $submenu = $item.parent().find('.js-topline-sub-nav-tabs')

    $submenu.prepend(
      $item
        .clone()
        .removeClass()
        .addClass(
          'topline__sub-nav-1-item' +
            ' topline__sub-nav-1-item--title' +
            ' js-topline-sub-nav-1-item  accessibility-link'
        )
    )
  })
}

const toggleShowSubMenu = () => {
  const $navItemsShell = $('.js-topline-nav-item-container')

  $.each($navItemsShell, function (_, el) {
    const $el = $(el)

    const $menuItems = $el.find('.js-topline-nav-item')
    const $subMenus = $el.find('.js-topline-sub-nav-1')
    const $submenuItems = $el.find('.js-topline-sub-nav-1-item')

    const $toggleShowBtn = $el.find('.js-topline-nav-item-open-btn')

    $.each($submenuItems, function (_, el) {
      const $el = $(el)

      $el.on('focus', function () {
        $el.parents('.js-topline-sub-nav-1').addClass(SHOW_CLASS)
      })
    })

    $.each($menuItems, function (_, el) {
      const $el = $(el)

      $el.on('focus', function () {
        if (!$el.hasClass('js-topline-nav-item-with-submenu')) {
          $('.js-topline-sub-nav-1').removeClass(SHOW_CLASS)
        }
      })
    })

    $toggleShowBtn.on('click', function () {
      if ($WINDOW.width() <= TABLET_WIDTH) {
        $subMenus.toggleClass(SHOW_CLASS)
      }
    })
  })
}

const toggleRotateClassByBtnPress = () => {
  const $toggleShowBtn = $('.js-topline-nav-item-open-btn')

  $toggleShowBtn.on('click', function () {
    const $t = $(this)

    $t.toggleClass(ROTATE_CLASS)
  })
}

const toggleShowLanguageBtns = () => {
  const $btsShell = $('.js-topline-lang-btns')
  const $showBtn = $('.js-topline-nav-item-open-btn')

  $showBtn.on('click', function () {
    if ($WINDOW.width() <= TABLET_WIDTH) {
      $btsShell.toggleClass(SHOW_CLASS)
    }
  })
}

export const topLineFunctions = () => {
  closeLocalMenuByEscAndClickPress()
  toggleToplineShadow()
  toggleLocalMenu()
  copyLocalMenuItemsWithSubMenuToSubmenu()
  toggleShowSubMenu()
  toggleRotateClassByBtnPress()
  toggleShowLanguageBtns()

  //TODO - 1.07.24 сделать проверку при ресайзе
  // runFnByWinResize(toggleShowSubMenu)

  $WINDOW.on('resize', function () {
    if ($WINDOW.width() > S_DESKTOP_WIDTH) {
      isToplineScroll()

      $TOPLINE.removeClass(LOCAL_SITE_MENU_CLASS)
      $BODY.removeClass(BODY_LOCK_CLASS)
    }
  })
}
