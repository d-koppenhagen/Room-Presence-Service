# Room-Presence-Service
A presence service for a few persons sitting in Room L0.13 ([HfTL](https://www.google.de/maps/place/Gustav-Freytag-Stra%C3%9Fe,+Hochschule+f%C3%BCr+Telekommunikation+Leipzig+(HfTL),+04277+Leipzig/@51.3130012,12.3753559,20z/data=!3m1!5s0x47a6f9cf62166b7b:0xd590b1419df1b4dc!4m2!3m1!1s0x47a6f9cf61c250b7:0x7899c973677c982b)).

This Repo provides a frontend and a backand for a 'room presence service'.
The backend has a RESTful Webservice which operates whith the GPIOs of a Raspberry PI.
There are currently two states (on/off) to turn some LEDs on or off.

The frontend has some buttons to change the current state from on to off (not in the room) and from off to on (available).

## Settings
* move '/frontend/js/config.example.js' to '/frontend/js/config.js'

## Watch it!
[![ScreenShot](http://5.45.102.135:8082/files/83e530ab-05df-455b-b981-c60807220374/preview.png)](http://vimeo.com/117945331)
