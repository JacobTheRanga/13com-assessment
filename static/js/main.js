function onLoad() {
    const type = errorMessage.getAttribute('error');
    if (type != '') {
        error(type);
    }
}

function hoverClassToggle(name) {
    const ids = ['addSubject'];
    const classToggle = {'plus-circle':'plus-circle-fill'};
    for (let i = 0; i < ids.length; i++){
        if (name == ids[i]){
            eval(name).classList.toggle('bi-'+Object.keys(classToggle)[i]);
            eval(name).classList.toggle('bi-'+Object.values(classToggle)[i]);
        }
    }
}

function hoverClassToggleMulti(name, id) {
    const ids = ['editSubject',
                 'deleteSubject',
                 'submitSubject',
                 'cancelSubject'
                ];
    const classToggle = {
        'pencil':'pencil-fill',
        'trash':'trash-fill',
        'check-circle':'check-circle-fill',
        'x-circle':'x-circle-fill'
    };
    for (let i = 0; i <ids.length; i++){
        if (name == ids[i]){
            eval(name+id).classList.toggle('bi-'+Object.keys(classToggle)[i]);
            eval(name+id).classList.toggle('bi-'+Object.values(classToggle)[i]);
        }
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

function editSubject(id) {
    const inputs = {'subjectName':'text', 'subjectStartDate':'date', 'subjectEndDate':'date'};
    const display = ['Subject', 'Start Date', 'End Date'];
    let values = [];
    if (eval('subjectButtons'+id).getAttribute('edit') == 'False'){
        for (let i = 0; i < Object.keys(inputs).length; i++){
            values[i] = eval(Object.keys(inputs)[i]+id).innerHTML;
            eval(Object.keys(inputs)[i]+id).innerHTML = `<div class="form-floating">
                                                            <input type="`+Object.values(inputs)[i]+`" name="`+Object.keys(inputs)[i]+`Input`+id+`" class="form-control" id="`+Object.keys(inputs)[i]+`Input`+id+`" placeholder="`+Object.keys(inputs)[i]+`Input`+id+`" value="`+values[i]+`" required>
                                                            <label for="`+Object.keys(inputs)[i]+`Input`+id+`">`+display[i]+`</label>
                                                        </div>`;
        }
        eval('subjectButtons'+id).innerHTML = `
        <button class="btn" type="submit"><i class="bi bi-check-circle submit" id="submitSubject`+id+`" onmouseover="hoverClassToggleMulti('submitSubject', `+id+`)" onmouseout="hoverClassToggleMulti('submitSubject', `+id+`)"></i></button>
        <i class="btn bi bi-x-circle cancel" id="cancelSubject`+id+`" onclick="editSubject('`+id+`')" onmouseover="hoverClassToggleMulti('cancelSubject', `+id+`)" onmouseout="hoverClassToggleMulti('cancelSubject', `+id+`)"></i>
        `;
        eval('subjectButtons'+id).setAttribute('edit', 'True');
    }
    else {
        for (let i = 0; i < Object.keys(inputs).length; i++){
            values[i] = eval(Object.keys(inputs)[i]+`Input`+id).getAttribute('value');
            eval(Object.keys(inputs)[i]+id).innerHTML = values[i];
        }
        eval('subjectButtons'+id).innerHTML = `
            <i class="btn bi bi-pencil" id="editSubject`+id+`" onclick="editSubject('`+id+`')" onmouseover="hoverClassToggleMulti('editSubject', `+id+`)" onmouseout="hoverClassToggleMulti('editSubject', `+id+`)"></i>
            <a href="/deleteSubject?id=`+id+`"><i class="btn bi bi-trash" id="deleteSubject`+id+`" onmouseover="hoverClassToggleMulti('deleteSubject', `+id+`)" onmouseout="hoverClassToggleMulti('deleteSubject', `+id+`)"></i></a>
            `;
        eval('subjectButtons'+id).setAttribute('edit', 'False');
    }
}