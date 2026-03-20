/* ============================================
   TANUSHKA SRIVASTAVA — PORTFOLIO SCRIPTS
   script.js
   ============================================ */


/* ── 1. CUSTOM CURSOR ── */
const cur   = document.getElementById('cur');
const trail = document.getElementById('trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

// Move main cursor dot instantly with mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cur.style.left = mouseX + 'px';
  cur.style.top  = mouseY + 'px';
});

// Animate trailing ring with smooth lag
(function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

// Expand cursor on hover over interactive elements
document.querySelectorAll('a, .sk, .btn, .soc, .bdg, .htag, .ac, .hst').forEach((el) => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});


/* ── 2. TYPEWRITER EFFECT ── */
const phrases = [
  'Developer',
  'Full Stack Engineer',
  'System Design Learner',
  'Cloud Computing Explorer',
  'Hackathon Participant',
  'Problem Solver',
  'BTech Student'
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;

const twEl = document.getElementById('tw');

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    twEl.textContent = currentPhrase.slice(0, ++charIndex);

    if (charIndex === currentPhrase.length) {
      // Pause at end before deleting
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
    setTimeout(typeWriter, 85);

  } else {
    // Deleting
    twEl.textContent = currentPhrase.slice(0, --charIndex);

    if (charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 350);
      return;
    }
    setTimeout(typeWriter, 42);
  }
}

// Start typewriter after hero entrance animation
setTimeout(typeWriter, 1200);


/* ── 3. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ── 4. NAV ACTIVE LINK HIGHLIGHT ── */
const sections  = document.querySelectorAll('section[id], .contact-section');
const navLinks  = document.querySelectorAll('.nav-links a');

sections.forEach((section) => {
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === '#' + section.id;
          link.style.color = isActive ? 'var(--green)' : '';
        });
      }
    });
  }, { threshold: 0.3 }).observe(section);
});


/* ── 5. STACK ITEMS STAGGER ANIMATION ── */
document.querySelectorAll('.sk').forEach((el, index) => {
  el.style.transitionDelay = index * 0.03 + 's';
});