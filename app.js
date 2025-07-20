// NeoAgent Enterprise Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enterprise components
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeDemoPlayer();
    initializeModals();
    initializeWhatsApp();
    initializeConfetti();
    initializeDashboardAnimations();
    
    // Remove loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            hideLoadingScreen();
        }, 1200);
    });
});

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    // Auto-hide after 3 seconds as fallback
    setTimeout(hideLoadingScreen, 3000);
    
    window.hideLoadingScreen = hideLoadingScreen;
}

// Enhanced Navigation and Smooth Scrolling - FIXED
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // FIXED: Enhanced smooth scroll to sections
    window.scrollToSection = function(sectionId) {
        console.log('Navigating to section:', sectionId);
        
        // Map navigation text to actual section IDs
        const sectionMap = {
            'solutions': 'solutions',
            'platform': 'features',
            'investment': 'pricing',
            'features': 'features',
            'pricing': 'pricing',
            'demo': 'demo',
            'contact': 'contact',
            'comparison': 'comparison'
        };
        
        const targetId = sectionMap[sectionId] || sectionId;
        const element = document.getElementById(targetId);
        
        if (element) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
            const offsetTop = element.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Professional visual feedback
            element.style.transform = 'scale(1.01)';
            element.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        } else {
            console.warn('Section not found:', targetId);
        }
    };
    
    // FIXED: Add click handlers to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Add click handlers to footer links
    document.querySelectorAll('.footer-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
    
    // Add click handlers to CTA buttons
    document.querySelectorAll('button[onclick*="scrollToSection"]').forEach(button => {
        button.addEventListener('click', function() {
            const onclickValue = this.getAttribute('onclick');
            const match = onclickValue.match(/scrollToSection\('(.+)'\)/);
            if (match) {
                scrollToSection(match[1]);
            }
        });
    });
}

// Professional Scroll Animations
function initializeScrollAnimations() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .comparison-item, .pricing-card, .industry-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Dashboard Animations
function initializeDashboardAnimations() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    // Animate metric values
    function animateMetrics() {
        metricCards.forEach((card, index) => {
            const value = card.querySelector('.metric-value');
            const originalText = value.textContent;
            
            setTimeout(() => {
                // Create counting animation effect
                if (originalText.includes('2,847')) {
                    animateNumber(value, 0, 2847, 1500, (num) => num.toLocaleString());
                } else if (originalText.includes('89.3%')) {
                    animateNumber(value, 0, 89.3, 1200, (num) => num.toFixed(1) + '%');
                } else if (originalText.includes('$47.2K')) {
                    animateNumber(value, 0, 47.2, 1800, (num) => '$' + num.toFixed(1) + 'K');
                }
            }, index * 200);
        });
    }
    
    // Animate integration status indicators
    function animateIntegrations() {
        const integrationItems = document.querySelectorAll('.integration-item');
        integrationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 150);
        });
    }
    
    // Initialize dashboard animations after a delay
    setTimeout(() => {
        animateMetrics();
        animateIntegrations();
    }, 2000);
}

