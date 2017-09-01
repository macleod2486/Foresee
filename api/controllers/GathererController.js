/*
 *         Foresee - NodeJS API for the storage of price data.
 *         Copyright (C) 2016 Manuel Gonzales 
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * */

module.exports = {

	insert: function(req, res)
	{
		var cardName = req.param("cardName");
		var setName = req.param("setName");
		var price = req.param("price");
		var source = req.param("source");

		if(cardName && setName && price && source)
		{
			sails.models.gatherer.create({nameOfCard: cardName, price: price, set: setName, source: source}).exec(
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

	getList: function(req, res)
	{
		var source = req.param("source");
		var nameOfCard = req.param("nameOfCard");
		var set = req.param("set");
		var page = req.param("page");
		var limit = req.param("limit");

		if(nameOfCard && source && set && page != null && limit)
		{
			sails.models.gatherer.find({source: source, nameOfCard: nameOfCard, set: set} ).sort('createdAt DESC').paginate({page: page, limit: limit}).exec(

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

	getListCount: function(req, res)
	{
		var source = req.param("source");
		var nameOfCard = req.param("nameOfCard");
		var set = req.param("set");

		if(nameOfCard && source && set)
		{
			sails.models.gatherer.count({source: source, nameOfCard: nameOfCard, set: set}).exec(

				function(error, result)
				{
					if(error)
					{
						sails.log(error);
						res.serverError(error);
					}

					else
					{
						res.ok({count: result});
					}
				}

		        );
		}

		else
		{
			res.serverError("Error in parameter");
		}

	},

	getDistinctList: function(req, res)
	{
		//
		//Currently this function only works with postgres, will have to customize until a better way to handle is introduced.
		//

		var limit = req.param("limit");
		var page = req.param("page") * limit;
		var source = req.param("source");
		var query = "select distinct on(\"nameOfCard\", \"set\") \"nameOfCard\", set, source, price from gatherer where source = '" + source + "' limit "+ limit + " offset "+page;

		if(limit && page != null && source)
		{
			sails.models.gatherer.query(query,
					function(error, results)
					{
						if(error)
						{
							res.serverError(error);
						}
						else
						{
							res.ok(results.rows);
						}
					});
		}
		else
		{
			res.serverError("Missing parameter");
		}
	},

	getDistinctListCount: function(req, res)
	{
		var source = req.param("source");
		var query = "select distinct on(\"nameOfCard\", \"set\") \"nameOfCard\", set, source, price from gatherer where source = '"+source+"'";

		if(source)
		{
			sails.models.gatherer.query(query,
					function(error, results)
					{
						if(error)
						{
							res.serverError(error);
						}
						else
						{
							res.ok({count: results.rows.length});
						}
					});
		}

		else
		{
			res.serverError("Missing parameter");
		}
	},

	averageRecordSearch: function(req, res)
	{
		var card = req.param("cardName");
		var setName = req.param("setName");
		var source = req.param("source");

		if(card && setName && source)
		{
			sails.models.average.findOne({nameOfCard: card, set: setName, source: source}).exec(

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
		var price = req.param("price");
		var average = req.param("average");
		var source = req.param("source");

                if(cardName && setName && price && average && source)
                {
                    sails.models.average.update(
                    {
                            nameOfCard: cardName, 
                            set:setName,
                            source: source
                    },
                    {
                            price: price,
                            average: average,
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
                }

                else
		{
			res.serverError("Error in parameters");
		}
	},

	insertAverage: function(req, res)
	{
		var cardName = req.param("cardName");
		var setName = req.param("setName");
		var price = req.param("price");
		var average = req.param("average");
		var source = req.param("source");

		if(cardName && setName && price && average && source)
		{
			sails.models.average.create(
				{
					nameOfCard: cardName,
					price: price,
					average: average,
					source: source,
					set: setName
				}).exec(
				function(error, records)
				{
					if(error)
					{

						sails.log(error);
						res.serverError(error);
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
                var daysAgo = req.param("days");
                
                if(daysAgo)
                {
                    var date = new Date();
                    date.setDate(date.getDate()-daysAgo);
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
		else
		{
			res.serverError("Error in parameters");
		}
	},
        
        search: function(req,res)
        {
            var source = req.param('source');
            var nameOfCard = req.param('nameOfCard');

            if(source && nameOfCard)
            {
                sails.models.average.find(
                                {
                                        nameOfCard:{'like' : '%'+nameOfCard+'%'},
                                        source: source,
                                        sort: 'nameOfCard asc'
                                }
                                ).exec(
                                
                                function(error, cards)
                                {
                                        sails.log("Number found "+cards.length);
                                        res.ok(cards);
                                }

                                );
            }
            else
            {
                res.serverError("Missing parameter");
            }
        },

       	price: function(req,res)
	{
            var cardName = req.param("cardName");
            var set = req.param("set");
            var source = req.param("source");

            if(cardName && set)
            {
                sails.models.average.find(
                {
                        nameOfCard:cardName,
                        set: set,
                        source: source
                }
                ).exec(
                
                function(error, cards)
                {
                        sails.log("Number found "+cards.length);
                        res.ok(cards);
                }

                );
            }
            else
            {
                res.serverError("Missing parameter");
            }
        }
};
