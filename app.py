import os

from flask import Flask, render_template, request, redirect, session, url_for, json

import data_manager
import util

app = Flask(__name__)
app.secret_key = os.urandom(32)


@app.route('/')
def index():
    user_login = util.check_session_usr()
    return render_template('index.html', username=user_login)


@app.route('/registration')
def user_registration():
    return render_template('registration.html')


@app.route('/registration-form', methods=["POST"])
def registration_form():
    user_data = request.form.to_dict()
    if data_manager.check_if_user_exist_in_database(user_data['username']) is False:
        hashed_password = util.hash_password(user_data['password'])
        user_login = data_manager.save_user(user_data['username'], hashed_password)
        session['username'] = user_login
        return render_template("index.html", username=session['username'])
    else:
        message = "There's already user with this login"
        return render_template('registration.html', message=message)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_data = request.form.to_dict()
        if data_manager.check_if_user_exist_in_database(user_data['username']):
            password = data_manager.check_if_user_exist_in_database(user_data['username'])
            if util.verify_password(user_data['password'], password['password']):
                session['username'] = request.form['username']
                return render_template('index.html', username=session['username'])
            else:
                message = "Invalid data"
                return render_template('login.html', message=message)
        else:
            message = "Invalid data"
            return render_template('login.html', message=message)
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/save-vote-data', methods=['POST'])
def save_vote():
    data = request.get_json()
    user_id = data_manager.get_user_id(data['user'])
    data['user_id'] = user_id['id']
    data_manager.save_vote(data)
    return None
