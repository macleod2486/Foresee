/**
 * GathererController
 *
 * @description :: Server-side logic for managing gatherers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	insert: function(req, res)
	{
		var cardName = req.param("cardName");
		var setName = req.param("setName");
		var highPrice = req.param("highPrice");
		var mediumPrice = req.param("mediumPrice");
		var lowPrice = req.param("lowPrice");
		var source = req.param("source");

		if(cardName && setName && highPrice && mediumPrice && lowPrice && source)
		{
			sails.models.gatherer.create({nameOfCard: cardName, highPrice: highPrice, mediumPrice: mediumPrice, lowPrice: lowPrice, set: setName, source: source}).exec(
				function(error)
				{
					if(error)
					{
						sails.log(error);
						res.serverError(error);
					}
					
					else
					{
						res.ok("Completed");
					}
				}

			);
		}

		else
		{
			res.ok("Invalid");
		}
	},

	getListCount: function(req,res)
	{
		var source = req.param("source");

		if(source)
		{
			sails.models.gatherer.count({source: source}).exec(
				function(error, found)
				{
					if(error)
					{
						res.serverError("Error in call");
					}
					else
					{
						res.ok({count: found});
					}
				}
			);
		}
		else
		{
			res.ok("Error in parameter");
		}
	},
	
	getList: function(req, res)
	{
		var source = req.param("source");
		var page = req.param("page");

		if(source && page)
		{
			sails.models.gatherer.find({source: source}).paginate({page: page, limit: 100}).exec(

				function(error, result)
				{
					if(error)
					{
						sails.log(error);
						res.serverError(error);
					}

					else
					{
						res.ok(result);
					}
				}

		        );
		}

		else
		{
			res.serverError("Error in parameter");
		}
	},

	averageRecordSearch: function(req, res)
	{
		var card = req.param("cardName");
		var setName = req.param("setName");
		var source = req.param("source");

		if(card && setName && source)
		{
			sails.models.average.find({nameOfCard: card, set: setName, source: source}).exec(

				function(error, result)
				{
					if(error)
					{
						res.serverError(error);
					}

					else
					{
						res.ok(result);
					}
				}

			);
		}

		else
		{
			res.serverError("Missing parameter");
		}
	
	},

	updateAverage: function(req, res)
	{
		var cardName = req.param("cardName");
		var setName = req.param("setName");

		var highPrice = req.param("highPrice");
		var mediumPrice = req.param("mediumPrice");
		var lowPrice = req.param("lowPrice");

		var averageHighPrice = req.param("averageHighPrice");
		var averageMedPrice = req.param("averageMedPrice");
		var averageLowPrice = req.param("averageLowPrice");

		var source = req.param("source");

		sails.models.average.update(
		{
			nameOfCard: cardName, 
			sets:setName,
			source: source
		},
		{
			lowPrice: lowPrice,
			mediumPrice: mediumPrice,
			highPrice: highPrice,
			averageLowPrice: averageLowPrice,
			averageMediumPrice: averageMedPrice,
			averageHighPrice: averageHighPrice,
		}
		).exec(
			function(error, records)
			{
				if(error)
				{
					sails.log(error);
					res.serverError(error);
				}

				else
				{
					res.ok("Record updated");
				}
			}
		);
	},

	insertAverage: function(req, res)
	{
		var cardName = req.param("cardName");
		var setName = req.param("setName");

		var highPrice = req.param("highPrice");
		var mediumPrice = req.param("mediumPrice");
		var lowPrice = req.param("lowPrice");

		var averageHighPrice = req.param("averageHighPrice");
		var averageMedPrice = req.param("averageMedPrice");
		var averageLowPrice = req.param("averageLowPrice");

		var source = req.param("source");

		if(cardName && setName && highPrice && mediumPrice &&
				lowPrice && averageHighPrice && averageMedPrice && averageLowPrice && source)
		{
			sails.models.average.create(
				{
					nameOfCard: cardName,
					lowPrice: lowPrice,
					mediumPrice: mediumPrice,
					highPrice: highPrice,
					averageLowPrice: averageLowPrice,
					averageMediumPrice: averageMedPrice,
					averageHighPrice: averageHighPrice,
					source: source,
					set: setName
				}).exec(
				function(error, records)
				{
					if(error)
					{
						res.serverError(error);
						sails.log(error);
						return;
					}
					else
					{
						res.ok("Record created");
					}
				}
			);
		}

		else
		{
			res.serverError("Error in parameters");
		}

	},

	deleteOld: function(req, res)
	{
		var date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);

		sails.log("Deleting older than this date "+date);

		sails.models.gatherer.destroy({createdAt: {'<': date}}).exec(
			function(error)
			{
				if(error)
				{
					sails.log(error);
					res.serverError(error);
				}

				else
				{
					res.ok("Cleared out old");
				}
			}
		);
	}
};
