# nameThatTuneAutoGrader

*note: [nodeJS](https://nodejs.org/en/) is required to run this*

## Install
```sh
git clone https://github.com/brennanwilkes/nameThatTuneAutoGrader.git
cd nameThatTuneAutoGrader
npm install
```

## Run
```sh
node index.js RESPONSES_FILE.csv ANSWER_FILE.txt
```

*note: ANSWER_FILE.txt must be a file with the correct answer alone on each new line (no artists supported yet sorry it's 2:30am)*  
*example:*
```
Harry Potter Main Theme
Pirates of the Caribbean Main Theme
Jason Bourne Series
Lord of the Rings theme
Grease
Frozen
Mulan
The Good, The Bad and the Ugly Main Theme
28 Days Later Theme
Inception Main Theme
```

*OR, as a comma separated list of song name/artist pairs*  
*example:*  
```
Kansas, Carry On My Wayward Son
Blur, Song 2
Tupac, California Love
Fleetwood Mac, Go Your Own Way
Ozzy Osbourne, Crazy Train
Dexys Midnight Runners, Come On Eileen
Skrillex, Bangarang
The Killers, Mr Brightside
The Verve, Bittersweet Symphony
Lil Nas X, Old Town Road
```
