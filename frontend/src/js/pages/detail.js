import { SHOW_CLASS } from '../lib/constants'

const orderFns = () => {
  const $orderShell = $('.js-detail-info-order')

  if ($orderShell.length) {
    const $showFormBtn = $orderShell.find('.js-detail-info-order-show-form-btn')
    const $form = $orderShell.find('.js-detail-info-order-form')

    const showForm = () => {
      $showFormBtn.on('click', function () {
        $showFormBtn.hide()

        $form.addClass(SHOW_CLASS)
      })
    }

    const submitOrderFns = () => {
      const $submitBtn = $orderShell.find('.js-detail-info-order-form-submit-btn')

      const submitOrder = () => {}

      $submitBtn.on('click', function () {
        const $t = $(this)

        submitOrder()
      })
    }

    showForm()
    submitOrderFns()
  }
}

export const detailFns = () => {
  orderFns()
}
