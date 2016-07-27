(function(){
	function SongPlayer(){
		var SongPlayer = {};
		var currentSong = null;
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
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			currentSong = song;
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
		* @function SongPlayer.play
		* @desc Checks if clicked song is currently playing song and sets new song or plays paused song accordingly
		* @param {Object} song
		*/
		SongPlayer.play = function(song){
			if (currentSong !== song){
				setSong(song);
				playSong(song);
			} else if (currentSong === song){
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
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();