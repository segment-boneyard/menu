# Menu

  A menu UI element, with items that can be selected.

## Installation

    $ component install segmentio/menu

## Example
  
  For quick, standard menus, treat it as a constructor:

```js
var Menu = require('menu');

var menu = new Menu()
  .add('One')
  .add('Two')
  .add('Three');

menu.select('Three');
```

  Or, for more complex menus, you can use it as a factory, passing in your own `MenuItem` view.

```js
var MenuItem = require('./menu-item')
  , createMenu = require('menu');

var Menu = createMenu(MenuItem);

var menu = new Menu()
  .add('One')
  .add('Two')
  .add('Three');

menu.select('Three');
```

## API

### new Menu()
  Initialize a new Menu the default item view:

```html
<li class="menu-item {slug}-menu-item"><a>{text || id}</a></li>
```

### menu(View) 
  Create a new `Menu` constructor with the given `Item` view.

### .add(model | id)
  Add an item to the menu with either a `model` or an `id` string. The default item view uses the model's `text` and/or `id` field to populate it's DOM.

### .select(id)
  Select a menu item.

### .deselect()
  Deselect all menu items.

## License

  MIT
