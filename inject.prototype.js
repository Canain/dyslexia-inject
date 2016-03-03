function textNodes(node) {
	var all = [];
	for (node = node.firstChild; node; node = node.nextSibling) {
		if (node.nodeType == 3) {
			all.push(node);
		} else {
			all = all.concat(textNodes(node));
		}
	}
	return all;
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function scramble(word) {
	if (word.length < 4) {
		return word;
	}
	return word.charAt(0) + shuffle(word.substr(1, word.length - 2).split('')).join('') + word.charAt(word.length - 1);
}

function scrambleText(text) {
	var split = text.split(/(\w*)/);
	split.forEach(function (v, i) {
		if (v.match(/[a-zA-Z0-9]/)) {
			split[i] = scramble(v);
		}
	});
	return split.join('');
}

function scrambleAll() {
	textNodes(document).forEach(function (node) {
		if (Math.random() < 0.05) {
			node.textContent = scrambleText(node.textContent);
		}
	});
}

function step() {
	scrambleAll();
	requestAnimationFrame(step);
}

requestAnimationFrame(step);