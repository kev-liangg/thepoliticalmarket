import json
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://tpm:tpmpassword@aaj6jr738ea46y.cjnldv06yt97.us-east-2.rds.amazonaws.com:3306/ebdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
mysql = SQLAlchemy(app)
CORS(app)

class test(mysql.Model):
    msg = mysql.Column(mysql.String, primary_key=True)
    msg_ = mysql.Column(mysql.String)

    def __init__(self, msg, msg_):
        self.msg = msg
        self.msg_ = msg_

    def __repr__(self):
        return "msg: {} msg_: {}".format(self.msg,self.msg_)

#NOTE: This route is needed for the default EB health check route

@app.route('/')
def home():
    return "ok"
@app.route('/api/get_topics')
def get_topics():
    # should error since table "test" doesn't exist in our database... yet
    output = test.query.filter_by(msg_="test").one()
    return str(output)
@app.route('/api/submit_question', methods=["POST"])
def submit_question():
    question = json.loads(request.data)["question"]
    return {"answer": f"You Q was {len(question)} chars long"}
if __name__ == '__main__':
    app.run(port=8081, debug=True)