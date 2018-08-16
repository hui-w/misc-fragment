function AesCryptoApp(wrapperId) {
    this.wrapper = $(wrapperId);
    this.toolbar = null;
    this.workspace = null;
    this.render();
}

AesCryptoApp.prototype = {
    render: function() {
        this.toolbar = this.wrapper.createChild("div", {
            "class": "toolbar"
        }, 'TB');

        this.workspace = this.wrapper.createChild("div", {
            "class": "workspace"
        }, 'WS');

        this.renderToolbar();
        this.renderWorkspace();
    },

    renderToolbar: function() {

    },

    renderWorkspace: function() {

    }
}