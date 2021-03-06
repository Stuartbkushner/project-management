/**
 * <pile>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to grid 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('pile', {
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
      settings: {
        // btn_new_tile: $('#btn_new_tile'),
        // btn_update_filters: $('#pile_filters_update_button'),
        // btn_clear_filters: $('#pile_filters_clear_button'),
        // pile: $('#pile'),
        filter_search_field: $('.searchContainer .searchTextInput'),
        filter_from_field: $('.searchContainer .searchFromInput'),
        filter_to_field: $('.searchContainer .searchToInput'),
        match_title_chkbox: $('.searchContainer .searchTitles'),
        match_content_chkbox: $('.searchContainer .searchContent'),
        match_tags_chkbox: $('.searchContainer .searchTags'),
        match_starred_chkbox: $('.searchContainer .searchFavorites')
      },

    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="navColumn col2">
        <div class="navColumnContent">
            <div class="templateObjects templateObjectsSmall">
            <div class="header unselectable ui-draggable draggableTemplateHeader">
                <div class="templateHeaderContent">
                <div class="templateHeaderContainer">
                    <div class="template_header_title_container">Drag Header to Grid</div>
                    <div class="template_header_edit_container">
                    <textarea placeholder="Enter text..."></textarea>
                    <div class="headerColors">
                        <color-box></color-box>
                        <div class="clearBoth"></div>
                    </div>
                    <button class="save">Save</button>
                    </div>
                    <input type="hidden" value="0" class="template_header_id">
                    <input type="hidden" value="" class="template_header_title">
                    <input type="hidden" value="0" class="template_header_x">
                    <input type="hidden" value="0" class="template_header_y">
                    <input type="hidden" value="0" class="template_header_template_id">
                    <input type="hidden" value="0,0" class="tile_position">
                    <input type="hidden" value="1" class="template_header_column_span">
                    <input type="hidden" value="0" class="template_header_grid_id">

                    <input type="hidden" value="0" class="location_id">
                    <input type="hidden" value="0" class="grid_tile_id">
                    <input type="hidden" value="#4d6473" class="headerColorInput">
                </div>
                </div>
            </div>
            </div>
            <div class="searchContainer">
            <input type="text" placeholder="search" class="searchTextInput">
            <div class="searchOptions unselectable">
                <div class="title"><input type="checkbox" class="searchTitles"><span class="projectFilterLabel">Project</span> Titles</div>
                <div class="tags"><input type="checkbox" class="searchTags">Tags</div>
                <div class="search-content"><input type="checkbox" class="searchContent"><span class="projectFilterLabel">Description</span> <span class="tileFilterLabel">Content</span></div>
                <div class="favorite"><input type="checkbox" class="searchFavorites">Favorite</div>
                <div class="createdBy"><input type="checkbox" class="searchCreatedBy">Created By</div>
            </div>

            <div class="searchDatesWrapper">
                <input type="text" class="searchFromInput hasDatePicker" placeholder="from">
                <input type="text" class="searchToInput hasDatePicker" placeholder="to">
            </div>

   
            </div>
            <div class="pile">
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
    Pile = this;
    Pile.init();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    init: function() {
    
      this.setFilters(Pile.settings);
      // this.loadPile(User.data.pile_tiles);
  
      //set our filters (set values of inputs)
      this.setFilters(Pile.settings);
  
      //load our pile
      //this.loadPile(pile_tiles);
      
      //bind all our actions
      this.bindUIActions();
  
    },
  
    getPileTilesWithVersions: function() {
  
    var pile_tiles_array = new Array();
    $.each(User.data.pile_tiles, function(index,tile) {
      pile_tiles_array.push({
        "id":tile.tile_id,
        "ver":tile.tile_version
      });
    });
  
    return pile_tiles_array;
  
  },
  
  reloadPile: async function() {
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
        'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);
      console.log('pile componet js reloadPile User',User);
      $.ajax({
      headers :apiRequestHeader,
      type: "POST",
      url: '/tile/getPile',
      data: {
        project_id: User.data.settings.current_project_id
      },
      success: function(data) 
      {
        User.data.pile_tiles = data;
        Pile.loadPile(User.data.pile_tiles);
      },
      dataType: 'json'
      });
  },
  
  
    filterActiveTiles: function(tiles) {
      var new_tiles = tiles.filter(function (index) {
        var filtered_tiles = (index.tile_active == 1);
        return filtered_tiles;
      });
      return new_tiles;
    },
  
    filterInactiveTiles: function(tiles) {
  
      var new_tiles = tiles.filter(function (index) {
        var filtered_tiles = index.tile_active == 0;
        return filtered_tiles;
      });
      return new_tiles;
    },
    filterProjects: function(projects) {
  
      //if search string is set, tiles must match either on title, content or tags
      var new_projects = projects.filter(function (index) {
        
        var match_title = $(".searchTitles").prop('checked');
        var match_content = $(".searchContent").prop('checked');
        var match_tags = $(".searchTags").prop('checked');
        var match_starred = $(".searchFavorites").prop('checked');
        var match_created_by = $(".searchCreatedBy").prop('checked');
        var filter_from = new Date($(".searchFromInput").val()).getTime();
        var filter_to = new Date($(".searchToInput").val()).getTime() + (24*60*60*1000);
        var created_at = new Date(index.created_at).getTime();
  
        var pile_search_field = $(".searchTextInput");
        //BEWARE: Must load tags on projects in backend
        //index.project_tags.toLowerCase().search(Pile.settings.filter_search_field.val().toLowerCase()) >= 0
        
        var filtered_projects = 
        (
          pile_search_field.val() == ""
          ||
          (
            (match_title === true && index.project_name.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0) || 
            (match_content === true && index.project_description.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0) 
            ||
            //could we *please* use project as an object
            // (match_tags === true && Tile.isTileTagged(pile_search_field.val().toLowerCase(),index.project_tags.toLowerCase()) === true) ||
            (match_created_by === true && index.created_by_username.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0)
            
          )
        )
        &&
        (
  
          (!filter_from && !filter_to)
          ||
          (
            (filter_from <= created_at && !filter_to)
            ||
            (filter_to >= created_at && !filter_from)
          )
          ||
          (
            created_at >= filter_from && created_at <= filter_to
          )
  
        );
        // &&
        // (
        //  (match_starred == false)
        //  ||
        //  (match_starred === true && index.project_starred == true)
        // );
        
        
        return filtered_projects;
      });
      return new_projects;
    },
  
  
    filterTiles: function(tiles) {
  
      //if search string is set, tiles must match either on title, content or tags
      var new_tiles = tiles.filter(function (index) {
        
        var match_title = $(".searchTitles").prop('checked');
        var match_content = $(".searchContent").prop('checked');
        var match_tags = $(".searchTags").prop('checked');
        var match_starred = $(".searchFavorites").prop('checked');
        var match_created_by = $(".searchCreatedBy").prop('checked');
        var filter_from = new Date($(".searchFromInput").val()).getTime();
        var filter_to = new Date($(".searchToInput").val()).getTime() + (24*60*60*1000);
        var tile_created = new Date(index.tile_created).getTime();
  
        var pile_search_field = $(".searchTextInput");
        //BEWARE: Must load tags on tiles in backend
        //index.tile_tags.toLowerCase().search(Pile.settings.filter_search_field.val().toLowerCase()) >= 0
        
        var filtered_tiles = 
        (
          pile_search_field.val() == ""
          ||
          (
            (match_title === true && index.tile_title.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0) || 
            (match_content === true && index.tile_content.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0) ||
            //could we *please* use tile as an object
            (match_tags === true && Tile.isTileTagged(pile_search_field.val().toLowerCase(),index.tile_tags.toLowerCase()) === true) ||
            (match_created_by === true && index.user_first.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0) || 
            (match_created_by === true && index.user_last.toLowerCase().search(pile_search_field.val().toLowerCase()) >= 0)
  
            
          )
        )
        &&
        (
  
          (!filter_from && !filter_to)
          ||
          (
            (filter_from <= tile_created && !filter_to)
            ||
            (filter_to >= tile_created && !filter_from)
          )
          ||
          (
            tile_created >= filter_from && tile_created <= filter_to
          )
  
        )
        &&
        (
         (match_starred == false)
         ||
         (match_starred === true && index.tile_starred == true)
        );
        
        
        
        
        return filtered_tiles;
      });
      return new_tiles;
    },
  
    loadPile: function(tiles) {
      var tiles = Pile.filterTiles(tiles);
  
      $(".pile .tile").remove();
      $.each(tiles, function() {
        this.groups = [];
        var rendered_tile = Tile.renderTile(this);
        Tile.makeDraggable(rendered_tile);
        $(".pile").append(rendered_tile);
      });
  
    },
  
    setFilters: function(filters) {
      this.setSearchFilter(filters.filter_search);
      this.setMatchTitle(filters.match_title);
      this.setMatchContent(filters.match_content);
      this.setMatchTags(filters.match_tags);
      this.setMatchStarred(filters.match_starred);
      this.setFromFilter(filters.filter_from);
      this.setToFilter(filters.filter_to);
      return;
    },
  
    saveFilters: function(type) {
  
        //get our currently set filters and send them off
        $.ajax({
        type: "POST",
        url: '/tile/saveFilters',
        data: {
          filter_search: $('.searchContainer .searchTextInput').val(),
          match_title: $('.searchContainer .searchTitles').prop("checked"),
          match_content: $('.searchContainer .searchContent').prop("checked"),
          match_tags: $('.searchContainer .searchTags').prop("checked"),
          match_starred: $('.searchContainer .searchFavorites').prop("checked"),
          filter_from: $('.searchContainer .searchFromInput').val(),
          filter_to: $('.searchContainer .searchToInput').val(),
          type: type
        },
        success: function(data) 
        {
        },
        dataType: 'json'
        });
  
    },
  
    setSearchFilter: function(val) {
      $(".searchTextInput").val(val);
      return;
    },
  
    setFromFilter: function(val) {
      $(".searchFromInput").val(val);
      return;
    },
    
    setToFilter: function(val) {
      $(".searchToInput").val(val);
      return;
    },
  
    setMatchTitle: function(state) {
      $(".searchTitles").prop('checked',state);
    },
  
    setMatchContent: function(state) {
      $(".searchContent").prop('checked',state);
    },
  
    setMatchTags: function(state) {
      $(".searchTags").prop('checked',state);
    },
    
    setMatchStarred: function(state) {
    $(".searchFavorites").prop('checked',state);  
    },
  
    clearFilters: function () {
            $('#filter_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
            $("#filter_form").find('input[type=checkbox]').prop("checked", false);
    },
  
    bindUIActions: function() {
  
      //make our pile tiles draggable
      //$('#pile > .tile').draggable({ cursor: "move", helper: "clone", appendTo: "body" });
  
  
      // $("#btn_clear_filters").on("click", function() {
      //   Pile.clearFilters();
      //   Pile.saveFilters();
      //   Pile.reloadPile();
  
      // });
  
      // $("#toggle_inactive").on("click", function() {
      //   $("#inactive_pile").toggle();
      // });
  
  
      //make our filter search field dynamic
      $('.searchContainer .searchTextInput').on("keyup", function() {
        Pile.reloadSearch();
      });
  
      //make our checkboxes dynamic
      $($('.searchContainer .searchTitles')).on("click", function() {
        Pile.reloadSearch();
      });
      
      $($('.searchContainer .searchFavorites')).on("click", function() {
        Pile.reloadSearch();
      });
  
      $($('.searchContainer .searchContent')).on("click", function() {
        Pile.reloadSearch();
      });
  
      $($('.searchContainer .searchTags')).on("click", function() {
        Pile.reloadSearch();
      });
  
      //datepickers
      $('.searchContainer .searchFromInput').datepicker();
      $('.searchContainer .searchToInput').datepicker();
      $('.searchContainer .searchFromInput').on("change", function() {
        Pile.reloadSearch();
      });
      $('.searchContainer .searchToInput').on("change", function() {
        Pile.reloadSearch();
      });
  
    },
    reloadSearch: function () {
      var project_dashboard =  $('.gridTabs .active').hasClass("tab_project_dashboard");
      if (project_dashboard) {
        Application.loadDashboard();
        Pile.saveFilters('project');
      }else{
        Pile.reloadPile();
        Pile.saveFilters('pile');
      }
    }
    
  }
});
