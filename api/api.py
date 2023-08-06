from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.get("/")
def getProgress():
  try:
    with open("data.txt", "r") as f:
        return f.read()
  except:
    return "0.0"

@app.post("/<progress>")
def setProgress(progress = 0.0):
  with open("data.txt", "w") as f:
    f.write(progress)
  return ""

app.run(debug=True,port=8000)