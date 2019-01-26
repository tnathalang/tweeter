/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const ROOT_URL = "http://localhost:8080";

  //   // function that creates a single quote element
  //   const createTweetElement = tweetData => {
  //     return tweetData;
  //   };

  function createTweetElement(tweetData) {
    const newTweet = $("<article>").addClass("tweet");
    const newHeader = $("<header>");
    const newImg = $("<img>").attr("src", tweetData.user.avatars.regular);
    const newH3 = $("<h3>").text(tweetData.user.name);
    const newTagname = $("<div>")
      .addClass("tweet")
      .text(tweetData.user.handle);
    const newP = $("<p>").text(tweetData.content.text);
    const newFooter = $("<footer>").text(tweetData.created_at);

    newHeader.appendTo(newTweet);
    newImg.appendTo(newHeader);
    newH3.appendTo(newHeader);
    newTagname.appendTo(newHeader);
    newP.appendTo(newTweet);
    newFooter.appendTo(newTweet);

    return newTweet;
  }

  //Rendering tweets

  function renderTweets(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);

      $(".tweet-container").append($tweet);
    }
  }

  //catch the submit event on the tweet button
  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($(this).val().length > 140) {
      event.preventDefault();
    }
    // extracting the tweet from input box
    const tweetContent = $("#tweeting").val();
    const tweetObj = { text: tweetContent };
    //building the request properties
    const options = {
      url: "/tweets",
      method: "POST",
      data: tweetObj
    };

    //Ajax request
    request(options, function(response) {
      const tweetEl = createTweetElement(response);
      $(".tweet-container").prepend(tweetEl);
    });
  });

  //loading tweets from the data

  const loadTweet = () => {
    const options = {
      url: "/tweets",
      method: "GET",
      dataType: "json"
    };

    request(options, response => {
      const tweetList = renderTweets(response);

      $(".tweet-container").append(tweetList);
    });
  };

  //create a reusable ajax request
  const request = (options, cb) => {
    $.ajax(options)
      .done(response => {
        cb(response);
      })
      .fail(err => {
        console.log("Error: ", err);
      })
      .always(() => {
        console.log("Request completed.");
      });
  };

  loadTweet();
});
