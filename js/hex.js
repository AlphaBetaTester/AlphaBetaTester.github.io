function isHex(hex) {
	if(hex.length === 4 || hex.length === 7) {
		if(hex.charAt(0) === '#') {
			for(var i=1;i<hex.length;i++) {
				if('0123456789ABCDEF'.indexOf(hex.charAt(i).toUpperCase()) === -1) {
					return false;
				}
			}
			return true;
		}
	}
	return false;
}

function add(hex) {
	var newHexString = '';
	for(var i=0;i<hex.length;i++) {
		if(hex[i] === '#') { newHexString += '#'; }
		else {
			var idx = '0123456789abcdef'.indexOf(hex[i].toLowerCase());
			if(idx === -1) { continue; }
			if(idx + 1 < 16) { idx++; }
			newHexString += '0123456789abcdef'.split('')[idx];
		}
	}
	return newHexString;
}

function sub(hex) {
	var newHexString = '';
	for(var i=0;i<hex.length;i++) {
		if(hex[i] === '#') { newHexString += '#'; }
		else {
			var idx = '0123456789abcdef'.indexOf(hex[i].toLowerCase());
			if(idx === -1) { continue; }
			if(idx - 1 >= 0) { idx--; }
			newHexString += '0123456789abcdef'.split('')[idx];
		}
	}
	return newHexString;
}
