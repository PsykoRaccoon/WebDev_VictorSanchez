const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");

function simulateLoader() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Formulario enviado exitosamente.");
    }, 5000); 
  });
}

async function validateForm(e) {
  e.preventDefault();

  $errorsMessages.forEach((el) => {
    el.innerText = "";
  });
  $successMessage.innerText = "";

  let isValid = true;

  let namePattern = /^[A-Za-z\s]+$/;
  if ($nameInput.value.trim() === "") {
    $nameError.innerText = "El nombre es obligatorio";
    isValid = false;
  } else if (!namePattern.test($nameInput.value.trim())) {
    $nameError.innerText = "El nombre solo puede contener letras y espacios";
    isValid = false;
  }

  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.innerText = "El email es obligatorio";
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.innerText = "El formato del correo no es válido";
    isValid = false;
  }

  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if ($passwordInput.value.trim() === "") {
    $passwordError.innerText = "La contraseña es obligatoria";
    isValid = false;
  } else if (!passwordPattern.test($passwordInput.value.trim())) {
    $passwordError.innerText =
      "La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula, una minúscula y un carácter especial";
    isValid = false;
  }

  if ($confirmPasswordInput.value.trim() !== $passwordInput.value.trim()) {
    $confirmPasswordError.innerText = "Las contraseñas no coinciden";
    isValid = false;
  }

  if (isValid) {
    $successMessage.innerText = "Enviando...";
    const message = await simulateLoader();
    $successMessage.innerText = message;
    $form.reset();
  }
}

$form.addEventListener("submit", validateForm);
