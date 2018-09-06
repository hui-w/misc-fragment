function Toolbar(parent) {
    this.parent = parent;
    this.container = null;
    this.keyInput = null;
    this.encryptButton = null;
    this.decryptButton = null;

    // Events
    this.onEncrypt = null;
    this.onDecrypt = null;

    this.render();
}

Toolbar.prototype = {
    handleOnEncryptClick: function(e) {
        if (typeof this.onEncrypt == "function") {
            var key = $('txtPassword').value;
            this.onEncrypt(key);
        }
    },

    handleOnDecryptClick: function(e) {
        if (typeof this.onDecrypt == "function") {
            var key = $('txtPassword').value;
            this.onDecrypt(key);
        }
    },

    render: function() {
        this.container = this.parent.createChild('div', {
            class: 'toolbar toolbar-form'
        });

        // Title
        this.container.createChild('div', {
            class: 'toolbar__title-container'
        }, 'AES');

        // Key Input
        var keyInputContainer = this.container.createChild('div', {
            class: 'toolbar__input-container'
        });
        this.keyInput = keyInputContainer.createChild('input', {
            id: 'txtPassword',
            type: 'password',
            placeholder: 'Input Key',
            class: 'toolbar__key-input'
        });

        // Buttons
        var buttonsContainer = this.container.createChild('div', {
            class: 'toolbar__button-container'
        });
        this.encryptButton = buttonsContainer.createChild('input', {
            type: 'button',
            value: 'Encrypt'
        }).addEventListener("click", this.handleOnEncryptClick.bind(this), true);
        this.decryptButton = buttonsContainer.createChild('input', {
            type: 'button',
            value: 'Decrypt'
        }).addEventListener("click", this.handleOnDecryptClick.bind(this), true);
    },
}