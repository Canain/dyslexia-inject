(function () {
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
	
	
	function shuffle(array) { // in place random shuffle
		var i = array.length;
		
		while (i) {
			var random = Math.floor(Math.random() * i);
			i--;
			
			var temp = array[i];
			array[i] = array[random];
			array[random] = temp;
		}
		
		return array;
	}

	
	function scrambleWord(word) {
		if (word.length < 4) {
			return word;
		}
		return word.charAt(0) + shuffle(word.substr(1, word.length - 2).split('')).join('') + word.charAt(word.length - 1);
	}
	
	function scramble(text) {
		var split = text.split(/(\w*)/);
		split.forEach(function (v, i) {
			if (v.match(/[a-zA-Z0-9]/)) {
				split[i] = scrambleWord(v);
			}
		});
		return split.join('');
	}
	
	function step() {
		textNodes(document).forEach(function (node) {
			if (Math.random() < 1) {
				node.textContent = scramble(node.textContent);
			}
		});
		
		requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
})();