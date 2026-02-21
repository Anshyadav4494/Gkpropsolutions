/* ========================================
   AURELIA - Ultra-Luxury Real Estate
   Premium JavaScript
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initHeroAnimations();
    initSmoothScroll();
    initPropertyCards();
    init3DViewer();
    initCounters();
    initTestimonials();
    initContactForm();
    initModal();
    initScrollAnimations();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
   
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            initHero3D(); // Start 3D scene after preloader
        }, 2500);
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
   
    if (window.matchMedia('(pointer: coarse)').matches) return;
   
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
   
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
   
    function animateCursor() {
        // Smooth cursor following
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
       
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
       
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
   
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .property-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = '#C6A75E';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'rgba(198, 167, 94, 0.5)';
        });
    });
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
   
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Navbar
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
   
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
       
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
       
        lastScroll = currentScroll;
    });
   
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
   
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Hero Animations
function initHeroAnimations() {
    // Animate hero content with GSAP-like timing
    const elements = document.querySelectorAll('.hero-subtitle, .hero-title .line, .hero-description, .hero-cta');
   
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// Hero 3D Scene with Three.js
function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
   
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
   
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   
    // Create luxury villa geometry
    const villaGroup = new THREE.Group();
   
    // Main building
    const buildingGeometry = new THREE.BoxGeometry(4, 2, 3);
    const buildingMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.7,
        metalness: 0.3
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 1;
    building.castShadow = true;
    building.receiveShadow = true;
    villaGroup.add(building);
   
    // Glass sections
    const glassGeometry = new THREE.BoxGeometry(4.1, 1.5, 3.1);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.6,
        transparent: true,
        opacity: 0.3
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.y = 0.8;
    villaGroup.add(glass);
   
    // Roof
    const roofGeometry = new THREE.ConeGeometry(3.5, 1.5, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.9
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.75;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    villaGroup.add(roof);
   
    // Pool
    const poolGeometry = new THREE.BoxGeometry(6, 0.1, 4);
    const poolMaterial = new THREE.MeshStandardMaterial({
        color: 0x0066aa,
        roughness: 0.1,
        metalness: 0.8
    });
    const pool = new THREE.Mesh(poolGeometry, poolMaterial);
    pool.position.set(0, 0.05, 4);
    villaGroup.add(pool);
   
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    villaGroup.add(ground);
   
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
   
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
   
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xC6A75E,
        transparent: true,
        opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    villaGroup.add(particles);
   
    scene.add(villaGroup);
   
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
   
    const directionalLight = new THREE.DirectionalLight(0xC6A75E, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
   
    const pointLight = new THREE.PointLight(0xC6A75E, 0.5, 10);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);
   
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 1, 0);
   
    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
   
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
   
    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;
       
        // Rotate villa slowly
        villaGroup.rotation.y = Math.sin(time) * 0.1;
       
        // Float animation
        villaGroup.position.y = Math.sin(time * 2) * 0.1;
       
        // Particle animation
        particles.rotation.y = time * 0.1;
        particles.position.y = Math.sin(time) * 0.2;
       
        // Mouse parallax
        targetX += (mouseX * 2 - targetX) * 0.05;
        targetY += (mouseY * 2 - targetY) * 0.05;
       
        camera.position.x = 8 + targetX;
        camera.position.y = 5 + targetY;
        camera.lookAt(0, 1, 0);
       
        renderer.render(scene, camera);
    }
    animate();
   
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Property Cards
function initPropertyCards() {
    const cards = document.querySelectorAll('.property-card');
   
    cards.forEach(card => {
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
           
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
           
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
           
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
       
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
       
        // Open modal on click
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const location = card.querySelector('.location').textContent;
            const price = card.querySelector('.price').textContent;
            const specs = card.querySelector('.specs').textContent;
            const image = card.querySelector('img').src;
           
            openModal(title, location, price, specs, image);
        });
    });
}

// 3D Property Viewer
function init3DViewer() {
    const canvas = document.getElementById('property-viewer');
    if (!canvas) return;
   
    const container = canvas.parentElement;
    const loading = container.querySelector('.viewer-loading');
   
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
   
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(5, 3, 5);
   
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   
    // Create detailed house model
    const houseGroup = new THREE.Group();
   
    // Foundation
    const foundation = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.2, 4),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    foundation.position.y = 0.1;
    foundation.receiveShadow = true;
    houseGroup.add(foundation);
   
    // Main structure
    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 2.5, 3.5),
        new THREE.MeshStandardMaterial({ color: 0xf5f5f5 })
    );
    walls.position.y = 1.45;
    walls.castShadow = true;
    walls.receiveShadow = true;
    houseGroup.add(walls);
   
    // Windows
    const windowGeo = new THREE.BoxGeometry(0.8, 1, 0.1);
    const windowMat = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7
    });
   
    const window1 = new THREE.Mesh(windowGeo, windowMat);
    window1.position.set(0, 1.5, 1.76);
    houseGroup.add(window1);
   
    const window2 = new THREE.Mesh(windowGeo, windowMat);
    window2.position.set(-1, 1.5, 1.76);
    houseGroup.add(window2);
   
    const window3 = new THREE.Mesh(windowGeo, windowMat);
    window3.position.set(1, 1.5, 1.76);
    houseGroup.add(window3);
   
    // Door
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.8, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x4a3728 })
    );
    door.position.set(0, 1.1, 1.76);
    houseGroup.add(door);
   
    // Roof
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3, 1.5, 4),
        new THREE.MeshStandardMaterial({ color: 0x2c2c2c })
    );
    roof.position.y = 3.45;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);
   
    // Environment
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    houseGroup.add(ground);
   
    scene.add(houseGroup);
   
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
   
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(10, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);
   
    // Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };
    let zoom = 5;
   
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
   
    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
       
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
       
        rotation.y += deltaX * 0.01;
        rotation.x += deltaY * 0.01;
        rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.x));
       
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
   
    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('mouseleave', () => isDragging = false);
   
    canvas.addEventListener('wheel', (e) => {
        zoom += e.deltaY * 0.01;
        zoom = Math.max(3, Math.min(10, zoom));
    });
   
    // Day/Night toggle
    const dayBtn = document.querySelector('[data-mode="day"]');
    const nightBtn = document.querySelector('[data-mode="night"]');
   
    dayBtn.addEventListener('click', () => {
        dayBtn.classList.add('active');
        nightBtn.classList.remove('active');
        scene.background = new THREE.Color(0x1a1a1a);
        ambientLight.intensity = 0.4;
        sunLight.intensity = 1;
        sunLight.color.setHex(0xffffff);
    });
   
    nightBtn.addEventListener('click', () => {
        nightBtn.classList.add('active');
        dayBtn.classList.remove('active');
        scene.background = new THREE.Color(0x050505);
        ambientLight.intensity = 0.1;
        sunLight.intensity = 0.2;
        sunLight.color.setHex(0x4444ff);
    });
   
    // Animation
    function animate() {
        requestAnimationFrame(animate);
       
        camera.position.x = Math.sin(rotation.y) * zoom;
        camera.position.z = Math.cos(rotation.y) * zoom;
        camera.position.y = 3 + Math.sin(rotation.x) * zoom * 0.5;
        camera.lookAt(0, 1.5, 0);
       
        renderer.render(scene, camera);
    }
   
    // Hide loading when ready
    loading.style.display = 'none';
    animate();
   
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
   
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const startTime = performance.now();
               
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const current = target * easeProgress;
                   
                    counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                   
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
               
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
   
    counters.forEach(counter => observer.observe(counter));
}

// Testimonials Carousel
function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = dots.length;
   
    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
       
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
   
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
   
    // Auto-play
    setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
   
    form.addEventListener('submit', (e) => {
        e.preventDefault();
       
        // Simulate form submission
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
       
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
       
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent Successfully</span>';
            btn.style.background = '#4CAF50';
           
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Modal
function initModal() {
    const modal = document.getElementById('propertyModal');
    const closeBtn = modal.querySelector('.modal-close');
   
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
   
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(title, location, price, specs, image) {
    const modal = document.getElementById('propertyModal');
   
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalLocation').textContent = location;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalSpecs').textContent = specs;
    document.getElementById('modalImage').src = image;
   
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll Animations (AOS alternative)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
   
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
   
    animatedElements.forEach(el => observer.observe(el));
}

// Parallax effect for experience section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const experienceBg = document.querySelector('.experience-bg');
   
    if (experienceBg) {
        experienceBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});