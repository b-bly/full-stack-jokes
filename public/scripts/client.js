console.log('js');

$(document).ready(function () {
  var newJoke = {};
  console.log('JQ');
  $('#addJokeButton').on('click', function () {
    console.log('addJokeButton on click');
    newJoke.whoseJoke = $('#whoseJokeIn').val();
    newJoke.jokeQuestion = $('#questionIn').val();
    newJoke.punchLine = $('#punchlineIn').val();
    postJoke();

  }); // end addJokeButton on click
getJokes();

  function postJoke() {
    $.ajax({
      type: 'POST',
      url: '/jokes/postJoke',
      data: newJoke,
      success: function (response) {
        console.log(response);
        getJokes();
      },
      error: function (xhr, _, errorThrown) {
        alert("Error!  Type: " + xhr.status + ': ' + errorThrown);
      }
    });
  }

  function prependJokes(response) {
    $('#outputDiv').empty();
    var jokesHtml = '';
    response.forEach(function(joke, i) {
      jokesHtml = 
        '<div class="aJoke">' +
          '<p class="name">' + joke.whosejoke + '</p>' +
          '<p>' + joke.jokequestion + '</p>' +
          '<p>' + joke.punchline + '</p>' +
        '</div>';
        $('#outputDiv').prepend(jokesHtml);
    });
  }

  function getJokes() {
    $.ajax({
      type: 'GET',
      url: '/jokes/getJokes',
      success: function(response) {
        console.log('getJokes response ', response);
        prependJokes(response);
      }
    });
  }

}); // end doc ready
