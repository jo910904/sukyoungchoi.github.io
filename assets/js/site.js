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
  const motionEase = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      revealObserver.unobserve(entry.target);
      if (reducedMotion.matches) continue;

      entry.target.animate(
        [
          { opacity: 0.88, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: entry.target.matches('.media-card') ? 520 : 600,
          easing: motionEase
        }
      );
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -25% 0px' });

  const revealTargets = document.querySelectorAll(`
    .background-section .split-intro,
    .research-section .research-intro,
    .research-grid .media-card,
    .honors-section h2,
    .grants-section h2,
    .skills-section h2,
    .expression-section h2,
    .site-footer h2
  `);
  revealTargets.forEach((target) => revealObserver.observe(target));

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    revealTargets.forEach((target) => target.getAnimations().forEach((animation) => animation.cancel()));
  });
}
