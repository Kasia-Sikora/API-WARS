import psycopg2
import connection


@connection.connection_handler
def save_user(cursor, username, password):
    cursor.execute(
        '''INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s);
        SELECT username from USERS 
        WHERE username = %(username)s
        ''', {'username': username, 'password': password}
    )
    registration_login = cursor.fetchall()
    return registration_login[0]['username']


@connection.connection_handler
def check_if_user_exist_in_database(cursor, username):
    cursor.execute(
        '''SELECT username, password FROM users
        WHERE username = %(username)s''', {'username': username}
    )
    user_data = cursor.fetchall()
    if len(user_data) == 0:
        return False
    else:
        return user_data[0]


@connection.connection_handler
def get_users(cursor):
    cursor.execute(
        '''SELECT username FROM users'''
    )
    return cursor.fetchall()


@connection.connection_handler
def get_user_id(cursor, user_name):
    cursor.execute(
        '''SELECT id FROM users
        WHERE username = %(user_name)s;''', {'user_name': user_name}
    )
    user_id = cursor.fetchone()
    return user_id


@connection.connection_handler
def save_vote(cursor, data):
    cursor.execute(
        '''INSERT INTO planet_votes (planet_id, planet_name, user_id, submission_time)
         VALUES (%(planetId)s, %(planetName)s, %(user_id)s, CURRENT_TIMESTAMP);''', data
    )