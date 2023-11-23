document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('productContainer');
    const categoriesContainer = document.getElementById('categoriesContainer');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const productCardTemplate = document.getElementById('productCardTemplate');
    const categoryLabel = document.getElementById('categoryLabel');

    fetch('assets/data/data.json')
        .then(response => response.json())
        .then(productsData => {
            const uniqueCategories = [...new Set(productsData.products.map(product => product.category.toLowerCase()))];

            // Populate the category dropdown
            const dropdownMenu = categoryDropdown.querySelector('.dropdown-menu');
            uniqueCategories.forEach(category => {
                const dropdownItem = document.createElement('li');
                dropdownItem.innerHTML = `<a class="dropdown-item ctgrlink" href="#">${category}</a>`;
                dropdownMenu.appendChild(dropdownItem);
            });

            // Add click event listener to dropdown items
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function (event) {
                    const selectedCategory = event.target.textContent.toLowerCase();
                    displayProductsByCategory(productsData.products, selectedCategory);

                    // Update the category label
                    categoryLabel.innerText = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
                });
            });

            const isMediumOrSmaller = window.matchMedia('(max-width: 991px)').matches;

            if (isMediumOrSmaller) {
                categoriesContainer.innerHTML = '';
            } else {
                categoriesContainer.addEventListener('click', function (event) {
                    if (event.target.classList.contains('category-link')) {
                        const selectedCategory = event.target.textContent.toLowerCase();
                        displayProductsByCategory(productsData.products, selectedCategory);

                        // Update the category label
                        categoryLabel.innerText = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
                    }
                });
            }

            displayProductsByCategory(productsData.products);
        })
        .catch(error => console.error('Error fetching JSON data:', error));

    function displayProductsByCategory(products, selectedCategory) {
        productContainer.innerHTML = '';

        const filteredProducts = selectedCategory
            ? products.filter(product => product.category.toLowerCase() === selectedCategory)
            : products;

        filteredProducts.forEach(product => {
            // Clone the product card template
            const productCard = productCardTemplate.cloneNode(true);

            // Populate the product card template with data
            productCard.style.display = '';  // Make the cloned card visible
            productCard.querySelector('.card-img').src = product.productPhoto;
            productCard.querySelector('.product-name').innerText = product.productName;
            productCard.querySelector('.category-text').innerText = product.category;

            // Append the populated product card to the container
            productContainer.appendChild(productCard);
        });
    }
});
