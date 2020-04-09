/**
 * <tile-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to tiles 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('tile-modals', {
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
    <div class="tileModals" >
        <!-- start view tile modal !-->
        <div id="view_tile_template" class="modal viewTileTemplate">
            <div class="header unselectable"><div class="modalCloseButton">X</div></div>
            <div class="content">
                <input type="hidden" class="view_tile_tile_id" value="0">
                <div class="viewTileLeft">
                <div>
                    <label>Tile Title</label>
                    <div class="view_tile_tile_title"></div>
                </div>
                <div>
                    <label>Tile Content</label>
                    <div class="view_tile_tile_content"></div>
                </div>
                </div>
                <div class="viewTileRight">
                <div>
                    <label>Tile Tags</label>
                    <div class="view_tile_tile_tags"></div>
                </div>
                <div class="used_on_grids">
                    <label>Used on Grid(s)</label>
                    <div class="view_tile_used_on_grids_list"></div>
                </div>
                </div>
                <div class="viewTileBottom">
                <div class="bottom-content">
                    <label>Highlights</label>
                    <div class="view_tile_annotations_list"></div>
                    <div class="view_tile_video"></div>
                </div>
                <div class="actions">
                    <span class="tileDate">
                    <span class="date"></span>
                    </span>
                    <button class="save">Edit Tile</button>
                </div>
                </div>
            </div>
        </div>
        <!-- end view tile modal !-->

        <!-- start edit tile modal !-->
        <div id="tile_modal" class="modal tileModal">
          <div class="header unselectable"><div class="modalCloseButton">X</div></div>
          <div class="content">
            <input class="tileColorInput" type="hidden">
            <input class="new_tile_grid_id" type="hidden">
            <input class="tile_id" type="hidden" value="0">
            <input class="new_tile_position" type="hidden">
            <input class="tile_share" type="hidden" value="">
            <input class="new_tile_source_id" type="hidden" value="0">
            <!-- <input class="tile_modal_project_id" type="hidden" value="0"> -->
            <div class="tileModalLeft">
              <input type="text" class="tile_modal_title" placeholder="Title">
              <div class="tile_modal_colors">
                <color-box></color-box>
              </div>
              <input type="text" class="tile_modal_tags" placeholder="Tags">
              <label class="usedOnGridsLabel">Used on grids:</label>
              <div class="tile_modal_used_on_grids"></div>
              <label class="">Project</label>
              <select name="project" class="tile_modal_project_id projectSelect">
                  <option v-for="project in projects" :value="project.project_id"> {{project.project_name}}</option>
              </select>

              <label class="sendToGridLabel">Send to grid:</label><a class="tile_new_grid_btn" href="#">New Grid</a>
              <span style="padding-left:4px; display:block;" class="smallText">Hold CTRL to select mutiple grids.</span>
              <select multiple class="tile_modal_send_to_grid">
                <option class="default">None (default)</option>
                <!-- <?php 
                if (isset($grids)) {
                  foreach(json_decode($grids) as $grid) {?>
                <option value="<?php echo $grid->grid_id; ?>"><?php echo $grid->grid_title; ?></option>
                <?php 
                  } 
                }
                ?> -->
              </select>

            </div>
            <div class="tileModalRight">
              <textarea class="tile_modal_content" placeholder="Content"></textarea>
            </div>
            <div>
              <button class="save">Save</button>
            </div>
            <div class="">
              <label class="">Embed Video Or Audio:</label>
              <textarea class="tile_modal_video" placeholder="Emded Code"></textarea>
            </div>
            <label class="">Highlights:</label>
            <div class="tileModalBottom">
              <div class="tileModalAnnotationList"></div>
            </div>
            <div class="add_hightlight">
              <div class="tile_modal_highlight_button"></div>
              <a href="#">Add Additional Highlight (click icon then select text on your source document)</a>
            </div>

          </div>
        </div>
        <!-- end edit tile modal !-->



         
    </div>
  
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: function(){
    console.log("projects",this.projects);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    
  }
});
