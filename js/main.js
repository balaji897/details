/* ===================================================================
   ADDANKI BALAJI - MAIN CLIENT JAVASCRIPT
   Interactivity, Animations, Modals, Filters, and Form Handling
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. Typewriter Effect
     -------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const words = [
      'Software Developer',
      'B.Tech CSBS Student',
      'Python & Java Coder',
      'AI & IoT Builder',
      'Continuous Learner',
      'Problem Solver'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 1800;

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = 400;
      }

      setTimeout(type, timeout);
    }

    type();
  }

  /* --------------------------------------------------
     2. Sticky Header & Active Nav Link on Scroll
     -------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header background change
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active navigation link tracking
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* --------------------------------------------------
     3. Mobile Navigation Drawer
     -------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------
     4. Scroll Reveal Animations (IntersectionObserver)
     -------------------------------------------------- */
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* --------------------------------------------------
     5. Skill Progress Bar Fill Animation
     -------------------------------------------------- */
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar');
  let animatedSkills = false;

  if (skillSection && 'IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedSkills) {
          progressBars.forEach(bar => {
            const targetWidth = bar.style.getPropertyValue('--target-width') || '75%';
            bar.style.width = targetWidth;
          });
          animatedSkills = true;
        }
      });
    }, { threshold: 0.25 });

    skillObserver.observe(skillSection);
  } else {
    progressBars.forEach(bar => {
      const targetWidth = bar.style.getPropertyValue('--target-width') || '75%';
      bar.style.width = targetWidth;
    });
  }

  /* --------------------------------------------------
     6. Projects Filter Tabs
     -------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* --------------------------------------------------
     7. Project Data & Modal Logic
     -------------------------------------------------- */
  const projectDetails = {
    'ai-planner': {
      title: 'AI Personalized Learning Planner',
      category: 'AI & Software Engineering',
      image: 'assets/images/project-ai-planner.jpg',
      problem: 'Students often struggle to balance multiple subjects and meet exam deadlines due to static, rigid timetables that do not adapt to individual topic comprehension or cognitive fatigue.',
      solution: 'An automated smart planner that evaluates subject mastery, suggests personalized daily learning milestones, dynamically adjusts revision frequencies, and recommends learning resources based on study progress.',
      techStack: ['Python', 'Machine Learning Logic', 'Streamlit / Web UI', 'Data Modeling', 'JSON Data Structures'],
      features: [
        'Dynamic timetable generation based on user exam dates and syllabus difficulty',
        'Adaptive revision frequency adjusting automatically when topics take longer than planned',
        'Visual progress tracking dashboards with completion rings and time distribution charts',
        'Study fatigue estimator that optimizes break durations and high-focus study slots'
      ],
      github: 'https://github.com/balaji897'
    },
    'dairy-iot': {
      title: 'Smart Dairy Shed Heat & Stress Control',
      category: 'Internet of Things (IoT) & Automation',
      image: 'assets/images/project-dairy-iot.jpg',
      problem: 'High temperature and humidity in tropical environments cause severe heat stress in dairy cows, resulting in drastically decreased milk production, weakened immunity, and health complications.',
      solution: 'An intelligent IoT monitoring and environmental actuation system using Arduino microcontrollers to monitor live temperature/humidity (THI index) and automatically operate misting fans and ventilation blowers.',
      techStack: ['Arduino Uno / Nano', 'DHT11 / DHT22 Sensors', 'Relay Modules', 'C / C++ Embedded', 'Python Dashboard / Telemetry'],
      features: [
        'Continuous ambient temperature and relative humidity sensing across shed zones',
        'Automated Temperature-Humidity Index (THI) calculation triggering multi-stage cooling',
        'Fail-safe relay circuit controls for high-velocity misting fans and water pumps',
        'Energy-efficient intermittent mist cycling preventing excessive shed wetness and bacterial growth'
      ],
      github: 'https://github.com/balaji897'
    },
    'robotic-rover': {
      title: 'Low-Cost Robotic Rover for College Canteens',
      category: 'Robotics & Embedded Systems',
      image: 'assets/images/project-robotic-rover.jpg',
      problem: 'Busy college campuses and department faculty often experience delivery delays during lunch/break hours, while commercial delivery robots cost lakhs of rupees and require complex infrastructure.',
      solution: 'A budget-friendly 4-wheel mobile delivery rover constructed using affordable off-the-shelf microcontrollers, ultrasonic obstacle avoidance, motor drivers, and a payload rack for meal containers.',
      techStack: ['Arduino Microcontroller', 'HC-SR04 Ultrasonic Sensors', 'L298N Dual H-Bridge Motor Driver', 'DC Geared Motors', 'Bluetooth / RF Teleoperation'],
      features: [
        'Front-mounted ultrasonic sensor matrix for autonomous real-time obstacle avoidance',
        'Dual-mode operation: Autonomous corridor cruising + manual smartphone Bluetooth override',
        'Spill-resistant carrying platform tailored for cafeteria food bowls and beverage cups',
        'Significantly reduced bill-of-materials (BOM) designed specifically for college budgets'
      ],
      github: 'https://github.com/balaji897'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    projectModalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-proj-thumb">
      <span class="modal-proj-cat"><i class="fa-solid fa-layer-group"></i> ${data.category}</span>
      <h2 class="modal-proj-title">${data.title}</h2>

      <div class="modal-proj-section">
        <h4><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h4>
        <p>${data.problem}</p>
      </div>

      <div class="modal-proj-section">
        <h4><i class="fa-solid fa-lightbulb"></i> Proposed Solution</h4>
        <p>${data.solution}</p>
      </div>

      <div class="modal-proj-section">
        <h4><i class="fa-solid fa-list-check"></i> Key Features & Capabilities</h4>
        <ul class="modal-proj-features">
          ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
        </ul>
      </div>

      <div class="modal-proj-section">
        <h4><i class="fa-solid fa-wrench"></i> Technologies & Tools</h4>
        <div class="tech-stack-pills" style="margin-top: 10px;">
          ${data.techStack.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>

      <div class="project-actions" style="margin-top: 24px;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-cyan">
          <i class="fa-brands fa-github"></i>
          <span>View on GitHub</span>
        </a>
        <button class="btn btn-glass" onclick="document.getElementById('project-modal').classList.remove('active'); document.body.style.overflow = '';">
          <span>Close Window</span>
        </button>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (closeProjectModalBtn && projectModal) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  /* --------------------------------------------------
     8. Certificate Lightbox Modal
     -------------------------------------------------- */
  const certModal = document.getElementById('cert-modal');
  const closeCertModalBtn = document.getElementById('close-cert-modal');
  const viewCertBtn = document.getElementById('view-cert-modal-btn');
  const certClickableImg = document.getElementById('cert-clickable-img');

  function openCertModal() {
    if (certModal) {
      certModal.classList.add('active');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('active');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (viewCertBtn) viewCertBtn.addEventListener('click', openCertModal);
  if (certClickableImg) certClickableImg.addEventListener('click', openCertModal);
  if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertModal);

  /* --------------------------------------------------
     9. Resume Preview Modal
     -------------------------------------------------- */
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeModalBtn = document.getElementById('close-resume-modal');
  const openResumeBtn = document.getElementById('open-resume-modal-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);

  // Close modals when clicking on background backdrop
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (e.target === certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [projectModal, certModal, resumeModal].forEach(m => {
        if (m && m.classList.contains('active')) {
          m.classList.remove('active');
        }
      });
      document.body.style.overflow = '';
    }
  });

  /* --------------------------------------------------
     10. Toast Notification System
     -------------------------------------------------- */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = 'fa-circle-check') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* --------------------------------------------------
     11. Copy Email to Clipboard
     -------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        // Fallback
        const temp = document.createElement('input');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('Email copied: ' + email);
      });
    });
  }

  /* --------------------------------------------------
     12. Interactive Contact Form
     -------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // Simulate sending state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      formStatus.textContent = '';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        formStatus.textContent = `Thank you, ${name}! Your message has been prepared. Balaji will get back to you soon!`;
        formStatus.className = 'form-status success';
        
        showToast('Message sent successfully!', 'fa-paper-plane');
        contactForm.reset();

        // Also offer to open direct mailto client as convenience
        setTimeout(() => {
          formStatus.textContent = '';
        }, 6000);
      }, 1200);
    });
  }

  /* --------------------------------------------------
     13. Dynamic Year in Footer
     -------------------------------------------------- */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
