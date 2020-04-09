/**
 * <project-table>
 * -----------------------------------------------------------------------------
 * All of the projects visible to the viewer 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('project-table', {
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
      <table id="project-table">

                <thead>
                  <tr>
                    <th data-field="name">Project Name</th>
                    <th data-field="edit">Edit</th>
                    <th data-field="delete">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="project" v-for="project in projects">
                    <td v-if="project.team_id"><a :href="'/'+project.team_id.slug+'/'+project.slug"> {{ project.project_name }} </a> </td>
                    <td v-else><a :href="'/'+project.user_id.slug+'/'+project.slug"> {{ project.project_name }} </a> </td>
                    <td><button type="button" class="btn btn-success edit" >Edit</button></td>
                    <td><button type="button" class="btn btn-danger delete" >Delete</button></td>
                    <input type="hidden" class="project_id" :value="project.project_id"/>
                    <input type="hidden" class="project_name" :value="project.project_name"/>
                    <input type="hidden" class="project_description" :value="project.project_description"/>
               
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
    this.init();
  },
  created: function() {
    this.tabs = this.$children;
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    init: function() {
      //bind all our actions
      this.bindUIActions();
    },
    bindUIActions: function() {
      var ProductTable = this;
      var id = ProductTable.id;
      ProductTable.delete();
      ProductTable.edit();
    },
    edit() {
      var ProductTable = this;
      var id = ProductTable.id;
      $("#"+id+ " .edit").on( "click", function() {
        var project_row = $(this).parents(".project"); 
        var project_update  = {};

        project_update.project_id = project_row.find('.project_id').val();
        project_update.project_name = project_row.find('.project_name').val();
        project_update.project_description = project_row.find('.project_description').val();
        console.log("components table project table project_row",project_row);
        console.log("components table project table project_update",project_update);
        Project.editProject(project_update);
      });
    },
    delete() {
      var ProductTable = this;
      var id = ProductTable.id;
      $("#"+id+ " .delete").on( "click", function() {
        var project_row = $(this).parents(".project"); 
        var project_id = project_row.find('.project_id').val();
        console.log("components table project table project_row",project_row);
        console.log("components table project table project_id",project_id);
        project_row.remove();
        Project.deleteProject(project_id);
      });
    },
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
          tab.isActive = (tab.name == selectedTab.name);
      });
    }
  }
});
