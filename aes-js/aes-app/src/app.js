function App(wrapperId) {
    this.wrapper = $(wrapperId);
    this.toolbar = null;
    this.workspace = null;
    this.init();
}

App.prototype = {
    handleOnEncrypt: function(key) {
        var content = $('txtContent').value;
        $('txtContent').value = CryptoJS.AES.encrypt(content, key);
    },

    handleOnDecrypt: function(key) {
        var content = $('txtContent').value;
        $('txtContent').value = CryptoJS.AES.decrypt(content, key).toString(CryptoJS.enc.Utf8);
    },

    init: function() {
        this.toolbar = new Toolbar(this.wrapper);
        this.editorArea = new EditorArea(this.wrapper);

        this.toolbar.onEncrypt = this.handleOnEncrypt.bind(this);
        this.toolbar.onDecrypt = this.handleOnDecrypt.bind(this);
    }
}