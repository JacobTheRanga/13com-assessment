function onLoad() {
    const type = errorMessage.getAttribute('error');
    if (type != '') {
        error(type);
    }
}

function passwordView() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye-slash-fill');
    togglePassword.classList.toggle('bi-eye-fill');
}

function error(type) {
    if (document.URL.includes('login')) {
        errorLogin(type);
    }
}

function errorLogin(type) {
    if (type == 'email') {
        email.classList.toggle('is-invalid');
    }
    else {
        password.classList.toggle('is-invalid');
    }
    const msg = type === 'email' ? 'There is no user with this email' : 'Password is incorrect';
    errorMessage.innerHTML = msg;
}

function editHover(str) {
    eval(str).classList.toggle('bi-pencil');
    eval(str).classList.toggle('bi-pencil-fill');
}

function deleteHover(str) {
    eval(str).classList.toggle('bi-trash');
    eval(str).classList.toggle('bi-trash-fill');
}
function addHover() {
    addSubject.classList.toggle('bi-plus-circle');
    addSubject.classList.toggle('bi-plus-circle-fill');
}
function editSubject(id) {
    if (eval('subjectButtons'+id).getAttribute('edit') == 'False'){
        eval('subjectButtons'+id).setAttribute('edit', 'True');
        eval('subjectButtons'+id).innerHTML = `
        <button class="btn" type="submit"><i class="btn bi bi-pencil" id="editSubject{{subject['subjectid']}}" onclick="editSubject('{{subject['subjectid']}}')" onmouseover="editHover('editSubject{{subject['subjectid']}}')" onmouseout="editHover('editSubject{{subject['subjectid']}}')"></i></button>
        <a href="{{url_for('deleteSubject')}}?id={{subject['subjectid']}}"><i class="btn bi bi-trash" id="deleteSubject{{subject['subjectid']}}" onmouseover="deleteHover('deleteSubject{{subject['subjectid']}}')" onmouseout="deleteHover('deleteSubject{{subject['subjectid']}}')"></i></a>
        `;
    }
    else {
        eval('subjectButtons'+id).setAttribute('edit', 'False');
        eval('subjectButtons'+id).innerHTML = `
        <i class="btn bi bi-pencil" id="editSubject{{subject['subjectid']}}" onclick="editSubject('{{subject['subjectid']}}')" onmouseover="editHover('editSubject{{subject['subjectid']}}')" onmouseout="editHover('editSubject{{subject['subjectid']}}')"></i>
        <a href="{{url_for('deleteSubject')}}?id={{subject['subjectid']}}"><i class="btn bi bi-trash" id="deleteSubject{{subject['subjectid']}}" onmouseover="deleteHover('deleteSubject{{subject['subjectid']}}')" onmouseout="deleteHover('deleteSubject{{subject['subjectid']}}')"></i></a>
        `;
    }
}