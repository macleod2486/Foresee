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
			sails.log("Posted");
			sails.log(req.param('search'));
			sails.models.gatherer.find({nameOfCard:{'like' : '%'+req.param('search')+'%'}}).exec(
					
						function(error, cards)
						{
							sails.log("Size "+cards.length);
							res.view({cards: cards});
						}

					);
		}

		else
		{
			sails.log("List");
			res.view({cards: ''});
		}
	}

};

