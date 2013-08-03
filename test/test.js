
/**
 * Menu.
 */

var Menu = require('menu');

var menu = new Menu();

menu.add('one');
menu.add('two');
menu.add('three');
menu.add('four');
menu.add('five');

document.body.appendChild(menu.el);


/**
 * Next + previous.
 */

var next = document.getElementById('next');
next.onclick = function (e) {
  menu.next();
};

var previous = document.getElementById('previous');
previous.onclick = function (e) {
  menu.previous();
};

var focus = document.getElementById('focus');
focus.onclick = function (e) {
  menu.focus();
};

var select = document.getElementById('select');
select.onclick = function (e) {
  menu.select();
};