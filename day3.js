var fs = require('fs');
var text = fs.readFileSync('./day3.txt').toString('utf-8');
var input = text.split('\r\n');

String.prototype.replaceAt = function (index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function numHitTrees(slopeRight, slopeDown) {
	var trees = 0;

	for (var x = 0, y = 0; y < input.length; x = (x + slopeRight) % input[y].length, y = y + slopeDown) {
		var row = input[y];
		if (row[x] == '#') {
			row = row.replaceAt(x, 'X');
			trees++;
		} else {
			row = row.replaceAt(x, 'O');
		}
		console.log(row);
	}
	return trees;
}

function multiplyNumHitTrees(slopes) {
	var trees = numHitTrees(slopes[0].right, slopes[0].down);
	if (slopes.length == 1)
		return trees;

	return trees * multiplyNumHitTrees(slopes.slice(1));
}

// Answer 3a - Number of trees hit with slope 3 right and 1 down.
console.log("Trees encountered: " + numHitTrees(3, 1));

// Answer 3b - Multiplication of number of trees hit with various slopes.
var slopes = [{
		right: 1,
		down: 1
	},
	{
		right: 3,
		down: 1
	},
	{
		right: 5,
		down: 1
	},
	{
		right: 7,
		down: 1
	},
	{
		right: 1,
		down: 2
	},
];
console.log("Trees encountered (multiplication): " + multiplyNumHitTrees(slopes));