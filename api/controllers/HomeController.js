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
			sails.models.gatherer.find({nameOfCard:{'like' : '%'+req.param('search')+'%'}, sort: 'nameOfCard asc'},' distinct').exec(
					
					function(error, cards)
					{
						var uniqueList = [];
						var temp;
						var isInList = false;

						for(var index = 0; index < cards.length; index++)
						{
							temp = cards[index];

							for(var index2 = 0; index2 < uniqueList.length; index2++)
							{
								if(uniqueList[index2]['nameOfCard'] == temp['nameOfCard'] && uniqueList[index2]['set'] == temp['set'])
								{
									isInList = true;
								}
							}

							if(!isInList)
							{
								uniqueList.push(temp);
							}

							isInList = false;

						}

						sails.log("Number found "+uniqueList.length);
						res.view({cards: uniqueList});
					}

					);
		}

		else
		{
			res.view({cards: ''});
		}
	}

};

