function createNote() {
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
}

function createBlueprint() {
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
	var container = document.createElement('div');
	var idea = document.createElement('textarea');
	idea.classList.add('idea');
	idea.placeholder = 'Write down your idea here.';
	container.appendChild(idea);
	var left = document.createElement('div');
	left.classList.add('left');
	var left_title = document.createElement('h1');
	left_title.innerHTML = 'Draw Your Idea Here';
	left.appendChild(left_title);
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
	left.appendChild(canvas);
	container.appendChild(left);
	var right = document.createElement('div');
	right.classList.add('right');
	var right_title = document.createElement('h1');
	right_title.innerHTML = 'What might go wrong, and what I will do.';
	right.appendChild(right_title);
	var lst = document.createElement('ul');
	right.appendChild(lst);
	var lst_btn = document.createElement('button');
	lst_btn.innerHTML = '+';
	lst_btn.onclick = function() {
		var lst_item = document.createElement('li');
		var left_text = document.createElement('textarea');
		left_text.classList.add('left');
		left_text.placeholder = 'What might go wrong.';
		var right_text = document.createElement('textarea');
		right_text.classList.add('right');
		right_text.placeholder = 'My plan of action.'
		var lst_item_btn = document.createElement('button');
		lst_item_btn.innerHTML = 'X';
		lst_item_btn.onclick = function() {
			this.parentElement.parentElement.removeChild(this.parentElement);
		};
		lst_item.appendChild(left_text);
		lst_item.appendChild(right_text);
		lst_item.appendChild(lst_item_btn);
		lst.appendChild(lst_item);
	};
	right.appendChild(lst_btn);
	container.appendChild(right);
	blueprint.appendChild(container);
	return blueprint;
}

