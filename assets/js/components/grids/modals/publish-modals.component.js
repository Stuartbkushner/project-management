/**
 * <publish-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to publish 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('publish-modals', {
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
    <div  class="publishModals">
        <!-- start new/edit publish modal !-->
          <div id="published_modal" class="modal publishedModal">
            <div class="header unselectable">Publish Grid<div class="modalCloseButton">X</div></div>
            <div class="content">
              <input id="publish-name" type="text" class="name" placeholder="Publish Name">
              <textarea id="publish-description" class="description" placeholder="Publish Description"></textarea>
              <label>Select a grid to publish</label>
              <select class="publishedModalGrids">
                <!-- <?php 
                if (isset($grids)) {
                  foreach(json_decode($grids) as $grid) {?>
                    <option value="<?php echo $grid->grid_id; ?>"><?php echo $grid->grid_title; ?></option>
                  <?php 
                  }
                } 
                ?> -->
              </select>
              <label>Public Name</label>
              <input id="contact-username" type="text" disabled="disabled" class="contact-username" placeholder="Public Name">
              <h5>Optional Contact Info seen on Mosaic Junction Public View </h5>
              <label>Name</label>
              <input id="contact-name" type="text" class="contact-name" placeholder="Contact Name">
              <label>Phone</label>
              <input id="phone" type="text" class="phone" placeholder="Phone Number">
              <label>Email</label>
              <input id="email" type="text" class="email" placeholder="Email">
              <label>Message</label>
              <textarea id="message" class="message" placeholder="Message..."></textarea>
              <button class="save">Publish</button>
            </div>
          </div>
        <!-- end new/edit publish modal !--> 

        <!-- start contact modal !-->
        <div id="contact_modal" class="modal contactModal">
          <div class="header unselectable">Public Info<div class="modalCloseButton">X</div></div>
          <div class="content">
            <label>Public Name</label>
            <input id="contact-username" type="text" disabled="disabled" class="contact-username" placeholder="Public Name">
            <h5>Optional Contact Info seen on Mosaic Junction Public View </h5>
            <label>Name</label>
            <input id="contact-name" type="text" class="contact-name" placeholder="Contact Name">
            <label>Phone</label>
            <input id="phone" type="text" class="phone" placeholder="Phone Number">
            <label>Email</label>
            <input id="email" type="text" class="email" placeholder="Email">
            <label>Message</label>
            <textarea id="message" class="message" placeholder="Message..."></textarea>
            <button class="save">Save</button>
          </div>
        </div>
        <!-- end contact modal !-->

        <!-- start view published modal !-->
        <div id="view_published_modal" class="modal">
          <div class="header unselectable"><div class="modalCloseButton">X</div></div>
          <div class="content">
            <label>Grid Title</label>
            <div class="publishedGridTitle">Test grid title</div>

            <div class="tabs">
              <label class="tab link">Share URL</label>
              <label class="tab embed">Embed</label>
            </div>
            <div class="publishedEmbedInfo">
              <textarea class="publishedEmbedWrapper" readonly>http://thisisatesturl.com</textarea>
            </div>
            <div class="publishedShare">
              <textarea class="publishedShareLink" readonly>http://thisisatesturl.com</textarea>
              <div>This Grid will also
        be published in your Public File on the Mosaic Junction
        website. See help file for details.</div>
            </div>
            <button class="btn copy-embed">Copy</button>
            <button class="btn copy-link">Copy</button>
          </div>
        </div>
        <!-- end view published modal !-->



        
       
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
