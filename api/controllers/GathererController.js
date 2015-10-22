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

		if(cardName && setName && highPrice && mediumPrice && lowPrice)
		{
			sails.models.gatherer.create({nameOfCard: cardName, highPrice: highPrice, mediumPrice: mediumPrice, lowPrice: lowPrice, set: setName}).exec(
					function(error)
					{
						if(error)
						{
							sails.log(error);
							res.send(error);
						}
						
						else
						{
							res.send("Completed");
						}
					}

					);
		}	
	},
	
	getList: function(req, res)
	{
		var setName = req.param("setName");

		if(setName)
		{
			sails.models.gatherer.find({set: setName}).exec(

					function(error, result)
					{
						if(error)
						{
							sails.log(error);
							res.send(error);
						}

						else
						{
							res.send(result);
						}
					}

					);
		}
	},

	insertAverage:function(req, res)
	{
		var cardName = req.param("cardName");
		var setName = req.param("setName");

		var highPrice = req.param("highPrice");
		var mediumPrice = req.param("mediumPrice");
		var lowPrice = req.param("lowPrice");

		var averageHighPrice = req.param("averageHighPrice");
		var averageMedPrice = req.param("averageMedPrice");
		var averageLowPrice = req.param("averageLowPrice");

		if(cardName && setName && highPrice && mediumPrice &&
				lowPrice && averageHighPrice && averageMedPrice && averageLowPrice)
		{
			//Needs to be cleaned up but will work in the meantime.
			sails.models.average.update(
					{
						nameOfCard: cardName, 
						sets:setName
					},
					{
						lowPrice: lowPrice,
						mediumPrice: mediumPrice,
						highPrice: highPrice,
						averageLowPrice: averageLowPrice,
						averageMediumPrice: averageMedPrice,
						averageHighPrice: averageHighPrice
					}).exec(
					function(error, records)
					{
						if(error)
						{
							res.send(error);
							sails.log(error);
							return;
						}

						if(records.length > 0)
						{
							res.send("Records updated");
						}

						else
						{
							//If no record is found, create it.
							sails.models.average.create(
							{
								nameOfCard: cardName,
								sets: setName,
								lowPrice: lowPrice,
								mediumPrice: mediumPrice,
								highPrice: highPrice,
								averageLowPrice: averageLowPrice,
								averageMediumPrice: averageMedPrice,
								averageHighPrice: averageHighPrice
							}
							).exec(
								function(error, records)
								{
									if(error)
									{
										sails.log(error);
										res.send(error);
									}

									else
									{
										res.send("Record inserted");
									}
								}

							);
						}
					}

					);
		}

	}
};