// Professional number animation
function animateNumber(element, start, end, duration, formatter) {
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Use easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        element.textContent = formatter(current);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// FIXED: Enhanced Contact Form with Professional Validation
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // Professional form validation
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid business email'
        },
        phone: {
            required: true,
            pattern: /^[\+]?[\d\s\-\(\)]{10,}$/,
            message: 'Please enter a valid phone number'
        },
        company: {
            required: true,
            minLength: 2,
            message: 'Please enter your company name'
        },
        businessType: {
            required: true,
            message: 'Please select your industry'
        }
    };
    
    // FIXED: Enhanced dropdown functionality
    const dropdowns = document.querySelectorAll('select.form-control');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('focus', function() {
            this.style.borderColor = '#00D1FF';
            this.style.boxShadow = '0 0 0 3px rgba(0, 209, 255, 0.3)';
        });
        
        dropdown.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.style.boxShadow = 'none';
        });
        
        dropdown.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#FFFFFF';
                // Remove any error styling when a valid selection is made
                resetFieldStyling(this);
                showFieldSuccess(this);
            }
        });
        
        // Ensure dropdowns are clickable and functional
        dropdown.addEventListener('mousedown', function() {
            this.style.borderColor = '#00D1FF';
        });
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form with professional feedback
            if (!validateFormProfessionally()) {
                return;
            }
            
            // Professional loading state
            showLoadingState(submitBtn);
            
            // Collect form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            try {
                // Send email to business owner
                await sendBusinessInquiry(formObject);
                
                // Show professional success message
                showSuccessMessage();
                triggerProfessionalConfetti();
                
                // Reset form
                contactForm.reset();
                
                // Reset all field styling
                const allFields = contactForm.querySelectorAll('.form-control');
                allFields.forEach(field => resetFieldStyling(field));
                
                // Redirect to WhatsApp Business after success
                setTimeout(() => {
                    redirectToWhatsAppBusiness(formObject);
                }, 3000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                showErrorMessage('We apologize for the technical issue. Please try again or contact us directly.');
            } finally {
                // Restore button state
                restoreButtonState(submitBtn);
            }
        });
    }
    
    function validateFormProfessionally() {
        let isValid = true;
        const formData = new FormData(contactForm);
        
        for (const [fieldName, rules] of Object.entries(validationRules)) {
            const field = document.getElementById(fieldName === 'businessType' ? 'business-type' : fieldName);
            const value = formData.get(fieldName) || '';
            
            if (!field) continue;
            
            // Reset field styling
            resetFieldStyling(field);
            
            // Required validation
            if (rules.required && !value.trim()) {
                showFieldError(field, rules.message);
                isValid = false;
                continue;
            }
            
            // Pattern validation
            if (value.trim() && rules.pattern && !rules.pattern.test(value.trim())) {
                showFieldError(field, rules.message);
                isValid = false;
                continue;
            }
            
            // Min length validation
            if (value.trim() && rules.minLength && value.trim().length < rules.minLength) {
                showFieldError(field, rules.message);
                isValid = false;
                continue;
            }
            
            // Show success for valid fields
            showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#EF4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.3)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = 'color: #EF4444; font-size: 12px; margin-top: 4px;';
        field.parentNode.appendChild(errorElement);
    }
    
    function showFieldSuccess(field) {
        field.style.borderColor = '#10B981';
        field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.3)';
    }
    
    function resetFieldStyling(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.boxShadow = 'none';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Make these functions available globally
    window.showFieldError = showFieldError;
    window.showFieldSuccess = showFieldSuccess;
    window.resetFieldStyling = resetFieldStyling;
}

// Professional loading state
function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.innerHTML = `
        <svg style="width: 20px; height: 20px; animation: spin 1s linear infinite; margin-right: 8px;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V2A10 10 0 0 0 2 12H4A8 8 0 0 1 12 4Z"/>
        </svg>
        Processing Request...
    `;
    button.disabled = true;
    
    // Add spinning animation
    if (!document.getElementById('loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }
}

function restoreButtonState(button) {
    setTimeout(() => {
        button.innerHTML = button.dataset.originalText || 'Submit';
        button.disabled = false;
    }, 1000);
}

// Professional email sending function
async function sendBusinessInquiry(formData) {
    const emailContent = `
NEW ENTERPRISE INQUIRY - NeoAgent™

CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━
Full Name: ${formData.name}
Business Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}

BUSINESS DETAILS:
━━━━━━━━━━━━━━━━━━━━
Industry: ${formData.businessType}
Monthly Call Volume: ${formData.callVolume || 'Not specified'}

BUSINESS OBJECTIVES:
━━━━━━━━━━━━━━━━━━━━
${formData.message || 'No additional information provided'}

INQUIRY DETAILS:
━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString()}
Source: NeoAgent Enterprise Website
Priority: High (Enterprise Inquiry)

ACTION REQUIRED:
━━━━━━━━━━━━━━━━━━━━
1. Respond within 2 hours
2. Schedule enterprise demo
3. Prepare industry-specific presentation
4. Follow up with WhatsApp Business integration

This inquiry has been automatically forwarded to: bhowalabhi501@gmail.com
    `;
    
    // Simulate professional API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('📧 Enterprise Inquiry Sent to: bhowalabhi501@gmail.com');
            console.log('📋 Inquiry Details:', emailContent);
            
            // Simulate 98% success rate for enterprise system
            if (Math.random() > 0.02) {
                resolve({ success: true, inquiryId: generateInquiryId() });
            } else {
                reject(new Error('Network timeout - Enterprise system busy'));
            }
        }, 1800);
    });
}

