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
    reset: function(req,res)
    {
        req.session.user = "";
        res.redirect('/manager/login');
    },

    login: function(req,res)
    {
        //handle login
        if(req.method == 'POST')
        {
            var username = req.param("username");
            var password = req.param("password");

            sails.models.manager.find(
            {
                username: username,
                password: password
            }
            ).exec(
                function(error, user)
                {
                    if(user && user[0])
                    {
                        if(user[0]['username'] && user[0]['type'] == 'manager')
                        {
                           req.session.user = user[0]['username'];
                           
                           res.redirect("/manager/list"); 
                        }
                        else
                        {
                            res.view();
                        }
                    }
                    else
                    {
                        res.view();
                    }
                }
            );
        }
        else
        {
            req.session.user = "";
            res.view();
        }
    },
    
    list: function(req,res)
    {
        if(req.method == 'POST')
        {
            //handle post
            console.log("User "+req.param("user"));
            sails.models.manager.find(
                {
                    username: { '!' : ['null']}
                }
                ).exec(
                    function(error, records)
                    {
                        if(!error)
                        {
                            res.view({users: records});
                        }
                        else
                        {
                            res.serverError(error);
                        }
                    }
                );
        }

        else
        {
            if(req.session.user)
            {
                sails.models.manager.find(
                {
                    username: { '!' : ['null']}
                }
                ).exec(
                    function(error, records)
                    {
                        if(!error)
                        {
                            res.view({users: records});
                        }
                        else
                        {
                            res.serverError(error);
                        }
                    }
                );
            }

            else
            {
                res.redirect('/manager');
            }
        }
    },

    adduser: function(req,res)
    {
        if(req.session.user)
        {
            if(req.method == 'POST')
            {
                console.log("User "+req.param("username"));
                console.log("Pass "+req.param("password"));
                console.log("Role "+req.param("role"));
                var username = req.param("username");
                var password = req.param("password");
                var role = req.param("role");
                
                if(username && password && role)
                {
                    sails.models.manager.findOrCreate
                    (
                        {username: username},
                        {username: username, password: password, type: role}
                    ).exec
                    (
                        function (error, records)
                        {
                            console.log(records);
                            res.view();
                        }
                    );
                }
                else
                {
                    res.view();
                }
            }
            else
            {
                res.view();
            }
        }
        else
        {
            res.redirect('/manager');
        }
    }
};
