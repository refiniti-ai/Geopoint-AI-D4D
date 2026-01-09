document.addEventListener('DOMContentLoaded', function() {
    const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/dNrHTUpNRITaAbadgmjo/webhook-trigger/c0df1bca-acc5-42c9-a833-ada9265eef28';

    // --- Plan Selection Styling ---
    function updatePlanStyles() {
        const allPlanLabels = document.querySelectorAll('.plan-label');
        if (allPlanLabels.length === 0) return;

        allPlanLabels.forEach(label => {
            const radio = label.querySelector('input[name="plan"]');
            const card = label.querySelector('.plan-card');
            const icon = label.querySelector('.plan-icon');

            if (radio && card) {
                if (radio.checked) {
                    card.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                    card.style.borderColor = '#8b5cf6';
                    if (icon) icon.style.color = '#c4b5fd';
                } else {
                    card.style.backgroundColor = '';
                    card.style.borderColor = '';
                    if (icon) icon.style.color = '';
                }
            }
        });
    }

    // --- Mobile Menu ---
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    }

    // --- Lead Form Modal ---
    function openModal(event) {
        if(event) event.preventDefault();
        const modal = document.getElementById('leadModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (document.getElementById('leadForm')) {
                updatePlanStyles();
            }
        }
    }

    function closeModal() {
        const modal = document.getElementById('leadModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // --- Video Modal ---
    function openVideoModal(event) {
        if(event) event.preventDefault();
        const iframe = document.getElementById('youtubeIframe');
        const modal = document.getElementById('videoModal');
        if (iframe && modal) {
            iframe.src = "https://www.youtube.com/embed/CrKjii-v3XA?autoplay=1";
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoModal() {
        const iframe = document.getElementById('youtubeIframe');
        const modal = document.getElementById('videoModal');
        if (iframe && modal) {
            iframe.src = "";
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // --- Legal Modal ---
    function openLegalModal(event, section) {
        if(event) event.preventDefault();
        const modal = document.getElementById('legalModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const accordionItems = modal.querySelectorAll('.accordion-item');
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('svg');

                // Use a more robust check for the section name
                const headerText = header.textContent.trim().toLowerCase();
                if (headerText.includes(section)) {
                    content.classList.remove('hidden');
                    if(icon) icon.classList.add('rotate-180');
                } else {
                    content.classList.add('hidden');
                    if(icon) icon.classList.remove('rotate-180');
                }
            });
        }
    }

    function closeLegalModal() {
        const modal = document.getElementById('legalModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // --- Legal Modal Accordion Logic ---
    const legalAccordion = document.querySelector('.legal-accordion');
    if (legalAccordion) {
        legalAccordion.addEventListener('click', function(event) {
            const header = event.target.closest('.accordion-header');
            if (!header) return;

            const content = header.nextElementSibling;
            const icon = header.querySelector('svg');

            if (content && content.classList.contains('accordion-content')) {
                content.classList.toggle('hidden');
                if (icon) icon.classList.toggle('rotate-180');
            }
        });
    }

    // --- Event Listener for Plan Selection ---
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        updatePlanStyles();
        leadForm.addEventListener('change', (event) => {
            if (event.target.name === 'plan') {
                updatePlanStyles();
            }
        });
    }

    // --- Form Submission Logic ---
    if (leadForm) {
        leadForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const submitButton = leadForm.querySelector('button[type=\"submit\"]');
            if (submitButton) {
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
            }

            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            const smsConsent = leadForm.querySelector('#sms_consent');
            if (smsConsent) {
                data.sms_consent = smsConsent.checked ? "true" : "false";
            }
            
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    // Pass form data via URL params for GHL autofill
                    const params = new URLSearchParams();
                    if (data.full_name) params.append('name', data.full_name);
                    if (data.email) params.append('email', data.email);
                    if (data.phone) params.append('phone', data.phone);
                    window.location.href = 'schedule-demo.html?' + params.toString();
                } else {
                    response.text().then(text => {
                        alert('Submission Failed: ' + text);
                        if (submitButton) {
                            submitButton.textContent = 'Submit Application';
                            submitButton.disabled = false;
                        }
                    });
                }
            })
            .catch(error => {
                alert('A network error occurred.');
                if (submitButton) {
                    submitButton.textContent = 'Submit Application';
                    submitButton.disabled = false;
                }
            });
        });
    }

    // --- Assign functions to window for inline on-click ---
    window.toggleMobileMenu = toggleMobileMenu;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
    window.openLegalModal = openLegalModal;
    window.closeLegalModal = closeLegalModal;

    // --- Event Listeners for closing modals ---
    ['leadModal', 'videoModal', 'legalModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    if (modalId === 'leadModal') closeModal();
                    if (modalId === 'videoModal') closeVideoModal();
                    if (modalId === 'legalModal') closeLegalModal();
                }
            });
        }
    });
});
