const spinner = document.getElementById("js-spinner");
const tweetButton = document.getElementById("js-twitter");
const newQuoteButton = document.getElementById("js-new-quote");
newQuoteButton.addEventListener("click", getQuote);

// the API's
const endpoint = "https://api.quotable.io/random";

async function getQuote() {
  // remove the "hidden" class on the spinner
  spinner.classList.remove("hidden");
  // disable the quote button
  newQuoteButton.disabled = true;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      // the reason we use await here again is because the json() method returns a promise
      const json = await response.json();
      displayQuote(json.content);
      displayAuthor(json.author);
      setTweetButton(json.content, json.author);
    }
  } catch (err) {
    console.log(err);
    alert("Failed to catch new qoute");
  } finally {
    // enable the quote button
    newQuoteButton.disabled = false;
    // add the "hidden" class back again
    spinner.classList.add("hidden");
  }
}

function displayQuote(quote) {
  const quoteText = document.getElementById("js-quote-text");
  quoteText.innerText = `"${quote}"`;
}

function displayAuthor(author) {
  const theAuthor = document.getElementById("js-the-author");
  theAuthor.innerHTML = `- <b>${author}</b>`;
}

function setTweetButton(quote, author) {
  tweetButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - ${author}`
  );
}
// running the getQuote
getQuote();
