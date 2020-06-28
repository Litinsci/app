PYTHONIOENCODING= 'utf8'
from flask import Flask, render_template, session, redirect, escape, request, abort, flash, jsonify, logging
import sqlite3, os, time


# global variable
app = Flask(__name__)
db = 'db.db'
app.secret_key = "GbcmrfKtcyjujt;f21"


# page
@app.route('/',methods=['POST','GET'])
def mainL():
      try:
          if session['username']:
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
      name = session['username']
      return render_template('main.html',name=name)
# ``````main
@app.route('/add_words',methods=['POST'])
def add_words():
  ru_word = str(request.form['ru_word'])
  en_word = str(request.form['en_word'])
  name = str(request.form['name'])
  con = sqlite3.connect(db)
  cur = con.cursor()
  id_users = cur.execute("SELECT id FROM users WHERE name=?", (name,)).fetchone()[0]
  cur.execute("INSERT INTO words(id_user,rus,eng) VALUES(?,?,?)", (int(id_users),ru_word,en_word,))
  con.commit()
  # print(id_users)
  # response = jsonify({'name': id_users})
  # return response
  

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
  if cur.execute("SELECT 1 FROM words WHERE id_user = ? AND rus = ? AND eng = ?", (int(id_users),ru_word,en_word,)).fetchone():
    response = jsonify({ 'answer' : "true"})
    return response 
  else:
    response = jsonify({ 'answer': "false"})
    return response 
  con.commit()

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80, debug=True)