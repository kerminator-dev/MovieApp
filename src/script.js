"use strict"

// Константы для работы с API TheMovieDB
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const API_URL = BASE_URL + "/discover/movie/sort_by=popularity.desc&" + API_KEY;
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

// Константы для доступа к DOM элементам
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

let movies = getMovies(API_URL);
showMovies(movies);
search.addEventListener('input', updateValue);

// <summary>
// Событие: при изменении значения в строке поиска
// Живой поиск
// </summay>
// <param="e">event object</param>
function updateValue(e) {
    if (e.target.value) {
        // Запрос на сервер:
        // let searchResult = getMovies(SEARCH_URL + "&query=" + e.target.value);

        // Поиск среди локальных объектов
        let searchResult = SearchMovies(movies, e.target.value);
        showMovies(searchResult);
    }
    else {
        showMovies(movies);
    }
}

// <summary>
// Получить данные о фильмах
// </summay>
// <param="url">API url</param>
function getMovies(url) {
    // Здесь должно быть получение данных через API и вывод данных на экран
    /*
    fetch(url).then(res => res.json()).then(responce => {
        return responce;
    })
    */

    // Локальный объект из data.js
    return responce;
}

// <summary>
// Отобразить полученные данные о фильмах на body
// </summay>
// <param="data">Объект с данными о фильмах, полученный от TMDB API</param>
function showMovies(data) {
    main.innerHTML = '';
    data.results.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
        <link href="movies/${movie.id}">
        <img src="${movie.poster_path}" alt="Image">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="${getVoteColor(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${movie.overview}
        </div>
        </link>`;

        main.appendChild(movieElement);
    });
}

// <summary>
// Получить цвет оценки
// </summay>
// <param="voteValue">Оценка фильма - значение от 0 до 10</param>
function getVoteColor(voteValue) {
    if (voteValue >= 7) {
        return "green";
    }
    else if (voteValue >= 4) {
        return "orange";
    }
    else {
        return "red";
    }
}

// <summary>
// Найти фильмы
// </summay>
// <param="voteValue">Оценка фильма - значение от 0 до 10</param>
function SearchMovies(movies, searchMovieName)
{
    let resultData = {
        page: movies.page,
        results: []
    }

    for (let movie of movies.results) {
        if (movie.title.toLowerCase().includes(searchMovieName.toLowerCase())) {
            resultData.results.push(movie)
        }
    }

    return resultData;
}