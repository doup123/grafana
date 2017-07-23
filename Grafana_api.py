
from grafana_api_client import *
import json
import requests
#from grafana_dashboards import exporter
url_pattern = "{protocol}://{login}:{password}@{host}/{path_prefix}api/{endpoint}"

headers = {'Content-type': 'application/json'}

# uri="http://admin:admin@172.16.0.18:3000/dashboard/db/marinos-testing-dashboard?refresh=5s&orgId=1"
# r = requests.get(uri,headers)
# print r.status_code

with open("Marinos-Testing-Dashboard-1500571398372.json") as marjson:
    data=json.load(marjson)


print data["rows"][0]["panels"][0]["content"] #
print data["rows"][0]["panels"][1]["thresholds"] #
print data["rows"][0]["panels"][1]["targets"][0]["tags"][0]["value"] #
#print data["annotations"]
# dashboard = '''{
#   "dashboard": {
#     "id": Null,
#     "title": "Production Overview",
#     "tags": [ "templated" ],
#     "timezone": "browser",
#     "rows": [
#       {
#       }
#     ],
#     "schemaVersion": 6,
#     "version": 0
#   },
#   "overwrite": false
# ,"message": "Kati kalo tha ginei edw"}'''
# From down there uncomment to make it work

# url="http://admin:admin@172.16.0.18:3000/api/dashboards/db"
#
# payload = {"dashboard": data}
# p = requests.post(url, headers=headers, json=payload)
# print(p)
# print(p.status_code)
# print(p.text)
