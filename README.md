# DogDay - 1997

DogDay is a point&click adventure game.

# Background

An oddly weird game that I used to play as a kid.

I decided to reverse engineer its file formats, `.dog` and `.wof`,
to maybe make a web based version of it.

Since it is a point&click game, it should'nt be that hard,
as long as the assets become available.

# Formats

### .dog
The `.dog` files are actually `.avi` files, and a simple file extension rename is enough to make them viewable.

### .wof (reverse engineered)
The `.wof` files seem to be packages of multiple files and contains raw data. No encryption or compression involved.

My goal was to extract the assets inside this file.

Each `.wof` file starts with the string `DDLIB1` which I could not
find any information about, except some info inside manuals for microcontrollers and some type of IBM product called z/OS.

Reverse engineering this format took me about two days, a few hours each day.


### Structure
The data structure is fairly simple.

First 6 bytes: `DDLIB1`
Following 2 bytes: Entry count

Each entry is 20 bytes long.

Each entry is read backwards.
4 bytes (INT32 LE): data length
4 bytes (INT32 LE): data offset
Rest of the bytes: filename

Extracting assets is easy with this information alone.