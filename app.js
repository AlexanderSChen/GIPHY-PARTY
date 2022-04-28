console.log("Let's get this party started!");

// select form in html
// const form = document.querySelector('#form');
// form.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const input = document.querySelector('#search');
//     console.log(input.value);
//     getGif(input);
//     input.value='';
// })

// async function getGif(input) {
//     try {
//         const results = await axios.get(`https://api.giphy.com/v1/search`, { 
//             params : {
//                 q: searchTerm,
//                 api_key: "Kx4ASJWzMF4kAMfIFvAmkXud1t8az6Dz"
//             }});
//         console.log(results.value);
//     } catch {
//         alert("No results");
//         getRandomGif();
//     }

// }

// async function getRandomGif() {
//     const results = await axios.get('https://api.giphy.com/v1/gifs/random?api_key=&tag=&rating=g');
//     console.log(results.data);
//     const gif = document.querySelector("#gif");
//     gif.src = results.data.message;
// }

// function addGif(gif) {
//     const body = document.querySelector("gif-body");
//     const newGif = document.createElement("img");
//     newGif.src = gif;
//     body.append(newGif);
// }

// function remove(body) {
//     body.empty();
// }

/* use ajax result to add a gif */

// select the gif-area element id using jQ
const $gifArea =$("#gif-area");
// select the search element id using jQ
const $searchInput =$("#search");

// create addGif function to append the search results onto the html/
function addGif(results) {
    // take the number of results and store it using results.data.length
    let numberOfResults = results.data.length;
    // if there are results, the function runs, if there are no results then if function does not run.
    if(numberOfResults) {
        // select a random index using Math.random() * numberOfResults which will give us a random index and Math.floor so the number is whole. This ensures if we enter the same term multiple times, we will get a random gif associated with the term, if there's more than one result.
        let randomIndex = Math.floor(Math.random() * numberOfResults);
        // create the html to add the gif to the DOM. Create a new div with the class that divides the column into 4/12 or 1/3 width column of the page.
        let $newColumn = $("<div>", {class: "col-md-4 col-12 mb-4"});
        // create a new image element with the source set to results.data[randomIndex].images.original.url which is the path to return a random gif with of the term input. 
        // class "w-100" uses bootstrap to create equal-width columns that span multiple rows, it's also responsive if the page is resized.
        let $newGif = $("<img>", {
            src: results.data[randomIndex].images.original.url,
            class: "w-100"
        });
        // append the gif to the column
        $newColumn.append($newGif);
        // append the column to the gif area.
        $gifArea.append($newColumn);
    }
}

// select form and add event listener using jQ
$("form").on("submit", async function(e) {
    // prevent page from refreshing when clicking search giphy button
    e.preventDefault();

    // set searchTerm equal to the value of searchInput
    let searchTerm = $searchInput.val();
    // reset the value of search input so the previous input is not left in the input bar
    $searchInput.val("");

    // use axios to get the giphy api and store the value in response. giphy api requires 2 params for a search term, the term and the api_key which can be retrieved from the giphy api site.
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });

    // use created addGif function with the response.data to add the gif onto the html.
    addGif(response.data);
});

// select the remove element id button and set an event listener that when clicked will empty the gif area, which deletes all the gifs from the page.
$("#remove").on("click", function() {
    $gifArea.empty();
});