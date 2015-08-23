/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports =
{

	list: function(req,res)
	{
		sails.models.gatherer.find({ nameOfCard : {'!': 'NULL'}}).exec(
				
					function(error, cards)
					{
						sails.log("Size "+cards.length);
						res.view({cards: cards});
					}

				);
	}

};