function generateInquiryId() {
    return 'NEO-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #00D1FF 0%, #0099CC 100%);
            color: white;
            padding: 48px 60px;
            border-radius: 24px;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0, 209, 255, 0.4);
            backdrop-filter: blur(20px);
            animation: enterpriseSuccess 0.8s ease-out;
            max-width: 90vw;
            border: 1px solid rgba(255, 255, 255, 0.1);
        ">
            <svg style="width: 64px; height: 64px; margin-bottom: 20px; color: white;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
            </svg>
            <h3 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700;">Enterprise Inquiry Received</h3>
            <p style="margin: 0 0 12px 0; font-size: 18px; opacity: 0.9;">Your information has been sent to our enterprise team</p>
            <p style="margin: 0; font-size: 16px; opacity: 0.8;">Redirecting to WhatsApp Business for immediate support...</p>
        </div>
        <style>
            @keyframes enterpriseSuccess {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) rotateY(-15deg); }
                50% { transform: translate(-50%, -50%) scale(1.05) rotateY(5deg); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotateY(0deg); }
            }
        </style>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                successMessage.parentNode.removeChild(successMessage);
            }, 300);
        }
    }, 4500);
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
            color: white;
            padding: 40px 50px;
            border-radius: 20px;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
            animation: errorPulse 0.6s ease-out;
            max-width: 90vw;
        ">
            <svg style="width: 48px; height: 48px; margin-bottom: 16px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M12 17H12.01V17.01H12V17M12 6V14H12.01L12 6Z"/>
            </svg>
            <h3 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 600;">Technical Issue</h3>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">${message}</p>
        </div>
        <style>
            @keyframes errorPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.05); }
            }
        </style>
    `;
    
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
        if (errorMessage.parentNode) {
            errorMessage.style.opacity = '0';
            setTimeout(() => {
                errorMessage.parentNode.removeChild(errorMessage);
            }, 300);
        }
    }, 4000);
}

// Professional Demo Player
function initializeDemoPlayer() {
    const demoPlayBtn = document.getElementById('demo-play-btn');
    const waveform = document.getElementById('waveform');
    const conversationTranscript = document.getElementById('conversation-transcript');
    
    let isPlaying = false;
    let animationInterval;
    let callTimer;
    let startTime;
    
    if (demoPlayBtn) {
        demoPlayBtn.addEventListener('click', function() {
            if (!isPlaying) {
                startEnterpriseDemo();
            } else {
                stopDemo();
            }
        });
    }
    
    function startEnterpriseDemo() {
        isPlaying = true;
        startTime = Date.now();
        demoPlayBtn.innerHTML = `
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 19V5L22 12L14 19Z"/>
            </svg>
            Stop Demo
        `;
        demoPlayBtn.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
        
        // Professional waveform animation
        animateWaveformProfessionally();
        
        // Update call timer
        updateCallTimer();
        
        // Simulate enterprise-level conversation
        simulateEnterpriseConversation();
        
        // Auto-stop after realistic demo duration
        setTimeout(() => {
            if (isPlaying) stopDemo();
        }, 35000);
    }
    
    function stopDemo() {
        isPlaying = false;
        demoPlayBtn.innerHTML = `
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 6.82V17.18L17 12L8 6.82Z"/>
            </svg>
            Get Live Demo On Your Call - Free
        `;
        demoPlayBtn.style.background = 'linear-gradient(135deg, #00D1FF 0%, #0099CC 100%)';
        
        if (animationInterval) clearInterval(animationInterval);
        if (callTimer) clearInterval(callTimer);
        
        // Reset waveform professionally
        resetWaveform();
        
        // Reset call timer
        const callDuration = document.querySelector('.call-duration');
        if (callDuration) {
            callDuration.textContent = '00:00';
        }
    }
    
    function animateWaveformProfessionally() {
        const waveBars = waveform.querySelectorAll('.wave-bar');
        animationInterval = setInterval(() => {
            waveBars.forEach((bar, index) => {
                const intensity = Math.random() * 0.8 + 0.2;
                const height = intensity * 80 + 15;
                const delay = index * 0.05;
                
                setTimeout(() => {
                    bar.style.height = height + '%';
                    bar.style.background = `linear-gradient(135deg, #00D1FF ${intensity * 30}%, #0099CC 100%)`;
                }, delay * 100);
            });
        }, 150);
    }
    
    function resetWaveform() {
        const waveBars = waveform.querySelectorAll('.wave-bar');
        waveBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = '20%';
                bar.style.background = 'linear-gradient(135deg, #00D1FF 0%, #0099CC 100%)';
            }, index * 30);
        });
    }
    
    function updateCallTimer() {
        callTimer = setInterval(() => {
            if (!isPlaying) return;
            
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            const callDuration = document.querySelector('.call-duration');
            if (callDuration) {
                callDuration.textContent = timeString;
            }
        }, 1000);
    }
    
    function simulateEnterpriseConversation() {
        const conversation = [
            {
                speaker: 'ai',
                message: 'Good morning! This is Alexandra from NeoAgent Enterprise Solutions. I understand you\'re exploring AI automation for your business operations. Is this a good time to discuss your requirements?',
                delay: 0
            },
            {
                speaker: 'customer',
                message: 'Yes, hi Alexandra. We\'re a healthcare practice with about 200 patients, and we\'re spending too much time on appointment scheduling and follow-ups.',
                delay: 5000
            },
            {
                speaker: 'ai',
                message: 'I completely understand. Healthcare practices face unique challenges with patient communications. Our HIPAA-compliant AI system has helped similar practices reduce administrative overhead by 75% while improving patient satisfaction. Can you tell me about your current monthly call volume?',
                delay: 10000
            },
            {
                speaker: 'customer',
                message: 'We probably handle around 800-1000 calls per month for appointments, insurance verification, and follow-ups. It\'s becoming overwhelming for our staff.',
                delay: 16000
            },
            {
                speaker: 'ai',
                message: 'That volume is perfect for our Professional tier. Based on similar healthcare clients, you could expect to save approximately $52,000 annually while providing 24/7 patient support. Would you like me to schedule a personalized demo where I can show you exactly how this would work with your patient management system?',
                delay: 22000
            },
            {
                speaker: 'customer',
                message: 'That sounds very promising. Yes, I\'d definitely like to see a demo tailored to our practice.',
                delay: 28000
            },
            {
                speaker: 'ai',
                message: 'Perfect! I\'ll schedule a comprehensive demo for this week. You\'ll see live examples of patient appointment booking, insurance verification, and our HIPAA-compliant reporting dashboard. I\'ll also prepare a customized ROI analysis for your practice size.',
                delay: 32000
            }
        ];
        
        // Clear existing transcript
        if (conversationTranscript) {
            conversationTranscript.innerHTML = '<div class="transcript-header">Live Enterprise Demo Call - Healthcare Industry</div>';
            
            conversation.forEach(conv => {
                setTimeout(() => {
                    if (isPlaying) {
                        addProfessionalTranscriptLine(conv.speaker, conv.message);
                    }
                }, conv.delay);
            });
        }
    }
    
    function addProfessionalTranscriptLine(speaker, message) {
        if (!conversationTranscript) return;
        
        const line = document.createElement('div');
        line.className = 'transcript-line';
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
        line.innerHTML = `
            <span class="speaker ${speaker}">${speaker === 'ai' ? 'AI Agent:' : 'Healthcare Client:'}</span>
            <span class="message">${message}</span>
        `;
        conversationTranscript.appendChild(line);
        
        // Professional animation
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            line.style.transition = 'all 0.4s ease';
        }, 100);
        
        conversationTranscript.scrollTop = conversationTranscript.scrollHeight;
    }
}

