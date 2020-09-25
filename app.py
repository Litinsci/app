PYTHONIOENCODING= 'utf8'
from flask import Flask, render_template, session, redirect, escape, request, abort, flash, jsonify, logging
import sqlite3, os, time
from flask_socketio import SocketIO,send

# global variable
app = Flask(__name__)
app.config['SECRET_KEY'] = 'some_secret_key!!'

socketio = SocketIO(app, cors_allowed_origins='*')
db = 'db.db'
app.secret_key = "GbcmrfKtcyjujt;f21"


# page
@app.route('/',methods=['POST','GET'])
def mainL():
      try:
          if session['username']:
              # print(session['username'])
              
              return redirect('/index')
      except:
          return render_template('login.html')
  # 

@app.route('/reg',methods=['POST'])
def loging():
  name = request.form['reg_name']
  pas = request.form['reg_pas']
  con = sqlite3.connect(db)
  cur = con.cursor()
  if cur.execute("SELECT 1 FROM users WHERE name=?", (name,)).fetchone():
    response = jsonify({'name': "Данное имя уже занято"})
    return response
  else:
    cur.execute("INSERT INTO users(name,password) VALUES(?,?)",(name,pas,))
    con.commit()
    session['username'] = name
    response = jsonify({'name': "new"})
    return response

@app.route('/come_in',methods=['POST'])
def come_in():
    name = request.form['name_com']
    pas = request.form['pas_com']
    con = sqlite3.connect(db)
    cur = con.cursor()
    if cur.execute("SELECT 1 FROM users WHERE name=? AND password = ?", (name,pas,)).fetchone():
      session['username'] = name
      response = jsonify({'name': "old"})
      return response
    else:
      response = jsonify({'name': "none"})
      return response


@app.route('/unsetsession')
def unset():
      session.pop('username',None)
      return render_template('login.html')




@app.route('/index')
def index():
      con = sqlite3.connect(db)
      cur = con.cursor()
      name = session['username']
      id_users = cur.execute("SELECT id FROM users WHERE name=?", (session['username'],)).fetchone()[0]
      rus = cur.execute("SELECT rus FROM words WHERE id_user=?", (id_users,)).fetchall()
      eng = cur.execute("SELECT eng FROM words WHERE id_user=?", (id_users,)).fetchall()
      con.commit()
      return render_template('main.html',name=name,rus = rus,eng = eng,i = 0)
# ``````main
@app.route('/add_words',methods=['POST'])
def add_words():
  ru_word = str(request.form['ru_word'])
  en_word = str(request.form['en_word'])
  name = str(request.form['name'])
  con = sqlite3.connect(db)
  cur = con.cursor()
  id_users = cur.execute("SELECT id FROM users WHERE name=?", (name,)).fetchone()[0]
  length_array_word  = len(cur.execute("SELECT * FROM words WHERE id_user=?", (id_users,)).fetchall())
  if (length_array_word == 0 ):
    cur.execute("INSERT INTO words(id_user,rus,eng,id_words) VALUES(?,?,?,?)", (int(id_users),ru_word,en_word,0,))
  else:
    cur.execute("INSERT INTO words(id_user,rus,eng,id_words) VALUES(?,?,?,?)", (int(id_users),ru_word,en_word,length_array_word,))
  con.commit()
  

@app.route('/onload_wod',methods=['POST'])
def onload_wod():
  name = str(request.form['name'])
  con = sqlite3.connect(db)
  cur = con.cursor()
  id_users = cur.execute("SELECT id FROM users WHERE name=?", (name,)).fetchone()[0]
  rus = cur.execute("SELECT rus FROM words WHERE id_user=?", (id_users,)).fetchone()[0]
  eng = cur.execute("SELECT eng FROM words WHERE id_user=?", (id_users,)).fetchone()[0]
  con.commit()
  response = jsonify({'ru': rus,'en':eng})
  return response


@app.route('/answer', methods=['POST'])
def answer():
  ru_word = str(request.form['ru_word'])
  en_word = str(request.form['en_word'])
  name = str(request.form['name'])
  con = sqlite3.connect(db)
  cur = con.cursor()
  id_users = cur.execute("SELECT id FROM users WHERE name=?", (name,)).fetchone()[0]
  length_array_word  = len(cur.execute("SELECT * FROM words WHERE id_user=?", (id_users,)).fetchall())
  if cur.execute("SELECT 1 FROM words WHERE id_user = ? AND rus = ? AND eng = ?", (int(id_users),ru_word,en_word,)).fetchone():
    response = jsonify({ 'answer' : "true",
                          'length_array_word' :length_array_word })
    return response 
  else:
    response = jsonify({ 'answer': "false",
                          'length_array_word' :length_array_word })
    return response 
  con.commit()


# ````````
@app.route('/next_answer', methods=['POST'])
def next_answer():
  name = str(request.form['name'])
  id_word = str(request.form['id_word'])
  con = sqlite3.connect(db)
  cur = con.cursor()
 
  id_users = cur.execute("SELECT id FROM users WHERE name=?", (name,)).fetchone()[0]
  next_word = cur.execute("SELECT rus FROM words WHERE id_user = ? AND id_words = ?", (int(id_users),int(id_word),)).fetchone()[0]
  response = jsonify({ 'next_word' : next_word})
  return response 
  
  con.commit()


@app.route('/now_answer', methods=['POST'])
def now_answer():
  name = str(request.form['name'])
  word = str(request.form['word'])
  con = sqlite3.connect(db)
  cur = con.cursor()
 
  id_users = cur.execute("SELECT id FROM users WHERE name=?", (name,)).fetchone()[0]
  first_word = cur.execute("SELECT rus FROM words WHERE id_user = ? AND id_words = ?", (int(id_users),int(word),)).fetchone()[0]
  length_array_word  = len(cur.execute("SELECT * FROM words WHERE id_user=?", (id_users,)).fetchall())
  response = jsonify({ 'first_word' : first_word,'length_array_word' :length_array_word })
  return response 
  
  con.commit()





@socketio.on('message')
def handleMessage(data):
    print(f"Message: {data}")
    send(data, broadcast=True)



if __name__ == '__main__':
  socketio.run( app, port=80, debug=True)