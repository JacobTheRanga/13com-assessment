if(errorMessage.getAttribute('error')) error(errorMessage.getAttribute('error'));


function iconToggle(event) {
    for (let i = 0; i <names.length; i++){
        if (event.currentTarget.classList.contains(names[i])){
            val = event.currentTarget.getAttribute('src') === 'static/img/'+Object.values(icons)[i]+'.svg' ?
            'static/img/'+Object.keys(icons)[i]+'.svg' :
            'static/img/'+Object.values(icons)[i]+'.svg';
            event.currentTarget.setAttribute('src', val);
        }
    }
}

function selectSubject(id) {
    let href = selectedSubmit.getAttribute('href');
    ids = href.split('=')[1];
    if (ids.split('-').length == 5) return;
    for (let i = 0; i < ids.length; i++){
        if (id == ids[i]) return;
    }
    if (ids == "") ids = id;
    else ids = ids + '-' + id;
    href = href.split('=')[0] + '=' + ids;
    eval('selectedText'+id).innerHTML = 'Selected';
    selectedSubmit.setAttribute('href', href);
    if (ids.split('-').length ==  5){
        buttons = document.querySelectorAll('[id^="selectSubject"]');
        iconToggle(('selectSubject'+id), 'submit');
        for (let i = 0; i < buttons.length; i++){
            eval(buttons[i].id).classList.remove('btn');
            eval(buttons[i].id).removeEventListener('mouseover');
            eval(buttons[i].id).removeEventListener('mouseout');
            selectedSubmit.removeAttribute('href');
            selectedSubmit.classList.toggle('btn')
        }
    }
}

function passwordView() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    iconToggle('togglePassword', 'view');
}

function error(error) {
    if (error == '') return;
    if (document.URL.includes('login')) errorLogin(error);
}

function errorLogin(error) {
    eval(error).classList.toggle('is-invalid');
    errorMessage.innerHTML = error === 'email' ? 'There is no user with this email' : 'Password is incorrect';
}

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

let imgList = document.querySelectorAll('.'+names.join(',.'))

imgList.forEach(img => {
    img.addEventListener('mouseover', iconToggle);
    img.addEventListener('mouseout', iconToggle);
});