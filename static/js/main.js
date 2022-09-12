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
        subjectName = eval('subjectName'+id).innerHTML;
        subjectStartDate = eval('subjectStartDate'+id).innerHTML;
        subjectEndDate = eval('subjectEndDate'+id).innerHTML;
        eval('subjectButtons'+id).innerHTML = `
        <button class="btn" type="submit"><i class="btn bi bi-check-circle submit" id="editSubject`+id+`" onmouseover="submitHover('editSubject`+id+`')" onmouseout="submitHover('editSubject`+id+`')"></i></button>
        <i class="btn bi bi-x-circle cancel" id="deleteSubject`+id+`" onclick="editSubject(`+id+`)" onmouseover="cancelHover('deleteSubject`+id+`')" onmouseout="cancelHover('deleteSubject`+id+`')"></i>
        `;
        eval('subjectName'+id).innerHTML = `<div class="form-floating">
            <input type="text" name="subjectNameInput`+id+`" class="form-control" id="subjectNameInput`+id+`" placeholder="subjectNameInput`+id+`" required value="`+subjectName+`">
            <label for="subjectNameInput`+id+`">Subject</label>
            </div>`;
        eval('subjectStartDate'+id).innerHTML = `<div class="form-floating">
            <input type="text" name="subjectStartDateInput`+id+`" class="form-control" id="subjectStartDateInput`+id+`" placeholder="subjectStartDateInput`+id+`" required value="`+subjectStartDate+`">
            <label for="subjectStartDateInput`+id+`">Start Date</label>
            </div>`;
        eval('subjectEndDate'+id).innerHTML = `<div class="form-floating">
            <input type="text" name="subjectEndDateInput`+id+`" class="form-control" id="subjectEndDateInput`+id+`" placeholder="subjectEndDateInput`+id+`" required value="`+subjectEndDate+`">
            <label for="subjectEndDateInput`+id+`">End Date</label>
            </div>`;
        eval('subjectButtons'+id).setAttribute('edit', 'True');
    }
    else {
        eval('subjectName'+id).innerHTML = subjectName;
        eval('subjectStart'+id).innerHTML = subjectStartDate;
        eval('subjectEndDate'+id).innerHTML = subjectEndDate;
        eval('subjectButtons'+id).innerHTML = `
            <i class="btn bi bi-pencil" id="editSubject`+id+`" onclick="editSubject('`+id+`')" onmouseover="editHover('editSubject`+id+`')" onmouseout="editHover('editSubject`+id+`')"></i>
            <a href="/deleteSubject?id=`+id+`"><i class="btn bi bi-trash" id="deleteSubject`+id+`" onmouseover="deleteHover('deleteSubject`+id+`')" onmouseout="deleteHover('deleteSubject`+id+`')"></i></a>
            `;
        eval('subjectButtons'+id).setAttribute('edit', 'False');
    }
}

function cancelHover(id){
    eval(id).classList.toggle('bi-x-circle');
    eval(id).classList.toggle('bi-x-circle-fill');

}

function submitHover(id){
    eval(id).classList.toggle('bi-check-circle');
    eval(id).classList.toggle('bi-check-circle-fill');
}