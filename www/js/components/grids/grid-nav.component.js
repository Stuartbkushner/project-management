/**
 * <grid-nav>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to grid 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('grid-nav', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    //…
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
    <div class="navColumn col1">
      <div class="navColumnContent unselectable">
        <div style='padding-left:20px;'>
          <div class="listHeader navProjects">
            <div class="arrowRightIcon left"></div>
            <span class="show-projects">Projects</span>
            <div class="plusIcon right" id="new_project_button"></div>
          </div>
          <div class="listContainer">
            <ul id="project_list">
            </ul>
          </div>
          <div class="listHeader navGrids">
            <div class="arrowRightIcon left"></div>
            Grids
            <div class="plusIcon right" id="new_grid_button"></div>
          </div>
          <div class="listContainer">
            <ul id="grid_list">
            </ul>
          </div>
          <div class="listHeader navSources">
            <div class="arrowRightIcon left"></div>
            Source files
            <div class="plusIcon right" id="new_source_button"></div>
          </div>
          <div class="listContainer">
            <ul id="source_list">
            </ul>
          </div>

          <div class="listHeader navOutlines">
            <div class="arrowRightIcon left"></div>
            Outlines
            <div class="plusIcon right" id="new_outline_button"></div>
          </div>
          <div class="listContainer">
            <ul id="outline_list">
            </ul>
          </div>
          <div class="listHeader navPublished">
            <div class="arrowRightIcon left"></div>
            Published
            <div class="plusIcon right" id="new_published_button"></div>
          </div>
          <div class="listContainer">
            <ul id="published_list">
            </ul>
          </div>

          <div class="listHeader navTemplates">
            <div class="arrowRightIcon left"></div>
            Templates
            <div class="plusIcon right" id="new_template_button"></div>
          </div>
          <div class="listContainer">
            <ul id="template_list">
            </ul>
          </div>
        </div>

      </div>
      <div class="navColumnActions">
        <div class="navToggle"></div>
      </div>
    </div>
  
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: function(){

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    
  }
});
