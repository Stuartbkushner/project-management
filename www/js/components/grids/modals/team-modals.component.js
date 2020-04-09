/**
 * <team-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to team 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('team-modals', {
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
    <div  class="teamModals">
        <!-- start new team modal !-->
        <div id="new_group_modal" class="modal newGroupModal">
            <div class="header unselectable"><div class="modalCloseButton">X</div></div>
            <div class="content">
                <input type="text" class="new_group_name" placeholder="Team Name">
                <input type="hidden" class="new_group_id" value="0">
                <button class="save">Save</button>
            </div>
        </div>
        <!-- end new team modal !--> 

        <!-- start invite team modal !-->
        <div id="invite_to_group_modal" class="modal inviteUserToGroupModal">
            <div class="header unselectable"><div class="modalCloseButton">X</div></div>
            <div class="content">
                <div>Enter the e-mail address of the perosn you'd like to invite.</div>
                <div>If this person already has an account, they will receive a notification.</div>
                <div>If this person does not already have an account, they will receive an e-mail in order to create an account.</div>
                <input type="text" class="invite_user_email" placeholder="E-mail Address">
                <button class="save">Send Invite</button>
            </div>
        </div>
        <!-- end new team modal !--> 

        <!-- start view team modal !-->
        <div id="view_groups_modal" class="modal viewGroupsModal">
            <div class="header unselectable">My Teams<div class="modalCloseButton">X</div></div>
            <div class="content">

                <div class="groupInvites">
                </div>

                <div class="groupContainer">
                <div class="groupDetails">
                    <div class="groupName"></div>
                </div>
                <div class="groupActions">
                </div>

                <div class="groupMembers">

                    <div class="groupMember">
                    <div class="groupMemberDetails">
                        <div class="groupMemberName"></div>
                        <div class="groupMemberEmail">
                        <a href="mailto:info@mousetechs.com" class="blueLink"></a>
                        </div>
                    </div>
                    <div class="groupMemberActions">
                    </div>
                    <div style="clear:both;"></div>
                    </div>

                </div>
                </div>
                <button class="save">Create a new Team</button>
                
            </div>
        </div>
        <!-- end view team modal !-->
       
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
