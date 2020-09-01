#!/usr/bin/env python3

import os
import re
import time

import requests
from signald import Signal

s = Signal(os.environ["SIGNAL_NUMBER"])

@s.chat_handler(".wuvt")#re.compile(".*?(wuvt).*?"))
def wuvt(message, match):
    r = requests.get('https://www.wuvt.vt.edu/playlists/latest_track', headers={'Accept': "application/json"})
    trackinfo = r.json()

    if 'listeners' in trackinfo and trackinfo['listeners'] is not None:
        return str(
            "{dj} is currently playing \"{title}\" by {artist} with "
            "{listeners:d} online listeners".format(
                dj=trackinfo['dj'],
                title=trackinfo['title'],
                artist=trackinfo['artist'],
                listeners=trackinfo['listeners']))
    else:
        return str("{dj} is currently playing \"{title}\" by {artist}".format(
            dj=trackinfo['dj'],
            title=trackinfo['title'],
            artist=trackinfo['artist']))

def divide(input, by):
    return (input // by), (input % by)

@s.chat_handler(".yi")
def yi(message, match):
    quadraels, remainder = divide(int(time.time()), 1753200)
    raels = quadraels * 4
    extraraels, remainder = divide(remainder, 432000)
    if extraraels == 4:
        return('Yes! PARTAI!')
    elif extraraels == 3:
        return('Soon...')
    else:
        return('Not yet...')

s.run_chat()
