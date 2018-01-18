var Trackster = {};

const API_KEY = '28c51a1ab3fbde66a4c5ac6dead3b9a0';

$(document).ready(function() {

  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-input').val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
var $trackList = $('#track-list');

$trackList.empty();

for (i = 0; i < tracks.length; i++) {
  var track = tracks[i];
  var mediumAlbumArt = track.image[1]["#text"];
  var htmlTrackRow =
      '<div class="row track">' +
        '<a class="col-xs-1 col-xs-offset-1" href="' + track.url + '">' +
        '<i class="fa fa-play-circle-o fa-lg" aria-hidden="true"></i>' +
        '</a>' +
        '<span class="col-xs-4">' + track.name + '</span>' +
        '<span class="col-xs-2">' + track.artist + '</span>' +
        '<span class="col-xs-2"><img src="' + mediumAlbumArt + '"></span>' +
        '<span class="col-xs-2">' + track.listeners + '</span>' +
      '</div>';

  $trackList.append(htmlTrackRow);
}
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title
    + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
