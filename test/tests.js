describe('Menu', function () {
  var assert = require('assert')
    , Menu = require('menu')
    , type = require('type');

describe('#el', function () {
  it('should have an .el property', function () {
    var menu = new Menu();
    assert('element' === type(menu.el));
  });
});

describe('#add(model)', function () {
  it('should add an item to the menu', function () {
    var menu = new Menu();
    assert(0 === menu.el.childNodes.length);
    menu.add('item');
    assert(1 === menu.el.childNodes.length);
  });
});

});