function App(wrapperId) {
    this.wrapper = $(wrapperId);
    this.toolbar = null;
    this.editorArea = null;
    this.overlay = null;

    this.init();
}

App.prototype = {
    checkContent: function() {
        var content = this.editorArea.getText();
        if (content.length > 0) {
        	return true;
        } else {
        	this.editorArea.setFocus();
        	return false;
        }
    },

    // Encrypt button click handler
    handleOnEncrypt: function() {
    	if (!this.checkContent()) {
    		return;
    	}

        var toolbarKey = this.toolbar.getKey();
        var confirmKey = this.overlay.getKey();
        if (toolbarKey !== confirmKey) {
            this.overlay.show(toolbarKey);
        } else {
            var content = this.editorArea.getText();
            var encrypted = CryptoJS.AES.encrypt(content, toolbarKey);
            this.editorArea.setText(encrypted);
        }
    },

    // Decrypt button click handler
    handleOnDecrypt: function() {
    	if (!this.checkContent()) {
    		return;
    	}

        var content = this.editorArea.getText();
        const key = this.toolbar.getKey();
        const decrypted = CryptoJS.AES.decrypt(content, key).toString(CryptoJS.enc.Utf8);
        this.editorArea.setText(decrypted);
    },

    // When the key is confirmed in the overlay
    handleOnConfirm: function() {
        this.overlay.hide();
        this.handleOnEncrypt();
    },

    init: function() {
        // Components
        this.toolbar = new Toolbar(this.wrapper);
        this.editorArea = new EditorArea(this.wrapper);
        this.overlay = new Overlay(this.wrapper);

        // Callbacks
        this.toolbar.onEncrypt = this.handleOnEncrypt.bind(this);
        this.toolbar.onDecrypt = this.handleOnDecrypt.bind(this);
        this.overlay.onConfirm = this.handleOnConfirm.bind(this);
    }
}