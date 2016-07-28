(function(){
	function SongPlayer(Fixtures){
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

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();