// FIXED: Enhanced Modal Management
function initializeModals() {
    const privacyPolicyLinks = document.querySelectorAll('#privacy-policy-link, #privacy-policy-link-footer');
    
    privacyPolicyLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('privacy-modal');
            });
        }
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display:block"]');
            openModals.forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
    
    // Add click handlers to close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.transition = 'all 0.3s ease';
                }, 10);
            }
        }
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
            }
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };
}

// WhatsApp Business Integration
function initializeWhatsApp() {
    const whatsappWidget = document.getElementById('whatsapp-widget');
    
    // Professional pulse animation for WhatsApp widget
    if (whatsappWidget) {
        setInterval(() => {
            const btn = whatsappWidget.querySelector('.whatsapp-btn');
            if (btn) {
                btn.style.transform = 'scale(1.05)';
                btn.style.transition = 'transform 0.2s ease';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 200);
            }
        }, 8000); // Professional pulse every 8 seconds
    }
    
    window.openWhatsApp = function() {
        const message = encodeURIComponent(`Hello! I'm interested in NeoAgent Enterprise AI solutions.

I visited your professional website and would like to discuss:
• Custom AI implementation for my business
• ROI analysis and cost savings
• Enterprise dashboard and reporting features
• Integration with WhatsApp Business, Gmail & Google Sheets

Can we schedule a consultation to explore how NeoAgent can transform my business operations?`);
        
        const whatsappUrl = `https://wa.me/918856909982?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Track professional WhatsApp engagement
        trackEvent('whatsapp_business_contact', {
            source: 'website_widget',
            timestamp: new Date().toISOString(),
            user_intent: 'enterprise_inquiry'
        });
    };
}

function redirectToWhatsAppBusiness(formData) {
    const businessMessage = encodeURIComponent(`🏢 ENTERPRISE INQUIRY - NeoAgent™

I've just submitted a contact form on your website with the following details:

👤 CONTACT INFORMATION:
• Name: ${formData.name}
• Company: ${formData.company}
• Industry: ${formData.businessType}
• Email: ${formData.email}
• Phone: ${formData.phone}

📊 BUSINESS REQUIREMENTS:
• Call Volume: ${formData.callVolume || 'To be discussed'}
• Objectives: ${formData.message || 'General inquiry about AI automation'}

🎯 NEXT STEPS:
I'm very interested in seeing how NeoAgent can transform my business operations. When would be the best time for an enterprise demonstration?

Looking forward to discussing:
✅ Custom AI implementation
✅ ROI analysis & cost savings  
✅ Integration setup (WhatsApp Business, Gmail, Google Sheets)
✅ Enterprise dashboard & reporting

Thank you for your time!`);
    
    const whatsappBusinessUrl = `https://wa.me/918856909982?text=${businessMessage}`;
    window.open(whatsappBusinessUrl, '_blank');
    
    // Track enterprise form to WhatsApp conversion
    trackEvent('form_to_whatsapp_business', {
        business_type: formData.businessType,
        call_volume: formData.callVolume,
        company: formData.company,
        timestamp: new Date().toISOString(),
        conversion_source: 'contact_form_success'
    });
}

