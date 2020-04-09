/**
 * <tutorial-modals>
 * -----------------------------------------------------------------------------
 * Pile of tutorial that show up next to tutorial 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('tutorial-modals', {
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
    <div class="tutorialModals" >
        <!-- start view quick start modal !-->
        <div id="quick_start_modal" class="modal quickStartModal helpModal">
            <div class="header unselectable">
                <h2>How This Works</h2>
                <div class="modalCloseButton">X</div>
            </div>
            <div class="content">
                
                <div class="quickStartPages">
                <div class="video">
                    <div class="video-box">
                    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/8Ee4QjCEHHc" frameborder="0" gesture="media" allowfullscreen></iframe> -->
                    <iframe src="https://player.vimeo.com/video/299530990" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
                <div class="project">
                    <label>Create A Project</label><br>
                    <input type="text" class="name" required  maxlength="45" placeholder="Project Name">
                    <textarea class="description" placeholder="Project Description"></textarea>
                    <button class="save">Save</button>
                </div>
                <div class="templates">
                    <!-- <label> Suggested Templates </label>  -->
                </div>
                </div>

                <div class="quickStartBottom quickStartNav selectTemplateBottom">
                <div class="showAgain">
                    <input type="checkbox" value="yes" checked="checked" id="show_again" name="show_again">
                    <label for="show_again"> Show this everytime</label>

                </div>
                <!-- <button class="save">Close</button> -->
                <input type="hidden" value="start" class="page"/>
                <button class="btn back">Back</button>
                <button class="btn skip">Skip</button>
                <button class="btn video">Back</button>
                <button class="btn project">Create A Project</button>
                <button class="btn templates">Select A Template</button>
                </div>
                
                
            </div>
        </div>
        <!-- end view quick start modal !-->

        <!-- start view tutorial modal !-->
        <div id="tutorial_modal" class="modal tutorialModal quickStartModal helpModal">
            <div class="header unselectable">
                <h2>Tutorial</h2>
                <div class="modalCloseButton">X</div>
            </div>
            <div class="content">
                
                <div class="quickStartPages">
                <div class="video">
                    <div class="video-box">
                    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/8Ee4QjCEHHc" frameborder="0" gesture="media" allowfullscreen></iframe> -->
                    <iframe src="https://player.vimeo.com/video/252937312" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
                <div class="project">
                    <label>Create A Project</label><br>
                    <input type="text" class="name" required  maxlength="45" placeholder="Project Name">
                    <textarea class="description" placeholder="Project Description"></textarea>
                    <button class="save">Save</button>
                </div>
                <div class="templates">
                    <!-- <label> Suggested Templates </label>  -->
                </div>
                </div>

                <div class="quickStartBottom quickStartNav selectTemplateBottom">
                
                <!-- <button class="save">Close</button> -->
                <!-- <input type="hidden" value="start" class="page"/>
                <button class="btn back">Back</button>
                <button class="btn skip">Skip</button>
                <button class="btn video">Back</button>
                <button class="btn project">Create A Project</button>
                <button class="btn templates">Select A Template</button> -->
                </div>
                
                
            </div>
        </div>
        <!-- end view tutorial modal !-->

        <!-- start view why start modal !-->
        <div id="why_start_modal" class="modal whyStartModal">
            <div class="header unselectable">
            <h2>Why Use Mosaic Junction</h2>
            <div class="modalCloseButton">X</div>
            </div>
            <div class="content">
            <div class="quickStartPages">
                <div class="video">
                <div class="video-box">
                    <iframe src="https://player.vimeo.com/video/282584119" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                </div>
            </div>
        
            <div class="quickStartBottom quickStartNav selectTemplateBottom">
                <button class="btn login">Login</button>
                <button class="btn register">Sign Up</button>
            </div>
            </div>
        </div>
        <!-- end view why start modal !-->







         
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
