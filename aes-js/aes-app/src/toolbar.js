function Toolbar(parent) {
    this.parent = parent;
    this.container = null;
    this.keyInput = null;
    this.processButton = null;
    this.render();
}

Toolbar.prototype = {
    render: function() {
        this.container = this.parent.createChild('div', {
            class: 'toolbar toolbar-form'
        });

        // Key Input
        this.keyInput = this.container.createChild('div', {
            class: 'toolbar__input'
        }, 'Key:').createChild('input', {
            type: 'password'
        })

        // Process Button
        this.processButton = this.container.createChild('div', {
            class: 'toolbar__button'
        }).createChild('input', {
            type: 'button',
            value: 'Process'
        })
    },
}