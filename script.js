// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Route-map draw animation (home page only)
  const path = document.getElementById('routeLine');
  if (path) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { path.classList.add('play'); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(path);
  }

  // Inquiry form -> WhatsApp message (no backend needed)
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const tour = form.tour.value;
      const guests = form.guests.value.trim();
      const date = form.date.value;
      const message = form.message.value.trim();

      const lines = [
        `New enquiry from the website:`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : null,
        `Interested in: ${tour}`,
        guests ? `Guests: ${guests}` : null,
        date ? `Preferred date: ${date}` : null,
        message ? `Message: ${message}` : null
      ].filter(Boolean).join('\n');

      const url = `https://wa.me/254794902936?text=${encodeURIComponent(lines)}`;
      window.open(url, '_blank');
    });
  }
});
