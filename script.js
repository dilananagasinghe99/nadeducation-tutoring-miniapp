// =================================
// Smart Navigation Bar - Hide/Show on Scroll
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Start hiding after scrolling 100px
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only apply hide/show behavior after scrolling past threshold
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide navbar
                navbar.classList.add('navbar-hidden');
            } else {
                // Scrolling up - show navbar
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            // At top of page - always show navbar
            navbar.classList.remove('navbar-hidden');
        }
        
        // Check which section we're in and adjust navbar color
        // Define dark sections (sections that should show dark navbar)
        const darkSections = [
            document.querySelector('.hero'),
            document.querySelector('.testimonials'),
            document.querySelector('.semester-classes')
        ].filter(section => section !== null); // Remove null values
        
        // At the very top of the page (near scroll position 0), use dark navbar
        // This ensures pages start with dark navbar before scrolling
        if (scrollTop < 50) {
            navbar.classList.add('navbar-dark');
            navbar.classList.remove('navbar-light');
        } else {
            // Check if navbar is over any dark section
            let isOverDarkSection = false;
            const navbarBottom = scrollTop + navbar.offsetHeight;
            
            darkSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                // Check if navbar overlaps with this dark section
                if (navbarBottom > sectionTop && scrollTop < sectionBottom) {
                    isOverDarkSection = true;
                }
            });
            
            // Apply appropriate navbar theme
            if (isOverDarkSection) {
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
            } else {
                navbar.classList.add('navbar-light');
                navbar.classList.remove('navbar-dark');
            }
        }
        
        lastScrollTop = scrollTop;
    });
});

// =================================
// Mobile Navigation Toggle
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// =================================
// Accordion Functionality (Services Page)
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
});

// =================================
// Auto-populate Class Schedule based on Selection
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const subjectSelect = document.getElementById('subject');
    const classScheduleInput = document.getElementById('class-schedule');
    
    // Class schedule mapping based on timetable
    const classSchedules = {
        'year4': 'Thursday, 5:00 PM - 7:15 PM',
        'year5': 'Wednesday, 5:00 PM - 7:15 PM',
        'year6': 'Monday, 5:00 PM - 7:15 PM',
        'year7': 'Saturday, 3:00 PM - 5:30 PM',
        'year8': 'Friday, 7:15 PM - 9:30 PM',
        'year9': 'Monday, 7:15 PM - 9:30 PM',
        'year10': 'Tuesday, 7:15 PM - 9:30 PM',
        'methods-12': 'Sunday, 1:00 PM - 3:30 PM',
        'methods-34': 'Thursday, 7:15 PM - 9:30 PM',
        'general-12': 'Sunday, 4:00 PM - 6:30 PM',
        'general-34': 'Sunday, 10:00 AM - 12:30 PM',
        'specialist-12': 'Times available upon request - Please discuss with us',
        'specialist-34': 'Times available upon request - Please discuss with us',
        'year4-6': 'Multiple times available - Please specify year level for exact schedule',
        'year7-10': 'Multiple times available - Please specify year level for exact schedule',
        'general': 'Flexible - To be discussed'
    };
    
    // Function to update schedule display
    function updateSchedule(value) {
        if (value && classSchedules[value]) {
            classScheduleInput.value = classSchedules[value];
            classScheduleInput.style.fontWeight = '600';
            classScheduleInput.style.color = 'var(--primary-color)';
        } else {
            classScheduleInput.value = '';
            classScheduleInput.style.fontWeight = 'normal';
            classScheduleInput.style.color = '';
        }
    }
    
    if (subjectSelect && classScheduleInput) {
        // Check URL for pre-selected class (from timetable page)
        const urlParams = new URLSearchParams(window.location.search);
        const preselectedClass = urlParams.get('class');
        
        if (preselectedClass) {
            // Auto-select the class from URL parameter
            subjectSelect.value = preselectedClass;
            updateSchedule(preselectedClass);
            
            // Add visual highlight to show it was pre-selected
            subjectSelect.classList.add('preselected');
            setTimeout(() => {
                subjectSelect.classList.remove('preselected');
            }, 2500);
            
            // Smooth scroll to form after a brief delay
            setTimeout(() => {
                const formContainer = document.querySelector('.contact-form-container');
                if (formContainer) {
                    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
        
        // Listen for manual changes
        subjectSelect.addEventListener('change', function() {
            updateSchedule(this.value);
        });
    }
});

// =================================
// Contact Form Validation & Submission
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form values
            const parentName = document.getElementById('parent-name') ? document.getElementById('parent-name').value.trim() : '';
            const studentName = document.getElementById('student-name') ? document.getElementById('student-name').value.trim() : '';
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const programType = document.getElementById('program-type').value;
            const classSchedule = document.getElementById('class-schedule') ? document.getElementById('class-schedule').value : '';
            const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';
            
            // Validate form - check for required fields
            const contactName = parentName;
            
            if (!contactName || !email || !subject || !programType) {
                e.preventDefault();
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(email)) {
                e.preventDefault();
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Validate phone for expression of interest form
            if (document.getElementById('parent-name') && !phone) {
                e.preventDefault();
                showFormMessage('Please provide a phone number.', 'error');
                return;
            }
            
            // If validation passes, let the form submit to Netlify
            // Netlify will handle the submission and redirect to a success page
            showFormMessage('Submitting your expression of interest...', 'success');
        });
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form messages
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// =================================
// Smooth Scrolling for Anchor Links
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// =================================
// Scroll-triggered Animations
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.feature-card, .subject-card, .testimonial-card, .program-card, .special-card, .tutor-card, .value-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});

// =================================
// Book Call Button Handler
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const bookCallBtn = document.getElementById('bookCallBtn');
    
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would open a calendar booking widget
            // For now, we'll just show an alert
            alert('Booking system would open here. In a production site, this would integrate with a scheduling service like Calendly or similar.');
            
            // You could also redirect to the contact form
            // window.location.href = 'contact.html#contactForm';
        });
    }
});

// =================================
// Navbar Scroll Effect
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        }
        
        lastScroll = currentScroll;
    });
});

// =================================
// Form Input Enhancement
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition = 'transform 0.2s';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Add validation styling
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#ef4444';
            } else if (this.value) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
});

// =================================
// Statistics Counter Animation (Home Page)
// =================================

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50; // Adjust speed
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                displayValue += '%';
            } else if (isPlus) {
                displayValue += '+';
            }
            
            element.textContent = displayValue;
        }, stepTime);
    };
    
    // Observe stat numbers for animation
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});

// =================================
// Print Friendly Function
// =================================

function printPage() {
    window.print();
}

// =================================
// Back to Top Button (Optional Enhancement)
// =================================

document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button dynamically
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #ef4444;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#dc2626';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#dc2626';
        this.style.transform = 'scale(1)';
    });
});

// =================================
// Console Welcome Message
// =================================

console.log('%c🎓 NAD Education Website', 'font-size: 20px; font-weight: bold; color: #ef4444;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #10b981;');
console.log('For inquiries, contact: nagasinghehw@gmail.com');
