/**
 * <source-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to source 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('sourceModals', {
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
    <div class=" sourceModals">
      <!-- start new source modal -->
        <div class="modal newSourceModal">
            <div class="header unselectable"><div class="modalCloseButton">X</div></div>
            <div class="content">
                <div class="newSourceRight">
                    <div class="formContainer">
                        <form id="new_source_form" method="POST" action="/action?action=saveSource" enctype="multipart/form-data">
                        <input type="hidden" id="new_source_id" value="0">
                        <input type="hidden" name="new_source_project_id" id="new_source_project_id" value="" />
                        <label>Source Title:</label><input type="text" name="new_source_title" id="new_source_title">
                        <label>Source Author:</label><input type="text" name="new_source_author" id="new_source_author">
                        <label>Source Type:</label>
                        <select name="new_source_type" id="new_source_type">
                            <option value="pdf">PDF/Image</option>
                            <option value="webpage">URL</option>
                <!--                         <option disabled="disabled" class="futureFeature" value="word">Word Document</option>
                            <option disabled="disabled" class="futureFeature" value="excel">Excel Document</option> -->
                        </select>
                        <div class="source_formats_text">Supported types: PDF, Image, URL, Text. Word documents must first be converted to PDFs. Google Docs need to be downloaded as a PDF.</div>
                        <div id="source_type_text_container">
                            <textarea name="new_source_text"></textarea>
                        </div>
                        <div id="source_type_url_container">
                            <input type="text" id="source_url_input" name="source_url_input" placeholder="Enter URL..."/>
                        </div>
                        <div id="loading"  class="loading"  ></div>
                        <div id="source_type_file_container">
                <!-- 						<label>File:</label>
                            <input type="file" name="new_source_file" id="new_source_file" /> -->
                            <div class="box__input">
                            <svg class="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
                            <!-- <input name="files[]" id="file" class="box__file" data-multiple-caption="{count} files selected" multiple="" type="file"> -->
                            <label for="file" class="dragDropChoose"><strong>Drag a PDF or Image here to upload.</strong><span class="box__dragndrop"></span></label>
                            <!-- <button type="submit" class="box__button">Upload</button> -->
                            </div>

                        </div>
                        </form>

                        <button class="save">Save</button>

                    </div>
                </div>
            </div>
        </div>
        <!-- end new source modal -->

        <!-- start edit source modal -->
        <div class="modal" id="edit_source_modal">
          <div class="header unselectable">Edit Source<div class="modalCloseButton">X</div></div>
          <div class="content">
            <input type="hidden" value="" class="edit_source_source_id">
            <label>Source Title:</label><input type="text" class="edit_source_source_title">
            <label>Source Author:</label><input type="text" class="edit_source_source_author">
            <button class="save">Save</button>
          </div>
        </div>
        <!-- end edit source modal -->

        <!-- start view source modal -->
        <div id="source_modal" class="modal source_modal">
          <div class="header unselectable">
            <input type="hidden" class="view_source_source_id">
            <div class="sourceNav">
              <img src="/images/arrow_circleD.png" onclick="goPrevious();">
              <img src="/images/arrow_circleU.png" onclick="goNext();">
            </div>

            <div class="pageNumbers">
              <input type="text" value="1">
              <div class="pageCount">/ 1</div>
              <div class="goButton"><button>Go</button></div>
              <div class="clearBoth"></div>
            </div>

            <div class="sourceNewTile">
              To start a new tile, highlight text on your source document, or click <a class="blueLink bold source_create_tile_btn">here</a> for a general tile.
            </div>

            <div class="sourceTitle"></div>
            <div class="modalCloseButton">X</div>
          </div>

          <div class="content">
            <div class="clearBoth"></div>
            <div class="sourceLeft"></div>
            <div class="sourceRight">
              <div class="sourceContainer">
              </div>
            </div>
            <div class="clearBoth"></div>
          </div>
        </div>
        <!-- end view source modal -->

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
