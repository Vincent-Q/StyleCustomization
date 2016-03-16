(function(){
	var helperModule = angular.module('helperModule');

	helperModule.factory('FileReaderService', [function(){
		function FileReaderService(){
			this.__xml2json = new X2JS();
		}

		var proto = FileReaderService.prototype;

		proto.parseVariables = function(fileUrl){
			var dfd = this.__fetchFileContent(fileUrl);

			var self = this;
			return dfd.then(function(text){
				// clean text: remove unnecessary \n\r\t
				text = text.replace(/\n|\r|\t/g, '');
				// match useful information
				var matchedArr = text.match(/\/\*<xml>\*\/(.)*\/\*<\/xml>\*\//g);//\/\*<\/xml>\*\/

				var firstMatch = matchedArr[0];

				if(!firstMatch){
					throw 'No text is matched!';
				}

				// remove comments tag
				var processedText = self.__transformToRealXml(firstMatch).replace(/(\/\*)|(\*\/)|;/g, '');

				var parsedJson = self.__xml2json.xml_str2json(processedText);

				return parsedJson.xml;
			});
		}

		proto.__transformToRealXml = function(rawXml){
			// change variable format to xml format
			var processedText = rawXml.replace(/<stylePair>/g, '<styleName>');
			processedText = processedText.replace(/:/g, '</styleName><styleValue>');
			return processedText.replace(/<\/stylePair>/g, '</styleValue>');	
		}

		proto.__fetchFileContent = function(fileUrl){
			return $.ajax({
				url: fileUrl,//'less/customized/buttons-c.less',
				method: 'GET'
			});
		}

		return new FileReaderService();
	}]);
})();