// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Basic form validation
    if (!validateForm(data)) {
        return false;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
    
    return false;
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Validate phone
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (minimum 10 characters)');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Message Display
function showMessage(message, type = 'success') {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.innerHTML = message;
    
    // Add to DOM
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Testimonial Carousel (if needed)
class TestimonialCarousel {
    constructor(container) {
        this.container = container;
        this.testimonials = container.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.total = this.testimonials.length;
        
        if (this.total > 1) {
            this.setupCarousel();
        }
    }
    
    setupCarousel() {
        // Create navigation buttons
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&larr;';
        prevBtn.addEventListener('click', () => this.prev());
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&rarr;';
        nextBtn.addEventListener('click', () => this.next());
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        
        this.container.appendChild(nav);
        
        // Show first testimonial
        this.show(0);
    }
    
    show(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        this.currentIndex = index;
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.total;
        this.show(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.total) % this.total;
        this.show(prevIndex);
    }
}

// Initialize carousels if they exist
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.testimonials-carousel');
    carousels.forEach(carousel => new TestimonialCarousel(carousel));
}); 