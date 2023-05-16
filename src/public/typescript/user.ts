const viewDetailsModal = document.querySelector(
  ".view_details_modal"
);
const viewDetailsPending = document.querySelectorAll(
  ".view_details_pending_btn"
);
const viewDetailsCompleted = document.querySelectorAll(
  ".view_details_completed_btn"
);
const links = document.querySelectorAll(".btn_category");
const caption = document.querySelector("table caption");

document.addEventListener("click", (e) => {
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

function setTransactionDetails(transaction: any) {
  const crypto = document.querySelector(".crypto_value");
  const status = document.querySelector(".status_value");
  const amount = document.querySelector(".amount_value");
  const wallet = document.querySelector(".wallet_value");
  const screenshotImg = document.querySelector(
    ".view_details_image"
  ) as HTMLImageElement;

  if (screenshotImg && crypto && status && amount && wallet) {
    screenshotImg.src = `/images/${transaction.paymentScreenshot}`;
    crypto.textContent = `${transaction.crypto}`;
    status.textContent = `${transaction.status}`;
    amount.textContent = `${transaction.amount}`;
    wallet.textContent = `${transaction.walletAddress}`;
  }
}

viewDetailsCompleted.forEach((button) => {
  button.addEventListener("click", () => {
    viewDetailsModal?.classList.add("show");
    const data_id = button.getAttribute("data-id");
    if (data_id) {
      const transaction = JSON.parse(
        decodeURIComponent(data_id)
      );
      setTransactionDetails(transaction);
    }
  });
});

viewDetailsPending.forEach((button) => {
  button.addEventListener("click", () => {
    viewDetailsModal?.classList.add("show");
    const data_id = button.getAttribute("data-id");
    if (data_id) {
      const transaction = JSON.parse(
        decodeURIComponent(data_id)
      );
      setTransactionDetails(transaction);
    }
  });
});

viewDetailsModal?.addEventListener("click", () => {
  viewDetailsModal.classList.remove("show");
});

links.forEach((link) => {
  if (link.textContent === caption?.textContent?.split(" ")[0]) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
