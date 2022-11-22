const names = ['edit',
                 'delete',
                 'submit',
                 'cancel',
                 'add',
                 'view',
                 'infoview'
                ];
const icons = {
    'pencil':'pencil-fill',
    'trash':'trash-fill',
    'check-circle':'check-circle-fill',
    'x-circle':'x-circle-fill',
    'plus-circle':'plus-circle-fill',
    'eye-slash-fill':'eye-fill',
    'eye':'eye-fill'
};

var bg = document.querySelectorAll('.bg-dark, .bg-white');
var txt = document.querySelectorAll('.text-white, .text-dark');
var img = document.querySelectorAll('img,.btn');

function themeToggle(){
    bg.forEach(n =>{
        n.classList.toggle('bg-dark');
        n.classList.toggle('bg-white');
    });
    txt.forEach(n =>{
        n.classList.toggle('text-white');
        n.classList.toggle('text-dark');
    });
    img.forEach(n =>{
        n.classList.toggle('inverted');
    })
}

function colorToggle(){
    sessionStorage.setItem('colorToggle', sessionStorage.getItem('colorToggle') == 'light' ? 'dark' : 'light');
    colorToggleBtn.innerHTML = sessionStorage.getItem('colorToggle') == 'light' ? 'Dark Theme' : 'Light Theme';
    themeToggle();
}

function fontToggle(){
}

const subjectButtons = document.querySelectorAll('.btn-select');

function sessionSelected(){
    return sessionStorage.getItem('selectedSubjects').split(',');
}

function load(){
    if (document.URL.includes('subjects')) {
        try{
            sessionStorage.getItem('selectedSubjects').length;
            if (sessionStorage.getItem('selectedSubjects') == ['']) throw 'no data';
            if (selectedSubmit.getAttribute('userid') != 'user') throw 'admin is here';
        }catch{
            try{sessionStorage.setItem('selectedSubjects', eval(selectedSubmit.getAttribute('selectedSubjects')));}catch{}
        }
        try{sessionStorage.getItem('selectedSubjects').length;subjectSelectionLoad();}catch{}
    }
    try{
        sessionStorage.getItem('colorToggle').length; 
        if (sessionStorage.getItem('colorToggle') == 'dark') {
            colorToggleBtn.innerHTML = sessionStorage.getItem('colorToggle') == 'light' ? 'Dark Theme' : 'Light Theme';
            themeToggle();
        }
    }
    catch{sessionStorage.setItem('colorToggle', 'light')}
    try{sessionStorage.getItem('fontToggle').length;}
    catch{sessionStorage.setItem('fontToggle', 'default')}
    colorToggleBtn.innerHTML = sessionStorage.getItem('colorToggle') == 'light' ? 'Dark Theme' : 'Light Theme';
}

load();

const iconList = document.querySelectorAll('.'+names.join(',.'));

iconList.forEach(icon => {
    if (!Object.values(icon.classList).includes('btn-select') && !Object.values(icon.classList).includes('view')){
        icon.addEventListener('mouseover', iconToggle);
        icon.addEventListener('mouseout', iconToggle);
    }
});

try{error(errorMessage.getAttribute('error'));}catch{}

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

function selected(id){
    eval('selectSubject'+id).classList.add('selected');
    iconToggle({currentTarget: eval('selectSubject'+id)});
    eval('selectSubject'+id).removeEventListener('mouseover', iconToggle);
    eval('selectSubject'+id).removeEventListener('mouseout', iconToggle);
    eval('cancelSubject'+id).classList.remove('none');
}

function maxSubjects(){
    try{
        selectedSubmit.disabled = false;
        if (selectedSubmit.getAttribute('userid') == 'user'){
            selectedSubmit.setAttribute('onclick', `location.href = './selectsubjects?id=${sessionStorage.getItem('selectedSubjects')}'`);
        }
        else{
            selectedSubmit.setAttribute('onclick', `location.href = './selectsubjects?id=${sessionStorage.getItem('selectedSubjects')}&userid=${selectedSubmit.getAttribute('userid')}'`);
        }
        document.querySelectorAll('.btn-select').forEach(button => {
            if (!Object.values(button.classList).includes('disabled-select') && !Object.values(button.classList).includes('selected')) {
                button.classList.add('disabled-select');
                button.removeEventListener('mouseover', iconToggle);
                button.removeEventListener('mouseout', iconToggle);
            }
        })
    }catch{}
}

function notMaxSubjects(){
    selectedSubmit.disabled = true;
    selectedSubmit.removeAttribute('onclick')
    subjectButtons.forEach(button => {
        if (Object.values(button.classList).includes('disabled-select')) button.classList.remove('disabled-select');
        if (!Object.values(button.classList).includes('selected')){
            button.addEventListener('mouseover', iconToggle);
            button.addEventListener('mouseout', iconToggle);
        }
    });
}

function selectSubject(id) {
    if (sessionStorage.getItem('selectedSubjects') == id) return;
    if (sessionStorage.getItem('selectedSubjects') != 0) {
        if (sessionStorage.getItem('selectedSubjects').length > 1){
            if (sessionSelected().includes(id+'')) return;
        }
        if (sessionSelected().length == 5) return;
        sessionStorage.setItem('selectedSubjects', sessionSelected()+','+id);
    }
    else sessionStorage.setItem('selectedSubjects', id);
    iconToggle({currentTarget: eval('selectSubject'+id)});
    selected(id);
    if (sessionSelected().length == 5) return maxSubjects();
}

function subjectSelectionLoad(){
    subjectButtons.forEach(button => {
        if (sessionSelected().includes(button.id.replace('selectSubject', ""))) selected(button.id.replace('selectSubject', ''));
    })
    if (sessionSelected().length != 5) return notMaxSubjects();
    return maxSubjects();
}

function cancelSubject(id){
    let selected = sessionSelected();
    selected.splice(selected.indexOf(id+''), 1);
    document.querySelectorAll('.selected').forEach(n => {
        iconToggle({currentTarget: n});
    });
    eval('selectSubject'+id).classList.remove('selected');
    eval('cancelSubject'+id).classList.add('none');
    sessionStorage.setItem('selectedSubjects', selected);
    subjectSelectionLoad();
}

function passwordView() {
    const type = password.getAttribute('type') == 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    iconToggle({currentTarget: togglePassword});
}

function error(error) {
    if (error == '') return;
    if (document.URL.includes('login')) errorLogin(error);
}

function errorLogin(error) {
    eval(error).classList.toggle('is-invalid');
    eval(error+'Error').classList.toggle('none');
}