// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navSocial = document.querySelector('.nav-social');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navSocial.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navSocial.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced navbar background on scroll
    let navbarTicking = false;

    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            navbar.style.background = 'rgba(10, 26, 26, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }

        navbarTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Resume fullscreen functionality
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const resumeViewer = document.getElementById('resume-viewer');
    const resumeIframe = document.getElementById('resume-iframe');

    if (fullscreenBtn && resumeViewer) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                // Enter fullscreen
                if (resumeViewer.requestFullscreen) {
                    resumeViewer.requestFullscreen();
                } else if (resumeViewer.mozRequestFullScreen) {
                    resumeViewer.mozRequestFullScreen();
                } else if (resumeViewer.webkitRequestFullscreen) {
                    resumeViewer.webkitRequestFullscreen();
                } else if (resumeViewer.msRequestFullscreen) {
                    resumeViewer.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });

        // Update button text based on fullscreen state
        document.addEventListener('fullscreenchange', updateFullscreenButton);
        document.addEventListener('mozfullscreenchange', updateFullscreenButton);
        document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
        document.addEventListener('msfullscreenchange', updateFullscreenButton);

        function updateFullscreenButton() {
            const icon = fullscreenBtn.querySelector('i');
            if (document.fullscreenElement) {
                icon.className = 'fas fa-compress';
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
                resumeViewer.style.position = 'fixed';
                resumeViewer.style.top = '0';
                resumeViewer.style.left = '0';
                resumeViewer.style.width = '100vw';
                resumeViewer.style.height = '100vh';
                resumeViewer.style.zIndex = '9999';
                resumeViewer.style.background = '#000';
                resumeIframe.style.height = '100vh';
            } else {
                icon.className = 'fas fa-expand';
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
                resumeViewer.style.position = 'static';
                resumeViewer.style.width = 'auto';
                resumeViewer.style.height = 'auto';
                resumeViewer.style.background = '#ffffff';
                resumeIframe.style.height = '800px';
            }
        }
    }

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-fade-in-up');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe sections for animation (excluding hero)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Enhanced typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #00d4aa';

        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                // Variable speed for more natural typing
                const speed = Math.random() * 50 + 50; // 50-100ms
                setTimeout(typeWriter, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing effect after hero animations
        setTimeout(typeWriter, 1500);
    }

    // Enhanced parallax effect for hero section
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const heroText = document.querySelector('.hero-text');

        if (heroImage && heroText && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            const opacity = 1 - (scrolled / window.innerHeight) * 0.5;

            heroImage.style.transform = `translateY(${rate}px)`;
            heroText.style.transform = `translateY(${rate * 0.5}px)`;

            // Fade out hero content as user scrolls
            if (scrolled > 100) {
                heroImage.style.opacity = Math.max(opacity, 0.3);
                heroText.style.opacity = Math.max(opacity, 0.3);
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced skill tag animations
    const skillTagObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0) scale(1)';
                        tag.classList.add('animate-scale-in');
                    }, index * 80);
                });
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillTags = skillsSection.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px) scale(0.9)';
            tag.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        skillTagObserver.observe(skillsSection);
    }

    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // PDF loading fallback
    const iframe = document.getElementById('resume-iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            console.log('Resume PDF loaded successfully');
        });
        
        iframe.addEventListener('error', function() {
            console.error('Error loading PDF');
            const fallbackMessage = document.createElement('div');
            fallbackMessage.innerHTML = `
                <div style="padding: 2rem; text-align: center; background: #f5f5f5; border-radius: 15px;">
                    <h3 style="color: #333; margin-bottom: 1rem;">PDF Viewer Not Available</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">Your browser doesn't support embedded PDFs.</p>
                    <a href="assets/Kaloyan Draganov Resume.pdf" target="_blank"
                       style="background: #00d4aa; color: white; padding: 0.8rem 1.5rem;
                              text-decoration: none; border-radius: 25px; font-weight: 500;">
                        Open PDF in New Tab
                    </a>
                </div>
            `;
            iframe.parentNode.replaceChild(fallbackMessage, iframe);
        });
    }
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});
