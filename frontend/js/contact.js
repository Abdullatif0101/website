document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const alertBox = document.getElementById('form-alert');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Validation
        const recaptcha = document.getElementById('recaptcha').checked;
        if (!recaptcha) {
            showAlert('error', 'Please complete the reCAPTCHA validation.');
            return;
        }

        // Prepare Form Data payload
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
        };

        // UI Loading State
        setLoading(true);

        try {
            // Since backend is not running locally for the UI, we simulate an AJAX call
            // In a real scenario, this would be:
            // const response = await fetch('http://localhost:5000/api/v1/leads', { ... })

            // Mock API Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            showAlert('success', 'Message sent successfully! We will get back to you shortly.');
            contactForm.reset();

        } catch (error) {
            console.error('Submission error:', error);
            showAlert('error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }

    function showAlert(type, message) {
        alertBox.className = `form-alert ${type}`;
        alertBox.textContent = message;

        // Auto hide success message
        if (type === 'success') {
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 5000);
        }
    }
});
