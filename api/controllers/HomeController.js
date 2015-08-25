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
		if(req.method == 'POST')
		{
			sails.models.gatherer.find({nameOfCard:{'like' : '%'+req.param('search')+'%'}, sort: 'nameOfCard asc'}).exec(
					
						function(error, cards)
						{
							sails.log("Number found "+cards.length);
							res.view({cards: cards});
						}

					);
		}

		else
		{
			res.view({cards: ''});
		}
	}

};

