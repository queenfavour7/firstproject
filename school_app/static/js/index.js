document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Pricing calculator ---------- */
  const knifeCount = document.getElementById('knifeCount');
  const decreaseBtn = document.getElementById('decreaseBtn');
  const increaseBtn = document.getElementById('increaseBtn');
  const calcTotal = document.getElementById('calcTotal');
  const calcNote = document.getElementById('calcNote');

  const SINGLE_PRICE = 12;
  const BULK_PRICE = 9;
  const BULK_THRESHOLD = 5;
  const MIN_KNIVES = 1;
  const MAX_KNIVES = 40;

  function updateEstimate() {
    let count = parseInt(knifeCount.value, 10);
    if (isNaN(count) || count < MIN_KNIVES) count = MIN_KNIVES;
    if (count > MAX_KNIVES) count = MAX_KNIVES;
    knifeCount.value = count;

    const rate = count >= BULK_THRESHOLD ? BULK_PRICE : SINGLE_PRICE;
    const total = count * rate;

    calcTotal.textContent = `$${total}`;
    calcNote.textContent = count >= BULK_THRESHOLD
      ? `Bulk rate applied at 5+ knives ($${BULK_PRICE} each).`
      : `Bulk rate kicks in at 5 knives ($${BULK_PRICE} each).`;
  }

  if (knifeCount) {
    decreaseBtn.addEventListener('click', () => {
      knifeCount.value = Math.max(MIN_KNIVES, parseInt(knifeCount.value, 10) - 1);
      updateEstimate();
    });
    increaseBtn.addEventListener('click', () => {
      knifeCount.value = Math.min(MAX_KNIVES, parseInt(knifeCount.value, 10) + 1);
      updateEstimate();
    });
    knifeCount.addEventListener('input', updateEstimate);
    updateEstimate();
  }

  /* ---------- Accordion ---------- */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    const panel = trigger.nextElementSibling;
    panel.style.maxHeight = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = '0px';
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Fill in each field so we know how to reach you.';
        formStatus.style.color = '#a63d40';
        return;
      }

      const name = document.getElementById('name').value.trim();
      formStatus.style.color = '#3d444b';
      formStatus.textContent = `Thanks, ${name.split(' ')[0]} — we'll follow up within one business day.`;
      contactForm.reset();
    });
  }

});