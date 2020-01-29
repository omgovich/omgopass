import "./styles.css";
import generatePassword from "omgopass";

document.addEventListener("DOMContentLoaded", () => {
  const $separators = document.getElementsByName("separators");
  const $password = document.getElementsByName("password")[0];
  const $button = document.getElementsByClassName("button")[0];
  const $copyButton = document.getElementsByClassName("password__copy")[0];
  const $numbers = document.getElementsByName("numbers")[0];
  const $titlecase = document.getElementsByName("titlecase")[0];

  const getMode = () => {
    for (var i = 0; i < $separators.length; i++) {
      if ($separators[i].checked) return $separators[i].value;
    }
  };

  const getOptions = () => {
    const mode = getMode();

    if (mode === "spaces") {
      return {
        minSyllableLength: 4,
        maxSyllableLength: 6,
        hasNumbers: false,
        titlecased: false,
        separators: " "
      };
    }

    return {
      hasNumbers: $numbers.checked,
      titlecased: $titlecase.checked,
      separators: mode === "symbols" ? "-=~+" : ""
    };
  };

  const renderPassword = () => {
    $password.value = generatePassword(getOptions());
  };

  const copyToClipboard = () => {
    $password.select();
    document.execCommand("copy");

    if (document.selection) {
      document.selection.empty();
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  renderPassword();

  $button.addEventListener("click", renderPassword);
  $numbers.addEventListener("change", renderPassword);
  $titlecase.addEventListener("change", renderPassword);
  $copyButton.addEventListener("click", copyToClipboard);

  for (var i = 0; i < $separators.length; i++) {
    $separators[i].addEventListener("change", () => {
      const disableToggles = getMode() === "spaces";
      $numbers.disabled = disableToggles;
      $titlecase.disabled = disableToggles;
      renderPassword();
    });
  }

  $password.addEventListener("click", () => {
    $password.select();
  });
});
