// ========================================
// MODERN PORTFOLIO - JAVASCRIPT
// ========================================

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollProgress();
    initializeTypingAnimation();
    initializeSkillBars();
    initializeSmoothScroll();
    initializeContactForm();
    initializeAnimations();
});

// ========== THEME TOGGLE ==========
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ========== NAVIGATION ==========
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
    
    // Highlight active nav link on scroll
    window.addEventListener('scroll', highlightActiveNavLink);
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========== SCROLL PROGRESS INDICATOR ==========
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ========== TYPING ANIMATION ==========
function initializeTypingAnimation() {
    const typingText = document.querySelector('.name');
    if (!typingText) return;
    
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.display = 'inline-block';
    typingText.style.overflow = 'hidden';
    typingText.style.whiteSpace = 'nowrap';
    typingText.style.borderRight = '3px solid';
    typingText.style.borderColor = 'var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is done
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 500);
        }
    };
    
    // Start typing after a small delay
    setTimeout(typeWriter, 500);
}

// ========== SKILL BARS ANIMATION ==========
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target.closest('.skill-item');
                const percentage = entry.target.getAttribute('data-percentage');
                const fill = entry.target.querySelector('.skill-bar-fill');
                
                // Animate skill item
                skillItem.classList.add('animate');
                
                // Animate skill bar
                setTimeout(() => {
                    fill.style.setProperty('--percentage', percentage + '%');
                    fill.style.width = percentage + '%';
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ========== SMOOTH SCROLL ==========
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors and modal close buttons
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== PROJECT MODAL ==========
const projectData = {
    1: {
        title: 'E-Commerce Platform',
        description: 'A comprehensive e-commerce solution built with modern web technologies.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        longDescription: 'This full-featured e-commerce platform includes a responsive frontend built with React, a robust Node.js backend, and MongoDB database. Features include user authentication, shopping cart functionality, payment integration with Stripe, product search and filtering, order management, and an admin dashboard for managing products, orders, and users.',
        features: [
            'User authentication and authorization',
            'Shopping cart with real-time updates',
            'Stripe payment integration',
            'Product search and filtering',
            'Order tracking and history',
            'Admin dashboard',
            'Responsive design',
            'Email notifications'
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux', 'JWT', 'Nodemailer'],
        github: '#',
        live: '#'
    },
    2: {
        title: 'Social Media Dashboard',
        description: 'Real-time analytics dashboard for tracking social media metrics.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
        longDescription: 'A powerful analytics dashboard that aggregates data from multiple social media platforms including Facebook, Twitter, Instagram, and LinkedIn. The dashboard provides real-time insights with interactive charts, engagement metrics, follower growth tracking, and customizable reports. Built with Vue.js for reactive UI and Chart.js for beautiful data visualizations.',
        features: [
            'Multi-platform integration',
            'Real-time data synchronization',
            'Interactive charts and graphs',
            'Customizable date ranges',
            'Export reports to PDF',
            'Engagement metrics tracking',
            'Follower growth analysis',
            'Post performance analytics'
        ],
        technologies: ['Vue.js', 'Chart.js', 'Firebase', 'Social Media APIs', 'Vuex', 'Tailwind CSS'],
        github: '#',
        live: '#'
    },
    3: {
        title: 'Task Management App',
        description: 'Collaborative task management with drag-and-drop functionality.',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop',
        longDescription: 'A modern task management application designed for team collaboration. Features include drag-and-drop task boards, real-time updates, file attachments, comments, due dates, priority levels, and team member assignments. The app uses React with Redux for state management and PostgreSQL for data persistence.',
        features: [
            'Drag-and-drop task boards',
            'Real-time collaboration',
            'File attachments',
            'Comments and mentions',
            'Due dates and reminders',
            'Priority levels',
            'Team member assignments',
            'Progress tracking',
            'Activity timeline'
        ],
        technologies: ['React', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'React Beautiful DnD'],
        github: '#',
        live: '#'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <div class="modal-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="modal-info">
                <h2>${project.title}</h2>
                <p class="modal-description">${project.longDescription}</p>
                
                <div class="modal-section">
                    <h3><i class="fas fa-star"></i> Key Features</h3>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-code"></i> Technologies Used</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag glass-effect">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <a href="${project.github}" class="btn btn-primary glass-effect">
                        <i class="fab fa-github"></i>
                        <span>View Code</span>
                    </a>
                    <a href="${project.live}" class="btn btn-secondary glass-effect">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ========== CONTACT FORM ==========
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show success message (simulate form submission)
        showNotification('Message sent successfully! 🎉', 'success');
        
        // Reset form
        form.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
    });
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification glass-effect ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        fontSize: '1rem',
        fontWeight: '500',
        color: type === 'success' ? '#10b981' : '#ef4444'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .project-modal-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .modal-image {
        width: 100%;
        height: 300px;
        border-radius: 15px;
        overflow: hidden;
    }
    
    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .modal-info h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .modal-description {
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 2rem;
    }
    
    .modal-section {
        margin-bottom: 2rem;
    }
    
    .modal-section h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .modal-section h3 i {
        color: var(--primary-color);
    }
    
    .feature-list {
        list-style: none;
        display: grid;
        gap: 0.75rem;
    }
    
    .feature-list li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--text-secondary);
        padding: 0.5rem;
        background: var(--glass-bg);
        border-radius: 8px;
        backdrop-filter: blur(10px);
    }
    
    .feature-list li i {
        color: var(--primary-color);
        font-size: 1.1rem;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }
    
    .tech-tag {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--primary-color);
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .modal-actions .btn {
        flex: 1;
        justify-content: center;
        min-width: 150px;
    }
    
    @media (max-width: 640px) {
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);

// ========== ANIMATIONS ON SCROLL ==========
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .about-card, .contact-card, .skill-category');
    animatedElements.forEach(el => observer.observe(el));
}

// ========== PARALLAX EFFECT FOR GRADIENT ORBS ==========
window.addEventListener('mousemove', function(e) {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX * speed) - (speed / 2);
        const y = (mouseY * speed) - (speed / 2);
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========== FORM VALIDATION ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add input validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                showNotification('Please enter a valid email address', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    }
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== CONSOLE EASTER EGG ==========
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c🎨 Like what you see?', 'font-size: 16px; color: #8b5cf6;');
console.log('%c💼 Let\'s work together!', 'font-size: 16px; color: #ec4899;');
console.log('%c📧 Contact: your.email@example.com', 'font-size: 14px; color: #6b7280;');

// ========== EXPORT FUNCTIONS ==========
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;