import requests

kingdomTotal={}
divKingdom={}
response = requests.get("https://trefle.io/api/v1/divisions?token=-W4i4-jTjqo6EV4yqzpIubClQr6zSMF7UbOH9ru5iVc")
data = response.json()
for div in data["data"]:
    if div["name"] not in divKingdom:
        divKingdom[div["name"]]=div["subkingdom"]["name"]
    if div["subkingdom"]["kingdom"]["name"] not in kingdomTotal:
        kingdomTotal[div["subkingdom"]["kingdom"]["name"]] = 1
    else:
        kingdomTotal[div["subkingdom"]["kingdom"]["name"]] = kingdomTotal[div["subkingdom"]["kingdom"]["name"]]+1
print("Division / SubKingdom")
for keys in divKingdom:
    print(keys+" /", divKingdom[keys])
for keys in kingdomTotal:
    print("Total Kingdom -> "+keys+" :", kingdomTotal[keys])
