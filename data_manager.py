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
