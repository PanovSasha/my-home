import { ERROR_CLASS } from '../lib/constants'

export const orderFormFns = () => {
  const $form = $('.js-order-form')

  if ($form.length) {
    const $agreeCheckbox = $form.find('.js-order-form-agree-input')
    const $inputs = $form.find('.js-order-form-input')

    const sendData = () => {
      // адрес http://moidom.xyz/api/v1/addFormRecord
      // параметры params, type, bot
      //
      // params это объект содержит fullName, phone, email
      // type строка может иметь значение consultation или calculation иначе ошибка
      // bot нужен для проверки на бота если 0 то все хорошо иначе ошибка
      //
      // проверку на бота можешь навесить на событие input обязательного поля если оно произошло то это не бот и отправляем 0 иначе отправляем 1 или любое удобное для тебя значение
      // $.ajax({
      //   url: 'http://moidom.xyz/api/v1/addFormRecord',
      //   method: 'post',
      //   username: 'user',
      //   password: 'AdsgdX32ga@',
      //   data: { form: { ...data } },
      //   success: function ({ errors }) {
      //     let isError = false
      //
      //     $SUBMIT_BTN.hide()
      //
      //     if (errors.length) {
      //       errors.forEach(({ code }) => {
      //         isError = true
      //         $FORM.hide()
      //         $errorBlock.show()
      //
      //         if (code === 6) {
      //           console.log('ошибка капчи')
      //         }
      //       })
      //     }
      //
      //     if (isError === false) {
      //       $FORM.hide()
      //       $successBlock.show()
      //     }
      //   },
      // })
    }

    const checkInputValueByInput = () => {
      $inputs.on('input', function () {
        const $t = $(this)

        const $tPlaceholder = $t.parent().find('.js-order-form-input-placeholder')
        if ($t.val().trim() === '') {
          $tPlaceholder.show()
        } else {
          $tPlaceholder.hide().removeClass(ERROR_CLASS)
        }

        // checkFormFields()
      })
    }

    checkInputValueByInput()
  }
}
