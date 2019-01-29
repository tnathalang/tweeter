/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const ROOT_URL = "http://localhost:8080";

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
    console.log("submit");
    if ($("textarea").val().length === 0) {
      $("#empty")
        .slideDown("slow")
        .delay(1000)
        .slideUp("slow");
      $("textarea")
        .focus()
        .css("background-color", "#f1c0c9");
      window.setTimeout(function() {
        $("textarea")
          .focus()
          .css("background-color", "white");
      }, 1900);
    } else if ($("textarea").val().length > 140) {
      $("#long")
        .slideDown("slow")
        .delay(1000)
        .slideUp("slow");
      $("textarea")
        .focus()
        .css("background-color", "#f1c0c9");
      window.setTimeout(function() {
        $("textarea")
          .focus()
          .css("background-color", "white");
      }, 1900);

      event.stopPropagation();
      return false;
    }

    // extracting the tweet from input box
    const tweetContent = $("#tweeting").val();

    //building the request properties
    const options = {
      url: "/tweets",
      method: "POST",
      data: { text: tweetContent }
    };

    //Ajax request
    request(options, response => {
      const tweetEl = createTweetElement(response);
      $(".tweet-container").prepend(tweetEl);
      $(this)
        .find("textarea")
        .val("");
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

  // function for toggling the compose button
  $(".box").click(function() {
    $(".new-tweet").slideToggle(function() {
      $("textarea").focus();
    });
  });

  loadTweet();
});
