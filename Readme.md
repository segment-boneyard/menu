
# Menu

  A menu UI element, with items that can be selected.

## Installation

    $ component install segmentio/menu

## Example

```js
var Menu = require('menu');

var menu = new Menu()
  .add('One')
  .add('Two')
  .add('Three');

menu.select('Three');
```

## API

### Menu(View)
  Initialize a new Menu with an optional item `View` constructor, defaulting to a simple one:

```html
<li class="menu-item {id}-menu-item"><a>{id}</a></li>
```

### .add(model|id)
  Add an item to the menu with either a `model` or an `id` string. The default item view uses the model's `text` and/or `id` field to populate it's DOM.

### .select(id)
  Select a menu item.

### .deselect()
  Deselect all menu items.

## License

  MIT
