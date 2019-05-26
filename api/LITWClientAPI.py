from flask import Flask
from flask import jsonify
from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import BackendApplicationClient
import requests
from api import config


client_id = config.litw_api_client_id
client_secret = config.litw_api_client_secret
api_url = config.litw_api_base_url
token_url = config.litw_api_token_endpoint
localize_url = config.litw_api_localize_endpoint

client = BackendApplicationClient(client_id=client_id)
oauth = OAuth2Session(client=client)
# ToDo: Check token before asking for another one?
token = oauth.fetch_token(token_url=token_url, client_id=client_id, client_secret=client_secret)

app = Flask(__name__)


@app.route('/')
def hi():
    return 'Hello World!'


@app.route('/hello/<name>')
def hello(name):
    return 'Hello {0}!'.format(name)


@app.route('/localize/<string:ip>/')
def localize(ip):
    auth = 'Bearer {}'.format(token['access_token'])
    header = {'Authorization': auth}
    endpoint = localize_url + ip  # ''205.175.107.21/'
    r_yes = requests.get(endpoint, headers=header)
    return jsonify(r_yes.json())
