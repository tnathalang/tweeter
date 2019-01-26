/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const ROOT_URL = "http://localhost:8080";

  const data = [
    {
      user: {
        name: "Newton",
        avatars: {
          small:
            "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          regular:
            "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          large:
            "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: {
          small:
            "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          regular:
            "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          large:
            "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1461113959088
    },
    {
      user: {
        name: "Johann von Goethe",
        avatars: {
          small:
            "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          regular:
            "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          large:
            "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        handle: "@johann49"
      },
      content: {
        text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      created_at: 1461113796368
    }
  ];

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
    // extracting the tweet from input box
    const tweetContent = $("#tweeting").val();

    //building the request properties
    const options = {
      url: "/tweets",
      method: "POST",
      data: { text: tweetContent }
    };

    //Ajax request in the request function up top
    request(options, function(response) {
      console.log("here's the response");
      console.log(response);
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

  renderTweets(data);
});
