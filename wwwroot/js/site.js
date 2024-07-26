// Search Barı Scripti
document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {

        const searchValue = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {

            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardText = card.querySelector('.card-text').textContent.toLowerCase();

            if (cardTitle.includes(searchValue) || cardText.includes(searchValue)) {
                card.style.display = ''; 
            }
            else {
                card.style.display = 'none'; 
            }
        });
    });
});

//Search Bar iconuna tıklandığında focuslamasını sağlar.
function focusSearchInput() {
    document.getElementById("searchInput").focus();
}

//Limitli ve Paylaşıldı CheckBoxlarını aktifleştirir.
function toggleExpiryDate() {

    var isSharedCheckbox = document.getElementById("isShared"); 
    var limitedCheckbox = document.getElementById("limitedCheckbox"); 
    var dateInput = document.getElementById("dateInput"); 
    var expiryDate = document.getElementById("expiryDate"); 

    if (isSharedCheckbox.checked) {
        limitedCheckbox.parentElement.style.display = 'block'; 
        
        if (limitedCheckbox.checked) {
            dateInput.hidden = false; 
        }
        else {
            dateInput.hidden = true; 
        }
    }
    else {
        limitedCheckbox.parentElement.style.display = 'none'; 
        dateInput.hidden = true; 
        expiryDate.value = ''; 
    }
}

document.addEventListener('DOMContentLoaded', function () {
   
    var isSharedCheckbox = document.getElementById("isShared");
    isSharedCheckbox.addEventListener('change', toggleExpiryDate);

    var limitedCheckbox = document.getElementById("limitedCheckbox");
    limitedCheckbox.addEventListener('change', function () {
        
        var dateInput = document.getElementById("dateInput");
        var expiryDate = document.getElementById("expiryDate");

        if (limitedCheckbox.checked) {
            dateInput.hidden = false; 
            expiryDate.required = true; 
        }
        else {
            dateInput.hidden = true; 
            expiryDate.required = false; 
            expiryDate.value = ''; 
        }
    });

    toggleExpiryDate();
});


//Girilen tarihin geçerliliğini kontrol eder.
function validateDate() {
    
    var expiryDate = document.getElementById("expiryDate").value;
    var currentDate = new Date().toISOString().split('T')[0];

    if (expiryDate < currentDate) {

        alert("Geçerli bir tarih girin!");

        document.getElementById("expiryDate").value = '';
    }
}


//Şifre kısmındaki göz iconun scripti

document.getElementById('togglePassword').addEventListener('click', function () {

    var passwordField = document.getElementById('passwordField'); 
    var passwordFieldType = passwordField.getAttribute('type'); 

    if (passwordFieldType === 'password') {

        passwordField.setAttribute('type', 'text'); 
        this.innerHTML = '<i class="bi bi-eye"></i>'; 
    }
    else {

        passwordField.setAttribute('type', 'password'); 
        this.innerHTML = '<i class="bi bi-eye-slash"></i>'; 
    }
});
