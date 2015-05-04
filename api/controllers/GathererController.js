/**
 * GathererController
 *
 * @description :: Server-side logic for managing gatherers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require("cheerio");

function getRows(linkArray)
{
	var text;
	var req;
	var data;
		
	linkArray.forEach(

		function(entry)
		{
			req = new XMLHttpRequest();
			req.open('GET', encodeURI(entry), false);
			req.send();

			console.log("Entering");

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
						console.log(splitter[0]);
						console.log(splitter[1]);
						console.log(splitter[2]);
						console.log(splitter[3]);
					
					}
				);

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
						console.log("http://magic.tcgplayer.com/db/price_guide.asp?setname="+data(this).text());
					}
				}
			);

			console.log("");
			console.log("Get Rows");
			console.log("");

			//Gets all the rows
			getRows(links);
		
			console.log("Finished");
		}

		else
		{
			console.log("Page not loaded");
		}

		res.view();

	}

};

