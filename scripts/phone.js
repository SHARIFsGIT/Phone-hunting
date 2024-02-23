const loadPhone = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    // 1. get the container
    const phoneContainer = document.getElementById('phone-container');
    // clear the container
    phoneContainer.textContent = '';
    phones.forEach((phone => {
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML =   `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    }))
}


const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
};
