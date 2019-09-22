import "./styles.css";
import { generatePassword } from "omgopass";

document.addEventListener("DOMContentLoaded", () => {
  const $password = document.getElementsByClassName("password")[0];
  const $button = document.getElementsByClassName("button")[0];
  const $numbers = document.getElementsByName("numbers")[0];
  const $titlecase = document.getElementsByName("titlecase")[0];

  const renderPassword = () => {
    $password.innerHTML = generatePassword({
      hasNumbers: $numbers.checked,
      titlecased: $titlecase.checked
    });
  };

  renderPassword();

  $button.addEventListener("click", renderPassword);
  $numbers.addEventListener("change", renderPassword);
  $titlecase.addEventListener("change", renderPassword);
});
