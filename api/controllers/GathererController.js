/**
 * GathererController
 *
 * @description :: Server-side logic for managing gatherers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require("cheerio");

module.exports = {

	process: function(req, res)
	{
		var req = new XMLHttpRequest();
		req.open('GET', 'http://magic.tcgplayer.com/magic_price_guides.asp', false); 
	        req.send();

		if(req.status == 200)
		{
			//Cleanses the text
			var text = req.ResponseText;
			text = req.responseText + ""; 
			text.replace(/<&#91;^>&#93;*>/g, "");

			//Array to keep all arrays
			var links = [];

			//Parses the html to get the links
			var data = cheerio.load(text);
			data('td.magicSetCol a').each(
				function()
				{
					links.push(data(this).attr('href'));
					console.log(data(this).text());	
				}
			);

			console.log("Finished");
		}

		else
		{
			console.log("Page not loaded");
		}

		return "Finished";
	}
	
};

