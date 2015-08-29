/**
* Gatherer.js
*
* @description :: Stores and keeps track of card data.
* 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

	nameOfCard:
	{
		type:'string'
	},

	lowPrice:
	{
		type:'float'
	},

	mediumPrice:
	{
		type:'float'
	},

	highPrice:
	{
		type:'float'
	},

	set:
	{
		collection: 'Sets',
		via: 'card'
	}
  }
};

