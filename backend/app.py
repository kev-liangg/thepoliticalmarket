import json
from flask import Flask, request
from flask_mysql_connector import MySQL
from flask_cors import CORS
app = Flask(__name__)
app.config['MYSQL_USER'] = 'tpm'
app.config['MYSQL_DATABASE'] = 'ebdb'
app.config['MYSQL_PASSWORD'] = 'tpmpassword'
app.config['MYSQL_HOST'] = 'aaj6jr738ea46y.cjnldv06yt97.us-east-2.rds.amazonaws.com'
app.config['MYSQL_PORT'] = '3306'
mysql = MySQL(app)
CORS(app)

EXAMPLE_SQL = 'select * from ebdb.user_summary'

# NOTE: This route is needed for the default EB health check route
@app.route('/')
def home():
    return "ok"
@app.route('/api/get_topics')
def get_topics():
    # should error since user_sumary doesn't exist in our database... yet
    cur = mysql.new_cursor(dictionary=True)
    cur.execute(EXAMPLE_SQL)
    output = cur.fetchall()
    return str(output)
@app.route('/api/submit_question', methods=["POST"])
def submit_question():
    question = json.loads(request.data)["question"]
    return {"answer": f"You Q was {len(question)} chars long"}
if __name__ == '__main__':
    app.run(port=8080, debug=True)