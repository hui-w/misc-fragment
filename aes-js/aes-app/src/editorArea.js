function EditorArea(parent) {
    this.parent = parent;
    this.container = null;
    this.textArea = null;
    this.render();
}

EditorArea.prototype = {
    render: function() {
        this.container = this.parent.createChild('div', {
            'class': 'editor'
        });

        this.textArea = this.container.createChild('textarea', { 'id': 'txtContent' });
    },
}