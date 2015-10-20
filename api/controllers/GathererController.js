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
	
	getList:function(req, res)
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
	}
};
