function onLoad() {
    const type = errorMessage.getAttribute('error');
    if (type != '') {
        error(type);
    }
}

function hoverClassToggle(name) {
    const ids = ['addSubject',
                 'togglePassword'
                ];
    const classToggle = {
        'plus-circle':'plus-circle-fill',
        'eye-slash-fill':'eye-fill'
    };
    for (let i = 0; i < ids.length; i++){
        if (name == ids[i]){
            val = eval(name).getAttribute('src') === 'static/img/'+Object.values(classToggle)[i]+'.svg' ?
            'static/img/'+Object.keys(classToggle)[i]+'.svg' :
            'static/img/'+Object.values(classToggle)[i]+'.svg';
            eval(name).setAttribute('src', val);
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
            val = eval(name+id).getAttribute('src') === 'static/img/'+Object.values(classToggle)[i]+'.svg' ?
            'static/img/'+Object.keys(classToggle)[i]+'.svg' :
            'static/img/'+Object.values(classToggle)[i]+'.svg';
            eval(name+id).setAttribute('src', val);
        }
    }
}

function passwordView() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    hoverClassToggle('togglePassword');
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
    const inputs = {'subjectName':'text',
                    'subjectStartDate':'date',
                    'subjectEndDate':'date'};
    const display = ['Subject',
                    'Start Date',
                    'End Date'];
    let values = [];
    const form = document.createElement('form');
    form.method = 'post';
    form.action = '/editsubject?id='+id;
    tbody.appendChild(form);
    if (eval('subjectButtons'+id).getAttribute('edit') == 'False'){
        for (let i = 0; i < Object.keys(inputs).length; i++){
            values[i] = eval(Object.keys(inputs)[i]+id).innerHTML;
            eval(Object.keys(inputs)[i]+id).innerHTML = '';
            let inputdiv = document.createElement('div');
            inputdiv.classList = 'form-floating';
            eval(Object.keys(inputs)[i]+id).appendChild(inputdiv);
            let input = document.createElement('input');
            input.type = Object.values(inputs)[i];
            input.name = Object.keys(inputs)[i]+`Input`+id;
            input.id = Object.keys(inputs)[i]+`Input`+id;
            input.classList = 'form-control';
            input.placeholder = Object.keys(inputs)[i]+`Input`+id;
            input.value = values[i]
            inputdiv.appendChild(input);
            let label = document.createElement('label');
            label.for = Object.keys(inputs)[i]+`Input`+id;
            label.innerHTML = display[i];
            inputdiv.appendChild(label);
            form.appendChild(eval('row'+id));
            // eval(Object.keys(inputs)[i]+id).innerHTML = `<div class="form-floating">
            //                                                 <input type="`+Object.values(inputs)[i]+`" name="`+Object.keys(inputs)[i]+`Input`+id+`" class="form-control" id="`+Object.keys(inputs)[i]+`Input`+id+`" placeholder="`+Object.keys(inputs)[i]+`Input`+id+`" value="`+values[i]+`" required>
            //                                                 <label for="`+Object.keys(inputs)[i]+`Input`+id+`">`+display[i]+`</label>
            //                                             </div>`;
            
        }
        eval('subjectButtons'+id).innerHTML = `
        <img src="/static/img/x-circle.svg" height="50" width="50" class="btn submit" id="submitSubject`+id+`" onclick="form`+id+`.submit()" onmouseover="hoverClassToggleMulti('submitSubject', `+id+`)" onmouseout="hoverClassToggleMulti('submitSubject', `+id+`)">
        <img src="/static/img/x-circle.svg" height="50" width="50" class="btn cancel" id="cancelSubject`+id+`" onclick="editSubject('`+id+`')" onmouseover="hoverClassToggleMulti('cancelSubject', `+id+`)" onmouseout="hoverClassToggleMulti('cancelSubject', `+id+`)">
        `;
        eval('subjectButtons'+id).setAttribute('edit', 'True');
    }
    else {
        for (let i = 0; i < Object.keys(inputs).length; i++){
            values[i] = eval(Object.keys(inputs)[i]+`Input`+id).getAttribute('value');
            eval(Object.keys(inputs)[i]+id).innerHTML = values[i];
        }
        eval('subjectButtons'+id).innerHTML = `
            <img src="/static/img/pencil.svg" height="50" width="50" class="btn" id="editSubject`+id+`" onclick="editSubject('`+id+`')" onmouseover="hoverClassToggleMulti('editSubject', `+id+`)" onmouseout="hoverClassToggleMulti('editSubject', `+id+`)">
            <a href="/deleteSubject?id=`+id+`"><img src="/static/img/trash.svg" height="50" width="50" class="btn" id="deleteSubject`+id+`" onmouseover="hoverClassToggleMulti('deleteSubject', `+id+`)" onmouseout="hoverClassToggleMulti('deleteSubject', `+id+`)"></a>
            `;
        eval('subjectButtons'+id).setAttribute('edit', 'False');
    }
}