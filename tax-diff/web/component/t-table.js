Vue.component('t-table', {
    props: ['title', 'data', 'className'],
    render: function(createElement) {

        var title = createElement('h3', this.title);

        var header = createElement('tr', [
            createElement('th', 'Level'),
            createElement('th', 'Description'),
            createElement('th', 'Rate'),
            createElement('th', 'Tax')
        ]);

        console.log(this.data)

        var rows = [header];
        for (var i = 0; i < this.data.length; i++) {
            var columns = [
                createElement('td', this.data[i].level),
                createElement('td', this.data[i].description),
                createElement('td', this.data[i].rate),
                createElement('td', this.data[i].tax)
            ];
            rows.push(createElement('tr', columns));
        }

        var body = createElement('table', rows);

        return createElement(
            'div', {
                class: this.className
            }, [title, body]
        )
    }
})