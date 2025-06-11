const movies = [
  { title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, duration: 148 },
  { title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, duration: 152 },
  { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, duration: 169 },
  { title: "Tenet", year: 2020, genre: "Sci-Fi", rating: 7.4, duration: 150 },
  { title: "Dunkirk", year: 2017, genre: "War", rating: 7.9, duration: 106 },
  { title: "The Prestige", year: 2006, genre: "Drama", rating: 8.5, duration: 130 },
];

//first task
let sortedByRating  = movies
.sort((a, b) => b.rating - a.rating)
// console.log(sortedByRating)

//second task
let moviesFilterBySciFi = movies.filter(movies => movies.genre == "Sci-Fi")
// console.log(moviesFilterBySciFi)

//third task
let moviesMapByInterstellar = movies.map(movies => `${movies.title} (${movies.year}) (${movies.duration}) mins `)
// console.log(moviesMapByInterstellar.)

//fourth task
let totalDuration = movies.reduce((sum, movie) =>sum + movie.duration ,0)
let average = totalDuration / movies.length
// console.log(average)

// fiveth task
let topMovie = movies.reduce((max, movie)=> (movie.rating> max.rating? movie : max), movies[0])
console.log(topMovie)


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async function fetchAndProcessProducts() {
  console.log("...loading");

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    // Filter products priced above $100
    const filtered = products.filter(product => product.price > 100);

    if (filtered.length === 0) {
      alert("No products found above $100");
      return;
    }

    // Map to "Title - $Price - Category"
    const mapped = filtered.map(product => 
      `${product.title} - $${product.price.toFixed(2)} - ${product.category}`
    );

    // Sort by price descending
    const sorted = filtered.sort((a, b) => b.price - a.price);

    console.log("Mapped and Sorted Products:");
    sorted.forEach(product =>
      console.log(`${product.title} - $${product.price.toFixed(2)} - ${product.category}`)
    );

    // Calculate average rating
    const totalRating = filtered.reduce((sum, product) => sum + product.rating.rate, 0);
    const avgRating = totalRating / filtered.length;

    console.log(`Average Rating of Filtered Products: ${avgRating.toFixed(2)}`);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchAndProcessProducts();