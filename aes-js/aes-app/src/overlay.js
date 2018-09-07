function Overlay(parent) {
    this.parent = parent;
    this.container = null;
    this.keyInput = null;
    this.confirmButton = null;

    // The key which is to be confirmed
    this.keyToConfirm = null;

    this.onConfirm = null;

    this.render();
}

Overlay.prototype = {
    handleOnConfirmClick: function(e) {
        var key = this.getKey();
        if (key === this.keyToConfirm) {
            if (typeof this.onConfirm == "function") {
                this.onConfirm();
            }
        } else {
            // Confirm failed
            this.keyInput.focus();
            this.keyInput.select();
        }
    },

    getKey: function() {
        return this.keyInput.value;
    },

    render: function() {
        this.container = this.parent.createChild('div', {
            'class': 'overlay aesapp-form',
            'id': 'overlay'
        });

        var contentContainer = this.container.createChild('div', {
            'class': 'overlay__content'
        });

        // Form
        var confirmForm = contentContainer.createChild('div', {
            'class': 'overlay__confirm-form'
        });

        // Text input
        this.keyInput = confirmForm.createChild('input', {
            'type': 'password',
            'placeholder': 'Confirm Key',
        });
        this.keyInput.addEventListener("click", function() { this.select() }, true);

        // Buttons
        var confirmButtons = confirmForm.createChild('div', {
            'class': 'overlay__confirm-buttons'
        });

        this.confirmButton = confirmButtons.createChild('input', {
            type: 'button',
            value: 'Confirm'
        }).addEventListener("click", this.handleOnConfirmClick.bind(this), true);
        this.cancelButton = confirmButtons.createChild('input', {
            type: 'button',
            value: 'Cancel'
        }).addEventListener("click", this.hide.bind(this), true);
    },

    show: function(keyToConfirm) {
        this.container.style.display = "block";
        this.keyToConfirm = keyToConfirm;
        this.keyInput.focus();
    },

    hide: function() {
        this.container.style.display = "none";
    }
}