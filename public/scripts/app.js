/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //   const ROOT_URL = "http://localhost:8080";

  const tweetData = {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  };

  //   //create a reusable ajax request
  //   const request = (options, cb) => {
  //     $.ajax(options)
  //       .done(response => {
  //         cb(response);
  //       })
  //       .fail(err => {
  //         console.log("Error: ", err);
  //       })
  //       .always(() => {
  //         console.log("Request completed.");
  //       });
  //   };

  //   // function that creates a single quote element
  //   const createTweetElement = tweetData => {
  //     return tweetData;
  //   };

  //   const getTweet = () => {
  //     const options = {
  //       url: `$(ROOT_URL)/tweets`,
  //       method: "GET",
  //       dataType: "json"
  //     };
  //     request(options, response => {
  //       console.log(response);
  //       createTweetElement(response[0]);
  //     });
  //   };
  function createTweetElement(tweetData) {
    const newTweet = $("<article>").addClass("cats");
    const newHeader = $("<header>");
    const newImg = $("<img>").attr("src", tweetData.user.avatars.regular);
    const newH3 = $("<h3>").text(tweetData.user.name);
    const newTagname = $("<div>")
      .addClass("cats")
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

  let $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $(".tweet-container").append($tweet);
});
