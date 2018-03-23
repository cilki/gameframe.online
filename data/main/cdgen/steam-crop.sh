#!/bin/sh
######################
# Steam CD Crop Tool #
######################

# Circular crop the header
# TODO: Figure out how to do this in Python
magick "$1" \( +clone -threshold 101% -fill white -draw "circle %[fx:int(w/2)],%[fx:int(h/2)+$4] %[fx:int(w/2)+$3],%[fx:int(h/2)+$4]" \) -channel-fx '| gray=>alpha' "$2"
