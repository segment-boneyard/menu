
var dom = require('dom')
  , get = require('get');


/**
 * Set the menu's `type`.
 *
 * TODO: handle context menus (hidden, moveable, etc.)
 *
 * @param {String} type  Either 'context', 'toolbar' or 'list'.
 * @return {Menu}
 */

exports.type = function (type) {
  this._type = type;
  dom(this.el).attr('type', type);
  if ('context' === type) this.hide();
  return this;
};


/**
 * Add an item to the menu.
 *
 * @param {Object} model
 * @return {Menu}
 */

exports.add = function (model) {
  if ('string' === typeof model) model = { id: model };
  this.List.prototype.add.call(this, model);

  var id = primary(model);
  var el = this.items[id].el;
  var view = this.items[id].view;
  var self = this;

  // no href, bind to click
  if (!get(model, 'href')) {
    dom(el).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.emit('select', el, model, view);
      self.select(id);
    });
  }

  this.emit('add', el, model, view);
  return this;
};


/**
 * Select an item by `id`.
 *
 * @param {String} id
 * @return {Menu}
 */

exports.select = function (id) {
  this.deselect();
  var item = this.items[id];
  if (!item) return this;

  var el = item.el;
  var model = item.model;
  var view = item.view;
  dom(el).addClass('selected');
  this.emit('select', el, model, view);
  return this;
};


/**
 * Deselect all the items.
 *
 * @return {Menu}
 */

exports.deselect = function () {
  this.list.removeClass('selected');
  return this;
};


/**
 * Get the primary property value for a model.
 *
 * @param {Object} model
 * @return {String}
 */

function primary (model) {
  return get(model, 'primary') || get(model, 'id');
}