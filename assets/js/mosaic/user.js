User = {

  init: function() {

  },
  data: {

  },

  loadNotifications : function (){
    var invite_cnt = User.data.invite_cnt;
    if (invite_cnt > 0) {
        $("#invite-cnt").css('display','block');

      }else{
        $("#invite-cnt").css('display','none');
      }
      $("#invite-cnt").html(invite_cnt);
  },

  setCurrentProject: function(project) {

    User.data.settings.current_project_id = project.project_id;
    User.data.settings.current_project = project;
    User.data.pile_tiles = project.tiles;
    User.data.grids = project.grids;
    User.data.sources = project.sources;
    User.data.outlines = project.outlines;
    User.data.published = project.published;
    User.data.templates = project.templates;
    User.data.grid_groups = project.grid_groups;
    User.data.settings.current_project_url =  project.user_url +'/'+project.slug;
    Published.setContactInfo(project.author);


    return;
  },

  
  populateExportCSVSelect: function() {
	$.each(projects, function(index,val) {
		$("#exportcsv_select").append($("<option value='"+val.id+"'>"+val.name+"</option>"));
	});
	  
  },
  
  bindUIActions: function() {

    $("#settingsButton").on("click", function() {
    }),
	  
	  $("#exportcsv_save_button").on("click", function() {
		 $("#exportcsv_form").submit(); 
		 
	  }),
	  
	  $('#your_thoughts_modal').on('hidden', function () {
	      User.clearYourThoughtsInput();
	  }),
	  
	  $("#settings_export_csv").on("click", function() {
		 $("#exportcsv_modal").modal("show"); 
	  }),
	  /*$("#feedbackButton").on("click", function() {
		 $("#feedback_modal").modal("show");
		 
		 $(".settingsDropdown").toggle();
	    	$(".settingsIconContainer").toggleClass("settingsIconContainerActive");
		 
	  });*/
	  
	  $("#your_thoughts_submit_button").on("click", function() {
		  User.submitFeedback($("#your_thoughts_name").val(), $("#your_thoughts_email").val(), $("#your_thoughts_content").val());
	  });
	  
    $(".settingsIcon").on("click", function() {
    	$(".settingsDropdown").toggle();
    	$(".settingsIconContainer").toggleClass("settingsIconContainerActive");
    });
    
    $("#your_thoughts_button").on("click", function() {
        $("#your_thoughts_modal").modal("show");
      });

    $(".close_instructions_popover").on("click", function() {
      User.disableNotification($(this).parents('.instructions_popover').attr('id'));
    });

  },
  activeQuickStart: function()
  {

    // quick_start = $("#quick_start_modal").mj_modal();
    quick_start = $("#quick_start_modal").mj_modal();
    quick_start.resizable({
        minHeight: 400,
        minWidth: 540,
        aspectRatio: true
      });
      
    var project_cnt = User.data.projects.length;
    $('.helpModal').find('.skip, .modalCloseButton').off('click').on("click", function() {  
      $(this).parents('.helpModal').hide();
    });

    $('.helpModal').find('.quickStartNav .project').off('click').on("click", function() {  
      $('.helpModal').find('.quickStartPages .video,.quickStartNav .project,.templates, .skip,.back').hide();
      $('.helpModal').find('.quickStartNav .video, .quickStartPages .project').show();
      $('.quickStartNav').addClass('makeProject');
    });
    $('.helpModal').find('.quickStartNav .templates').off('click').on("click", function() {  
      $('.helpModal').find('.quickStartPages .video,.quickStartNav .templates,  .project').hide();
      $('.helpModal').find('.quickStartNav .video, .quickStartPages .templates, .skip').show();
      $('.quickStartNav').removeClass('makeProject');
      Grid.loadQuickTemplates(); 
      Grid.activateTemplate();
    });

    
    $('.helpModal').find('.quickStartNav .video').off('click').on("click", function() {  
      project_cnt = User.data.projects.length;
      $('.helpModal').find('.project, .templates, .quickStartNav .video, .skip,.back').hide();
      $('.helpModal').find('.quickStartPages .video').show();
      $('.helpModal').find('.quickStartNav .project').show();
      $('.quickStartNav').removeClass('makeProject');
    });
    Project.activateSave(quick_start);

    $('.helpModal').find('.quickStartNav .templates, .quickStartNav .video').hide();
    $('.helpModal').find('.quickStartNav .project').show();
    $('.helpModal').find('#show_again').on("change", function() {  
        var show_again = $(this).prop( "checked"); 
        var show = 0;
        if (show_again) {
          show = 1;
        }
        User.updateQuickStart(show,quick_start);
    });
    $('.mainGearMenu .quickstart').off('click').on("click", function() { 
      //debugger;
     // quick_start = $("#quick_start_modal"); 
    	 //quick_start = $("#quick_start_modal").mj_modal(); 
     // Grid.loadQuickTemplates();
      quickStartPages();
        quick_start.show();
        //User.activeQuickStart();
    });
    $('.mainGearMenu .tutorial').off('click').on("click", function() { 
      tutorial = $("#tutorial_modal").mj_modal();
      tutorial.resizable({
          minHeight: 400,
          minWidth: 540,
          aspectRatio: true
        });
      quickStartPages();
      tutorial.show();
    });
    function quickStartPages() {
      project_cnt = User.data.projects.length;
      $('.helpModal').find('.project, .templates, .quickStartNav .video, .skip,.back').hide();
      $('.helpModal').find('.quickStartPages .video').show();
      $('.helpModal').find('.quickStartNav .templates, .quickStartNav .video').hide();
      $('.helpModal').find('.quickStartNav .project').show();
      $('.quickStartNav').removeClass('makeProject');
      
    }


    if (User.data.user_quickstart == "1" || User.data.user_quickstart == 1) {
      quick_start.show();
      $('.helpModal').find('#show_again').prop( "checked",true); 
    }else{
      quick_start.hide();
      $('.helpModal').find('#show_again').prop( "checked",false); 
      return;
      
    }
    Grid.activateTemplate();
    quick_start.find('.login').on("click", function() {
      window.location = '/login';
    });
     quick_start.find('.register').on("click", function() {
      window.location = '/register';
    });

  },
  
  updateQuickStart: function(show_again,quick_start_modal) {
    $.ajax({
        type: "POST",
        url: '/action?action=updateUser',
        data: 
          {
          user_quickstart:show_again
          },
        success: function(data) 
          {
          },
          dataType: 'json'
    });  
  },
  submitFeedback: function(name,email,content) {
    ga('send', 'event', 'User', 'submit feedback', email);
	  $.ajax({
		    type: "POST",
		    url: '/action?action=submitFeedback',
		    data: 
		      {
		      name:name,
		      email:email,
		      content:content
		      },
		    success: function(data) 
		      {
		        $("#your_thoughts_modal").modal("hide");
		        alert('Thanks!');
		      },
		      dataType: 'json'
		      });  
  },
  
  logout: function() {
    alert('user logout called');
  },

  disableNotification: function(notification) {
    
      $.ajax({
      type: "POST",
      url: '/action?action=disableNotification',
      data: {
        notification: notification
      },
      success: function(data) 
      {
      },
      dataType: 'json'
      });

  },

  getUnsortedTiles: function() {
    $.getJSON('/controllers/application_home.php?action=getUnsortedTiles', function(data) {
      
      $('#tile_pile').empty();
      var tiles = new Array();
       $.each(data, function(key, val) {
        $('#tile_pile').append(Tile.renderTile(val));
      });

       $('#tile_pile > .draggable').draggable({ cursor: "move", cursorAt: { top: 85, left: 85 }, appendTo: "#grid", helper: "clone" });
       

       $('.tile').on("click", function(evt) {
        evt.stopPropagation();
      });

    });
  },

  
  clearYourThoughtsInput: function () {
	    $('#your_thoughts_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
	  },

  setCurrentGrid: function() {
    alert('user set current grid fired');
  }



};