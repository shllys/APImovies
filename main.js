// carrusel de películas
const left_btn = document.querySelector(".left");
const right_btn = document.querySelector(".right");
const cards = document.querySelector(".cards");

left_btn.addEventListener("click", () => {
  cards.scrollLeft -= 140;
});
right_btn.addEventListener("click", () => {
  cards.scrollLeft += 140;
});

// Consumir Api de películas populares
async function getMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=5e555ab6b86fb20344eaadf3092e5c91"
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log(data.results);
      let movies = "";
      data.results.forEach((movie) => {
        movies += `
        <a href="#" class="card">  
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="rest_card">
              <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="">
              <div class="cont">
                <h4>${movie.title}</h4>
                <div class="sub">
                  <p>${movie.genre_ids}, ${movie.release_date}</p>
                </div>
              </div>
            </div>
          </a>
          `;
          document.querySelector('.cards').innerHTML = movies;
      });
      // Agregando información de video principal
      document.querySelector('.title').innerText = data.results[0].title;
      document.querySelector('.description').innerText = data.results[0].overview;
      document.querySelector('.fecha').innerText = data.results[0].release_date;
      ;

      // Agregando lista de películas en el buscador
      let cont_search = ""
      data.results.forEach((search) => {
        cont_search += `
          <a href="#" class="card-list">
              <img src="https://image.tmdb.org/t/p/w500/${search.poster_path}" alt="" />
              <div class="cont">
                <h3>${search.title}</h3>
                <p>${search.release_date}</p>
              </div>
            </a>
          `;
          const list = document.querySelector('.search-list').innerHTML = cont_search;
      });

      // Función de búsqueda
      

    }

  } catch (error) {
    console.log("Error al obtener las películas");
  }
}
getMovies();
