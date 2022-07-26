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
connection = create_connection()

@app.route('/')
def home():
    if not session:
        return redirect(url_for('login'))
    return render_template('/layout.html')

@app.route('/login', methods = ['get', 'post'])
def login():
    if request.method != 'POST':
        return render_template('/login.html')
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

@app.route('/addsubject', methods = ['get', 'post'])
def addSubject():
    return render_template('/layout.html')

if __name__ == "__main__":
    app.run(host='localhost', port=5555)