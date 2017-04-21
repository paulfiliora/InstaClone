
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






// Taking login and Password input value and sending it to DB using API routes
function indexPage(){
		
 		const submit = document.querySelector('.js-submit')
 			submit.addEventListener('click', (e) => {
			e.preventDefault();
			submit.setAttribute('disabled', 'disabled');
		const login = document.querySelector('.js-login');
		const password = document.querySelector('.js-password');
			login.setAttribute('disabled', 'disabled');
			password.setAttribute('disabled', 'disabled');
	        console.log(login.value);
	        console.log(password.value);
			POST('/auth/login', {
				email: login.value,
				password: password.value,
			
			}).then((data) => {
				login.removeAttribute('disabled');
				login.value = '';
				password.removeAttribute('disabled');
				password.value = '';
				submit.removeAttribute('disabled');
				render(data);

			});
			
		});
}

 // getting user sign up information and sending it to DB
 function signupPage (){
		const submitSignUp = document.querySelector('.js-submit-signup')
			submitSignUp.addEventListener('click', (e) => {
			e.preventDefault();
			submitSignUp.setAttribute('disabled', 'disabled');
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
				submit.removeAttribute('disabled');
				render(data);

			});
			
	});
}

 // getting user sign up information and sending it to DB
 function homePage (){
 	
 	const container = document.querySelector('.js-main');
		  container.innerHTML = "";
	
	const card = document.createElement('div');
	      card.classList.add('ui', 'card')
	      

	const image = document.createElement('div');
	      image.classList.add('image')
	      image.innerHTML = '<img src="https://pp.userapi.com/c630020/v630020494/3907e/dOTEyY9D9wM.jpg">';

	const content = document.createElement('div');
	      content.classList.add("content")
          content.innerHTML = `
								<a class="header">Dzhama</a>
								<div class="meta">
									<span class="date">july 4 2016</span>
								</div>
								<div class="description">
									Independent's day selfie !
								</div>
							
								 `;
		 container.appendChild(card);
		 card.appendChild(image);
		 card.appendChild(content);
	    
}




















})();