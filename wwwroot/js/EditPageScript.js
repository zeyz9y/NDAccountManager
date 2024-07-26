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