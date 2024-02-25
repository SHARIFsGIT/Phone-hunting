const loadPhone = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // 1. get the container
    const phoneContainer = document.getElementById('phone-container');
    // clear the container
    phoneContainer.textContent = '';
    // display show all button
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12  && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // reduce phones array
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    phones.forEach((phone => {
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    }));
    // hide loading spinner
    toggleLoadingSpinner(false);
}


// show details
const handleShowDetails = async(id) => {
    // load individual data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.classList = 'card card-side bg-base-100 shadow-xl';
    showDetailContainer.innerHTML = `
        <figure>
            <img src="${phone.image}" alt="">
        </figure>
        <div class="card-body">
            <h2 class="card-title">Storage: ${phone?.mainFeatures?.storage}</h2>
            <p>GPS: ${phone?.others?.GPS || 'No GPS'}</p>
        </div>
    `;
    // display the modal
    showDetailsModal.showModal();
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
};

// handle search spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};


const handleShowAll = () =>{
    handleSearch(true);
}