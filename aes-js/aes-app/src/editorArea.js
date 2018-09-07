function EditorArea(parent) {
    this.parent = parent;
    this.container = null;
    this.textArea = null;

    this.render();
}

EditorArea.prototype = {
    getText: function() {
        return this.textArea.value;
    },

    setText: function(value) {
        this.textArea.value = value;
    },

    setFocus: function() {
        this.textArea.focus();
    },

    render: function() {
        this.container = this.parent.createChild('div', {
            'class': 'editor aesapp-form'
        });

        this.textArea = this.container.createChild('textarea', { 'id': 'txtContent' });
        this.textArea.addEventListener("click", function() { this.select() }, true);
    },
}