const doc = document;

doc.addEventListener("click", (e) => {
  const targetElement = e.target as HTMLElement;
  const formContainer = document.querySelector(
    ".buy_form_container"
  );

  if (targetElement.classList.contains("buy_button")) {
    formContainer?.classList.toggle("show");
  } else if (
    targetElement.classList.contains("buy_form_container")
  ) {
    formContainer?.classList.toggle("show");
  } else if (targetElement.classList.contains("buy_form")) {
    e.stopPropagation();
  }
});
