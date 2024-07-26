//Şifre kısmındaki göz iconunun scripti
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

