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

var links = [];

var index = 0;

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
			index++;

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
						
						Gatherer.create({nameOfCard:splitter[0] , lowPrice:parseFloat(splitter[1]) , mediumPrice:parseFloat(splitter[2]), highPrice:parseFloat(splitter[3]), set:index}).exec(

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
		sails.models.sets.find().exec(

				function(err,found)
				{
					for(var index = 0; index < found.length; index++)
					{
						links.push("http://magic.tcgplayer.com/db/price_guide.asp?setname="+found[index]['name']);
					}

					getData(links);

					sails.log("Finished");
					sails.log("Processed "+count);

					res.view({count: count});
				}

				);	

		
	}

};
