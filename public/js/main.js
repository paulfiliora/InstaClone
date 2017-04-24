(function () { // protect the lemmings
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
	if (document.querySelector('.profile-page') !== null) {
		profilePage();
	}
	if (document.querySelector('.home-page') !== null) {
		homePage();
	}
	if (document.querySelector('.users-page') !== null) {
		usersPage();
	}


	// Taking login and Password input value and sending it to DB using API routes
	function indexPage() {

		const submit = document.querySelector('.js-submit')
		submit.addEventListener('click', (e) => {
			e.preventDefault();
			submit.setAttribute('disabled', 'disabled');
			const login = document.querySelector('.js-login');
			const password = document.querySelector('.js-password');
			login.setAttribute('disabled', 'disabled');
			password.setAttribute('disabled', 'disabled');
			POST('/auth/login', {
				email: login.value,
				password: password.value,

			}).then((data) => {
				console.log('data', data);
				if (data.success = true) {
					window.location.href = '/home.html'
				} else {
					window.location.href = '/index.html'
				}
				login.removeAttribute('disabled');
				login.value = '';
				password.removeAttribute('disabled');
				password.value = '';
				submit.removeAttribute('disabled');
				// render(data);
			})
		});
	}

	// getting user sign up information and sending it to DB
	function signupPage() {
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
	function homePage() {
		GET('/api/3/followedusers')
			.then((posts) => {
				renderFeed(posts);
			});

		function renderFeed(posts) {

			const container = document.querySelector('.js-main');
			container.innerHTML = "";

			for (const feed of posts.followed_users) {
				const card = document.createElement('div');
				card.innerHTML = `
  <div class="content">
    <div class="right floated meta">${feed.Timestamp.split(' ',1)}</div>
    <img class="ui avatar image" src="${feed.profile_pic}"> ${feed.user_fname}
  </div>
  <div class="image">
    <img src="${feed.image}">
  </div>
  <div class="content">
  	<div class="description">
	${feed.description}
	</div>
	</br>
    <span class="right floated">
      <i class="heart outline like icon"></i>
      17 likes
    </span>
    <i class="comment icon"></i>
    3 comments
  </div>
  <div class="extra content">
    <div class="ui large transparent left icon input">
      <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment...">
    </div>
  </div>`;
				card.classList.add('ui', 'card')
				container.appendChild(card);
			}
		}
	}

	// getting user sign up information and sending it to DB
	function usersPage() {
		GET('/api/users')
			.then((posts) => {
				renderFeed(posts);
			});

		function renderFeed(posts) {
			const accounts = posts.users
			const preview = accounts.reduce((hash, users) => Object.assign(
				hash, {
					[users.id]: (hash[users.id] || []).concat([users])
				}
			), {})

console.log(preview)
console.log(accounts)

			const container = document.querySelector('.js-main');
			container.innerHTML = "";

			for (const feed of accounts) {
				console.log(feed)

				const card = document.createElement('div');
				card.innerHTML = `
<div class="content">
				<div class="top">
					 <div class="left floated author">
					   	<img class="ui avatar image" src="http://assets.pokemon.com/assets/cms2/img/pokedex/full//722.png"> <b>Poke Boy </b>
					 </div>
					 <span class="right floated">
					  	 <button class="ui button">follow</button>
					 </span>
				</div>
				<br><br>
				<div class="ui divider"></div>
				<div class="usersPhtoto">
					<div class="ui three doubling cards">
					  <div class="card">
					    <div class="image">
					      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full//722.png">
					    </div>
					  </div>
					  <div class="card">
					    <div class="image">
					      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full//722.png">
					    </div>
					  </div>
					  <div class="card">
					    <div class="image">
					      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full//722.png">
					    </div>
					  </div>
					</div>
				</div>			     
			</div>`;
				card.classList.add('ui', 'card')
				container.appendChild(card);
			}
		}
	}

function profilePage()  {

		GET('/api/user/1')
			.then((posts) => {
				renderFeed(posts);

			});


		function renderFeed(posts) {

			// const main = document.querySelector('.js-main');
			// main.innerHTML = "";

			// const profileHead = document.querySelector('.js-uicard')
			// profileHead.innerHTML = "";


			const container = document.querySelector('.js-card');
			// container.innerHTML = "";

				

			for (const feed of posts.user) {
            console.log(feed);


//             const header = document.createElement('div');
//             header.classList.add('center', 'extra', 'content');	
// 			header.innerHTML = `
//   <h2 class="ui header">
//   <img src="${feed.profile_pic}" class="ui circular image">
//    <span> ${feed.firstName} ${feed.lastName}</span>
//   </h2>
// `;
// 			profileHead.appendChild(header);
//             main.appendChild(profileHead);


		// adding posts and description to profile page inside of ui three stackable cards.
				const card = document.createElement('div');
				card.classList.add('card')

				const fullName = `${feed.firstName} ${feed.lastName}`;
				card.innerHTML = `
<div class="image" width="150px" height="150px";>
	<img src="${feed.image}">
</div>
<div class="content">
	<a class="header">${fullName}</a>
<div class="meta">
	<span class="date">${feed.timestamp}</span>
</div>
<div class="description">
	${feed.description};
</div>
`;
									
						container.appendChild(card);
						// main.appendChild(container);
						
				


			}
		}
	}
  	






















})();