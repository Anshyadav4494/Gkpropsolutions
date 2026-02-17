// ===================================
// PROPERTY DATA
// ===================================
const properties = [
    {
        id: 1,
        title: "Luxury 3BHK Apartment",
        location: "Bandra West, Mumbai",
        city: "mumbai",
        price: 25000000,
        priceText: "₹2.5 Cr",
        type: "apartment",
        bedrooms: 3,
        bathrooms: 3,
        area: 1850,
        parking: 2,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
        badge: "Featured",
        featured: true
    },
    {
        id: 2,
        title: "Modern 4BHK Villa",
        location: "Whitefield, Bangalore",
        city: "bangalore",
        price: 45000000,
        priceText: "₹4.5 Cr",
        type: "villa",
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        parking: 3,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
        badge: "New",
        featured: true
    },
    {
        id: 3,
        title: "Elegant 2BHK Apartment",
        location: "Koramangala, Bangalore",
        city: "bangalore",
        price: 18000000,
        priceText: "₹1.8 Cr",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        parking: 1,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
        badge: "Hot Deal",
        featured: true
    },
    {
        id: 4,
        title: "Spacious Penthouse",
        location: "Powai, Mumbai",
        city: "mumbai",
        price: 65000000,
        priceText: "₹6.5 Cr",
        type: "penthouse",
        bedrooms: 4,
        bathrooms: 5,
        area: 4500,
        parking: 4,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
        badge: "Premium",
        featured: true
    },
    {
        id: 5,
        title: "Cozy 1BHK Apartment",
        location: "Hinjewadi, Pune",
        city: "pune",
        price: 8500000,
        priceText: "₹85 Lakhs",
        type: "apartment",
        bedrooms: 1,
        bathrooms: 1,
        area: 650,
        parking: 1,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
        badge: "Affordable",
        featured: false
    },
    {
        id: 6,
        title: "Premium 3BHK Villa",
        location: "Gurgaon, Delhi NCR",
        city: "delhi",
        price: 38000000,
        priceText: "₹3.8 Cr",
        type: "villa",
        bedrooms: 3,
        bathrooms: 3,
        area: 2800,
        parking: 2,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
        badge: "Featured",
        featured: true
    },
    {
        id: 7,
        title: "Residential Plot",
        location: "Jubilee Hills, Hyderabad",
        city: "hyderabad",
        price: 15000000,
        priceText: "₹1.5 Cr",
        type: "plot",
        bedrooms: 0,
        bathrooms: 0,
        area: 2400,
        parking: 0,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
        badge: "Investment",
        featured: false
    },
    {
        id: 8,
        title: "Luxury 4BHK Penthouse",
        location: "Marine Drive, Mumbai",
        city: "mumbai",
        price: 95000000,
        priceText: "₹9.5 Cr",
        type: "penthouse",
        bedrooms: 4,
        bathrooms: 5,
        area: 5200,
        parking: 5,
        image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=500&fit=crop",
        badge: "Ultra Luxury",
        featured: true
    },
    {
        id: 9,
        title: "Modern 2BHK Flat",
        location: "Viman Nagar, Pune",
        city: "pune",
        price: 12000000,
        priceText: "₹1.2 Cr",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        parking: 1,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
        badge: "Ready to Move",
        featured: false
    },
    {
        id: 10,
        title: "Elegant Villa",
        location: "Indiranagar, Bangalore",
        city: "bangalore",
        price: 52000000,
        priceText: "₹5.2 Cr",
        type: "villa",
        bedrooms: 4,
        bathrooms: 4,
        area: 3600,
        parking: 3,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop",
        badge: "Premium",
        featured: false
    },
    {
        id: 11,
        title: "Spacious 3BHK Apartment",
        location: "Dwarka, Delhi NCR",
        city: "delhi",
        price: 22000000,
        priceText: "₹2.2 Cr",
        type: "apartment",
        bedrooms: 3,
        bathrooms: 2,
        area: 1650,
        parking: 2,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
        badge: "New Launch",
        featured: false
    },
    {
        id: 12,
        title: "Commercial Plot",
        location: "Banjara Hills, Hyderabad",
        city: "hyderabad",
        price: 28000000,
        priceText: "₹2.8 Cr",
        type: "plot",
        bedrooms: 0,
        bathrooms: 0,
        area: 3200,
        parking: 0,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
        badge: "Commercial",
        featured: false
    }
];

// ===================================
// NAVIGATION
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Sticky header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===================================
// PROPERTY CARD CREATION
// ===================================
function createPropertyCard(property) {
    return `
        <div class="property-card" onclick="viewProperty(${property.id})">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="property-badge">${property.badge}</div>
            </div>
            <div class="property-content">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.location}
                </p>
                <div class="property-features">
                    ${property.bedrooms > 0 ? `<div class="feature"><i class="fas fa-bed"></i> ${property.bedrooms} BHK</div>` : ''}
                    ${property.bathrooms > 0 ? `<div class="feature"><i class="fas fa-bath"></i> ${property.bathrooms} Bath</div>` : ''}
                    <div class="feature"><i class="fas fa-ruler-combined"></i> ${property.area} Sq.Ft</div>
                </div>
                <div class="property-footer">
                    <div class="property-price">
                        ${property.priceText}
                    </div>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openInquiryModal()">
                        Inquire
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// LOAD FEATURED PROPERTIES (HOME PAGE)
// ===================================
const featuredPropertiesContainer = document.getElementById('featuredProperties');
if (featuredPropertiesContainer) {
    const featuredProps = properties.filter(p => p.featured).slice(0, 6);
    featuredPropertiesContainer.innerHTML = featuredProps.map(createPropertyCard).join('');
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================
function searchProperties() {
    const location = document.getElementById('searchLocation').value.toLowerCase();
    const budget = document.getElementById('searchBudget').value;
    const type = document.getElementById('searchType').value;
    
    // Build query string
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (budget) params.append('budget', budget);
    if (type) params.append('type', type);
    
    // Redirect to properties page with filters
    window.location.href = `properties.html?${params.toString()}`;
}

// Allow Enter key to search
['searchLocation', 'searchBudget', 'searchType'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProperties();
            }
        });
    }
});

// ===================================
// FAQ ACCORDION
// ===================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===================================
// MODAL FUNCTIONALITY
// ===================================
function openInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('inquiryForm');
        const successMessage = document.getElementById('successMessage');
        if (form) form.reset();
        if (successMessage) successMessage.classList.remove('active');
        if (form) form.style.display = 'block';
    }
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('inquiryModal');
    if (e.target === modal) {
        closeInquiryModal();
    }
});

// ===================================
// FORM SUBMISSION
// ===================================
function submitInquiry(event) {
    event.preventDefault();
    
    const name = document.getElementById('inquiryName').value;
    const phone = document.getElementById('inquiryPhone').value;
    const email = document.getElementById('inquiryEmail').value;
    const message = document.getElementById('inquiryMessage').value;
    
    // Simulate form submission
    console.log('Inquiry submitted:', { name, phone, email, message });
    
    // Show success message
    const form = document.getElementById('inquiryForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.classList.add('active');
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeInquiryModal();
    }, 3000);
    
    return false;
}

// ===================================
// VIEW PROPERTY DETAIL
// ===================================
function viewProperty(id) {
    window.location.href = `property-detail.html?id=${id}`;
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.property-card, .feature-card, .step-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contact-form') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// EXPORT FOR OTHER SCRIPTS
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { properties, createPropertyCard };
}
