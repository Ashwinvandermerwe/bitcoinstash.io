// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const formMessages = document.getElementById('form-messages');
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Clear previous messages
            formMessages.innerHTML = '';
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit form
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    formMessages.innerHTML = '<div class="success-message">Thank you! Your message has been sent successfully. I\'ll get back to you soon.</div>';
                    
                    // Reset form
                    this.reset();
                } else {
                    // Show error message
                    formMessages.innerHTML = '<div class="error-message">Sorry, there was an error sending your message. Please try again or contact me directly via email.</div>';
                }
            })
            .catch(error => {
                // Show error message
                formMessages.innerHTML = '<div class="error-message">Sorry, there was an error sending your message. Please try again or contact me directly via email.</div>';
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }
}); 