from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import BackendApplicationClient
import requests
from api import config
import json

client_id = config.litw_api_client_id
client_secret = config.litw_api_client_secret
api_url = config.litw_api_base_url
token_url = config.litw_api_token_endpoint
initialize_url = config.litw_api_initialize_endpoint


client = BackendApplicationClient(client_id=client_id)
oauth = OAuth2Session(client=client)
# ToDo: Check token before asking for another one?
token = oauth.fetch_token(token_url=token_url, client_id=client_id, client_secret=client_secret, verify=False)

#INITIALIZE
auth = 'Bearer {}'.format(token['access_token'])
header = {'Authorization': auth}
r_yes = requests.get(initialize_url, verify=False, headers=header)

#SAVE INITDATA
r_data = json.loads(r_yes.text)
r_save = requests.post(config.litw_api_study_data_endpoint, headers=header, data=r_data)