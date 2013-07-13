
var domify = require('domify')
  , reactive = require('reactive')
  , slug = require('slug')
  , template = require('./template');


/**
 * Expose `ItemView`.
 */

module.exports = ItemView;


/**
 * Initialize a new `ItemView`.
 */

function ItemView (model) {
  this.model = model;
  this.el = domify(template);
  this.reactive = reactive(this.el, model, this);
}


/**
 * Get the id of the model.
 *
 * @return {String}
 */

ItemView.prototype.id = function () {
  return this.model.id || this.model.primary();
};


/**
 * Make a slug out of the id.
 *
 * @return {String}
 */

ItemView.prototype.slug = function () {
  return slug(this.id());
};