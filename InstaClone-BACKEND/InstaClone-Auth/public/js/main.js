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
	if (document.querySelector('.addPost-page') !== null) {
		postPage();
	}


	function indexPage() {
		const email = document.querySelector('.js-login');
		const pw = document.querySelector('.js-password');
		const btn = document.querySelector('.js-submit')

		btn.addEventListener('click', (e) => {
			e.preventDefault();

			POST('/auth/login', {
					email: email.value,
					password: pw.value
				})
				.then((data) => {
					// console.log('POST auth/login data', data);
					localStorage.setItem('user_id', data.id)
					if (data.success) {
						window.location.href = '/home.html'
					}

				})
		}) // event listener
	}

	// getting user sign up information and sending it to DB
	function signupPage() {
		const btn = document.querySelector('.js-submit-signup');

		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const fname = document.querySelector('.js-fName-signup').value;
			const lname = document.querySelector('.js-lName-signup').value;
			const email = document.querySelector('.js-email-signup').value;
			const pw = document.querySelector('.js-password-signup').value;

			POST('/auth/register', {
				first_name: fname,
				last_name: lname,
				email: email,
				password: pw
			}).then((data) => {
				// console.log(data)
				if (data.success) {
					window.location.href = '/index.html'
				}
			});
		})
	} // event listener


	// getting user sign up information and sending it to DB
	function homePage() {
		const userId = localStorage.getItem('user_id')
		GET('/api/' + userId + '/followedusers')
			.then((posts) => {
				renderFeed(posts);
			});

		function renderFeed(posts) {

			const container = document.querySelector('.js-main');
			container.innerHTML = "";
			// timestamp
			// .split(' ',1)
			for (const feed of posts.followed_users) {
				const card = document.createElement('div');
				card.innerHTML = `
  <div class="content">
    <div class="right floated meta">${feed.timestamp}</div>
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
		const userId = localStorage.getItem('user_id')
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

			// console.log(preview)
			// console.log(accounts)

			const container = document.querySelector('.js-main');
			container.innerHTML = "";

			for (const feed in preview) {
				if (preview.hasOwnProperty(feed)) {
					const userRows = preview[feed]
					// console.log(userRows)
					// console.log(userRows[0].id)

					const followed_id = userRows[0].id

					// need logic for the follow button to say unfollow if already followed. 
					const card = document.createElement('div');
					card.innerHTML = `
<div class="content">
	<div class="top">
		 <div class="left floated author">
		   	<img class="ui avatar image" src="${userRows[0].profilePic}"> <b class="js-userName">${userRows[0].firstName} </b>
		 </div>
		 <span class="right floated">
		  	 <button class="ui button js-follow-button">Follow</button>
		 </span>
	</div>
	<br><br>
	<div class="ui divider"></div>
	<div class="usersPhoto">
		<div class="ui three doubling cards">
		  <div class="card">
		    <div class="image imagesCard">
		      <img class="image userimg" src="${userRows[0].image}">
		    </div>
		  </div>
		  <div class="card">
		    <div class="image imagesCard">
		      <img class="image userimg" src="${userRows[1].image}">
		    </div>
		  </div>
		  <div class="card">
		    <div class="image imagesCard">
		      <img class="image userimg" src="${userRows[2].image}">
		    </div>
		  </div>
		</div>
	</div>			     
</div>`;
					card.classList.add('ui', 'card');
					container.appendChild(card);

					card.querySelector('.js-follow-button').addEventListener('click', (e) => {
						POST('/api/' + userId + '/follow/' + followed_id, {
							//add here code for switching string in follow
						})
					});

					card.querySelector('.js-userName').addEventListener('click', (e) => {
						renderUser()
					});


					//try putting the location.hash for an individual page
					//button.query -> #userprofile/u_id
					//location.hash clears container => renders user.
					function renderUser() {
						GET('/api/user/' + followed_id)
							.then((posts) => {
								renderFeed(posts);
							});

						function renderFeed(posts) {
							const container = document.querySelector('.js-main');
							container.innerHTML = '';
							const userSection = document.createElement('div');
							container.appendChild(userSection);
			userSection.innerHTML = `
<div class="ui two column centered grid">
  <div class="column userAvatarSection">
	<img class="ui avatar small image" src="${posts.user[0].profile_pic}">
	<span class="userAvatarText">${posts.user[0].firstName} ${posts.user[0].lastName}</span>
	<span class="right floated">
		 <button class="ui button js-follow-button">Follow</button>
	</span>
  </div>
</div>
<div class="ui three stackable cards js-stackable"></div>`;

							const userContainer = document.querySelector('.js-stackable');

							for (const post of posts.user) {
								const card = document.createElement('div');
								card.innerHTML = `
	<div class="image imagesCard">
		<img class="userimg" src="${post.image}">
	</div>
        `;
								card.classList.add('card')
								userContainer.appendChild(card);
							}
						}
					}
				}
			}
		}
	}

	// adding profile page function 
	function profilePage() {
		const userId = localStorage.getItem('user_id')
		GET('/api/user/' + userId)
			.then((posts) => {
				renderFeed(posts);
			});

		function renderFeed(posts) {
			console.log(posts)

			const mainContainer = document.querySelector('.main');
			mainContainer.innerHTML = `
<div class="ui two column centered grid">
  <div class="column userAvatarSection">
	<img class="ui avatar small image" src="${posts.user[0].profile_pic}">
	<span class="userAvatarText">${posts.user[0].firstName} ${posts.user[0].lastName}</span>
	<span class="right floated userAvatarText">
		 <button class="ui button js-follow-button">Follow</button>
	</span>
  </div>
</div>
<div class="ui three stackable cards js-stackable"></div>`;

			const container = document.querySelector('.js-stackable');
			container.innerHTML = '';

			for (const post of posts.user) {
				const card = document.createElement('div');
				card.innerHTML = `
<div class="image imagesCard">
    <img class="userimg" src="${post.image}">
</div>
        `;
				card.classList.add('card')
				container.appendChild(card);

			}
		}
	}


	function postPage() {
		const userId = localStorage.getItem('user_id')

		const validate = () => {
			throw new Error('This is a required arg');
		}; // validate

		const uploadFiles = (
			fileSelectSel = validate(),
			fileElemSel = validate(),
			onFileChanged = validate()
		) => {
			// select anchor tag and file input
			const fileSelect = document.querySelector(fileSelectSel);
			const fileElem = document.querySelector(fileElemSel);

			if (fileSelect === null || fileElem === null) {
				throw new Error('Required DOM elements not found by querySelector');
			}

			// click handler for fileElem
			fileSelect.addEventListener('click', (e) => {
				e.preventDefault();
				fileElem && fileElem.click();
			});

			// change handler for fileSelect
			fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
		} // uploadFiles


		// Initialize Firebase
		const config = {
			apiKey: "AIzaSyAHWq2DXh2OFoRXYor72qocaNAhJZZuBGc",
			authDomain: "instaclone-f8c2e.firebaseapp.com",
			databaseURL: "https://instaclone-f8c2e.firebaseio.com",
			projectId: "instaclone-f8c2e",
			storageBucket: "instaclone-f8c2e.appspot.com",
			messagingSenderId: "21242011021"
		};
		// Name of file storage ref "folder"
		const FILE_STORAGE_REF = 'images';

		// initialize firebase
		firebase.initializeApp(config);
		// Get a reference to the storage service, which is used to create references in your storage bucket
		const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);
		let imageURL = []

		uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
			if (!storageRef) {
				throw new Error('Storage Ref not set!');
			}
			const fileUploads = Array.from(files).map((currFile) => {
				// we store the name of the file as a storage ref
				const fileRef = storageRef.child(currFile.name);
				// we return a promise where we first "put" or upload the file
				// and then once the upload is complete, we return promise with
				// download URL string of the file we uploaded
				return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
			});

			Promise.all(fileUploads).then((items) => {
				// console.log(items);
				imageURL = items[0]
			});
		}); // upload files

		// console.log(imageURL)
		// add new post

		const createPost = () => {
			const description = document.querySelector('.js-description');

			description.setAttribute('disabled', 'disabled');
			POST('/api/' + userId + '/post', {
				descr: description.value,
				image_url: imageURL
			}).then((data) => {
				// console.log(data)
				description.removeAttribute('disabled');
				description.value = '';
			});
		}


		document.querySelector('.js-createPost').addEventListener('click', (e) => {
			e.preventDefault();
			createPost()
		});

	};

	const signout = document.querySelector('.js-logout');
	signout.addEventListener('click', (e) => {
		e.preventDefault();
		logout();
	});

	function logout() {
		GET('/auth/logout')
			.then((data) => {
				// console.log('logout data :', data);
				localStorage.setItem('user_id', null);
				window.location.href = '/'
			})
	};


})();