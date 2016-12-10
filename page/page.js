const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const slider = document.querySelector('.toggle');
var randomBackground = false;

function setDate() {
	const now = new Date();

	const seconds = now.getSeconds();
	const secondsDegrees = ((seconds / 60) * 360) + 90;
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

	const mins = now.getMinutes();
	const minsDegrees = ((mins / 60) * 360) + 90;
	minsHand.style.transform = `rotate(${minsDegrees}deg)`;

	const hour = now.getHours();
	const hourDegrees = ((hour / 12) * 360) + 90;
	hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

function setBackground () {
	const doc = document.querySelector('html');

	if (!randomBackground) {
		doc.style.background = '#018DED url(./offline.png)';
		doc.style.backgroundSize = 'cover';
		return;
	}

	const width = window.innerWidth;
	const height = window.innerHeight;
	const url = 'https://source.unsplash.com/category/nature/' + width + 'x' + height;

	doc.style.background = `url(${url})`;
}

function updateSettings () {
	randomBackground = slider.checked;
	chrome.storage.sync.set({'randombackground': randomBackground}, function () {
		setBackground();
		chrome.storage.sync.get("randombackground", function (obj) {
			console.log(obj.randombackground);
		});
	});
}

function applySettings () {
	chrome.storage.sync.get("randombackground", function (obj) {
		if (obj == null) {
			randomBackground = true;
			slider.checked = true;
			setBackground();
		}
		else {
			randomBackground = obj.randombackground;
			slider.checked = randomBackground;
			setBackground();
		}
	});
}

function start () {
	// Start Clock
	setDate();
	setInterval(setDate, 1000); // Call setDate every second

	applySettings();

	slider.addEventListener('click', updateSettings);
}

start();

//applySettings();
