/**
 * <project-page-table>
 * -----------------------------------------------------------------------------
 * All of the projects visible to the viewer 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('project-page-table', {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    props: [
      'id',
      'projects'
    ],
  
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: function (){
      return {
   
      };
    },
  
    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    template: `
    <table id="project-page-table">
            <thead>
              <tr>
                <th data-field="id">Project ID</th>
                <th data-field="name">Project Name</th>
                <th data-field="description">Project Description</th>
                <th data-field="version">Project Version</th>
                <th data-field="order">Project Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects">
                <td>{{ project.project_id }}</td>
                <td>{{ project.project_name }}</td>
                <td>{{ project.project_description }}</td>
                <td>{{ project.project_version }}</td>
                <td>{{ project.project_order }}</td>
              </tr>
            </tbody>
    </table>
  `,
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
  
    },
    mounted: function(){
  
    },
    created: function() {
      this.tabs = this.$children;
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
            tab.isActive = (tab.name == selectedTab.name);
        });
      }
    }
  });
  