/**
 * GathererController
 *
 * @description :: Server-side logic for managing gatherers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require("cheerio");

//Count of records
var count = 0;

//Data harvester
function getData(linkArray)
{
	var text;
	var req;
	var data;

	sails.log("Gathering data");
	
	linkArray.forEach(

		function(entry)
		{
			req = new XMLHttpRequest();
			req.open('GET', encodeURI(entry), false);
			req.send();

			if(req.status == 200)
			{
				text = req.responseText + "";		
				text.replace(/<&#91;^>&#93;*>/g, "");
				data = cheerio.load(text);

				var tablerow = cheerio.load(data('table')[2]);

				var tableItem;

				var temp;

				var splitter;

				tablerow('tr').each(
					function()
					{
						temp = tablerow(this).text();

						splitter = temp.split("$");

						Gatherer.create({nameOfCard:splitter[0] , lowPrice:parseFloat(splitter[1]) , mediumPrice:parseFloat(splitter[2]), highPrice:parseFloat(splitter[3])}).exec(

								function callback(err, created)
								{
									if(err != null) 
									{
										sails.log("Error "+err);
									}
								}

						);

						count++;
					}
				);

			}

			else
			{
				sails.log("Error: Failed gathering data");
				return;
			}

		}
	     );
}

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
					if(data(this) != "")
					{
						links.push("http://magic.tcgplayer.com/db/price_guide.asp?setname="+data(this).text());
					}
				}
			);

			//Gets all the rows
			getData(links);
		
			sails.log("Finished");
		}

		else
		{
			sails.log("Page not loaded");
		}

		sails.log("Processed "+count);

		res.view({count: count});
	}

};
