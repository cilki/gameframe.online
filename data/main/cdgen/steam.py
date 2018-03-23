# --------------------------------
# GameFrame Steam CD Generator   -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import sys

from subprocess import call

from collections import defaultdict
from operator import itemgetter
from wand.image import Image
from wand.color import Color
from wand.drawing import Drawing


"""
The path to the CDGEN directory
"""
PATH = os.environ['STEAM_CDGEN']
assert os.path.isdir(PATH)

"""
"""
HEADER_SIZE = (460, 215)

"""
The CD's outer radius in pixels
"""
RADIUS = 212

"""
The CD's downward offset in pixels
"""
V_OFFSET = 30

"""
The CD's inner radius in pixels
"""
HOLE = 26

"""
The number of pixels to truncate on each side during color average evaluation
"""
TRUNC = 70


def color_average(image):
    """
    Use the topmost row of pixels to choose a good color for the empty space.
    Returns a RGB tuple.
    """

    with image.clone() as clone:
        clone.crop(height=1, width=HEADER_SIZE[0] - 2 * TRUNC, left=TRUNC)
        p = iter(clone.make_blob(format='RGB'))

    color_frequency = defaultdict(int)
    for rgb in zip(p, p, p):
        color_frequency[rgb] += 1

    # Sort according to frequency
    colors = sorted(color_frequency.items(), key=itemgetter(1))

    # If the most common color accounts for more than 25% of the width, return that color
    if colors[0][1] * 4 > image.width:
        return colors[0][0]

    # Otherwise, average the top 50%
    ave = [0, 0, 0]
    processed = 0
    for color in colors:
        ave[0] += color[0][0] * color[1]
        ave[1] += color[0][1] * color[1]
        ave[2] += color[0][2] * color[1]
        processed += color[1]
        if processed > image.width / 2:
            break

    return (ave[0] // processed, ave[1] // processed, ave[2] // processed)


def generate(file_in, file_out, lin, win, mac):
    """
    Generate a Steam CD
    """

    platform = "%s/platform-%s.png" % (PATH, ('l' if lin else '') +
                                       ('w' if win else '') + ('m' if mac else ''))

    # Circular crop the header to a temporary file
    call(["sh", "%s/steam-crop.sh" %
          PATH, file_in, '/tmp/crop.png', str(RADIUS), str(V_OFFSET)])

    with Image(filename='/tmp/crop.png') as header,                            \
            Image(filename="%s/disc.png" % PATH) as disc,                      \
            Image(width=disc.width, height=disc.height) as cd:

        if not (header.width, header.height) == HEADER_SIZE:
            return

        # Compute the best border color
        border = 'rgb' + str(color_average(header))

        # Draw upper semi-circle
        with Drawing() as draw:
            draw.fill_color = Color(border)
            draw.ellipse((disc.width // 2, disc.height // 2),
                         (RADIUS, RADIUS), (180, 0))
            draw(cd)

        # Draw lower semi-circle
        with Drawing() as draw:
            draw.fill_color = Color('black')
            draw.ellipse((disc.width // 2, disc.height // 2),
                         (RADIUS, RADIUS), (0, 180))
            draw(cd)

        # Composite header
        with Drawing() as draw:
            draw.composite(operator='over', left=-10, top=84,
                           width=header.width, height=header.height, image=header)
            draw(cd)

        # Composite platform
        if lin or win or mac:
            with Drawing() as draw, Image(filename=platform) as plat:
                draw.composite(operator='over', left=(cd.width - plat.width) // 2, top=330,
                               width=plat.width, height=plat.height, image=plat)
                draw(cd)

        # Composite edge
        with Drawing() as draw:
            draw.composite(operator='over', left=0, top=0,
                           width=disc.width, height=disc.height, image=disc)
            draw(cd)

        # Draw CD hole
        with Drawing() as draw, Image(width=disc.width, height=disc.height) as hole:
            draw.circle(((disc.width // 2) - 1, (disc.height // 2) - 1),
                        (disc.width // 2, (disc.height // 2) + HOLE))
            draw(hole)

            draw.composite(operator='dst_out', left=0, top=0,
                           width=hole.width, height=hole.height, image=hole)
            draw(cd)

        # Write image
        cd.save(filename=file_out)
