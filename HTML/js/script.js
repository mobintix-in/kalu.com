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

// Color Switcher Logic
const switcherToggle = document.getElementById('switcherToggle');
const colorSwitcher = document.getElementById('colorSwitcher');
const colorOptions = document.querySelectorAll('.color-opt');

const colorThemes = {
    green: {
        light: { primary: '#0b2e13', secondary: '#2ea043', accent: '#57d16b' },
        dark: { primary: '#57d16b', secondary: '#2ea043', accent: '#0b2e13' }
    },
    blue: {
        light: { primary: '#0f2c4c', secondary: '#2563eb', accent: '#60a5fa' },
        dark: { primary: '#60a5fa', secondary: '#2563eb', accent: '#0f2c4c' }
    },
    purple: {
        light: { primary: '#2e1065', secondary: '#7c3aed', accent: '#a78bfa' },
        dark: { primary: '#a78bfa', secondary: '#7c3aed', accent: '#2e1065' }
    },
    orange: {
        light: { primary: '#431407', secondary: '#ea580c', accent: '#fb923c' },
        dark: { primary: '#fb923c', secondary: '#ea580c', accent: '#431407' }
    },
    red: {
        light: { primary: '#450a0a', secondary: '#dc2626', accent: '#f87171' },
        dark: { primary: '#f87171', secondary: '#dc2626', accent: '#450a0a' }
    },
    teal: {
        light: { primary: '#042f2e', secondary: '#0d9488', accent: '#2dd4bf' },
        dark: { primary: '#2dd4bf', secondary: '#0d9488', accent: '#042f2e' }
    },
    pink: {
        light: { primary: '#500724', secondary: '#db2777', accent: '#f472b6' },
        dark: { primary: '#f472b6', secondary: '#db2777', accent: '#500724' }
    },
    yellow: {
        light: { primary: '#422006', secondary: '#ca8a04', accent: '#facc15' },
        dark: { primary: '#facc15', secondary: '#ca8a04', accent: '#422006' }
    }
};

function getCurrentTheme() {
    return localStorage.getItem('selected-color-theme') || 'green';
}

function applyTheme(themeName) {
    const isDark = document.body.classList.contains('dark-mode');
    const mode = isDark ? 'dark' : 'light';
    const theme = colorThemes[themeName][mode];
    
    if (!theme) return;

    // Apply to body to override CSS class definitions
    const target = document.body; 
    target.style.setProperty('--primary', theme.primary);
    target.style.setProperty('--secondary', theme.secondary);
    target.style.setProperty('--accent', theme.accent);
}

if (switcherToggle && colorSwitcher) {
    switcherToggle.addEventListener('click', () => {
        colorSwitcher.classList.toggle('active');
    });

    // Close switcher when clicking outside
    document.addEventListener('click', (e) => {
        if (!colorSwitcher.contains(e.target) && colorSwitcher.classList.contains('active')) {
            colorSwitcher.classList.remove('active');
        }
    });

    // Theme Selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            // Save preference
            localStorage.setItem('selected-color-theme', theme);
            applyTheme(theme);
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Initial Load
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
    
    // Set active button
    const activeBtn = document.querySelector(`.color-opt[data-theme="${savedTheme}"]`);
    if (activeBtn) {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// Hook into the existing Dark Mode Toggle
// We need to re-apply the theme when dark mode changes
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Small delay to ensure class toggle has happened
        setTimeout(() => {
            applyTheme(getCurrentTheme());
        }, 10);
    });
}
