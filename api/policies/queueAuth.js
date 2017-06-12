/**
 * Queue policies
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
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
