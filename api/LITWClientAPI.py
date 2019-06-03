from flask import Flask, jsonify, request
from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import BackendApplicationClient, TokenExpiredError
import requests
from werkzeug.exceptions import UnsupportedMediaType

from api import config


_client_id = config.litw_api_client_id
_client_secret = config.litw_api_client_secret
_api_url = config.litw_api_base_url
_token_url = config.litw_api_token_endpoint
_initialize_url = config.litw_api_initialize_endpoint
_save_data_url = config.litw_api_study_data_endpoint

_client = BackendApplicationClient(client_id=_client_id)
_oauth = OAuth2Session(client=_client)
# ToDo: Check token before asking for another one?
_token = _oauth.fetch_token(token_url=_token_url, client_id=_client_id, client_secret=_client_secret)

app = Flask(__name__)


@app.route('/')
def hi():
    return 'Hello World!'


@app.route('/hello/<name>')
def hello(name):
    return 'Hello {0}!'.format(name)


@app.route('/initialize/')
def initialize():
    ip = _get_client_ip(request)
    app.logger.debug('CLIENT_IP:' + ip)
    endpoint = _initialize_url + ip
    header = _get_auth_header()
    r_yes = requests.get(endpoint, headers=header)
    if r_yes.status_code == 200:
        # ToDo What to do in case this fails?
        _save_study_data(r_yes.json())
    return jsonify(r_yes.json())


def _get_auth_header():
    # ToDo: Check if token is still valid!!!
    auth = 'Bearer {}'.format(_token['access_token'])
    header = {'Authorization': auth}
    return header


def _get_client_ip(req):
    client_ip = ''
    if req.environ.get('HTTP_X_FORWARDED_FOR') is None:
        client_ip = req.environ['REMOTE_ADDR']
    else:
        client_ip = req.environ['HTTP_X_FORWARDED_FOR']

    # TEST_SERVER
    if client_ip == '127.0.0.1':
        # Google DNS server
        client_ip = '8.8.8.8'

    return client_ip


@app.route('/save/', methods=['POST'])
def save_data():
    try:
        content = request.json
        _save_study_data(content)
    except ValueError:
        raise UnsupportedMediaType("Expecting request content to be a JSON object.")


def _save_study_data(data):
    endpoint = _save_data_url
    header = _get_auth_header()
    r_save = requests.post(endpoint, headers=header, data=data)
    return jsonify(r_save.json())
