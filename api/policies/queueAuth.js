/*
 *         Foresee - NodeJS API for the storage of price data.
 *         Copyright (C) 2017 Manuel Gonzales 
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
module.exports = function(req, res, next) {

    var user = req.param("username");
    var password = req.param("password");

    sails.models.manager.find(
    {
        username: user,
        password: password
    }
    ).exec(
        function(error, user)
        {
            if(user && user[0])
            {
                if(user[0]['username'] && user[0]['type'] == 'queue')
                {
                    return next();
                }
                else
                {
                    return res.forbidden('You are not permitted to perform this action.');
                }
            }
            else
            {
                return res.forbidden('You are not permitted to perform this action.');
            }
        }
    );
};
