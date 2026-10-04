/**
 * BRAINTECH IT SOLUTIONS - MAIN INTERACTION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER HIDE
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });

        // Backup hide if window load event already fired or delayed
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => preloader.remove(), 500);
            }
        }, 3000);
    }

    // 2. STICKY NAVBAR SCROLL ACTION
    const navbar = document.querySelector('.custom-navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init

    // 3. COLLAPSE MOBILE NAVBAR ON NAV LINK CLICK
    const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // 4. ACTIVE LINK SCROLLSPY (VANILLA JS)
    const sections = document.querySelectorAll('section, header');
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 160; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Trigger initially

    // 5. ANIMATE COUNTERS (INTERSECTION OBSERVER)
    const counters = document.querySelectorAll('.counter-num');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetVal = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds animation
                const countTo = targetVal;
                
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentCount = Math.floor(progress * countTo);
                    
                    target.innerText = currentCount + (target.getAttribute('data-suffix') || '');
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = targetVal + (target.getAttribute('data-suffix') || '');
                    }
                };
                window.requestAnimationFrame(step);
                observer.unobserve(target); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 6. PORTFOLIO FILTER MECHANISM
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Check if element matches filter
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    // Add animate class for fade-in effect
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 7. SCROLL-TO-TOP BUTTON
    const scrollTopBtn = document.querySelector('.btn-scroll-top');
    const checkScrollTop = () => {
        if (window.scrollY > window.innerHeight) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    };
    window.addEventListener('scroll', checkScrollTop);
    checkScrollTop(); // Check on init

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 8. WHATSAPP FLOATING BUTTON CLICK
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const phoneNumber = '1234567890'; // Representative placeholder
            const message = encodeURIComponent('Hi Braintech, I would like to inquire about your IT development services.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }

    // 9. FORM VALIDATIONS & FEEDBACK SIMULATION
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('contactToast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple client-side validation
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const subject = document.getElementById('formSubject').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            // Simulate loader on submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';

            setTimeout(() => {
                // Reset Form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show Success Toast Notification
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 4000);
                }
            }, 1800);
        });
    }

    // 10. NEWSLETTER SUBMISSION SIMULATION
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();

            if (!email) return;

            const submitBtn = newsletterForm.querySelector('.newsletter-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

            setTimeout(() => {
                emailInput.value = '';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                alert('Thank you for subscribing to our newsletter!');
            }, 1200);
        });
    }
});
