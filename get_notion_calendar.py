import json, requests
from datetime import datetime
from pytz import timezone
import time

JSON_PATH = "C:\\Users\\bdsoc\\MagicMirror\\modules\\custom-calendar\\json_data.json"

file = open('notionInfo.json')
notionInfo = json.load(file)

# imports integration id and db ids
token = notionInfo['token']
calendardb = notionInfo['calendardb']

eastern = timezone('US/Eastern')

def getToday():
    fmt = '%Y-%m-%d'
    loc_dt = eastern.localize(datetime.now())
    return loc_dt.strftime(fmt)

def parseResponse(response):
    items = []
    for i in range(len(response)):
        try:
            eventDict = dict()
            name = response[i]['properties']['Name']['title'][0]['text']['content']
            date = response[i]['properties']['Date']['date']['start']

            eventDict['name'] = name
            eventDict['date'] = date

            items.append(eventDict)
        except:
            pass

    return items

def getEvents():
    url = f'https://api.notion.com/v1/databases/{calendardb}/query'

    r = requests.post(url, headers={
        "Authorization": f"Bearer {token}",
        "Notion-Version": "2021-08-16"
    }, json={
        'sorts': [
            {
                'property': 'Date',
                'direction': 'ascending'
            }
        ],
        'filter': {
            'property': 'Date',
            'date': {
                'on_or_after': getToday(),
                'timezone': 'EST'
            }
        }
    })

    response = r.json()
    response = response['results']
    response = parseResponse(response)

    json_format = json.dumps(response)

    with open(JSON_PATH, 'w') as outfile:
        json.dump(json_format, outfile)

getEvents()
while True:
    time.sleep(10)
    print("hello")