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
    validateKeyAndCall: function(func) {
        if (typeof func == "function") {
            var key = this.getKey();
            if (key.length > 0) {
                func(key);
            } else {
                this.keyInput.focus();
            }
        }
    },

    handleOnEncryptClick: function(e) {
        this.validateKeyAndCall(this.onEncrypt);
    },

    handleOnDecryptClick: function(e) {
        this.validateKeyAndCall(this.onDecrypt);
    },

    getKey: function() {
        return this.keyInput.value;
    },

    render: function() {
        this.container = this.parent.createChild('div', {
            class: 'toolbar aesapp-form'
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
        this.keyInput.addEventListener("click", function() { this.select() }, true);

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