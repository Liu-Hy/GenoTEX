// ===========================
// Smooth Scrolling for Navigation
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-list a, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===========================
    // Active Navigation Highlighting
    // ===========================
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-list a');

    function highlightNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navItems.forEach(item => {
            item.style.color = '';
            item.style.backgroundColor = '';
            
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.style.color = '#2563eb';
                item.style.backgroundColor = '#f3f4f6';
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call once on load

    // ===========================
    // Scroll Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatedElements = document.querySelectorAll(
        '.content-box, .stat-card, .feature-item, .agent-card, .result-card, .capability-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add animation class style
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===========================
    // Sticky Navigation Shadow
    // ===========================
    const nav = document.querySelector('.nav');
    
    function handleNavShadow() {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }

    window.addEventListener('scroll', handleNavShadow);
    handleNavShadow();

    // ===========================
    // Copy Citation to Clipboard
    // ===========================
    const citationBox = document.querySelector('.citation-box');
    
    if (citationBox) {
        citationBox.style.cursor = 'pointer';
        citationBox.title = 'Click to copy citation';
        
        citationBox.addEventListener('click', function() {
            const code = this.querySelector('code');
            const text = code.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const originalBorder = this.style.borderLeft;
                this.style.borderLeft = '4px solid #10b981';
                
                // Create and show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Citation copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #10b981;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    animation: fadeInOut 2s ease-in-out;
                `;
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    this.style.borderLeft = originalBorder;
                    tooltip.remove();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy citation:', err);
            });
        });
    }

    // Add fadeInOut animation
    const fadeInOutStyle = document.createElement('style');
    fadeInOutStyle.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }
    `;
    document.head.appendChild(fadeInOutStyle);

    // ===========================
    // Scroll to Top Button
    // ===========================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #4f46e5);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        z-index: 999;
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1) translateY(-3px)';
        scrollTopBtn.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.5)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1) translateY(0)';
        scrollTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
    });

    document.body.appendChild(scrollTopBtn);

    function handleScrollTopButton() {
        if (window.scrollY > 400) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', handleScrollTopButton);

    // ===========================
    // Add Stagger Animation to Grids
    // ===========================
    function staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * delay}ms`;
        });
    }

    staggerAnimation('.stat-card', 150);
    staggerAnimation('.feature-item', 100);
    staggerAnimation('.agent-card', 100);
    staggerAnimation('.result-card', 100);

    // ===========================
    // Parallax Effect for Header
    // ===========================
    const header = document.querySelector('.header');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (header && scrolled < header.offsetHeight) {
            header.style.transform = `translateY(${rate}px)`;
            header.style.opacity = 1 - (scrolled / header.offsetHeight) * 0.3;
        }
    }

    window.addEventListener('scroll', handleParallax);

    // ===========================
    // Performance Optimization
    // ===========================
    let ticking = false;
    
    function optimizedScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNavigation();
                handleNavShadow();
                handleScrollTopButton();
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Replace individual scroll listeners with optimized version
    window.removeEventListener('scroll', highlightNavigation);
    window.removeEventListener('scroll', handleNavShadow);
    window.removeEventListener('scroll', handleScrollTopButton);
    window.removeEventListener('scroll', handleParallax);
    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // ===========================
    // Console Message
    // ===========================
    console.log(
        '%cGenoTEX Project Page',
        'color: #2563eb; font-size: 24px; font-weight: bold;'
    );
    console.log(
        '%cBuilt with ❤️ for advancing AI-assisted genomics research',
        'color: #6b7280; font-size: 14px;'
    );
    console.log(
        '%cGitHub: https://github.com/Liu-Hy/GenoTEX',
        'color: #4f46e5; font-size: 12px;'
    );
});
