
(function() { // protect the lemmings
    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET

	
	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function DELETE(url, data) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('DELETE', url);
		request.setRequestHeader('Content-Type', 'application/json');

		request.onload = () => {
			const data = JSON.parse(request.responseText);
			resolve(data)
		}; 
		request.onerror = (err) => {
			reject(err)
		};

		request.send(JSON.stringify(data));
	});
} // DELETE


 // Taking login and Password input value and sending it to DB using API routes
document.querySelector('.js-submit').addEventListener('click', (e) => {
		e.preventDefault();
		console.log(1)
		const login = document.querySelector('.js-login');
		const password = document.querySelector('.js-password');
		login.setAttribute('disabled', 'disabled');
		password.setAttribute('disabled', 'disabled');
        console.log(login.value);
        console.log(password.value);
		POST('/api/users', {
			login: login.value,
			password: password.value,
		
		}).then((data) => {
			login.removeAttribute('disabled');
			login.value = '';
			password.removeAttribute('disabled');
			password.value = '';
			render(data);
			console.log(data);
		});

		
	});




























})();