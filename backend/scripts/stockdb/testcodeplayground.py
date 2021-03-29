# https://pypi.org/project/websocket_client/
import websocket
import requests
import time
import eventlet

def on_message(ws, message):
    print(message)


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")


def on_ping(wsapp, message):
    print("Got a ping!")


def on_pong(wsapp, message):
    print("Got a pong! No need to respond")


def on_open(ws):
    ws.send('{"type":"subscribe","symbol":"AMZN"}')


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=c101ctf48v6t383lv0m0",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    # ws.on_open = on_open
    # # ws.run_forever()
    # f = open('curdata.json', 'w')
    # r = requests.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c101ctf48v6t383lv0m0')
    # rawdata = iter(r.json())
    # outputlist = []
    # for x in rawdata:
    #     curdict = {}
    #     cursymbol = x["symbol"]
    #     curdict["symbol"] = cursymbol
    #     curdict["description"] = x["description"]
    #     curdict["type"] = x["type"]
    #     # eventlet.monkey_patch()
    #     # with eventlet.Timeout(0.5, False):
    #     #     a = requests.get('https://finnhub.io/api/v1/quote?symbol=' + cursymbol + '&token=c101ctf48v6t383lv0m0')
    #     #     b = requests.get('https://finnhub.io/api/v1/stock/recommendation?symbol=' + cursymbol + '&token=c101ctf48v6t383lv0m0')
    #     # curprice = a.json()['c']
    #     # curdict["current price"] = curprice
    #     # trendjson = b.json()
    #     # if trendjson.__len__() > 0:
    #     #     curdict["update period"] = trendjson[0]["period"]
    #     #     curdict["buy"] = trendjson[0]["buy"]
    #     #     curdict["hold"] = trendjson[0]["hold"]
    #     #     curdict["sell"] = trendjson[0]["sell"]
    #     outputlist.append(curdict)
    #
    # outjson = open('curdata.json', 'w')
    # outjson.write(str(outputlist))
    # outjson.close()

    eventlet.monkey_patch()
    with eventlet.Timeout(100, False):
        r = requests.get('https://finnhub.io/api/v1/quote?symbol=' + 'AAPL' + '&token=c101ctf48v6t383lv0m0')
        print(type(r.json()))
        print(r.json()['c'])
