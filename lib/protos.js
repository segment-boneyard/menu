
var dom = require('dom');
var events = require('events');
var get = require('get');
var keyname = require('keyname');
var prevent = require('prevent');


/**
 * Bind to DOM events.
 *
 * @return {Menu}
 */

exports.bind = function () {
  this.events = events(this.el, this);
  this.events.bind('focus');
  this.events.bind('blur');
  this.events.bind('mouseover');
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
  if (!get(model, 'href') && !get(view, 'href')) {
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
  this.unfocus();
  this.list.removeClass('selected');
  return this;
};


/**
 * Highlight the next menu item.
 *
 * @return {Menu}
 */

exports.next = function () {
  var list = this.list;
  var previous = select(list, 'focus');
  var next = list.first();
  if (previous.length() && previous.next().els[0]) next = previous.next();

  previous.removeClass('focus');
  next.addClass('focus');
  return this;
};


/**
 * Highlight the previous menu item.
 *
 * @return {Menu}
 */

exports.previous = function () {
  var list = this.list;
  var previous = select(list, 'focus');
  var next = list.last();
  if (previous.length() && previous.previous().els[0]) next = previous.previous();

  previous.removeClass('focus');
  next.addClass('focus');
  return this;
};


/**
 * Focus the menu.
 *
 * @return {Menu}
 */

exports.focus = function () {
  this.el.focus();
  return this;
};


/**
 * Unfocus all menu items.
 *
 * @return {Menu}
 */

exports.unfocus = function () {
  this.list.removeClass('focus');
  return this;
};


/**
 * Hover handler.
 */

exports.onmouseover = function (e) {
  this.unfocus();
};


/**
 * Keydown handler.
 */

exports.onkeydown = function (e) {
  switch (keyname(e.keyCode)) {
    case 'enter':
      var el = select(this.list, 'focus').get(0);
      for (var id in this.items) {
        if (el === this.items[id].el) {
          this.select(id);
          break;
        }
      }
      break;

    case 'up':
      prevent(e);
      this.previous();
      break;

    case 'down':
      prevent(e);
      this.next();
      break;
  }
};


/**
 * Focus handler.
 */

exports.onfocus = function (e) {
  this.events.bind('keydown');
};


/**
 * Blur handler.
 */

exports.onblur = function (e) {
  this.events.unbind('keydown');
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


/**
 * Select an element with a `className` in a `list`.
 *
 * @param {List} list
 * @param {String} className
 * @return {List}
 */

function select (list, className) {
  return list.select(function (list) {
    return list.hasClass(className);
  });
}