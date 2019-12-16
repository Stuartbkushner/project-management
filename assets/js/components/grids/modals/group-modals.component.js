/**
 * <group-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to group 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('group-modals', {
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
    <div class="group-modals"> 
      <div class="modal"  id="group_modal">
          <div class="header unselectable"><div class="modalCloseButton">X</div></div>
          <div class="content">
              <input type="hidden" value="1" class="groupBorderInput">
              <input type="hidden" class="add_to_new_group_group_id" value="0">
              <label>Title:</label><input type="text" class="add_to_new_group_title" name="add_to_new_group_title">
              <label>Description:</label><textarea class="add_to_new_group_desc" name="add_to_new_group_desc"></textarea>
              <label>Group Border:</label>
              <div class="groupDashed groupIcon left group_border_1 groupSelected"></div>
              <div class="groupDotted groupIcon left group_border_2"></div>
              <div class="groupSolid groupIcon left group_border_3"></div>
              <div class="clearBoth"></div>
              <button class="save">Save</button>
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
