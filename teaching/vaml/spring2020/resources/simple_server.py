import os
import flask
from flask import Flask
from flask_cors import CORS

# create Flask app
app = Flask(__name__)
CORS(app)

# make-em-up data
my_data = ['Hi Client. I am Server response '+str(idx+1)+'. Nice to meet you.' for idx in range(100)]

@app.route('/grab_data', methods=['GET','POST'])
def get_signals():
    # our way of grabbing data from the client
    client_data = flask.request.json
    new_item = client_data['new_item']
    new_data = my_data[new_item]

    # this is returned to the client - note, it will take data_obj, and convert it to a Javascript object
    data_obj = {'val':new_data}
    return flask.jsonify(data_obj)
#


# execute the application (by default, it should be hosted at localhost:5000, which you will see in the output)
if __name__ == '__main__':
    app.run()
