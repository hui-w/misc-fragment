Vue.component('table', {
  props: ['row'],
  render: function(createElement) {

    var header_duration = createElement('span', { class: 'duration' }, this.project.month_from + ' - ' + this.project.month_to);
    var header_name = createElement('span', { class: 'name' }, this.project.project_name);
    var header = createElement('h2', { class: 'project-header' }, [header_duration, header_name]);

    var description_header = createElement('h3', "Project Description:");
    var description = createElement('p', { class: 'description' }, this.project.project_description);

    return createElement(
      'div', {
        class: 'project'
      }, [
        header,
        description_header,
        description,
        createElement('repeator', { props: { title: 'Responsibilities', items: this.project.responsibilities } }),
        createElement('repeator', { props: { title: 'Skills Used:', items: this.project.skill_set, className: 'skills' } }),
      ]
    )
  }
})