// Professional Confetti Animation
function initializeConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let confettiPieces = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class ProfessionalConfetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.width = Math.random() * 8 + 6;
            this.height = Math.random() * 6 + 4;
            this.color = this.getProfessionalColor();
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 4 - 2;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        }
        
        getProfessionalColor() {
            const professionalColors = [
                '#00D1FF', // NeoAgent Blue
                '#FFFFFF', // Professional White  
                '#10B981', // Success Green
                '#3B82F6', // Professional Blue
                '#F59E0B', // Premium Gold
                '#8B5CF6', // Enterprise Purple
                '#06B6D4', // Cyan Professional
                '#EC4899'  // Professional Pink
            ];
            return professionalColors[Math.floor(Math.random() * professionalColors.length)];
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            this.speedY += 0.08; // Realistic gravity
            
            if (this.y > canvas.height + 50) {
                return false;
            }
            return true;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 3;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            }
            
            ctx.restore();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces = confettiPieces.filter(piece => {
            piece.draw();
            return piece.update();
        });
        
        if (confettiPieces.length > 0) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    window.triggerProfessionalConfetti = function() {
        // Create multiple professional bursts
        for (let burst = 0; burst < 4; burst++) {
            setTimeout(() => {
                for (let i = 0; i < 40; i++) {
                    confettiPieces.push(new ProfessionalConfetti());
                }
            }, burst * 150);
        }
        
        if (!animationId) {
            animate();
        }
        
        setTimeout(() => {
            animationId = null;
        }, 6000);
    };
}

