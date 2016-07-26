function() {
	function albumCtrl(){
		this.albumData = angular.copy(albumPicasso);
	}

	angular
		.module('blocJams')
		.controller('albumCtrl', albumCtrl);
}