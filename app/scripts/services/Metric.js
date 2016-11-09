(function() {
	function Metric($firebaseArray) {
		var ref = firebase.database().ref();
		var songPlays = $firebaseArray(ref.child("songPlays"));

		return {
			registerSongPlay: function(songObj) {
				songObj['playedAt'] = new Date();
				songPlays.$add(songObj);
			},

			listSongsPlayed: function() {
				var songs = [];
				angular.forEach(songPlays, function(song) {
					songs.push(song.title);
				});
				return songs;
			}
		};
	}

	angular
		.module('blocJams')
		.factory('Metric', ['$firebaseArray', Metric]);
})();
