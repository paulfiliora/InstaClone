
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
function indexPage(){
 	document.querySelector('.js-submit').addEventListener('click', (e) => {
			e.preventDefault();
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

			});
			
		});
}

 // getting user sign up information and sending it to DB
 function signupPage (){
	document.querySelector('.js-submit-signup').addEventListener('click', (e) => {
			e.preventDefault();
			const loginSignup = document.querySelector('.js-login-signup');
			const passwordSignup = document.querySelector('.js-password-signup');
			const emailSignup = document.querySelector('.js-email-signup');
			loginSignup.setAttribute('disabled', 'disabled');
			passwordSignup.setAttribute('disabled', 'disabled');
			emailSignup.setAttribute('disabled', 'disabled');
	        console.log(loginSignup.value);
	        console.log(passwordSignup.value);
	        console.log(emailSignup.value);
			POST('/api/users', {
				loginSignup: loginSignup.value,
				passwordSignup: passwordSignup.value,
				emailSignup: emailSignup.value,

			
			}).then((data) => {
				loginSignup.removeAttribute('disabled');
				loginSignup.value = '';
				passwordSignup.removeAttribute('disabled');
				passwordSignup.value = '';
				emailSignup.removeAttribute('disabled');
				emailSignup.value = '';
				render(data);

			});
			
	});
}








//  Checking if you are on that page after that running the page function


if (document.querySelector('.index-page') !== null) {
	indexPage();
}
if (document.querySelector('.signup-page') !== null) {
	signupPage();
}
if (document.querySelector('.profille-page') !== null) {
	profillePage();
}
if (document.querySelector('.home-page') !== null) {
	homePage();
}
if (document.querySelector('.users-page') !== null) {
	usersPage();
}












})();