(function(){
	var buttonsModule = angular.module('buttonsModule', []);
	
	buttonsModule.controller('ButtonsController',['$state', function($state){
		this.userName = '';
		this.pwd = '';
		this.isStored = false;

		this.login = function(){
			$state.go('packageList.myPackages');
		};

		this.select = function(){
			if(this.isStored){
				this.isStored = false;
			} else {
				this.isStored = true;
			}
		};
	}]);
})();