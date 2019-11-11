import "./styles.css";
import generatePassword from "omgopass";

document.addEventListener("DOMContentLoaded", () => {
  const $password = document.getElementsByName("password")[0];
  const $button = document.getElementsByClassName("button")[0];
  const $copyButton = document.getElementsByClassName("password__copy")[0];
  const $numbers = document.getElementsByName("numbers")[0];
  const $titlecase = document.getElementsByName("titlecase")[0];

  const renderPassword = () => {
    $password.value = generatePassword({
      hasNumbers: $numbers.checked,
      titlecased: $titlecase.checked
    });
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

  $password.addEventListener("click", () => {
    $password.select();
  });
});
