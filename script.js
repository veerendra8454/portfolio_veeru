document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       CUSTOM CURSOR
       ========================================================================== */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Check if device is touch-based; disable custom cursor if true
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
            
            // Smoothed movement with requestAnimationFrame or simple transformation
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });

        // Add hover effect to interactive items
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .filter-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    } else {
        // Hide cursors on touch devices
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }


    /* ==========================================================================
       STICKY HEADER & NAVIGATION ACTIVE LINKS ON SCROLL
       ========================================================================== */
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header Toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Section Active Link Tracking
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       MOBILE DRAWER MENU
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .btn-mobile-hire');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        mobileDrawer.classList.toggle('open');
        document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    };

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileDrawer.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }


    /* ==========================================================================
       TYPING TEXT EFFECT (HERO)
       ========================================================================== */
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["UI/UX Designer", "Full Stack Developer", "Data Analyst", "Problem Solver"];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 2000; // Delay between words
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            typedTextSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            typedTextSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 300);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }


    /* ==========================================================================
       SCROLL REVEAL (IntersectionObserver)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => {
            el.classList.add('reveal-active');
        });
    }


    /* ==========================================================================
       PROJECT PORTFOLIO FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button state
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Animate card hiding/showing
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* ==========================================================================
       CONTACT FORM VALIDATION & ANIMATION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const statusResetBtn = document.getElementById('statusResetBtn');
    
    // Web3Forms Access Key - Get your free key from https://web3forms.com
    const WEB3FORMS_ACCESS_KEY = "54baac7e-214a-4c8f-bff2-5f03befb3e8a";
    
    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: (val) => val.trim().length > 0
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (val) => {
                const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return re.test(String(val).toLowerCase());
            }
        },
        subject: {
            input: document.getElementById('subject'),
            error: document.getElementById('subjectError'),
            validate: (val) => val.trim().length > 0
        },
        message: {
            input: document.getElementById('message'),
            error: document.getElementById('messageError'),
            validate: (val) => val.trim().length > 0
        }
    };

    // Remove errors on typing
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.input.addEventListener('input', () => {
            const formGroup = field.input.closest('.form-group');
            if (field.validate(field.input.value)) {
                formGroup.classList.remove('has-error');
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;

            // Validate all fields
            Object.keys(fields).forEach(key => {
                const field = fields[key];
                const formGroup = field.input.closest('.form-group');
                
                if (!field.validate(field.input.value)) {
                    formGroup.classList.add('has-error');
                    isFormValid = false;
                } else {
                    formGroup.classList.remove('has-error');
                }
            });

            if (isFormValid) {
                // Trigger form submission state
                formStatus.classList.add('active', 'sending');
                formStatus.querySelector('.status-title').textContent = "Sending Message...";
                formStatus.querySelector('.status-desc').textContent = "Connecting to the server, please wait a moment.";
                
                // Disable submit button
                submitBtn.disabled = true;

                // Send form data to Web3Forms API
                const formData = {
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: fields.name.input.value,
                    email: fields.email.input.value,
                    subject: fields.subject.input.value,
                    message: fields.message.input.value
                };

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(async (response) => {
                    const result = await response.json();
                    formStatus.classList.remove('sending');
                    
                    if (response.ok) {
                        formStatus.classList.add('success');
                        formStatus.querySelector('.status-title').textContent = "Message Sent Successfully!";
                        formStatus.querySelector('.status-desc').textContent = "Thank you, Veerendra will get back to you as soon as possible.";
                        // Reset the form fields
                        contactForm.reset();
                    } else {
                        console.error('Web3Forms Error:', result);
                        formStatus.classList.add('error');
                        formStatus.querySelector('.status-title').textContent = "Submission Failed";
                        formStatus.querySelector('.status-desc').textContent = result.message || "Something went wrong. Please check your access key and try again.";
                    }
                })
                .catch(error => {
                    console.error('Network Error:', error);
                    formStatus.classList.remove('sending');
                    formStatus.classList.add('error');
                    formStatus.querySelector('.status-title').textContent = "Error Sending Message";
                    formStatus.querySelector('.status-desc').textContent = "Could not connect to the server. Please check your internet connection and try again.";
                });
            }
        });
    }

    // Reset status overlay to allow typing a new message
    if (statusResetBtn) {
        statusResetBtn.addEventListener('click', () => {
            formStatus.classList.remove('active', 'success', 'error');
            submitBtn.disabled = false;
        });
    }

});
