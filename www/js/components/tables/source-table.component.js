/**
 * <source-table>
 * -----------------------------------------------------------------------------
 * All of the projects visible to the viewer 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('source-table', {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    props: [
      'id',
      'sources'
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
    <table id="source-table">

        <thead>
        <tr>
          <th data-field="name">Source Name</th>
          <th data-field="edit">Edit</th>
          <th data-field="delete">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="source in sources">
          <td v-if="true" ><a :href="'/sources/'+source.project_id.slug+'/'+source.slug"> {{ source.source_title }} </a> </td>
          <td v-else-if="source.team_id" ><a :href="'/'+source.team_id.slug+'/'+source.project_id.slug+'/sources/'+source.slug"> {{ source.source_title }} </a> </td>
          <td v-else><a :href="'/'+source.user_id.slug+'/'+source.project_id.slug+'/sources/'+source.slug"> {{ source.source_title }} </a> </td>
          <td><button type="button" class="btn btn-success">Edit</button></td>
          <td><button type="button" class="btn btn-danger">Delete</button></td>
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
  