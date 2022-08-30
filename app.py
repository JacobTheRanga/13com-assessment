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
        return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/register', methods = ['get', 'post'])
def register():
    if request.method != 'POST':
        return render_template('/register.html')

def permission(role):
    if role == 'admin':
        return True
    raise

@app.route('/subjects', methods = ['get', 'post'])
def subjects():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    connection = create_connection()
    with connection.cursor() as cursor:
        cursor.execute('select * from subjects')
        subjects = cursor.fetchall()
    return render_template('/subjects.html', subjects = subjects)

@app.route('/deleteSubject', methods = ['get', 'post'])
def deleteSubject():
    try:
        permission(session['role'])
    except:
        return redirect(url_for('home'))
    connection = create_connection()
    with connection.cursor() as cursor:
        cursor.execute('delete from usersubjects where subjectid=%s',   
                        int(request.args.get('id')))
        cursor.execute('delete from subjects where subjectid=%s',   
                        int(request.args.get('id')))
        connection.commit()
    return redirect(url_for('subjects'))

@app.route('/test', methods = ['get', 'post'])
def test():
    print(request.form['name'])
    return redirect(url_for('subjects'))

if __name__ == "__main__":
    app.run(host='localhost', port=5555)
