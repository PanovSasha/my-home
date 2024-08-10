import { ACTIVE_CLASS } from "../lib/constants";

const $btns = $(".js-accord-btn");

const toggleShowAccordionBody = () => {
  $btns.on("click", function () {
    const $btn = $(this);
    const $accordionContainer = $btn.parent(".js-accord");

    $accordionContainer.toggleClass(ACTIVE_CLASS);
  });
};

export const accordFunctions = () => {
  toggleShowAccordionBody();
};
