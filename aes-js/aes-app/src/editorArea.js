function EditorArea(parent) {
    this.parent = parent;
    this.container = null;
    this.render();
}

EditorArea.prototype = {
    render: function() {
        this.container = this.parent.createChild("div", {
            "class": "editor"
        }, 'Editor');
    },
}