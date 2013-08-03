
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

var next = document.createElement('button');
next.textContent = 'next';
next.onclick = function (e) {
  menu.next();
};
document.body.appendChild(next);

var previous = document.createElement('button');
previous.textContent = 'previous';
previous.onclick = function (e) {
  menu.previous();
};
document.body.appendChild(previous);