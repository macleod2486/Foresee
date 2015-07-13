/**
 * GathererController
 *
 * @description :: Server-side logic for managing gatherers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require("cheerio");

//Variables that will store the necessary information.
var cardName = [];
var lowPrice = [];
var medPrice = [];
var highPrice = [];
var completed = true;

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

						cardName.push(splitter[0]);
						lowPrice.push(parseFloat(splitter[1]));
						medPrice.push(parseFloat(splitter[2]));
						highPrice.push(parseFloat(splitter[3]));
					}
				);

			}

			else
			{
				completed = false;
				sails.log("Error: Failed gathering data");
				return;
			}

		}
	     );

	//Attempts to insert the gathered data.
	insertData();
}

//Insert data once it is completely gathered
function insertData()
{
	if(completed)
	{
		sails.log("Inserting data");

		var query = "";
		var index = 0;

		var name;
		var low;
		var med;
		var high;

		cardName.forEach(
					function(entry)
					{
						name = cardName[index]
						low = lowPrice[index].toString();
						med = medPrice[index];
						high = highPrice[index];

						Gatherer.create({nameOfCard:name , lowPrice:low , mediumPrice:med, highPrice:high}).exec(

								function callback(err, created)
								{
									if(err != null) 
									{
										sails.log("Error "+err);
									}
								}

						);
						index++;
					}

				);
	}	
}

//Resets and frees up memory.
function reset()
{
	sails.log("Clearing data");

	cardName = [];
	lowPrice = [];
	medPrice = [];
	highPrice = [];

	completed = true;
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

		reset();

		res.view();
	}

};
