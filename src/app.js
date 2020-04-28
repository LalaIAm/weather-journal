// Personal API Key for OpenWeatherMap API
const apiKey = '59017cf56aaf56236b4daebe80d5c516';

const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Global Variables;
const zip = document.getElementById('zip');
const input = document.getElementById('feelings');
const generate = document.getElementById('generate');

// Helper functions
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const kelvinToF = (temp) => {
	const t = ((temp - 273.15) * 9) / 5 + 32;
	return Math.round(t);
};

/* Function to GET Web API Data*/

const getWeather = async (zip) => {
	const options = {
		method: 'GET',
		redirect: 'follow',
	};

	return fetch(`${url}${zip}&appid=${apiKey}`, options)
		.then((response) => response.json())
		.then((result) => {
			return result;
		})
		.catch((error) => console.log('error', error));
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
	console.log(data);
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		console.log(`new data: ${newData}`);
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

/* Function to GET Project Data */
const getData = async (url = '') => {
	const request = await fetch(url);

	try {
		const response = await request.json();
		console.log('response', response);
	} catch (error) {
		console.log(error);
	}
};

/* Function called by event listener */
const performAction = (e) => {
	const zipCode = zip.value;
	const userInput = input.value;

	getWeather(zipCode).then((data) => {
		let tempK = data.main.temp;
		let temp = kelvinToF(tempK);
		postData('/info', { temp: temp, input: userInput, date: newDate });

		updateUI();
	});
};

generate.addEventListener('click', performAction)

const updateUI = async () => {
	const request = await fetch('/all');
	try {
		const allData = await request.json()
		console.log('all data', allData);
		document.getElementById('temp-input').innerHTML = 'The temperature was: ' + allData.temp;
		document.getElementById('content-input').innerHTML = 'How were you doing: ' + allData.input;
		document.getElementById('date-input').innerHTML = 'The date was: ' + allData.date;
	} catch (error) {
		console.log('error', error);
	}
};
