
        // =======================
        // PART 1: EVENT HANDLING
        // =======================
        
        /**
         * Theme Toggle Functionality
         * Demonstrates click event handling and CSS class manipulation
         */
        const themeToggle = document.getElementById('themeToggle');
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update button text based on current theme
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️ Light Mode';
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
            }
        });

        // ===============================
        // PART 2: INTERACTIVE ELEMENTS
        // ===============================

        /**
         * Interactive Counter Component
         * Demonstrates multiple event listeners and state management
         */
        let counterValue = 0;
        const counterDisplay = document.getElementById('counterDisplay');
        const incrementBtn = document.getElementById('incrementBtn');
        const decrementBtn = document.getElementById('decrementBtn');
        const resetBtn = document.getElementById('resetBtn');

        function updateCounterDisplay() {
            counterDisplay.textContent = counterValue;
            
            // Add visual feedback for different values
            if (counterValue > 0) {
                counterDisplay.style.color = '#10b981'; // Green for positive
            } else if (counterValue < 0) {
                counterDisplay.style.color = '#ef4444'; // Red for negative
            } else {
                counterDisplay.style.color = '#ffffff'; // White for zero
            }
        }

        incrementBtn.addEventListener('click', function() {
            counterValue++;
            updateCounterDisplay();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        decrementBtn.addEventListener('click', function() {
            counterValue--;
            updateCounterDisplay();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        resetBtn.addEventListener('click', function() {
            counterValue = 0;
            updateCounterDisplay();
            
            // Add reset animation
            counterDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => {
                counterDisplay.style.transform = 'scale(1)';
            }, 200);
        });

        /**
         * Collapsible FAQ Section
         * Demonstrates event delegation and DOM traversal
         */
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const arrow = this.querySelector('.faq-arrow');
                
                // Toggle the answer visibility
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    arrow.classList.remove('rotated');
                } else {
                    // Close all other FAQ items first
                    faqQuestions.forEach(otherQuestion => {
                        const otherItem = otherQuestion.parentElement;
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherArrow = otherQuestion.querySelector('.faq-arrow');
                        
                        if (otherAnswer !== answer) {
                            otherAnswer.style.display = 'none';
                            otherArrow.classList.remove('rotated');
                        }
                    });
                    
                    // Open the clicked FAQ item
                    answer.style.display = 'block';
                    arrow.classList.add('rotated');
                }
            });
        });

        /**
         * Tabbed Interface
         * Demonstrates data attributes and content switching
         */
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(targetTab + '-tab');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // ==============================
        // PART 3: FORM VALIDATION
        // ==============================

        /**
         * Comprehensive Form Validation System
         * Demonstrates real-time validation, regex patterns, and user feedback
         */
        const form = document.getElementById('userForm');
        const submitBtn = document.getElementById('submitBtn');
        const formSuccess = document.getElementById('formSuccess');

        // Validation patterns and rules
        const validationRules = {
            firstName: {
                pattern: /^[a-zA-Z]{2,}$/,
                message: 'First name must contain only letters and be at least 2 characters long'
            },
            lastName: {
                pattern: /^[a-zA-Z]{2,}$/,
                message: 'Last name must contain only letters and be at least 2 characters long'
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                pattern: /^[\d\s\-\+\(\)]{10,}$/,
                message: 'Please enter a valid phone number (at least 10 digits)'
            },
            password: {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must be 8+ characters with uppercase, lowercase, number, and special character'
            },
            message: {
                pattern: /^.{10,}$/,
                message: 'Message must be at least 10 characters long'
            }
        };

        /**
         * Validate individual field
         * @param {HTMLElement} field - The input field to validate
         * @param {string} fieldName - The name of the field for validation rules
         * @returns {boolean} - True if valid, false if invalid
         */
        function validateField(field, fieldName) {
            const value = field.value.trim();
            const errorElement = document.getElementById(fieldName + 'Error');
            const successElement = document.getElementById(fieldName + 'Success');
            
            // Check if field is required and empty
            if (field.hasAttribute('required') && !value) {
                showError(field, errorElement, successElement, 'This field is required');
                return false;
            }
            
            // Skip validation for optional empty fields
            if (!field.hasAttribute('required') && !value) {
                clearValidation(field, errorElement, successElement);
                return true;
            }
            
            // Special validation for confirm password
            if (fieldName === 'confirmPassword') {
                const password = document.getElementById('password').value;
                if (value !== password) {
                    showError(field, errorElement, successElement, 'Passwords do not match');
                    return false;
                } else {
                    showSuccess(field, errorElement, successElement);
                    return true;
                }
            }
            
            // Special validation for age select
            if (fieldName === 'age') {
                if (!value) {
                    showError(field, errorElement, successElement, 'Please select your age range');
                    return false;
                } else {
                    showSuccess(field, errorElement, successElement);
                    return true;
                }
            }
            
            // Apply regex validation if rule exists
            if (validationRules[fieldName]) {
                if (validationRules[fieldName].pattern.test(value)) {
                    showSuccess(field, errorElement, successElement);
                    return true;
                } else {
                    showError(field, errorElement, successElement, validationRules[fieldName].message);
                    return false;
                }
            }
            
            return true;
        }

        /**
         * Show error state for a field
         */
        function showError(field, errorElement, successElement, message) {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            successElement.style.display = 'none';
        }

        /**
         * Show success state for a field
         */
        function showSuccess(field, errorElement, successElement) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.style.display = 'none';
            successElement.style.display = 'block';
        }

        /**
         * Clear validation state for a field
         */
        function clearValidation(field, errorElement, successElement) {
            field.classList.remove('error', 'success');
            errorElement.style.display = 'none';
            successElement.style.display = 'none';
        }

        // Add real-time validation to all form fields
        const formFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'age', 'message'];
        
        formFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                // Validate on blur (when user leaves the field)
                field.addEventListener('blur', function() {
                    validateField(this, fieldName);
                });
                
                // Also validate on input for immediate feedback (with debouncing)
                let timeoutId;
                field.addEventListener('input', function() {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        validateField(this, fieldName);
                    }, 500); // Wait 500ms after user stops typing
                });
            }
        });

        // Form submission handling
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            let isFormValid = true;
            
            // Validate all fields
            formFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field && !validateField(field, fieldName)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                // Disable submit button to prevent double submission
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ Submitting...';
                
                // Simulate form submission delay
                setTimeout(() => {
                    // Show success message
                    formSuccess.style.display = 'block';
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth' });
                    
                    // Reset form after successful submission
                    form.reset();
                    
                    // Clear all validation states
                    formFields.forEach(fieldName => {
                        const field = document.getElementById(fieldName);
                        const errorElement = document.getElementById(fieldName + 'Error');
                        const successElement = document.getElementById(fieldName + 'Success');
                        if (field && errorElement && successElement) {
                            clearValidation(field, errorElement, successElement);
                        }
                    });
                    
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = '🚀 Submit Form';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                    
                }, 1500); // 1.5 second delay to simulate server processing
                
            } else {
                // Scroll to first error field
                const firstErrorField = document.querySelector('.error');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstErrorField.focus();
                }
            }
        });

        // =============================
        // ADDITIONAL EVENT HANDLING
        // =============================

        /**
         * Keyboard Event Handling
         * Demonstrates keyboard shortcuts and accessibility
         */
        
        // Counter keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Only work if no input field is focused
            if (document.activeElement.tagName !== 'INPUT' && 
                document.activeElement.tagName !== 'TEXTAREA' && 
                document.activeElement.tagName !== 'SELECT') {
                
                switch(event.key) {
                    case '+':
                    case '=':
                        event.preventDefault();
                        counterValue++;
                        updateCounterDisplay();
                        // Visual feedback
                        incrementBtn.style.background = 'rgba(255, 255, 255, 0.4)';
                        setTimeout(() => {
                            incrementBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                        }, 200);
                        break;
                        
                    case '-':
                        event.preventDefault();
                        counterValue--;
                        updateCounterDisplay();
                        // Visual feedback
                        decrementBtn.style.background = 'rgba(255, 255, 255, 0.4)';
                        setTimeout(() => {
                            decrementBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                        }, 200);
                        break;
                        
                    case '0':
                    case 'r':
                    case 'R':
                        event.preventDefault();
                        counterValue = 0;
                        updateCounterDisplay();
                        // Visual feedback
                        resetBtn.style.background = 'rgba(255, 255, 255, 0.4)';
                        setTimeout(() => {
                            resetBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                        }, 200);
                        break;
                        
                    case 't':
                    case 'T':
                        event.preventDefault();
                        themeToggle.click(); // Trigger theme toggle
                        break;
                }
            }
            
            // Form submission with Ctrl/Cmd + Enter
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                if (document.activeElement.form === form) {
                    event.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });

        /**
         * Mouse Events for Enhanced Interactivity
         * Demonstrates mouseover, mouseout, and mouse movement events
         */
        
        // Add hover effects to sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            section.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Tab buttons hover effects with sound simulation
        tabButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 5px 15px rgba(79, 70, 229, 0.2)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                }
            });
        });

        /**
         * Form Input Events for Real-time Feedback
         * Demonstrates input, focus, and blur events
         */
        
        // Password strength indicator
        const passwordField = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        
        passwordField.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update visual feedback based on strength
            if (password.length > 0) {
                let strengthText = '';
                let strengthColor = '';
                
                switch(strength) {
                    case 1:
                        strengthText = 'Very Weak';
                        strengthColor = '#ef4444';
                        break;
                    case 2:
                        strengthText = 'Weak';
                        strengthColor = '#f59e0b';
                        break;
                    case 3:
                        strengthText = 'Fair';
                        strengthColor = '#eab308';
                        break;
                    case 4:
                        strengthText = 'Good';
                        strengthColor = '#22c55e';
                        break;
                    case 5:
                        strengthText = 'Strong';
                        strengthColor = '#10b981';
                        break;
                }
                
                this.style.borderLeftWidth = '5px';
                this.style.borderLeftColor = strengthColor;
                
                // Show strength in error field (repurposed as info)
                if (!validationRules.password.pattern.test(password)) {
                    passwordError.innerHTML = `Password Strength: <span style="color: ${strengthColor}; font-weight: bold;">${strengthText}</span><br>
                        <small>Needs: uppercase, lowercase, number, special character (8+ chars)</small>`;
                    passwordError.style.display = 'block';
                    passwordError.style.color = '#6b7280';
                }
            } else {
                this.style.borderLeftWidth = '2px';
                this.style.borderLeftColor = 'var(--border-color)';
            }
        });

        /**
         * Calculate password strength
         * @param {string} password 
         * @returns {number} Strength level 1-5
         */
        function calculatePasswordStrength(password) {
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[@$!%*?&]/.test(password)) strength++;
            
            return strength;
        }

        // Email field real-time validation with suggestions
        const emailField = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        
        emailField.addEventListener('input', function() {
            const email = this.value;
            
            // Check for common typos and provide suggestions
            if (email.includes('@') && !validationRules.email.pattern.test(email)) {
                const suggestions = getEmailSuggestions(email);
                if (suggestions.length > 0) {
                    emailError.innerHTML = `Did you mean: ${suggestions.map(s => 
                        `<span style="color: var(--primary-color); cursor: pointer; text-decoration: underline;" 
                         onclick="document.getElementById('email').value='${s}'; validateField(document.getElementById('email'), 'email');">${s}</span>`
                    ).join(' or ')}?`;
                    emailError.style.display = 'block';
                    emailError.style.color = '#6b7280';
                }
            }
        });

        /**
         * Generate email suggestions for common typos
         * @param {string} email 
         * @returns {Array} Array of suggested corrections
         */
        function getEmailSuggestions(email) {
            const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
            const suggestions = [];
            
            const parts = email.split('@');
            if (parts.length === 2) {
                const domain = parts[1].toLowerCase();
                
                commonDomains.forEach(correctDomain => {
                    if (getLevenshteinDistance(domain, correctDomain) <= 2 && domain !== correctDomain) {
                        suggestions.push(parts[0] + '@' + correctDomain);
                    }
                });
            }
            
            return suggestions.slice(0, 2); // Return max 2 suggestions
        }

        /**
         * Calculate Levenshtein distance between two strings
         * @param {string} a 
         * @param {string} b 
         * @returns {number} Edit distance
         */
        function getLevenshteinDistance(a, b) {
            const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
            
            for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
            for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
            
            for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j - 1] + cost
                    );
                }
            }
            
            return matrix[a.length][b.length];
        }

        /**
         * Window Events for Responsive Behavior
         * Demonstrates resize and scroll events
         */
        
        // Handle window resize for responsive adjustments
        window.addEventListener('resize', function() {
            // Adjust counter display size on smaller screens
            if (window.innerWidth < 768) {
                counterDisplay.style.fontSize = '36px';
            } else {
                counterDisplay.style.fontSize = '48px';
            }
        });

        // Smooth scroll behavior for navigation
        function smoothScrollTo(element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }

        /**
         * Custom Events and Event Dispatch
         * Demonstrates creating and dispatching custom events
         */
        
        // Create custom event for form validation completion
        const formValidationComplete = new CustomEvent('formValidationComplete', {
            detail: { isValid: false, timestamp: new Date() }
        });

        // Listen for custom validation event
        form.addEventListener('formValidationComplete', function(event) {
            console.log('Form validation completed:', event.detail);
            
            if (event.detail.isValid) {
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
                submitBtn.textContent = '✅ Ready to Submit!';
            } else {
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                submitBtn.textContent = '🚀 Submit Form';
            }
        });

        /**
         * Accessibility Enhancements
         * ARIA labels, keyboard navigation, and screen reader support
         */
        
        // Add ARIA labels for better accessibility
        themeToggle.setAttribute('aria-label', 'Toggle between light and dark theme');
        counterDisplay.setAttribute('aria-live', 'polite');
        counterDisplay.setAttribute('aria-label', 'Current counter value');

        // Enhance FAQ accessibility
        faqQuestions.forEach((question, index) => {
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${index}`);
            question.setAttribute('tabindex', '0');
            
            const answer = question.parentElement.querySelector('.faq-answer');
            answer.setAttribute('id', `faq-answer-${index}`);
            answer.setAttribute('role', 'region');
            
            // Keyboard support for FAQ
            question.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
            });
        });

        // Enhance tab accessibility
        tabButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', button.classList.contains('active'));
            button.setAttribute('aria-controls', button.dataset.tab + '-tab');
            
            // Keyboard navigation for tabs
            button.addEventListener('keydown', function(event) {
                let newIndex = index;
                
                switch(event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        newIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        newIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                        break;
                    case 'Home':
                        event.preventDefault();
                        newIndex = 0;
                        break;
                    case 'End':
                        event.preventDefault();
                        newIndex = tabButtons.length - 1;
                        break;
                }
                
                if (newIndex !== index) {
                    tabButtons[newIndex].click();
                    tabButtons[newIndex].focus();
                }
            });
        });

        /**
         * Performance Optimization
         * Debouncing and throttling for better performance
         */
        
        // Debounce function for input validation
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

        // Throttle function for scroll/resize events
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

        console.log('🚀 Interactive Web Page Assignment loaded successfully!');
        console.log('📘 Assignment Features:');
        console.log('   ✅ Event Handling - Theme toggle, clicks, keyboard shortcuts');
        console.log('   ✅ Interactive Elements - Counter, FAQ, Tabs');
        console.log('   ✅ Form Validation - Real-time validation with regex patterns');
        console.log('   ✅ Accessibility - ARIA labels, keyboard navigation');
        console.log('   ✅ Performance - Debouncing and throttling');
        console.log('');
        console.log('🎮 Try these keyboard shortcuts:');
        console.log('   + or = : Increment counter');
        console.log('   - : Decrement counter'); 
        console.log('   0 or R : Reset counter');
        console.log('   T : Toggle theme');
        console.log('   Ctrl/Cmd + Enter : Submit form (when focused in form)');
