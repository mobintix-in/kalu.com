// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Back to top & Scroll behavior
const backToTopBtn = document.getElementById('backToTop');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Back to top button visibility
    if (backToTopBtn) {
        if (scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    // Header scroll effect
    if (header) {
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Active navigation link highlighting
    if (sections.length > 0 && navLinkElements.length > 0) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
});

// Back to top functionality
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// FAQ accordion
const faqButtons = document.querySelectorAll('.faq-q');
if (faqButtons.length > 0) {
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Close other items
            const currentItem = button.parentElement;
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current
            currentItem.classList.toggle('active');
        });
    });
}

// Form validation
const consultForm = document.getElementById('consultForm');

if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const fields = consultForm.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            const errorElement = document.querySelector(`[data-error-for="${field.name}"]`);
            
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                if (errorElement) errorElement.style.display = 'block';
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                if (errorElement) errorElement.style.display = 'none';
                
                // Email validation
                if (field.type === 'email' && !isValidEmail(field.value)) {
                    field.classList.add('is-invalid');
                    if (errorElement) errorElement.style.display = 'block';
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitBtn = consultForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Prepare data for FormSubmit
            const formData = new FormData(consultForm);
            const object = {};
            formData.forEach((value, key) => object[key] = value);
            
            // Add subject line
            object['_subject'] = 'New Inquiry from Website';

            // Placeholder email for ThemeForest compliance
            fetch("https://formsubmit.co/ajax/your@email.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(response => response.json())
            .then(data => {
                // Hide form and show success message
                consultForm.style.display = 'none';
                
                const successMessage = document.getElementById('formSuccessMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                consultForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                // For demo/ThemeForest purposes, we might want to simulate success even on error 
                // because the email is fake. But following strict logic:
                submitBtn.innerText = 'Error! Try Again';
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
                alert('For this demo, please configure your email in script.js (line ~148).');
            });
        }
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dark Mode Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

if (themeToggleBtn && body) {
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved user preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}
