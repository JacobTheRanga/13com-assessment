const names = ['edit',
                 'delete',
                 'submit',
                 'cancel',
                 'add',
                 'view'
                ];
const icons = {
    'pencil':'pencil-fill',
    'trash':'trash-fill',
    'check-circle':'check-circle-fill',
    'x-circle':'x-circle-fill',
    'plus-circle':'plus-circle-fill',
    'eye-slash-fill':'eye-fill'
};

sessionStorage.setItem('selectedSubjects', selectedSubmit.getAttribute('selectedSubjects'));

var iconList = document.querySelectorAll('.'+names.join(',.'));

iconList.forEach(icon => {
    icon.addEventListener('mouseover', iconToggle);
    icon.addEventListener('mouseout', iconToggle);
});

if (errorMessage.getAttribute('error')) error(errorMessage.getAttribute('error'));

if (document.URL.includes('subjects')) subjectSelectionLoad();

function selectedSubjects() {
    let subjects = sessionStorage.getItem('selectedSubjects');
    if (!subjects) return null;
    return subjects.split('-');
}

function iconToggle(event) {
    let target = event.currentTarget;
    target.classList.forEach(name => {
        if (!names.includes(name)) return;
        let src = 'static/img/%s.svg';
        let value = src.replace('%s', Object.values(icons)[names.indexOf(name)]);
        let key = src.replace('%s', Object.keys(icons)[names.indexOf(name)]);
        let val = target.getAttribute('src') == value ? key : value;
        target.setAttribute('src', val);
    });
}

function selectSubject(id) {
    let selected = sessionStorage.getItem('selectedSubjects');
    if (!selected) {
        eval('selectSubject'+id).classList.toggle('submit');
        eval('selectSubject'+id).classList.toggle('green');
        return sessionStorage.setItem('selectedSubjects', id);}
    let list = selected.split('-');
    if (list.includes(id)) return;
    if (list.length == 5) return;
    sessionStorage.setItem('selectedSubjects', selected + '-' + id);
    eval('selectSubject'+id).classList.toggle('submit');
    eval('selectSubject'+id).classList.toggle('green');
    if (list.length == 4) {
        eval('selectSubject'+id).dispatchEvent(new Event('mouseover'));
        return subjectSelectionLoad();
    }
}

function subjectSelectionLoad(){
    document.querySelectorAll('.submit').forEach(button => {
    if (selectedSubjects && selectedSubjects().includes(button.id.replace('selectSubject', ""))) {
        button.dispatchEvent(new Event('mouseover'));
        button.classList.toggle('submit');
        button.classList.toggle('green');
    }})
    if (!selectedSubjects() || selectedSubjects().length != 5) {
        selectedSubmit.disabled = true;
        selectedSubmit.removeAttribute('onclick')
        document.querySelectorAll('.submit').forEach(button => {
            button.style.opacity = 1;
            button.addEventListener('mouseover', iconToggle);
            button.addEventListener('mouseout', iconToggle);
        });
        return
    }
    selectedSubmit.disabled = false;
    selectedSubmit.setAttribute('onclick', `location.href = './selectsubjects?id=${sessionStorage.getItem('selectedSubjects')}'`);
    document.querySelectorAll('.submit').forEach(button => {
        button.style.opacity = 0.2;
        button.removeEventListener('mouseover', iconToggle);
        button.removeEventListener('mouseout', iconToggle);
        button.style.cursor = 'default';
    })
}

function passwordView() {
    const type = password.getAttribute('type') == 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    iconToggle('togglePassword', 'view');
}

function error(error) {
    if (error == '') return;
    if (document.URL.includes('login')) errorLogin(error);
}

function errorLogin(error) {
    eval(error).classList.toggle('is-invalid');
    errorMessage.innerHTML = error == 'email' ? 'There is no user with this email' : 'Password is incorrect';
}