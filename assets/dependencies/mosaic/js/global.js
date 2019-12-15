

function doPoll(group_id){
    $.post('/action?action=getAllGroupData', {group_id:group_id}, function(data) {
       // console.log(data);  // process results here
        var group_data = $.parseJSON(data);
        console.log(group_data);

        User.data.grids = group_data.grids;
        Navigation.populateGridsList(group_data.grids);
        setTimeout(function() {doPoll(group_id);},2000);
    });
}



function clearSelection() {
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
}


function getSelectionText() {
    var text = "";
    if (window.getSelection) {

        text = window.getSelection();
    } else if (document.selection && document.selection.type != "Control") {

        text = document.selection.createRange().text;
    }
    return text;
}

function rgb2hex(rgb) {
     if (  rgb.search("rgb") == -1 ) {
          return rgb;
     } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
}

function gearMenu(actions) {


		var gear_icon_container = $("<div/>", {class:"gearIconContainer"}).append($("<div/>", {class:"gearIcon"}).on("click", function() {

			if($(this).siblings(".gearMenuContainer").is(":visible"))
			{
				$(this).removeClass("active");
				$(this).siblings(".gearMenuContainer").hide();
				

        if($(this).parents(".listItem").length > 0)
        {
          $(this).css({"display":"none"});
        }

			}
			else
			{
				$(this).addClass("active");
				displayGearMenuContainer(this);
			}
		}));

		gear_icon_container.append($("<div/>", {class:"gearMenuContainer"}));

		$.each(actions, function(index,action) {
			var rendered_action = $("<div><a href='#'>"+action.name+"</a></div>").on("click", function() {


								//close the menu (duplicated code)
								$(gear_icon_container.find(".gearIcon")).removeClass("active");
								$(gear_icon_container.find(".gearIcon")).siblings(".gearMenuContainer").hide();
								$(gear_icon_container.find(".gearIcon:not(.groupContainer .gearIcon)")).css({"display":"none"});


				action.callback.call();
			});
      if(action.class){
        rendered_action.addClass(action.class);
      }
			gear_icon_container.find(".gearMenuContainer").append(rendered_action);

		});

		return gear_icon_container;

    }

function displayGearMenuContainer(gear_icon) {

      var gear_icon = $(gear_icon);
      var gear_menu_container = $(gear_icon).siblings(".gearMenuContainer");

      //gears inside modals
      var list_container = gear_menu_container.parents(".content");
      //gears inside nav
      if(list_container.length == 0)
      {
        list_container = gear_menu_container.parents(".listContainer");
      }

      //if we're inside a container with no overflow, set the container's overflow to visible (so that the gear menu container does not create overflow)
      if(list_container.hasScrollBar())
      {

	      var menu_height = gear_menu_container.height();
	      var list_height = list_container.height(); 
	      var menu_top_offset  = gear_icon.offset().top - 96.5;
	      var menu_bottom_x =  menu_height + menu_top_offset;
	      var scroll_position = list_container.scrollTop();

	      //this is not perfect, there is an unaccounted for height
	      if((menu_bottom_x + scroll_position) >= list_container.prop('scrollHeight') - menu_height)
	      {
	        //gear_menu_container.css('bottom',(gear_icon.height() / 2) + (gear_icon.parent().parent().height() / 2));
	      } 
	      else
	      {
	      	gear_menu_container.css('top',(gear_icon.height() / 2) + (gear_icon.parent().parent().height() / 2));
	      }
      }
      else
      {
        gear_menu_container.css('top',(gear_icon.height() / 2) + (gear_icon.parent().parent().height() / 2));
      }

      //display the menu
      gear_icon.css({"display":"block"});
      gear_menu_container.show();
}


(function() {

  String.prototype.trimToLength = function(m) {
  return (this.length > m) 
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};


    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }



    $.fn.mj_modal = function() {

    	//clone the modal
    	var modal = this.clone();
    	modal.appendTo("body");

      modal.show();

      Tile.focusTile(modal);

    	//remove the id
    	modal.attr("id","");
      
    	modal.draggable({
        start: function(event,ui) {
          Tile.focusTile(modal);
        },
        handle:".header",
        scroll:false,
        cancel:'.header a'
      });

      modal.on("click", function() {
        Tile.focusTile(modal);
      });

    	modal.find(".modalCloseButton").on("click", function() {

    		modal.remove();
    	});

    	return modal;
    }


// Extend jquery with flashing for elements
$.fn.flash = function(duration, iterations) {
    duration = duration || 1000; // Default to 1 second
    iterations = iterations || 1; // Default to 1 iteration
    var iterationDuration = Math.floor(duration / iterations);

    for (var i = 0; i < iterations; i++) {
        this.fadeOut(iterationDuration).fadeIn(iterationDuration);
    }
    return this;
}
	
	
	$.fn.getHiddenDimensions = function(includeMargin) {
	    var $item = this,
	        props = { position: 'absolute', visibility: 'hidden', display: 'block' },
	        dim = { width:0, height:0, innerWidth: 0, innerHeight: 0,outerWidth: 0,outerHeight: 0 },
	        $hiddenParents = $item.parents().andSelf().not(':visible'),
	        includeMargin = (includeMargin == null)? false : includeMargin;

	    var oldProps = [];
	    $hiddenParents.each(function() {
	        var old = {};

	        for ( var name in props ) {
	            old[ name ] = this.style[ name ];
	            this.style[ name ] = props[ name ];
	        }

	        oldProps.push(old);
	    });

	    dim.width = $item.width();
	    dim.outerWidth = $item.outerWidth(includeMargin);
	    dim.innerWidth = $item.innerWidth();
	    dim.height = $item.height();
	    dim.innerHeight = $item.innerHeight();
	    dim.outerHeight = $item.outerHeight(includeMargin);

	    $hiddenParents.each(function(i) {
	        var old = oldProps[i];
	        for ( var name in props ) {
	            this.style[ name ] = old[ name ];
	        }
	    });

	    return dim;
	}


$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 77.5,
    offsetLeft    : 600,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    var scrollX = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().left + scrollPane.scrollLeft() - parseInt(settings.offsetLeft);

    scrollPane.animate({scrollTop : scrollY, scrollLeft : scrollX }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });

  });
}



})();