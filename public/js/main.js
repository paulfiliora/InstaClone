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
	} // PUT

	function DELETE(url, data = {}) {
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

	function initFeed() {

		GET('api/users')
			.then((posts) => {
				console.log(posts)
				// render(posts);
			});

		function render() {
			const container = document.querySelector('.js-feed');
			container.innerHTML = '';
			const div = document.createElement('div');
			// const postsReverse = posts.reverse();
			// for (const post of postsReverse) {
			div.innerHTML = `
				<div class="image">
					<img src="https://pp.userapi.com/c630020/v630020494/3907e/dOTEyY9D9wM.jpg">
				</div>
				<div class="content">
						<a class="header">Dzhama</a>
					<div class="meta">
						<span class="date">july 4 2016</span>
					</div>
					<div class="description">
						Independent's day selfie !
					</div>
				</div>
					`;
			div.classList.add("ui", "card")
			container.appendChild(div);
		};
	};
	// End of render on page load


	if (document.querySelector('.js-feed') !== null) {
		initFeed();
	}


})();