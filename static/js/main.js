function onLoad() {
    const type = errorMessage.getAttribute('error')
    if (type != '') {
        error(type);
    }
}

function passwordView() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye-slash-fill');
    togglePassword.classList.toggle('bi-eye-fill')
}

function error(type) {
    if (document.URL.includes('login')) {
        errorLogin(type);
    }
}

function errorLogin(type) {
    if (type == 'email') {
        email.classList.toggle('is-invalid')
    }
    else {
        password.classList.toggle('is-invalid')
    }
    const msg = type === 'email' ? 'There is no user with this email' : 'Password is incorrect';
    errorMessage.innerHTML = msg;
}