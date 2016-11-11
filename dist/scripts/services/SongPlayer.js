(function(){
	function SongPlayer($rootScope, Fixtures, Metric){
		var SongPlayer = {};
		/**
		* @desc Holds album data
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song){
			if (currentBuzzObject){
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function(){
				$rootScope.$apply(function(){
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			//track a song is played when the song playback is complete 
			currentBuzzObject.bind('ended', function(){
				Metric.registerSongPlay(SongPlayer.currentSong);
			});

			SongPlayer.currentSong = song;
		};

		/**
		* @function playSong
		* @desc plays currentBuzzObject and sets song playing boolean to true
		* @param {Object} song
		*/
		var playSong = function(song){
			currentBuzzObject.play();
			song.playing = true;
		};

		/**
		* @function stopSong
		* @desc stops currentBuzzObject and sets song playing boolean to false
		* @param {Object} song
		*/
		var stopSong = function(song){
			currentBuzzObject.stop();
			song.playing = null;
		};

		/**
		* @function getSongIndex
		* @desc retrieves song index from songs array of currentAlbum
		* @param {Object} song
		*/
		var getSongIndex = function(song){
			return currentAlbum.songs.indexOf(song);
		};

		SongPlayer.currentSong = null;
		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;

		/**
		* @ desc Current volume (1-100) of currently playing song
		* @type {Number}
		*/
		SongPlayer.volume = null;

		/**
		* @function SongPlayer.play
		* @desc Checks if clicked song is currently playing song and sets new song or plays paused song accordingly
		* @param {Object} song
		*/
		SongPlayer.play = function(song){
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song){
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song){
				if (currentBuzzObject.isPaused()){
					playSong(song);
				}
			}
		};

		/**
		* @function SongPlayer.pause
		* @desc Pauses currentBuzzObject and sets song playing boolean to false
		* @param {Object} song
		*/
		SongPlayer.pause = function(song){
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function SongPlayer.previous
		* @desc Plays previous song
		*/
		SongPlayer.previous = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if(currentSongIndex < 0){
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function SongPlayer.next
		* @desc Plays next song from player bar
		*/
		SongPlayer.next = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if(currentSongIndex == currentAlbum.songs.length){
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time){
			if (currentBuzzObject){
				currentBuzzObject.setTime(time);
			}
		};

		/**
		* @function setVolume
		* @desc Set volume of currently playing song
		* @param {Number} volume
		*/
		SongPlayer.setVolume = function(volume){
			if (currentBuzzObject){
				currentBuzzObject.setVolume(volume);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', 'Metric', SongPlayer]);
})();