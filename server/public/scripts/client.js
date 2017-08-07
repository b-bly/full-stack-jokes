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
      url: '/postJoke',
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
          '<h2>' + joke.whoseJoke + '</h2>' +
          '<p>' + joke.jokeQuestion + '</p>' +
          '<p>' + joke.punchLine + '</p>' +
        '</div>';
        $('#outputDiv').prepend(jokesHtml);
    });
  }

  function getJokes() {
    $.ajax({
      type: 'GET',
      url: '/getJokes',
      success: function(response) {
        console.log('getJokes response ' + response);
        prependJokes(response);
      }
    });
  }

}); // end doc ready
