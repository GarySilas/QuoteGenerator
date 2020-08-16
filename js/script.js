const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quoteText');
const authorText = document.getElementById('quoteAuthorText');
const twitterBtn = document.getElementById('twitterBtn');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const loader = document.getElementById('loader');

// Show loading spinner
function showLoadingSpinner() {

    // Show spinning loader
    loader.hidden = false;

    // Hide the quoteContainer
    quoteContainer.hidden = true;

}

// Hide spinning loader
function hideSpinningLoader() {

    // If the loader is NOT hidden...
    if (!loader.hidden) {

        // Show the quoteContainer
        quoteContainer.hidden = false;

        // Hide the spinning loader
        loader.hidden = true;

    }

}

// Get Quote from API
async function getQuoteFromAPI() {

    // Show spinning loader
    showLoadingSpinner();

    // Proxy URL
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';

    // API Reference
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {

        // Fetch a response (or data) from API
        const response = await fetch(proxyURL + apiURL);

        // Convert response (or data) to json format
        const data = await response.json();

        console.log(data);

        // If quoteAuthor has no data...
        if (data.authorText === '') {
            // add 'unknown'
            authorText.innerText = 'Unknown';
        }
        else {
            // Display authorText from json data
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            // Add long-quote class
            quoteText.classList.add('long-quote');
        }
        else {
            // Remove long-quote class
            quoteText.classList.remove('long-quote');
        }

        // Display quoteText from json data
        quoteText.innerText = data.quoteText;

        // Hide spinning loader, and show quote
        hideSpinningLoader();

    }
    catch (error) {

        console.log('Whoops, no quote', error);

        // Get another quote
        await getQuoteFromAPI();

    }

}

// Tweet Quote
function tweetQuote() {

    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    // Open Twitter in a new window
    window.open(twitterURL, '_blank');

}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuoteFromAPI();
