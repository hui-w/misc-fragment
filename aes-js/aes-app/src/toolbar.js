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

        // Title
        this.keyInput = this.container.createChild('div', {
            class: 'toolbar__title-container'
        }, 'AES');

        // Key Input
        this.keyInput = this.container.createChild('div', {
            class: 'toolbar__input-container'
        }).createChild('input', {
            type: 'password',
            placeholder: "Input Key",
            class: 'toolbar__key-input'
        });

        // Process Button
        this.processButton = this.container.createChild('div', {
            class: 'toolbar__button-container'
        }).createChild('input', {
            type: 'button',
            value: 'Process'
        });
    },
}