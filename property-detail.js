// ===================================
// PROPERTY DETAIL PAGE
// ===================================

// Gallery images
const galleryImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop"
];

let currentImageIndex = 0;

// ===================================
// INITIALIZE PAGE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Get property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));

    if (propertyId && typeof properties !== 'undefined') {
        const property = properties.find(p => p.id === propertyId);

        if (property) {
            loadPropertyDetails(property);
        }
    }

    // Load gallery
    loadGallery();

    // Load similar properties
    loadSimilarProperties(propertyId);
});

// ===================================
// LOAD PROPERTY DETAILS
// ===================================
function loadPropertyDetails(property) {
    // Update title and meta
    document.title = `${property.title} | Premium Real Estate`;

    // Update property information
    if (document.getElementById('propertyTitle')) {
        document.getElementById('propertyTitle').textContent = property.title;
    }

    if (document.getElementById('propertyLocation')) {
        document.getElementById('propertyLocation').textContent = property.location;
    }

    if (document.getElementById('propertyPrice')) {
        document.getElementById('propertyPrice').textContent = property.priceText;
    }

    if (document.getElementById('propertyArea')) {
        document.getElementById('propertyArea').textContent = property.area;
    }

    if (document.getElementById('propertyBedrooms')) {
        document.getElementById('propertyBedrooms').textContent = property.bedrooms;
    }

    if (document.getElementById('propertyBathrooms')) {
        document.getElementById('propertyBathrooms').textContent = property.bathrooms;
    }

    if (document.getElementById('propertyParking')) {
        document.getElementById('propertyParking').textContent = property.parking;
    }

    // Update main image
    if (document.getElementById('mainImage')) {
        document.getElementById('mainImage').src = property.image;
    }
}

// ===================================
// GALLERY FUNCTIONALITY
// ===================================
function loadGallery() {
    const thumbnailGallery = document.getElementById('thumbnailGallery');

    if (!thumbnailGallery) return;

    thumbnailGallery.innerHTML = galleryImages.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})">
            <img src="${img}" alt="Property Image ${index + 1}" loading="lazy">
        </div>
    `).join('');
}

function selectImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');

    if (mainImage) {
        mainImage.style.opacity = '0';

        setTimeout(() => {
            mainImage.src = galleryImages[index];
            mainImage.style.opacity = '1';
        }, 200);
    }

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    selectImage(currentImageIndex);
}

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// ===================================
// CONTACT FORM SUBMISSION
// ===================================
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    // Get property details
    const propertyTitle = document.getElementById('propertyTitle')?.textContent || 'Property';

    // Simulate form submission
    console.log('Contact form submitted:', {
        name,
        phone,
        email,
        message,
        property: propertyTitle
    });

    // Show success message
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccessMessage');

    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.classList.add('active');

        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.classList.remove('active');
        }, 3000);
    }

    return false;
}

// ===================================
// LOAD SIMILAR PROPERTIES
// ===================================
function loadSimilarProperties(currentPropertyId) {
    const container = document.getElementById('similarProperties');

    if (!container || typeof properties === 'undefined') return;

    // Get current property
    const currentProperty = properties.find(p => p.id === currentPropertyId);

    if (!currentProperty) return;

    // Find similar properties (same type or location)
    const similarProps = properties
        .filter(p =>
            p.id !== currentPropertyId &&
            (p.type === currentProperty.type || p.city === currentProperty.city)
        )
        .slice(0, 3);

    // If not enough similar properties, add random ones
    if (similarProps.length < 3) {
        const remaining = properties
            .filter(p => p.id !== currentPropertyId && !similarProps.includes(p))
            .slice(0, 3 - similarProps.length);

        similarProps.push(...remaining);
    }

    // Display similar properties
    container.innerHTML = similarProps.map(property => {
        return createPropertyCard(property);
    }).join('');
}

// ===================================
// STICKY SIDEBAR
// ===================================
window.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.sticky-sidebar');
    const footer = document.querySelector('.footer');

    if (!sidebar || !footer) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    // Stop sticky before footer
    if (footerRect.top < sidebarRect.bottom + 20) {
        sidebar.style.position = 'absolute';
        sidebar.style.bottom = '0';
    } else {
        sidebar.style.position = 'sticky';
        sidebar.style.bottom = 'auto';
    }
});

// ===================================
// SMOOTH SCROLL TO CONTACT FORM
// ===================================
document.querySelectorAll('a[href="#contact-form"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Focus on first input
            setTimeout(() => {
                document.getElementById('contactName')?.focus();
            }, 500);
        }
    });
});

// ===================================
// WHATSAPP SHARE
// ===================================
function shareOnWhatsApp() {
    const propertyTitle = document.getElementById('propertyTitle')?.textContent || 'Property';
    const propertyPrice = document.getElementById('propertyPrice')?.textContent || '';
    const url = window.location.href;

    const message = `Check out this property: ${propertyTitle} - ${propertyPrice}\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

// ===================================
// PRINT PROPERTY DETAILS
// ===================================
function printProperty() {
    window.print();
}

// ===================================
// IMAGE TRANSITION
// ===================================
const mainImage = document.getElementById('mainImage');
if (mainImage) {
    mainImage.style.transition = 'opacity 0.3s ease';
}

// ===================================
// LAZY LOAD OPTIMIZATION
// ===================================
// Preload next/previous images in gallery
function preloadImages() {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;

    [nextIndex, prevIndex].forEach(index => {
        const img = new Image();
        img.src = galleryImages[index];
    });
}

// Preload on image change
document.addEventListener('DOMContentLoaded', preloadImages);
