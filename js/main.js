/**
 * ATLAS 2.0 Platform - Main JavaScript
 * Version: 2.0.0
 */

(function() {
    'use strict';

    // Mark that JS is enabled
    document.documentElement.classList.add('js-enabled');

    // ==================== DOM READY ====================
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initNavigation();
        initScrollReveal();
        initSmoothScroll();
        initChatDemo();
        initMobileMenu();
        initCounterAnimation();
        
        // Fallback: reveal all content after 2 seconds if observer fails
        setTimeout(revealAllContent, 2000);
    }
    
    // Fallback function to show all content
    function revealAllContent() {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }

    // ==================== NAVIGATION ====================
    function initNavigation() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        function handleScroll() {
            const currentScroll = window.scrollY;

            if (currentScroll > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        function highlightNav() {
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightNav, { passive: true });
    }

    // ==================== SCROLL REVEAL ====================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    history.pushState(null, '', href);
                }
            });
        });
    }

    // ==================== CHAT DEMO ====================
    function initChatDemo() {
        const chatActions = document.querySelectorAll('.chat-action');
        const chatInput = document.querySelector('.chat-input');
        const chatSend = document.querySelector('.chat-send');
        const chatMessages = document.querySelector('.chat-messages');

        if (!chatActions.length) return;

        chatActions.forEach(action => {
            action.addEventListener('click', function() {
                if (chatInput) {
                    chatInput.value = this.textContent;
                    chatInput.focus();
                }
            });
        });

        if (chatSend && chatInput && chatMessages) {
            function sendMessage() {
                const text = chatInput.value.trim();
                if (!text) return;

                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-message user';
                userMsg.innerHTML = `
                    <div class="chat-avatar user">U</div>
                    <div class="chat-bubble">${escapeHtml(text)}</div>
                `;
                chatMessages.appendChild(userMsg);

                chatInput.value = '';

                // Simulate ATLAS response
                setTimeout(() => {
                    const atlasMsg = document.createElement('div');
                    atlasMsg.className = 'chat-message';
                    atlasMsg.innerHTML = `
                        <div class="chat-avatar atlas">A</div>
                        <div class="chat-bubble">
                            I'm analyzing that now. My research agents are gathering market data, 
                            competitor insights, and location intelligence. This typically takes 
                            about 30 seconds for a comprehensive analysis.
                            <div class="chat-actions">
                                <span class="chat-action">Show preliminary findings</span>
                                <span class="chat-action">Tell me more about your vision</span>
                            </div>
                        </div>
                    `;
                    chatMessages.appendChild(atlasMsg);
                    
                    // Re-init chat actions for new buttons
                    atlasMsg.querySelectorAll('.chat-action').forEach(action => {
                        action.addEventListener('click', function() {
                            chatInput.value = this.textContent;
                            chatInput.focus();
                        });
                    });

                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }

            chatSend.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }

    // ==================== MOBILE MENU ====================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                menuToggle.classList.toggle('active');
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('mobile-open');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    // ==================== COUNTER ANIMATION ====================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ==================== UTILITIES ====================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==================== PRICING TOGGLE ====================
    window.togglePricing = function(isAnnual) {
        const monthlyEls = document.querySelectorAll('[data-price-monthly]');
        const annualEls = document.querySelectorAll('[data-price-annual]');
        
        monthlyEls.forEach(el => {
            const monthly = el.getAttribute('data-price-monthly');
            const annual = el.getAttribute('data-price-annual');
            el.textContent = isAnnual ? annual : monthly;
        });
    };

    // ==================== FORM HANDLING ====================
    window.handleNewsletterSubmit = function(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        
        button.textContent = 'Subscribing...';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            button.textContent = 'Subscribed! ✓';
            button.style.background = 'var(--accent-secondary)';
            form.querySelector('input').value = '';
            
            setTimeout(() => {
                button.textContent = 'Subscribe';
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1000);

        return false;
    };

    // ==================== COPY TO CLIPBOARD ====================
    window.copyToClipboard = function(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    };

})();
