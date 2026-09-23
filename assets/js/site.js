const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#image-dialog-image');
const dialogTitle = document.querySelector('#image-dialog-title');
const closeButton = dialog.querySelector('.dialog-close');
let previousFocus = null;

document.querySelectorAll('.image-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    previousFocus = trigger;
    dialogImage.src = trigger.dataset.full;
    dialogTitle.textContent = trigger.dataset.title;
    dialog.showModal();
    closeButton.focus();
  });
});

closeButton.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener('close', () => {
  dialogImage.removeAttribute('src');
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  previousFocus = null;
});
