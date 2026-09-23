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

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
  const motionEase = getComputedStyle(document.documentElement).getPropertyValue('--motion-ease').trim();
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      revealObserver.unobserve(entry.target);
      if (reducedMotion.matches) continue;

      entry.target.animate(
        [
          { opacity: 0.92, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: entry.target.matches('.media-card') ? 320 : 400,
          easing: motionEase
        }
      );
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  const revealTargets = document.querySelectorAll('main > .section h2, .research-grid .media-card, .site-footer h2');
  revealTargets.forEach((target) => revealObserver.observe(target));

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    revealTargets.forEach((target) => target.getAnimations().forEach((animation) => animation.cancel()));
  });
}
