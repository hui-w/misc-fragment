function App(wrapperId) {
    this.wrapper = $(wrapperId);
    this.toolbar = null;
    this.workspace = null;
    this.init();
}

App.prototype = {
    init: function() {
        this.toolbar = new Toolbar(this.wrapper);
        this.editorArea = new EditorArea(this.wrapper);
    }
}