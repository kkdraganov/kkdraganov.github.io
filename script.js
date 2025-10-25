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


        // Background particles + floating geometric shapes (motion-aware)
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduceMotion) {
            const canvas = document.createElement('canvas');
            canvas.id = 'bg-particles';
            Object.assign(canvas.style, {
                position: 'fixed',
                inset: '0',
                zIndex: '0',
                pointerEvents: 'none'
            });
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            let particles = [];
            let shapes = [];

            const palette = {
                fill: 'rgba(0, 212, 170, 0.08)',
                stroke: 'rgba(61, 214, 182, 0.25)',
                glow: 'rgba(0, 212, 170, 0.35)'
            };

            const rand = (min, max) => Math.random() * (max - min) + min;
            const wrap = (v, max, m) => (v < -m ? max + m : (v > max + m ? -m : v));

            function makeShapes() {
                const area = window.innerWidth * window.innerHeight;
                const base = Math.floor(area / 300000); // scales with viewport
                const count = Math.max(5, Math.min(10, base + 4));

                shapes = Array.from({ length: count }, () => {
                    const kind = Math.random() < 0.85 ? 'manifold' : 'ring';
                    const size = rand(Math.min(80, window.innerWidth * 0.08), Math.min(160, window.innerWidth * 0.14));
                    const speed = rand(0.015, 0.06);
                    const angle = rand(0, Math.PI * 2);
                    const surface = Math.random() < 0.75 ? 'torus' : 'sphere';
                    const uSeg = surface === 'torus' ? 22 : 20;
                    const vSeg = surface === 'torus' ? 14 : 12;
                    const R = surface === 'torus' ? size * 0.65 : size * 0.9;
                    const r = surface === 'torus' ? size * 0.32 : size * 0.9;

                    return {
                        kind,
                        surface,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        vx: (Math.random() - 0.5) * speed,
                        vy: (Math.random() - 0.5) * speed,
                        R, r,
                        uSeg, vSeg,
                        angle,
                        va: rand(-0.002, 0.002),
                        rx: rand(0, Math.PI * 2),
                        ry: rand(0, Math.PI * 2),
                        rz: rand(0, Math.PI * 2),
                        vrx: rand(-0.0012, 0.0012),
                        vry: rand(-0.0012, 0.0012),
                        vrz: rand(-0.0012, 0.0012),
                        phase: rand(0, Math.PI * 2),
                        vp: rand(0.002, 0.006),
                        strokeW: rand(0.8, 1.4)
                    };
                });
            }

            function resize() {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const w = Math.floor(window.innerWidth * dpr);
                const h = Math.floor(window.innerHeight * dpr);
                canvas.width = w;
                canvas.height = h;
                canvas.style.width = window.innerWidth + 'px';
                canvas.style.height = window.innerHeight + 'px';
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);

                const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 40000);
                const count = Math.max(20, Math.min(60, baseCount));
                particles = Array.from({ length: count }, () => ({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    r: 1 + Math.random() * 1.5
                }));

                makeShapes();
            }



            function rotate3D(x, y, z, rx, ry, rz) {
                const cx = Math.cos(rx), sx = Math.sin(rx);
                let y1 = y * cx - z * sx;
                let z1 = y * sx + z * cx;
                const cy = Math.cos(ry), sy = Math.sin(ry);
                let x2 = x * cy + z1 * sy;
                let z2 = -x * sy + z1 * cy;
                const cz = Math.cos(rz), sz = Math.sin(rz);
                let x3 = x2 * cz - y1 * sz;
                let y3 = x2 * sz + y1 * cz;
                return [x3, y3, z2];
            }

            function project2D(x, y, z, scale) {
                const depth = 1 / (1 + z * 0.002);
                return [x * depth * scale, y * depth * scale];
            }

            function drawManifold(s) {
                ctx.lineWidth = s.strokeW;
                ctx.strokeStyle = 'rgba(0, 212, 170, 0.26)';
                ctx.shadowBlur = 14;
                ctx.shadowColor = palette.glow;

                const uSeg = s.uSeg;
                const vSeg = s.vSeg;

                const breath = 1 + 0.08 * Math.sin(s.phase);
                const R = s.surface === 'torus' ? s.R * breath : s.R * 0.9 * breath;
                const r = s.surface === 'torus' ? s.r * breath : s.r * breath;

                const scale = 1.0;

                // u-isolines
                for (let i = 0; i < uSeg; i++) {
                    const u0 = (i / uSeg) * Math.PI * 2;
                    ctx.beginPath();
                    for (let j = 0; j <= vSeg; j++) {
                        const v0 = (j / vSeg) * Math.PI * 2;
                        let x, y, z;
                        if (s.surface === 'torus') {
                            const cx = Math.cos(v0), sx = Math.sin(v0);
                            x = (R + r * cx) * Math.cos(u0);
                            y = (R + r * cx) * Math.sin(u0);
                            z = r * sx;
                        } else {
                            const vSphere = (j / vSeg) * Math.PI;
                            x = R * Math.cos(u0) * Math.sin(vSphere);
                            y = R * Math.sin(u0) * Math.sin(vSphere);
                            z = R * Math.cos(vSphere);
                        }
                        [x, y, z] = rotate3D(x, y, z, s.rx, s.ry, s.rz);
                        const [px, py] = project2D(x, y, z, scale);
                        if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                    ctx.stroke();
                }

                // v-isolines
                for (let j = 0; j < vSeg; j++) {
                    const v0 = (j / vSeg) * Math.PI * 2;
                    ctx.beginPath();
                    for (let i = 0; i <= uSeg; i++) {
                        const u0 = (i / uSeg) * Math.PI * 2;
                        let x, y, z;
                        if (s.surface === 'torus') {
                            const cx = Math.cos(v0), sx = Math.sin(v0);
                            x = (R + r * cx) * Math.cos(u0);
                            y = (R + r * cx) * Math.sin(u0);
                            z = r * sx;
                        } else {
                            const vSphere = (j / vSeg) * Math.PI;
                            x = R * Math.cos(u0) * Math.sin(vSphere);
                            y = R * Math.sin(u0) * Math.sin(vSphere);
                            z = R * Math.cos(vSphere);
                        }
                        [x, y, z] = rotate3D(x, y, z, s.rx, s.ry, s.rz);
                        const [px, py] = project2D(x, y, z, scale);
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                    ctx.stroke();
                }
            }

            function step() {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                // background drift particles
                ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
                for (const p of particles) {
                    p.x = (p.x + p.vx + window.innerWidth) % window.innerWidth;
                    p.y = (p.y + p.vy + window.innerHeight) % window.innerHeight;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }

                // floating manifold-style shapes
                for (const s of shapes) {
                    s.x += s.vx;
                    s.y += s.vy;
                    s.angle += s.va;
                    s.phase += s.vp;
                    if (s.rx !== undefined) {
                        s.rx += s.vrx;
                        s.ry += s.vry;
                        s.rz += s.vrz;
                    }

                    const sizeForWrap = s.kind === 'manifold'
                        ? (s.surface === 'torus' ? s.R + s.r : s.R)
                        : (s.r || 80);

                    const margin = Math.max(60, sizeForWrap * 1.2);
                    s.x = wrap(s.x, window.innerWidth, margin);
                    s.y = wrap(s.y, window.innerHeight, margin);

                    ctx.save();
                    ctx.translate(s.x, s.y);
                    ctx.rotate(s.angle);

                    if (s.kind === 'manifold') {
                        drawManifold(s);
                    } else if (s.kind === 'ring') {
                        ctx.beginPath();
                        ctx.arc(0, 0, sizeForWrap * 0.6, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(0, 255, 200, 0.18)';
                        ctx.lineWidth = Math.max(1, (sizeForWrap * 0.6) * 0.08);
                        ctx.stroke();
                    }

                    ctx.restore();
                }

                requestAnimationFrame(step);
            }

            window.addEventListener('resize', resize);
            resize();
            requestAnimationFrame(step);
        }

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
