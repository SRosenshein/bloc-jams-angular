(function() {
	function Metric($firebaseArray) {
		var ref = firebase.database().ref();
		var songPlays = $firebaseArray(ref.child("songPlays"));
		var pageViews = $firebaseArray(ref.child("pageViews"));

		return {
			registerSongPlay: function(songObj) {
				songObj.playedAt = moment().format('L');
				songPlays.$add(songObj);
			},

			listSongsPlayed: function() {
				var songs = [];
				angular.forEach(songPlays, function(song) {
					songs.push(song.title);
				});
				return songs;
			},

			registerPageView: function(stateObj) {
				stateObj.viewedAt = moment().format('L');
				pageViews.$add(stateObj);
			}
		};
	}

	angular
		.module('blocJams')
		.service('Metric', ['$firebaseArray', Metric]);
})();
