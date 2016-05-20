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

module.exports =
{
	list: function(req,res)
	{
		if(req.method == 'POST')
		{
			sails.models.average.find(
					{
						nameOfCard:{'like' : '%'+req.param('search')+'%'},
						sort: 'nameOfCard asc'
					}
					).exec(
					
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

