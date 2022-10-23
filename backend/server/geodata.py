import requests
import json

coordinateDict = {}

def get_geo_data(matchId):
    url = "https://dev.fn.sportradar.com/common/en/Europe:Berlin/gismo/match_coordinates/" + str(matchId)
    resp = requests.get(url)
    data = resp.json()
    #json_data = json.loads(data)
    c = data["doc"][0]["data"]["coordinates"].split(",")
    coordinates = {
        "lat": float(c[0]),
        "long": float(c[1])
    }
    return coordinates
    

def get_coordinate(matchId):
    if str(matchId) not in coordinateDict:
        coordinate = get_geo_data(matchId)
        coordinateDict[str(matchId)] = coordinate
    return coordinateDict[str(matchId)]