Public = {
  init: function() {
    // setTimeout(function() {Public.info();},2000);
    // setTimeout(function() {Public.help();},8000);
    Public.activeQuickStart();
  },
  help: function() {
    help_modal = $("#help_modal").mj_modal();
    Public.activeHelp(help_modal);
    help_modal.show();
    help_modal.animate({
      left: "+=250",
    }, 5000, function() {
      // Animation complete.
    });
  },
  info: function() {
    info_modal = $("#info_modal").mj_modal();
    Public.activeHelp(info_modal);
    info_modal.show();
  },
  activeHelp:function(modal){
    modal.find('.quickStart').on("click", function() {
      modal.hide();
      Public.quickStart();
    });
    modal.find('.whyStart').on("click", function() {
      modal.hide();
      Public.whyStart();
    });
    
  },
  activeQuickStart: function() {
    $('.quickStart').on("click", function() {
      $('.helpModal').hide();
      Public.quickStart();
    });
  },
  quickStart: function() {
    quick_start = $("#quick_start_modal").mj_modal();
    quick_start.resizable({
        minHeight: 400,
        minWidth: 540,
        aspectRatio: true
      });
    quick_start.find('.login').on("click", function() {
      window.location = '/login';
    });
     quick_start.find('.register').on("click", function() {
      window.location = '/register';
    });
    quick_start.show();
  },
  whyStart: function() {
    why_start = $("#why_start_modal").mj_modal();
    why_start.resizable({
        minHeight: 400,
        minWidth: 540,
        aspectRatio: true
      });
    why_start.find('.login').on("click", function() {
      window.location = '/login';
    });
     why_start.find('.register').on("click", function() {
      window.location = '/register';
    });
    why_start.show();
  }

};

