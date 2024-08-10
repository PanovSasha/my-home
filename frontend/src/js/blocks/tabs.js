import { ACTIVE_CLASS, BTN_PRIMARY_CLASS, BTN_SECONDARY_CLASS, SHOW_CLASS } from '../lib/constants'

const showDockByTabsPress = () => {
  const $tabsContainers = $('.js-tabs-container')

  $.each($tabsContainers, function (_, el) {
    const $tabsContainer = $(el)
    const $tabs = $tabsContainer.find('.js-tab')

    $tabs.on('click', function () {
      const $tab = $(this)
      const tabsGroup = $tab.parent().attr('data-tabs-group')
      const $docks = $(`[data-dock-group=${tabsGroup}]`)

      if (!$tab.hasClass(ACTIVE_CLASS)) {
        $tabs.removeClass(ACTIVE_CLASS).removeClass(BTN_PRIMARY_CLASS).addClass(BTN_SECONDARY_CLASS)
        $tab.addClass(ACTIVE_CLASS).addClass(BTN_PRIMARY_CLASS).removeClass(BTN_SECONDARY_CLASS)

        $docks.removeClass(SHOW_CLASS)
        $(`[data-dock="${$tab.attr('data-tab')}"]`).addClass(SHOW_CLASS)
      }
    })
  })
}

export const tabsFunctions = () => {
  showDockByTabsPress()
}