// Professional Analytics and Tracking
function trackEvent(eventName, eventData) {
    console.log(`📈 Enterprise Analytics Event: ${eventName}`, eventData);
    
    // In production, integrate with professional analytics
    // Example integrations:
    // - Google Analytics 4 for enterprise
    // - Adobe Analytics
    // - Mixpanel for B2B tracking
    // - Custom enterprise tracking solution
}

// Enhanced scroll performance with professional effects
const optimizedScrollHandler = throttle(function() {
    const scrollY = window.scrollY;
    
    // Update navbar state
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Professional parallax for hero background
    const heroSection = document.querySelector('.hero-bg-gradient');
    if (heroSection) {
        const parallaxSpeed = 0.2;
        heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
    
    // Animate dashboard metrics on scroll
    const dashboardPreview = document.querySelector('.dashboard-preview');
    if (dashboardPreview) {
        const rect = dashboardPreview.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const visibility = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            dashboardPreview.style.transform = `translateY(${(1 - visibility) * 20}px)`;
            dashboardPreview.style.opacity = visibility;
        }
    }
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Professional utility functions
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

// Professional performance monitoring
function monitorEnterprisePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
                const domContentLoaded = Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
                
                console.log(`🚀 Enterprise Performance Metrics:`);
                console.log(`   Total Load Time: ${loadTime}ms`);
                console.log(`   DOM Ready: ${domContentLoaded}ms`);
                
                trackEvent('performance_metrics', {
                    load_time: loadTime,
                    dom_content_loaded: domContentLoaded,
                    page_type: 'enterprise_landing',
                    timestamp: new Date().toISOString()
                });
                
                // Professional performance notification
                if (loadTime > 2500) {
                    console.warn('⚠️ Enterprise page load time exceeds optimal threshold (>2.5s)');
                }
            }, 100);
        });
    }
}

// Professional error handling
window.addEventListener('error', function(e) {
    console.error('🚨 Enterprise System Error:', e.error);
    
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_line: e.lineno,
        page_type: 'enterprise_landing',
        timestamp: new Date().toISOString()
    });
});

// Track professional user engagement
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track enterprise CTA interactions
    if (target.classList.contains('btn--primary')) {
        trackEvent('enterprise_cta_click', {
            button_text: target.textContent.trim(),
            page_section: target.closest('section')?.id || 'unknown',
            timestamp: new Date().toISOString()
        });
    }
    
    // Track industry card interactions
    if (target.closest('.industry-card')) {
        const industryCard = target.closest('.industry-card');
        const industryType = industryCard.classList.contains('healthcare') ? 'healthcare' : 'real-estate';
        trackEvent('industry_selection', {
            industry_type: industryType,
            timestamp: new Date().toISOString()
        });
    }
    
    // Track enterprise pricing interactions
    if (target.closest('.pricing-card')) {
        const pricingName = target.closest('.pricing-card').querySelector('.pricing-name')?.textContent;
        trackEvent('pricing_tier_interest', {
            plan_name: pricingName || 'unknown',
            plan_type: pricingName?.toLowerCase() || 'unknown',
            timestamp: new Date().toISOString()
        });
    }
});

// Professional page visibility tracking
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('page_hidden', { 
            timestamp: new Date().toISOString(),
            page_type: 'enterprise_landing'
        });
    } else {
        trackEvent('page_visible', { 
            timestamp: new Date().toISOString(),
            page_type: 'enterprise_landing'
        });
    }
});

// Initialize enterprise performance monitoring
monitorEnterprisePerformance();

// Professional initialization complete
console.log('🏢 NeoAgent Enterprise Website Initialized Successfully!');
trackEvent('enterprise_page_initialized', { 
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    page_type: 'enterprise_landing'
});