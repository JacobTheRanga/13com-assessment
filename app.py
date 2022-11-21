import pymysql, os, dotenv
from passlib.hash import pbkdf2_sha256
from flask import Flask, render_template, session, redirect, url_for, request
app = Flask(__name__)
app.secret_key = os.urandom(64)

dotenv.load_dotenv('.env')

def create_connection():
    return pymysql.connect(
        user = os.environ.get('USER'),
        host = os.environ.get('HOST'),
        password =os.environ.get('PASSWORD'),
        db = os.environ.get('DB'),
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/')
def home():
    if not session:
        return redirect(url_for('login'))
    return render_template('/layout.html')

@app.route('/login', methods = ['get', 'post'])
def login():
    if request.method != 'POST':
        return render_template('/login.html')
    connection = create_connection()
    with connection.cursor() as cursor:
        cursor.execute('select * from users where \
                        email=%s',
                        request.form['email']
        )
        userdata = cursor.fetchone()
        if userdata is None:
            return render_template('/login.html', error = 'email')
        if pbkdf2_sha256.verify(request.form['password'], userdata['password']) is False:
            return render_template('/login.html', error = 'password')
        session['id'] = userdata['userid']
        session['role'] = userdata['role']
        session['user'] = str(userdata['firstname'] + ' ' +userdata['lastname'])
        session['edit'] = False
        return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

def permission(role):
    if role == 'admin':
        return True
    raise

@app.route('/selectusersubjects', methods = ['get', 'post'])
def selectUserSubjects(id, subjects):
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    connection = create_connection()
    with connection.cursor() as cursor:
        cursor.execute('delete from usersubjects\
                                where userid=%s',
                                id)
        for subject in subjects:
            cursor.execute('insert into usersubjects\
                            (userid, subjectid)\
                            values (%s, %s)',
                            (id, subject)
            )
        connection.commit()
    return redirect(url_for('viewUserSubjects', id=id))

@app.route('/selectsubjects', methods = ['get', 'post'])
def selectSubject():
    if not session:
        return redirect(url_for('login'))
    subjects = request.args.get('id').split(',')
    if len(set(subjects)) != 5:
        return redirect(url_for('subjects'))
    connection = create_connection()
    with connection.cursor() as cursor:
        for subject in subjects:
            try:
                cursor.execute('select * from subjects\
                                where subjectid=%s',
                                int(subject))
            except:
                return redirect(url_for('subjects'))
            if cursor.fetchall() == ():
                return redirect(url_for('subjects'))
        try:
            permission(session['role'])
            return selectUserSubjects(request.args.get('userid'), subjects)
        except:
            pass
        cursor.execute('delete from usersubjects\
                            where userid=%s',
                            session['id'])
        for subject in subjects:
            cursor.execute('insert into usersubjects\
                            (userid, subjectid)\
                            values (%s, %s)',
                            (session['id'], subject)
            )
        connection.commit()
    return redirect(url_for('subjects'))

@app.route('/subjects', methods = ['get', 'post'])
def subjects():
    try:
        permission(session['role'])
        session['edit'] = False
    except:
        pass
    if not session:
        return redirect(url_for('login'))
    connection = create_connection()
    with connection.cursor() as cursor:
        cursor.execute('select * from subjects')
        subjects = cursor.fetchall()
        try:
            permission(session['role'])
        except:
            cursor.execute('select subjectid from usersubjects\
                            where userid=%s',
                            session['id'])
            session['selected'] = []
            for i in cursor.fetchall():
                session['selected'].append(i['subjectid'])
    return render_template('/subjects.html', subjects = subjects)

@app.route('/deleteSubject', methods = ['get', 'post'])
def deleteSubject():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    subjectid = request.args.get('id')
    connection = create_connection()
    with connection.cursor() as cursor:
        try:
            cursor.execute('select * from subjects where subjectid=%s',
                            int(subjectid))
        except:
            return redirect(url_for('subjects'))
        if cursor.fetchall() == ():
            return redirect(url_for('subjects'))
        cursor.execute('delete from usersubjects where subjectid=%s',   
                        int(subjectid))
        cursor.execute('delete from subjects where subjectid=%s',   
                        int(subjectid))
        connection.commit()
    return redirect(url_for('subjects'))

@app.route('/addsubject', methods = ['get', 'post'])
def addSubject():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    connection = create_connection()
    with connection.cursor() as cursor:
        try:
            cursor.execute('insert into subjects (subjectname, start, end)\
                            values (%s, %s, %s)',
                            (
                                request.form['name'],
                                request.form['startdate'],
                                request.form['enddate']
                            ))
            connection.commit()
        except:
            pass
    return redirect(url_for('subjects'))

@app.route('/adduser', methods = ['get', 'post'])
def addUser():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    connection = create_connection()
    with connection.cursor() as cursor:
        try:
            cursor.execute('insert into users (firstname, lastname, email, password)\
                            values (%s, %s, %s, %s)',
                            (
                                request.form['addfirstname'],
                                request.form['addlastname'],
                                request.form['addemail'],
                                pbkdf2_sha256.hash(request.form['addpassword'])
                            ))
            connection.commit()
        except:
            pass
    return redirect(url_for('viewUsers'))

@app.route('/deleteuser', methods = ['get', 'post'])
def deleteUser():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    userid = request.args.get('id')
    connection = create_connection()
    with connection.cursor() as cursor:
        try:
            cursor.execute('delete from usersubjects where userid = %s', userid)
            cursor.execute('delete from users where userid = %s', userid)
            connection.commit()
        except:
            pass
    return redirect(url_for('viewUsers'))

@app.route('/editsubject', methods = ['get', 'post'])
def editSubject():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    subjectid = request.args.get('id')
    connection = create_connection()
    with connection.cursor() as cursor:
        if request.method != 'POST':
            cursor.execute('select * from subjects where subjectid = %s', subjectid)
            subjectdata = cursor.fetchone()
            if subjectdata == None:
                return redirect(url_for('subjects'))
            return render_template('editSubject.html', subjectid = subjectid, subjectdata = subjectdata)
        try:
            cursor.execute('update subjects set\
                            subjectname = %s,\
                            start = %s,\
                            end = %s\
                            where subjectid = %s',
                            (
                                request.form['name'],
                                request.form['startDate'],
                                request.form['endDate'],
                                subjectid
                            ))
            connection.commit()
        except:
            pass
    return redirect(url_for('subjects'))

@app.route('/viewusers', methods = ['get', 'post'])
def viewUsers():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    connection = create_connection()
    with connection.cursor() as cursor:
        if request.method != 'POST':
            cursor.execute('select * from users where role="user"')
            userdata = cursor.fetchall()
            return render_template('userview.html', users=userdata)
        prefix = ['users.lastname=', 'users.firstname=', 'subjects.subjectname=']
        inputs = [request.form['lastname'], request.form['firstname'], request.form['subject']]
        try:
            if inputs == ['', '', '']:
                raise
            query = 'select * from usersubjects\
                    join users on users.userid = usersubjects.userid\
                    join subjects on subjects.subjectid = usersubjects.subjectid\
                    where'
            for i in range(3):
                if inputs[i] != '':
                    query += ' ' + prefix[i] + "'"+inputs[i]+"'" + ' and'
            cursor.execute(query[:-4])
            users = cursor.fetchall()
            userids = []
            newusers = []
            for i in users:
                if i['userid'] not in userids:
                    userids.append(i['userid'])
                    newusers.append(i)
            return render_template('userview.html', users = newusers)
        except:
            return redirect(url_for('viewUsers'))

@app.route('/edituser', methods = ['get', 'post'])
def editUser():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    userid = request.args.get('id')
    connection = create_connection()
    with connection.cursor() as cursor:
        if request.method != 'POST':
            cursor.execute('select * from users where userid = %s', userid)
            userdata = cursor.fetchone()
            if userdata == None:
                return redirect(url_for('viewUsers'))
            return render_template('edituser.html', userid = userid, userdata = userdata)
        try:
            cursor.execute('update users set\
                            firstname = %s,\
                            lastname = %s,\
                            email = %s,\
                            password = %s\
                            where userid = %s',
                            (
                                request.form['firstname'],
                                request.form['lastname'],
                                request.form['email'],
                                pbkdf2_sha256.hash(request.form['password']),
                                userid
                            ))
            connection.commit()
        except:
            pass
    return redirect(url_for('viewUsers'))

@app.route('/viewusersubjects')
def viewUserSubjects():
    try:
        permission(session['role'])
        session['edit'] = True
    except:
        return redirect(url_for('home'))
    userid = request.args.get('id')
    connection = create_connection()
    with connection.cursor() as cursor:
        cursor.execute('select * from users where userid = %s', userid)
        userdata = cursor.fetchone()
        cursor.execute('select * from subjects')
        subjects = cursor.fetchall()
        cursor.execute('select subjectid from usersubjects where userid = %s', userid)
        session['selected'] = []
        for i in cursor.fetchall():
            session['selected'].append(i['subjectid'])
    return render_template('subjects.html', user = userdata, subjects = subjects)

if __name__ == "__main__":
    app.run(host='localhost', port=os.environ.get('PORT'))
