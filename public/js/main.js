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
		profillePage();
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
					password: pw.value,

				})
				.then((data) => {
					console.log('POST auth/login data', data);
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
				if (data.success) {
					window.location.href = '/login.html'
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

			for (const feed in accounts) {
				console.log(feed)

				const card = document.createElement('div');
				card.innerHTML = `
<div class="content">
				<div class="top">
					 <div class="left floated author">
					   	<img class="ui avatar image" src="http://assets.pokemon.com/assets/cms2/img/pokedex/full//722.png"> <b>Poke Boy </b>
					 </div>
					 <span class="right floated">
					  	 <button class="ui button">Unfollow</button>
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




	function postPage() {

		const validate = () => {
			throw new Error('This is a required arg');
		}; // validate

		const uploadFiles = (
			fileSelectSel = validate(),
			fileElemSel = validate(),
			onFileChanged = validate(),
			onClicked = validate()
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
				onClicked();
			});

			// change handler for fileSelect
			fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
		} // uploadFiles

		const config = {
			apiKey: "AIzaSyAHWq2DXh2OFoRXYor72qocaNAhJZZuBGc",
			authDomain: "instaclone-f8c2e.firebaseapp.com",
			databaseURL: "https://instaclone-f8c2e.firebaseio.com",
			projectId: "instaclone-f8c2e",
			storageBucket: "instaclone-f8c2e.appspot.com",
			messagingSenderId: "21242011021"
		};
		const FILE_STORAGE_REF = 'images';

		// initialize firebase
		firebase.initializeApp(config);
		// Get a reference to the storage service, which is used to create references in your storage bucket
		const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

		let filesToUpload = [];

		uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
			filesToUpload = filesToUpload.concat(Array.from(files));
			console.log(filesToUpload)
		}, () => {
			if (!storageRef) {
				throw new Error('Storage Ref not set!');
			}
			const fileUploads = filesToUpload.map((currFile) => {
				// we store the name of the file as a storage ref
				const fileRef = storageRef.child(currFile.name);
				// we return a promise where we first "put" or upload the file
				// and then once the upload is complete, we return promise with
				// download URL string of the file we uploaded
				return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
			});

			Promise.all(fileUploads).then((items) => {
				console.log(items);
				filesToUpload = [];
			});
		}); // upload files
		// add new post
		const caption = document.querySelector('.js-adm-caption');
		const addbtn = document.querySelector('.js-adm-btn');

		addbtn.addEventListener('click', (e) => {
			e.preventDefault();

			// add post to activity feed for user
			instaApp.createPost(1); // or something
		});

		// render 	
		function render(data) {
			const user = data["user"];
			const container = document.querySelector('.js-feed');
			container.innerHTML = '';
			// user = user.reverse(); 
			console.log('postItems :', user);
			// more likely for (const user of users) {
			// replace( (postItem: user), (postItems: users) )
			for (const postItem of user) {
				console.log('single :', postItem);
				// 
				const div = document.createElement('div');
				div.classList.add('ui', 'centered', 'card', `js-post-item-${postItem.id}`);
				// need vars for: image url, caption, commenter_id, commenter_comment
				const img_url = postItem.image_url;
				const caption = postItem.descr;
				const name = postItem.first_name;
				// const time = moment(postItem.TimeStamp).format('dddd, MMMM DD, YYYY h:mm a');
				const time = moment(postItem.TimeStamp).format('dddd, MMMM DD, YYYY h:mm a');

				// const comm_id = 
				// const comm_comment = 
				div.innerHTML = `
<div class="content">
    <div class="right floated meta">14h ${time}</div>
    <img class="ui avatar image" src="../assets/puppy.jpg"> ${name}
  </div>
  <div class="image">
    <img src=${img_url}>
  </div>
  <div class="content">
  	<div class="caption">
      ${caption}
    </div>
    <span class="right floated">
      <i class="heart outline red icon js-heart"></i>
      <!-- 17 likes -->
    </span>
  <!--   <i class="comment icon"></i>
    3 comments -->
  </div>
   <div class="extra content">
    <div class="ui large transparent left icon input">
      <i class="comment icon"></i>
      <input placeholder="Add Comment..." type="text" class="js-adm-comment">
    </div>
      <div class="extra content">
      <span class="right floated mods">
      	<i class="edit icon"></i>
	    <i class="trash outline icon"></i>
	  </span>  
	</div>
  </div>
</div> 
	
		    `; // end div.innerHTML

				container.appendChild(div);

				//need to isolate proper element
				//    if (postItem.data.isLiked) {
				// 	li.innerHTML += `<span class="glyphicon glyphicon-heart js-like"></span>`
				// }
				// else {
				// 	li.innerHTML += `<span class="glyphicon glyphicon-heart-empty js-like"></span>`
				// }

			} // for /of loop

		} // render()

		GET('/api/user/2')
			.then((data) => {
				render(data);
			});


		// add comment
		const comm_input = document.querySelector('.js-adm-comment');

		// comm_input.addEventListener('keydown', (e) => {
		// 	const {value} = comm_input;
		// 	if (e.keyCode === 13) {
		// 		validateSearch(value)
		// 		.then((data) => {
		// 			PUT('/api/ comment route') // needs add comm route	
		// 			.then((data) => {
		// 				render(data);
		// 			})
		// 			.catch((e) => {
		// 				alert(e)
		// 			})
		// 		})


		// 	} 
		// keycode
		// }); 
		// comm_input eventListener // add comment

		// need to be targeted with post i or something.
		// otherwise only grabs first icon in thread.

		// toggle heart for likes
		// const heart = document.querySelector('.js-heart');
		// heart.addEventListener('click', (e) => {
		// 	e.preventDefault();
		// 	// heart.classList.add('red', 'js-red-heart');
		// 	// heart.classList.remove('outline', 'js-empty-heart');
		// 	heart.classList.toggle('outline');
		// });

		const signout = document.querySelector('.js-logout');
		signout.addEventListener('click', (e) => {
			e.preventDefault();
			logout();
		});


	};



	function logout() {
		GET('/auth/logout')
			.then((data) => {
				console.log('logout data :', data);
				localStorage.setItem('user_id', null);
				window.location.href = '/'
			})
	};


})();