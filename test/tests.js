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

describe('menu', function () {
  var assert = require('assert')
    , menu = require('menu')
    , view = require('view');

  it('should return a constructor', function () {
    var View = view('<div></div>');
    var Menu = menu(View);
    assert('function' === typeof Menu);
  });

  it('should emit construct', function (done) {
    var View = view('<div></div>');
    var Menu = menu(View);
    Menu.on('construct', function (menu) {
      done();
    });
    new Menu();
  });
});