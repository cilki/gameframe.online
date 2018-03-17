#!/bin/sh
######################
# Steam Header-to-CD #
######################

# The radius in pixels
R=185

# Output file
OUT="$2.png"

# Sample the colors of the top and bottom row
mapfile -t COLORS <<< `convert "$1" -resize '1x215!' txt:- | grep -Po '#\K[^ ]*'`

# Circular crop the header
magick "$1" \( +clone -threshold 101% -fill white -draw "circle %[fx:int(w/2)],%[fx:int(h/2)] %[fx:int(w/2)],%[fx:$R+int(h/2)]" \) -channel-fx '| gray=>alpha' "$OUT"

# Create canvas
convert -size 460x460 xc:transparent -fill "#${COLORS[214]}" -draw "ellipse 230,230 $R,$R 0,180" /tmp/canvas.png
convert /tmp/canvas.png -fill "#${COLORS[1]}" -draw "ellipse 230,230 $R,$R 180,0" /tmp/canvas.png

# Composite canvas
convert /tmp/canvas.png "$OUT" -geometry +0+122 -composite "$OUT"

# Add hole
convert "$OUT" -fill "#6e6e6e" -draw 'circle 230,230 230,255' -transparent "#6e6e6e" "$OUT"

# Add the frame
convert "$OUT" "`dirname $0`/disc.png" -geometry +40+40 -composite "$OUT"

# Delete canvas
rm /tmp/canvas.png
