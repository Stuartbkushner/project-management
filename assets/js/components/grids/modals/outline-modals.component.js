/**
 * <outline-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to outline 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('outline-modals', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    //…
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
    <div  class="outlineModals">
        <div id="view_outline_modal" class="modal viewOutlineModal">
            <div class="header unselectable">Copy/Paste/Print Outline<div class="modalCloseButton">X</div></div>
            <div class="content">
            <label class="">Project</label>
            <select name="project" class=" projectSelect">
      
                <option v-for="project in projects" :value="project.project_id"> {{project.project_name}}</option>
      
            </select>
            <div class="outline_info">
                <div class="view_outline_modal_title"></div>
                <div class="view_outline_modal_outline"></div>
            </div>
            <button class="copy">Copy</button>
            <button class="save">Edit</button>
            <TEXTAREA ID="holdtext" STYLE="display:none;">
            </TEXTAREA>
            </div>
        </div>
        <div id="outline_modal" class="modal outlineModal">
            <div class="header unselectable">Outline<div class="modalCloseButton">X</div>
                <input type="hidden" value="0" class="outlineID">
            </div>
            <div class="content">
                <input type="text" class="outlineTitle" placeholder="Title"> 
                <div class="outlineContainer ui-sortable"></div>
                <button class="save">Save and View</button>
            </div>
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
