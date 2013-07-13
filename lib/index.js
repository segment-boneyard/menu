
var dom = require('dom')
  , domify = require('domify')
  , inherit = require('inherit')
  , Item = require('./item')
  , List = require('list');


/**
 * Expose `Menu`.
 */

module.exports = Menu;


/**
 * Initialize a new `Menu` with an optional `View`.
 *
 * @param {Function} View (optional)
 */

function Menu (View) {
  View || (View = Item);
  List.call(this, View);
  this.el = domify('<menu class="menu">');
  this.type('list'); // default menu type
}

inherit(Menu, List);


/**
 * Set the menu's `type`.
 *
 * TODO: handle context menus (hidden, moveable, etc.)
 *
 * @param {String} type  Either 'context', 'toolbar' or 'list'.
 * @return {Menu}
 */

Menu.prototype.type = function (type) {
  this._type = type;
  dom(this.el).attr('type', type);
  if ('context' === type) this.hide();
  return this;
};


/**
 * Add an item to the `Menu`.
 *
 * @param {Object} model
 * @return {Menu}
 */

Menu.prototype.add = function (model) {
  if ('string' === typeof model) model = { id: model };
  List.prototype.add.call(this, model);

  var id = model.id || model.primary();
  var el = this.items[id].el;
  var view = this.items[id].view;
  var self = this;
  dom(el).on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    self.emit('select', el, model, view);
    self.select(id);
  });
  return this;
};


/**
 * Select an item by `id`.
 *
 * @param {String} id
 * @return {Menu}
 */

Menu.prototype.select = function (id) {
  this.deselect();
  var el = this.items[id].el;
  dom(el).addClass('selected');
  return this;
};


/**
 * Deselect all the items.
 *
 * @return {Menu}
 */

Menu.prototype.deselect = function () {
  this.list.removeClass('selected');
  return this;
};