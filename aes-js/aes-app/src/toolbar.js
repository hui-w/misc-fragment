function Toolbar(parent) {
    this.parent = parent;
    this.container = null;
    this.render();
}

Toolbar.prototype = {
    render: function() {
        this.container = this.parent.createChild("div", {
            "class": "toolbar"
        }, 'TB');
    },
}