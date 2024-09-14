import { ACTIVE_CLASS, OPEN_CLASS } from '../lib/constants'

//TODO - переписать селект
export function selectFunctions() {
  const $SELECTS = $('.js-select')

  if ($SELECTS.length) {
    $.each($SELECTS, function (_, select) {
      const $select = $(select)

      const $currentBtn = $select.find('.js-select-current-btn')
      const $options = $select.find('.js-select-option')
      const $nativeSelect = $select.find('.js-select-native')

      $currentBtn.on('click', function () {
        $select.toggleClass(OPEN_CLASS)
      })

      $options.on('click', function () {
        const $t = $(this)

        $options.removeClass(ACTIVE_CLASS)
        $t.addClass(ACTIVE_CLASS)

        if ($select.hasClass('js-catalog-result-title-sort-select')) {
          if ($t.hasClass('js-select-option-up')) {
            $select.removeClass('down').addClass('up')
          }

          if ($t.hasClass('js-select-option-down')) {
            $select.removeClass('up').addClass('down')
          }
        } else {
          $currentBtn.text($t.text())
        }

        $select.removeClass(OPEN_CLASS)
        $nativeSelect.attr('selected', 'selected')

        // $(this).click()
      })
    })
  }

  // const closeDropdown = () => $('body').find('.js-select').removeClass(ACTIVE_CLASS)
  //
  // const setValue = ($target) => {
  //   const $currentSelect = $target.parents('.js-select')
  //   const $currentSelectButton = $('.js-select-current-btn', $currentSelect)
  //   const $currentOptions = $('.js-select-option', $currentSelect)
  //
  //   const value = $target.data('value').toString().trim()
  //   const text = $target.text().trim()
  //   $currentOptions.removeClass(CURRENT_CLASS)
  //
  //   if ($currentSelectButton.length) {
  //     $currentSelectButton.text(text)
  //   }
  //
  //   $currentOptions.each(function () {
  //     const $t = $(this)
  //
  //     if (value === text) {
  //       $t.addClass(CURRENT_CLASS)
  //     }
  //   })
  //
  //   setNativeValue($currentSelect, value)
  //
  //   closeDropdown()
  // }
  //
  // const setNativeValue = ($currentSelect, value) => {
  //   const $nativeOptions = $('option', $currentSelect)
  //
  //   $nativeOptions.each(function () {
  //     const $t = $(this)
  //
  //     if ($t.attr('value') === value) {
  //       $nativeOptions.removeAttr('selected')
  //       $t.attr('selected', 'selected')
  //       // имитация клика по select чтобы отрабатывали события change
  //       $(this).click()
  //     }
  //   })
  // }
  //
  // const toggleSelectOptions = () => {
  //   $.each($SELECTS, function (_, el) {
  //     const $select = $(el)
  //     const $toggleBtn = $select.find('.js-select-current-btn:first')
  //     const $optionsBtns = $select.find('.js-select-option')
  //
  //     const $toggleCalendarBtn = $select.find('.js-search-panel-calendar-input:first')
  //
  //     $toggleBtn.off()
  //
  //     $toggleBtn.on('click', function () {
  //       if ($select.hasClass(ACTIVE_CLASS)) {
  //         closeDropdown()
  //       } else {
  //         $SELECTS.removeClass(ACTIVE_CLASS)
  //         $select.toggleClass(ACTIVE_CLASS)
  //       }
  //     })
  //
  //     $optionsBtns.off()
  //
  //     $optionsBtns.on('click', function () {
  //       const $optionsBtn = $(this)
  //
  //       if ($optionsBtn.hasClass('js-select-option-open-calendar')) {
  //         closeDropdown()
  //         $toggleCalendarBtn.focus()
  //         $toggleCalendarBtn.trigger('click')
  //       } else {
  //         if (!$optionsBtn.hasClass(CURRENT_CLASS)) {
  //           setValue($optionsBtn)
  //         } else {
  //           closeDropdown()
  //         }
  //       }
  //     })
  //   })
  // }
  //
  // $DOCUMENT.on('click', '.js-select-option', function () {
  //   const $t = $(this)
  //
  //   $t.parents('.js-select').attr('data-changed', true)
  //
  //   if (!$t.hasClass(CURRENT_CLASS)) {
  //     setValue($t)
  //   } else {
  //     closeDropdown()
  //   }
  // })
  //
  // $DOCUMENT.on('click.select', ({ target }) => {
  //   if ($(target).closest($SELECTS).length) {
  //     return false
  //   }
  //   closeDropdown()
  // })
  //
  // $DOCUMENT.on('keyup.select', (event) => {
  //   if (isEscPressed(event)) {
  //     closeDropdown()
  //   }
  // })
  //
  // // $DOCUMENT.on('change', 'select', function () {
  // //   console.log('не нужный change select')
  // //   setValue($(this).children(':selected'))
  // // })
  //
  // toggleSelectOptions()
}
