let url ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c'

const main = document.querySelector('.main');
let input = document.getElementById('input-search')
let form = document.getElementById('form')
const x = document.querySelector('.x');
	// console.log(input)
	// console.log(input.attributes.placeholder.textContent)


form.addEventListener('submit', function dd (event) {
	event.preventDefault()
	getInputValue();
	//clearInputValue()
})

input.addEventListener('keydown', function(e) {
   if (e.keyCode === 13 && this.value == '') {
   	document.location.reload();
   }
});

input.addEventListener('mouseenter', function(event) {
   event.target.setAttribute('autocomplete', 'off')
});

// function setFocus(){
//    document.getElementById("name").focus();
// }
// setFocus()

x.addEventListener('click', () => {
	clearInputValue()
})
function getInputValue(event) {
	//event.preventDefault()
	let inputValue = input.value;
	//console.log(inputValue)
	url =`https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
	clearElements()
	//console.log('newUrl-',url)
	getData(url);
}
function clearInputValue(inputValue) {
	input.value = ''
	//console.log('inputValue')
	
}
//console.log('oldUrl-', url)
function clearElements() {
	//console.log('delete')
   main.innerHTML = '';
}
async function getData() {
	const res = await fetch(url);
	const data = await res.json();
	console.log('data-', data);
	// console.log('data.results-', data.results);
	// console.log('newUrl-',url)
	showData(data);
}
getData(url)

function showData(data) {
	data.results.map((item, i) => {
		//console.log('item-', item, i);
		let posterPath ; let altName ; let voteAverage; let overview; 
		posterPath = data.results[i].poster_path;
		altName =  data.results[i].original_title;
		voteAverage = data.results[i].vote_average;
		overview =  data.results[i].overview
		createMovieBlock(posterPath, altName, voteAverage, overview);
		//console.log('posterPath-', posterPath);
		//console.log('posterPath-', data.results[i].poster_path);

	})
}
function createMovieBlock(posterPath, altName, voteAverage, overview) {
	const movieBlock = document.createElement('div');
	movieBlock.classList.add('movie')
	main.append(movieBlock);

	const img = document.createElement('img');
	img.src = `https://image.tmdb.org/t/p/w1280${posterPath}`;
	img.alt = `${altName}`;
	movieBlock.append(img)	
	//console.log(img)

	const movieInfo = document.createElement('div');
	movieInfo.classList.add('movie-info');
	movieBlock.append(movieInfo)

	const titleMovieInfo = document.createElement('h3')
	movieInfo.append(titleMovieInfo)
	titleMovieInfo.textContent = `${altName}`

	const spanMovieInfo = document.createElement('span')
	movieInfo.append(spanMovieInfo)
	spanMovieInfo.textContent = `${voteAverage}`
	if(voteAverage < 5) {
		spanMovieInfo.classList.add('red')
	} else if (voteAverage >= 5 && voteAverage < 8) {
		spanMovieInfo.classList.add('orange')
	} else {
		spanMovieInfo.classList.add('green')
	}

	const overviewDiv = document.createElement('div')
	overviewDiv.classList.add('overview')
	movieBlock.append(overviewDiv)

	const overviewTitle = document.createElement('h3')
	overviewDiv.append(overviewTitle)
	overviewTitle.textContent = 'overview'

	const overviewText = document.createElement('p')
	overviewDiv.append(overviewText)
	overviewText.textContent = `${overview}`
}