window.onload = function() {
	var notes = document.getElementById('notes');
	var blueprints = document.getElementById('blueprints');
	var resources_assessment = document.getElementById('resources-assessment');

	(function() {
		[...document.getElementsByClassName('article-title')].forEach(function(v) {
			v.onclick = function() {
				if(this.parentElement.classList.contains('active')) {
					this.parentElement.classList.remove('active');
				}
				else {
					this.parentElement.classList.add('active');
				}
			};
		});
	})();

	(function() {
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
		};

		document.getElementById('secondary-accent').onkeydown = function(ev) {
			if(ev.keyCode === 13) {
				ev.preventDefault();
				var value = ev.target.value || '#284B63';
				document.body.style.setProperty('--secondary-accent', value);
				document.body.style.setProperty('--secondary-accent-1', add(value));
			}
		};

		document.getElementById('tertiary-accent').onkeydown = function(ev) {
			if(ev.keyCode === 13) {
				ev.preventDefault();
				var value = ev.target.value || '#ECECEC';
				document.body.style.setProperty('--tertiary-accent', value);
			}
		};

		document.getElementById('primary-text-color').onkeydown = function(ev) {
			if(ev.keyCode === 13) {
				ev.preventDefault();
				var value = ev.target.value || '#FFFFFF';
				document.body.style.setProperty('--primary-text-color', value);
			}
		};

		document.getElementById('background-color').onkeydown = function(ev) {
			if(ev.keyCode === 13) {
				ev.preventDefault();
				var value = ev.target.value || '#353535';
				document.body.style.setProperty('--background-color', value);
			}
		};
	})();

	(function() {
		document.getElementById('go').onclick = function() {
			document.getElementById('home').classList.remove('active');
			document.getElementById('dashboard').classList.add('active');
		};

		document.getElementById('whatisalphabetatester').onclick = function(ev) {
			document.getElementById('home').classList.remove('active');
			document.getElementById('about').classList.add('active');
		};

		document.getElementById('back').onclick = function(ev) {
			document.getElementById('about').classList.remove('active');
			document.getElementById('home').classList.add('active');
		};
	})();

	(function() {
		function updateClock() {
			var hours = new Date().getHours();
			if(hours > 12) { hours -= 12; }
			var minutes = new Date().getMinutes();
			if(minutes < 10) { minutes = '0' + minutes; }
			document.getElementById('clock').innerHTML = hours + ':' + minutes;
		}

		updateClock();
		setInterval(updateClock, 1000);
	})();

	(function() {
		function updateMotivationalQuote() {
			var quotes = [
				'You can do it!',
				'You\'re the (wo)man!',
				'Never give up!',
				'You\'re doing great!',
				'Nobody else can do it like you!',
				'My (wo)man!'
			];
			document.getElementById('motivational-quote-generator').children[1].innerHTML =
				'"' + quotes[Math.random() * quotes.length | 0] + '"';
		}
		updateMotivationalQuote();
		document.getElementById('motivational-quote-generator').onclick = updateMotivationalQuote;
	})();

	(function() {
		document.getElementById('add-note').onclick = function(ev) {
			notes.insertBefore(createNote(), document.getElementById('add-note'));
		};

		document.getElementById('add-blueprint').onclick = function(ev) {
			blueprints.insertBefore(createBlueprint(), document.getElementById('add-blueprint'));
		};

		notes.children[0].onclick = function(ev) {
			if(notes.fullscreen) {
				notes.children[0].innerHTML = 'Notes (click to enlarge & use)';
				notes.style.width = 'calc(40vw - 20px)';
				notes.style.height = 'calc(30vh - 20px)';
				notes.fullscreen = false;
				notes.classList.remove('selected');
			}
			else {
				notes.children[0].innerHTML = 'Notes (click to close)';
				notes.style.width = 'calc(100vw - 20px)';
				notes.style.height = 'calc(100vh - 20px)';
				notes.fullscreen = true;
				notes.style.zIndex = 5;
				blueprints.style.zIndex = 1;
				notes.classList.add('selected');
			}
		};

		blueprints.children[0].onclick = function(ev) {
			if(blueprints.fullscreen) {
				blueprints.children[0].innerHTML = 'Blueprints (click to enlarge & use)';
				blueprints.style.left = '40vw';
				blueprints.style.top = '0vh';
				blueprints.style.width = 'calc(40vw - 20px)';
				blueprints.style.height = 'calc(30vh - 20px)';
				blueprints.classList.remove('selected');
				blueprints.fullscreen = false;
			}
			else {
				blueprints.children[0].innerHTML = 'Blueprints (click to close)';
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
	})();

	(function() {
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
	})();

	(function() {
		document.getElementById('save').onclick = function(ev) {
			// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
			var a = document.createElement('a');
			var json = {
				'name':document.getElementById('name').value || 'alpha-beta-project',
				'problem':document.getElementById('problem').children[1].value,
				'notes':[],
				'blueprints':[],
				'motivational-quote':document.getElementById('motivational-quote-generator').children[1].innerHTML,
				'resources-assessment':{
					'what-i-have':[],
					'what-i-dont-have':[]
				},
				'settings':{
					'primary-accent':document.getElementById('primary-accent').value || '#2B5D60',
					'secondary-accent':document.getElementById('secondary-accent').value || '#284B63',
					'tertiary-accent':document.getElementById('tertiary-accent').value || '#ECECEC',
					'primary-text-color':document.getElementById('primary-text-color').value || '#FFFFFF',
					'background-color':document.getElementById('background-color').value || '#353535'
				}
			};
			for(var i=1;i<notes.children.length-1;i++) {
				json.notes.push(notes.children[i].children[2].value);
			}
			for(var i=1;i<blueprints.children.length-1;i++) {
				var premortem = [];
				for(var j=0;j<blueprints.children[i].children[2].children[2].children[1].children.length;j++) {
					premortem.push({
						'possibility':blueprints.children[i].children[2].children[2].children[1].children[j].children[0].value,
						'plan':blueprints.children[i].children[2].children[2].children[1].children[j].children[1].value
					});
				}
				json.blueprints.push({
					'name':blueprints.children[i].children[2].children[0].value,
					'canvas':blueprints.children[i].children[2].children[1].children[1].toDataURL('image/png'),
					'premortem':premortem
				});
			}
			for(var i=0;i<resources_assessment.children[1].children[1].length;i++) {
				json['resources-assessment']['what-i-have'].push(resources_assessment.children[1].children[1].children[i].children[0].value);
			}
			for(var i=0;i<resources_assessment.children[2].children[1].length;i++) {
				json['resources-assessment']['what-i-dont-have'].push(resources_assessment.children[2].children[1].children[i].children[0].value);
			}
			a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
			a.setAttribute('download', json.name + '.json');
			a.style.display = 'none';
			document.body.appendChild(a); a.click(); document.body.removeChild(a);
		};

		document.getElementById('load').onclick = function(ev) { document.getElementById('load_hidden').click(); }
		document.getElementById('load_hidden').onchange = function(ev) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var json = JSON.parse(e.target.result);
				document.getElementById('name').value = json.name;
				if(json.problem) {
					document.getElementById('problem').children[1].value = json.problem;
				}
				while(notes.children.length - 2 < json.notes.length) {
					notes.insertBefore(createNote(), document.getElementById('add-note'));
				}
				for(var i=0;i<json.notes.length;i++) {
					notes.children[i + 1].children[2].value = json.notes[i];
				}
				while(blueprints.children.length - 2 < json.blueprints.length) {
					blueprints.insertBefore(createBlueprint(), document.getElementById('add-blueprint'));
				}
				blueprints = document.getElementById('blueprints');
				for(var i=0;i<json.blueprints.length;i++) {
					blueprints.children[i + 1].children[2].children[0].value = json.blueprints[i].name;
					var img = new Image();
					img.src = json.blueprints[i].canvas;
					img.onload = function() {
						blueprints.children[i + 1].children[2].children[1].children[1]._context.drawImage(img, 0, 0,
							blueprints.children[i + 1].children[2].children[1].children[1].width, blueprints.children[i + 1].children[2].children[1].children[1].height);
					};
					while(blueprints.children[i + 1].children[2].children[2].children[1].firstChild) {
						blueprints.children[i + 1].children[2].children[2].children[1].removeChild(blueprints.children[i + 1].children[2].children[2].children[1].firstChild);
					}
					for(var j=0;j<json.blueprints[i].premortem.length;j++) {
						var li = document.createElement('li');
						var left = document.createElement('textarea');
						left.classList.add('left');
						left.placeholder = 'What might go wrong.';
						left.value = json.blueprints[i].premortem[j].possibility;
						li.appendChild(left);
						var right = document.createElement('textarea');
						right.classList.add('right');
						right.placeholder = 'My plan of action.';
						right.value = json.blueprints[i].premortem[j].plan;
						li.appendChild(right);
						var btn = document.createElement('button');
						btn.innerHTML = 'X';
						btn.onclick = function() { this.parentElement.parentElement.removeChild(this.parentElement); }
						li.appendChild(btn);
						blueprints.children[i + 1].children[2].children[2].children[1].appendChild(li);
					}
				}
				for(var i=0;i<json['resources-assessment']['what-i-have'].length;i++) {
					resources_assessment.children[1].children[1].children[i].children[0].innerHTML = json['resources-assessment']['what-i-have'][i];
				}
				for(var i=0;i<json['resources-assessment']['what-i-dont-have'].length;i++) {
					resources_assessment.children[2].children[1].children[i].children[0].innerHTML = json['resources-assessment']['what-i-dont-have'][i];
				}

				document.getElementById('motivational-quote-generator').children[1].innerHTML = json['motivational-quote'];
				(function() {
					var value2 = json['settings']['primary-accent'];
					value2 = isHex(value2) ? value2 : '#2B5D60';
					var value1 = add(value2);
					var value0 = add(value1);
					var value3 = sub(value2);
					var value4 = sub(value3);
					document.body.style.setProperty('--primary-accent', value0);
					document.body.style.setProperty('--primary-accent-1', value1);
					document.body.style.setProperty('--primary-accent-2', value2);
					document.body.style.setProperty('--primary-accent-3', value3);
					document.body.style.setProperty('--primary-accent-4', value4);
				})();

				(function() {
					var value = json['settings']['secondary-accent'];
					value = isHex(value) ? value : '#284B63';
					document.body.style.setProperty('--secondary-accent', value);
					document.body.style.setProperty('--secondary-accent-1', add(value));
				})();

				(function() {
					var value = json['settings']['tertiary-accent'];
					value = isHex(value) ? value : '#ECECEC';
					document.body.style.setProperty('--tertiary-accent', value);
				})();

				(function() {
					var value = json['settings']['primary-text-color'];
					value = isHex(value) ? value : '#FFFFFF';
					document.body.style.setProperty('--primary-text-color', value);
				})();

				(function() {
					var value = json['settings']['background-color'];
					value = isHex(value) ? value : '#353535';
					document.body.style.setProperty('--background-color', value);
				})();
			}
			reader.readAsText(ev.target.files[0]);
		};
	})();
};
