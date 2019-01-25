Vue.component('repeator', {
  props: ['title', 'items', 'className'],
  render: function(createElement) {

    var listItems = [];
    for (var i = 0; i < this.items.length; i++) {
      listItems.push(createElement('li', this.items[i]))
    }

    var header = createElement('h3', this.title);
    var body = createElement('ul', listItems);


    return createElement(
      'div', {
        class: this.className
      }, [header, body]
    )
  }
})