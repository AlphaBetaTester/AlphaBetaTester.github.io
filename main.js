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

window.onload = function() {
	document.getElementById('primary-accent').onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var value2 = ev.target.value || '#2B5D60';
			var value1 = add(value2);
			var value0 = add(value1);
			var value3 = sub(value2);
			var value4 = sub(value3);
			document.body.style.setProperty('--primary-accent', value0);
			document.body.style.setProperty('--primary-accent-1', value1);
			document.body.style.setProperty('--primary-accent-2', value2);
			document.body.style.setProperty('--primary-accent-3', value3);
			document.body.style.setProperty('--primary-accent-4', value4);
		}
	}

	document.getElementById('secondary-accent').onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var value = ev.target.value || '#284B63';
			document.body.style.setProperty('--secondary-accent', value);
			document.body.style.setProperty('--secondary-accent-1', add(value));
		}
	}

	document.getElementById('tertiary-accent').onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var value = ev.target.value || '#ECECEC';
			document.body.style.setProperty('--tertiary-accent', value);
		}
	}

	document.getElementById('primary-text-color').onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var value = ev.target.value || '#FFFFFF';
			document.body.style.setProperty('--primary-text-color', value);
		}
	}

	document.getElementById('background-color').onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var value = ev.target.value || '#353535';
			document.body.style.setProperty('--background-color', value);
		}
	}

	document.getElementById('go').onclick = function() {
		document.getElementById('home').classList.remove('active');
		document.getElementById('dashboard').classList.add('active');
	}

	document.getElementById('whatisalphabetatester').onclick = function(ev) {
		document.getElementById('home').classList.remove('active');
		document.getElementById('about').classList.add('active');
	};

	document.getElementById('back').onclick = function(ev) {
		document.getElementById('about').classList.remove('active');
		document.getElementById('home').classList.add('active');
	}

	var notes = document.getElementById('notes');
	notes.fullscreen = false;
	notes._title = notes.children[0];
	notes._textarea = notes.children[1];
	var blueprints = document.getElementById('blueprints');
	blueprints.fullscreen = false;
	blueprints._title = blueprints.children[0];
	blueprints._textarea = blueprints.children[1];
	var resources_assessment = document.getElementById('resources-assessment');
	var clock = document.getElementById('clock');
	var motivational_quote_generator = document.getElementById('motivational-quote-generator');
	var articles = document.getElementById('articles');
	var settings = document.getElementById('settings');

	function updateClock() {
		var hours = new Date().getHours();
		if(hours > 12) { hours -= 12; }
		var minutes = new Date().getMinutes();
		if(minutes < 10) { minutes = '0' + minutes; }
		clock.innerHTML = hours + ':' + minutes;
	}

	updateClock();
	setInterval(updateClock, 1000);

	function updateMotivationalQuote() {
		var quotes = [
			'You can do it!', 'You\'re the (wo)man!', 'Never give up!', 'You\'re doing great!', 'Nobody else can do it like you!', 'My (wo)man!'
		];
		motivational_quote_generator.children[1].innerHTML = '"' + quotes[Math.random() * quotes.length | 0] + '"';
	}
	updateMotivationalQuote();
	motivational_quote_generator.onclick = updateMotivationalQuote;

	document.getElementById('add-note').onclick = function(ev) {
		var note = document.createElement('div');
		note.classList.add('note');
		var h1 = document.createElement('h1');
		h1.innerHTML = 'Note';
		note.appendChild(h1);
		var btn = document.createElement('button');
		btn.innerHTML = 'X';
		btn.onclick = function() {
			this.parentElement.parentElement.removeChild(this.parentElement);
		}
		note.appendChild(btn);
		var text = document.createElement('textarea');
		text.placeholder = 'Enter text here.';
		text.spellcheck = 'false';
		note.appendChild(text);
		notes.insertBefore(note, document.getElementById('add-note'));
	};

	document.getElementById('add-blueprint').onclick = function(ev) {
		var blueprint = document.createElement('div');
		blueprint.classList.add('blueprint');
		var h1 = document.createElement('h1');
		h1.innerHTML = 'Blueprint';
		blueprint.appendChild(h1);
		var btn = document.createElement('button');
		btn.innerHTML = 'X';
		btn.onclick = function() {
			this.parentElement.parentElement.removeChild(this.parentElement);
		}
		blueprint.appendChild(btn);
		var canvas = document.createElement('canvas');
		canvas._context = canvas.getContext('2d');
		canvas._mouseDown = false;

		canvas.oncontextmenu = function(ev) {
			ev.preventDefault();
		}

		canvas.onmousedown = function(ev) {
			ev.preventDefault();
			this._mouseDown = true;
			// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
			var r = this.getBoundingClientRect();
			var x = (ev.clientX - r.left) * (canvas.width / r.width);
			var y = (ev.clientY - r.top) * (canvas.height / r.height);
			if(ev.which === 1) {
				this._context.fillStyle = 'white';
			}
			else {
				this._context.fillStyle = document.body.style.getPropertyValue('--secondary-accent-1') || '#395C74';
			}
			this._context.fillRect(x - 2, y - 2, 4, 4);
		};

		canvas.onmousemove = function(ev) {
			ev.preventDefault();
			if(this._mouseDown) {
				var r = this.getBoundingClientRect();
				var x = (ev.clientX - r.left) * (canvas.width / r.width);
				var y = (ev.clientY - r.top) * (canvas.height / r.height);
				if(ev.which === 1) {
					this._context.fillStyle = 'white';
				}
				else {
					this._context.fillStyle = document.body.style.getPropertyValue('--secondary-accent-1') || '#395C74';
				}
				this._context.fillRect(x - 2, y - 2, 4, 4);
			}
		};

		canvas.onmouseup = function(ev) {
			ev.preventDefault();
			this._mouseDown = false;
			var r = this.getBoundingClientRect();
			var x = (ev.clientX - r.left) * (canvas.width / r.width);
			var y = (ev.clientY - r.top) * (canvas.height / r.height);
			if(ev.which === 1) {
				this._context.fillStyle = 'white';
			}
			else {
				this._context.fillStyle = document.body.style.getPropertyValue('--secondary-accent-1') || '#395C74';
			}
			this._context.fillRect(x - 2, y - 2, 4, 4);
		};

		blueprint.appendChild(canvas);
		blueprints.insertBefore(blueprint, document.getElementById('add-blueprint'));
	};

	notes._title.onclick = function(ev) {
		if(notes.fullscreen) {
			notes._title.innerHTML = 'Notes (click to enlarge & use)';
			notes.style.width = 'calc(40vw - 20px)';
			notes.style.height = 'calc(30vh - 20px)';
			notes.fullscreen = false;
			notes.classList.remove('selected');
		}
		else {
			notes._title.innerHTML = 'Notes (click to close)';
			notes.style.width = 'calc(100vw - 20px)';
			notes.style.height = 'calc(100vh - 20px)';
			notes.fullscreen = true;
			notes.style.zIndex = 5;
			blueprints.style.zIndex = 1;
			notes.classList.add('selected');
		}
	};

	blueprints._title.onclick = function(ev) {
		if(blueprints.fullscreen) {
			blueprints._title.innerHTML = 'Blueprints (click to enlarge & use)';
			blueprints.style.left = '40vw';
			blueprints.style.top = '0vh';
			blueprints.style.width = 'calc(60vw - 20px)';
			blueprints.style.height = 'calc(30vh - 20px)';
			blueprints.classList.remove('selected');
			blueprints.fullscreen = false;
		}
		else {
			blueprints._title.innerHTML = 'Blueprints (click to close)';
			blueprints.style.left = '0vw';
			blueprints.style.top = '0vh';
			blueprints.style.width = 'calc(100vw - 20px)';
			blueprints.style.height = 'calc(100vh - 20px)';
			blueprints.fullscreen = true;
			blueprints.style.zIndex = 5;
			blueprints.classList.add('selected');
			notes.style.zIndex = 1;
		}
	};

	function addResource(type, message) {
		var li = document.createElement('li');
		var div = document.createElement('div');
		div.innerHTML = message;
		li.appendChild(div);
		var button = document.createElement('button');
		button.innerHTML = 'Delete';
		button.onclick = function(ev) {
			this.parentElement.parentElement.removeChild(this.parentElement);
		};
		li.appendChild(button);
		if(type === 0) {
			resources_assessment.children[1].children[1].appendChild(li);
		}
		else {
			resources_assessment.children[2].children[1].appendChild(li);
		}
	}

	resources_assessment.children[1].children[2].onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var val = this.value;
			if(val.trim().length > 0) {
				addResource(0, val);
			}
			addResource(0, this.value);
		}
	};
	resources_assessment.children[1].children[3].onclick = function(ev) {
		var val = resources_assessment.children[1].children[2].value;
		if(val.trim().length > 0) {
			addResource(0, val);
		}
	};

	resources_assessment.children[2].children[2].onkeydown = function(ev) {
		if(ev.keyCode === 13) {
			ev.preventDefault();
			var val = this.value;
			if(val.trim().length > 0) {
				addResource(1, val);
			}
		}
	};
	resources_assessment.children[2].children[3].onclick = function(ev) {
		var val = resources_assessment.children[2].children[2].value;
		if(val.trim().length > 0) {
			addResource(1, val);
		}
	};
};
