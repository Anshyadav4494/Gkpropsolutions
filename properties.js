// ===================================
// PROPERTIES PAGE FUNCTIONALITY
// ===================================

// Import properties data from main script
let allProperties = [];
if (typeof properties !== 'undefined') {
    allProperties = [...properties];
}

// Pagination settings
let currentPage = 1;
const propertiesPerPage = 9;
let filteredProperties = [...allProperties];

// ===================================
// INITIALIZE PAGE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Apply filters from URL
    if (urlParams.has('location')) {
        const location = urlParams.get('location');
        document.getElementById('filterLocation').value = location;
    }

    if (urlParams.has('type')) {
        const type = urlParams.get('type');
        document.getElementById('filterType').value = type;
    }

    if (urlParams.has('budget')) {
        const budget = urlParams.get('budget');
        document.getElementById('filterBudget').value = budget;
    }

    // Apply initial filters and display
    applyFilters();
});

// ===================================
// FILTER FUNCTIONALITY
// ===================================
function applyFilters() {
    const location = document.getElementById('filterLocation').value.toLowerCase();
    const type = document.getElementById('filterType').value.toLowerCase();
    const bedrooms = document.getElementById('filterBedrooms').value;
    const priceRange = parseInt(document.getElementById('priceRange').value);

    filteredProperties = allProperties.filter(property => {
        // Location filter
        if (location && property.city !== location) {
            return false;
        }

        // Type filter
        if (type && property.type !== type) {
            return false;
        }

        // Bedrooms filter
        if (bedrooms) {
            const bedroomCount = parseInt(bedrooms);
            if (bedroomCount === 4) {
                if (property.bedrooms < 4) return false;
            } else {
                if (property.bedrooms !== bedroomCount) return false;
            }
        }

        // Price filter (in lakhs)
        const priceLakhs = property.price / 100000;
        if (priceRange < 500 && priceLakhs > priceRange * 10) {
            return false;
        }

        return true;
    });

    // Reset to first page
    currentPage = 1;

    // Display filtered properties
    displayProperties();
    updatePagination();
}

// ===================================
// PRICE RANGE SLIDER
// ===================================
function updatePriceLabel() {
    const priceRange = document.getElementById('priceRange');
    const priceLabel = document.getElementById('priceLabel');
    const value = parseInt(priceRange.value);

    if (value >= 500) {
        priceLabel.textContent = 'Up to ₹5 Cr+';
    } else if (value >= 100) {
        priceLabel.textContent = `Up to ₹${value / 100} Cr`;
    } else {
        priceLabel.textContent = `Up to ₹${value * 10} Lakhs`;
    }

    applyFilters();
}

// ===================================
// SORTING FUNCTIONALITY
// ===================================
function sortProperties() {
    const sortBy = document.getElementById('sortBy').value;

    switch (sortBy) {
        case 'price-low':
            filteredProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProperties.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProperties.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            filteredProperties.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
            break;
    }

    displayProperties();
}

// ===================================
// RESET FILTERS
// ===================================
function resetFilters() {
    document.getElementById('filterLocation').value = '';
    document.getElementById('filterType').value = '';
    document.getElementById('filterBedrooms').value = '';
    document.getElementById('priceRange').value = '500';
    document.getElementById('sortBy').value = 'featured';
    updatePriceLabel();

    filteredProperties = [...allProperties];
    currentPage = 1;
    displayProperties();
    updatePagination();
}

// ===================================
// DISPLAY PROPERTIES
// ===================================
function displayProperties() {
    const container = document.getElementById('propertiesGrid');
    const propertyCount = document.getElementById('propertyCount');

    if (!container) return;

    // Calculate pagination
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    // Update count
    if (propertyCount) {
        propertyCount.innerHTML = `Showing <strong>${filteredProperties.length}</strong> properties`;
    }

    // Display properties
    if (paginatedProperties.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-home" style="font-size: 4rem; color: #c9a961; margin-bottom: 1rem;"></i>
                <h3 style="color: #1a2332; margin-bottom: 0.5rem;">No Properties Found</h3>
                <p style="color: #666;">Try adjusting your filters to see more results</p>
                <button class="btn btn-primary" onclick="resetFilters()" style="margin-top: 1rem;">
                    Reset Filters
                </button>
            </div>
        `;
    } else {
        container.innerHTML = paginatedProperties.map(property => {
            return createPropertyCard(property);
        }).join('');
    }

    // Scroll to top of properties
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// PAGINATION
// ===================================
function updatePagination() {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const pageNumbers = document.getElementById('pageNumbers');

    if (!pageNumbers) return;

    // Clear existing page numbers
    pageNumbers.innerHTML = '';

    // Create page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNum = document.createElement('div');
        pageNum.className = 'page-number';
        pageNum.textContent = i;

        if (i === currentPage) {
            pageNum.classList.add('active');
        }

        pageNum.addEventListener('click', () => {
            currentPage = i;
            displayProperties();
            updatePagination();
        });

        pageNumbers.appendChild(pageNum);
    }

    // Update prev/next buttons
    const prevBtn = document.querySelector('.pagination .page-btn:first-child');
    const nextBtn = document.querySelector('.pagination .page-btn:last-child');

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    displayProperties();
    updatePagination();
}

// ===================================
// INITIALIZE ON LOAD
// ===================================
if (document.getElementById('propertiesGrid')) {
    displayProperties();
    updatePagination();
}
