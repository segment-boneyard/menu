
var domify = require('domify')
  , inherit = require('inherit')
  , Item = require('./item')
  , list = require('list')
  , protos = require('./protos');


/**
 * Expose the default `Menu`.
 */

module.exports = createMenu(Item);


/**
 * Create a `Menu` constructor with a given `MenuItem` view.
 *
 * @param {Function} MenuItem
 */

function createMenu (MenuItem) {

  var List = list(MenuItem);

  /**
   * Initialize a new `Menu`.
   *
   * @param {Function} View (optional)
   */

  function Menu () {
    if (!(this instanceof Menu)) return createMenu.apply(this, arguments);
    List.apply(this, arguments);
    this.el = domify('<menu class="menu">');
    this.type('list'); // default menu type
  }

  // inherit from List
  inherit(Menu, List);

  // protos
  Menu.prototype.List = List;
  for (var key in protos) Menu.prototype[key] = protos[key];

  return Menu;
}