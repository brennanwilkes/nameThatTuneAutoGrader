const levenshtein = require("fast-levenshtein");
const fs = require('fs');

const thresholdDistance = (
	str1,
	str2,
	threshold,
) => {
	return levenshtein.get(str1, str2) <= ((str1.length + str2.length) / 2 / threshold);
};

slidingThresholdDistance = (
	str1,
	str2,
	threshold
) => {

	let guesses = [
		thresholdDistance(str1, str2, threshold)
	];

	for(let i=0; i<str1.length - str2.length; i++){
		//console.dir(`${str1} - ${str1.substring(i, i + str2.length)} - ${str2} - ${thresholdDistance(str1.substring(i, i + str2.length), str2, threshold)}`);
		guesses = [...guesses, thresholdDistance(str1.substring(i, i + str2.length), str2, threshold * 1.5)];
	}
	//console.dir(`${str1} - ${str2} - ${guesses} - ${guesses.reduce((previous, current) => (previous || current), false) && (str1.length >= (str2.length / 2))}`);
	return guesses.reduce((previous, current) => (previous || current), false) && (str1.length >= (str2.length / 2));
}

const sani = val => val.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/  /g," ").replace(/(m?a?i?n? ?theme)/g, "").trim();
const players = {};

fs.readFile( process.argv[2], (err, data) => {
	if (err) {
		throw err;
	}
	data.toString().split("\n").forEach((line, i) => {
		if(line.length < 2 || line.split(",")[0].toLowerCase() === "timestamp"){
			return;
		}
		const player = line.split(",")[1];
		if(!Object.keys(players).includes(player)){
			players[player] = {
				score: 0,
				ans: line.split(",").slice(2).map(sani)
			};
		}
	});

	fs.readFile( process.argv[3], (err, data) => {
		if (err) {
			throw err;
		}
		const corrects = [];
		data.toString().split("\n").forEach((line, i) => {
			if(line.length < 2){
				return;
			}
			const ans = sani(line);
			corrects.push(ans);
			Object.keys(players).forEach(player => {
				//console.dir(`${ans} - ${players[player].ans[i]} - ${slidingThresholdDistance(players[player].ans[i], ans, 2)}`);
				players[player].score += slidingThresholdDistance(players[player].ans[i], ans, 2) ? 1 : 0;
			});
		});
		const scores = {};
		Object.keys(players).sort((a,b) => players[b].score - players[a].score).forEach(player => {
			scores[player.substring(0,20)] = {
				score: players[player].score
			};
			//console.log(`${player} - ${players[player].score}`);
		});
		console.table(scores);
		console.log("\n");

		const graph = {};
		for(let i=0; i<corrects.length; i++ ){
			graph[corrects[i]] = {};
			for(let j=0; j<Object.keys(players).length; j++ ){
				if(slidingThresholdDistance(players[Object.keys(players)[j]].ans[i], corrects[i], 2)){
					graph[corrects[i]][Object.keys(players)[j].slice(0,20)] = "✓";
				}
				//graph[corrects[i]][Object.keys(players)[j].slice(0,20)] = slidingThresholdDistance(players[Object.keys(players)[j]].ans[i], corrects[i], 2) ? '✓' : ;
			}
		}
		//const header = corrects.reduce((previous, current) => previous + " " + current, "");
		//console.dir(header.slice(1));
		console.table(graph);

	});

});
