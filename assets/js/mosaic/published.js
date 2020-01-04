
Published = {

  init: function() {
    Published.loadContactInfo();
    Published.activeContact();
  },
  activeContact:function(){
    $('.mainGearMenu .publicInfo').off('click').on("click", function() { 
      //debugger;
      contact_modal = $("#contact_modal").mj_modal();
      Published.loadContactInfo(); 
      contact_modal.show();
      Published.activeSaveContact(contact_modal);
    });
  },
  activeSaveContact:function(modal){
    modal.find('.save').on("click", function() {
      var email = modal.find(".email").val();
      var contact_name = modal.find(".contact-name").val();
      var username = modal.find(".contact-username").val();
      var phone = modal.find(".phone").val();
      var message = modal.find(".message").val();
       var contact_info = {
          contact_name: contact_name,
          phone: phone,
          message: message,
          username: username,
          email: email
        };
      $.when(Published.saveContact(contact_info)).done(function(info) {
        modal.remove();
      });

    });
  },
  saveContact: async function(contact_info) {
    $(".contact-name").val(contact_info.contact_name);
    $(".email").val(contact_info.email);
    $(".message").val(contact_info.message);
    $(".phone").val(contact_info.phone);
    $(".contact-username").val(contact_info.username);
    var csrf = await CSRF.token();
    console.log('csrf',csrf);
    //    console.log('form_id',form_id);
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    return $.ajax({
	      headers:apiRequestHeader,
        type: "POST",
        url: '/user/saveContact',
        dataType: "json",
        data:contact_info
    });
  },
  loadContactInfo:function(){
    if(User.data.public > 0)
    {
      $("#contact-name").html(User.data.author.contact_name);
      $("#email").html(User.data.author.contact_email);
      $("#message").html(User.data.author.message);
      $("#phone").html(User.data.author.phone);
      //$(".contact-username").val(User.data.author.username);
      $('.join').html(User.data.author.name);


    }else{
      $(".contact-name").val(User.data.author.contact_name);
      $(".contact-username").val(User.data.author.username);
      $(".email").val(User.data.author.contact_email);
      $(".message").val(User.data.author.message);
      $(".phone").val(User.data.author.phone);

    }
  },
  setContactInfo:function(author){
    User.data.author.contact_name =  author.contact_name;
    User.data.author.username =  author.username;
    User.data.author.contact_email =  author.contact_email;
    User.data.author.message =  author.message;
    User.data.author.phone =  author.phone;
    User.data.author.name =  author.name;
    $('.join').html(User.data.author.name);
  },
  getPublishedWithVersions: function() {

  var published_array = new Array();
  $.each(User.data.published, function(index,published) {
    published_array.push({
      "id":published.grid_id,
      "ver":published.grid_version
    });
  });

  return published_array;

},
  viewContact: function() {
    if (User.data.username == "MosaicJunction") {
       window.location.replace("/register");
    }else{
      Published.loadContactInfo();
        var modal = $("#contact_modal").mj_modal();

        modal.find('.send').on("click", function() {
            var subject = modal.find(".subject").val();
            var email = modal.find(".email").val();
            var message = modal.find(".message").val();
            var name = modal.find(".name").val();
             var contact_info = {
                subject: subject,
                email: email,
                name: name,
                message: message
              };
            $.when(Published.contact(contact_info)).done(function(result) {
              modal.remove();

            });
      });   
    }
    

},
contact: function(contact_info) {
  return $.ajax({
      type: "POST",
      url: '/action?action=contact',
      dataType: "json",
      data:contact_info
  });
},

  newPublished: function() {
//NEED TO UPDATE NAVIGATION FRAME HERE
  //load the project modal
  // var published = {};
  // project.project_id = 0;


  $(".publishedModal").filter(":visible").remove();
  var modal = $("#published_modal").mj_modal();


  //attach handler to save button
  modal.find('.save').on("click", async function() {
    // project.name = modal.find(".name").val();
    // project.description = modal.find(".description").val();
    // $.when(Project.save(project)).done(function(data) {
    //   project.project_id = data;
    //   $("#project_list").prepend(Project.renderProjectAsListItem(project));
    //   modal.remove();
    // });


  
    var grid_id = modal.find(".publishedModalGrids").val();
    var title = modal.find("#publish-name").val();
    var description = modal.find("#publish-description").val();
    var email = modal.find(".email").val();
    var contact_name = modal.find(".contact-name").val();
    var username = modal.find(".contact-username").val();
    var phone = modal.find(".phone").val();
    var message = modal.find(".message").val();
     var publish_info = {
        grid_id: grid_id,
        grid_title: title,
        grid_description: description,
        contact_name: contact_name,
        phone: phone,
        message: message,
        username: username,
        email: email
      };
    $.when(Published.publishGrid(publish_info)).done(function(grid) {
      // project.project_id = data;
      $("#published_list").prepend(Published.renderPublishedAsListItem(grid));

      User.data.published.push(grid);
      // var project_as_object = {
      //   "id":project.project_id,
      //   "project_description":project.description,
      //   "project_group_id":User.data.settings.current_group,
      //   "project_name":project.project_name,
      //   "project_owner_id":User.data.user_id,
      //   "project_version":0
      // };

      // User.data.projects.push(project_as_object);




      Navigation.updateFrames();
      modal.remove();

      Published.showPublishedModal(grid);
    });

  });
},

loadPublished: function(published) {
  User.data.published = published;
  Navigation.populatePublishedList(published);
  Navigation.updateFrames();
},
loadPublishGridSelect: function(grids) {
    $(".publishedModalGrids").each( function(index,select) {
        select = $(this);
        var selected_id = select.val();
        select.empty();
        var selected = '';

        $.each(grids, function(index,grid) {
            if (grid.grid_id == selected_id) {
              selected = "selected='selected'";
            };
            select.prepend("<option "+selected+" value='"+grid.grid_id+"'>"+grid.grid_title+"</option>");
        });
        if (selected == '') {
          selected = "selected='selected'";
          select.prepend("<option "+selected+" value='0'>Select Grid...</option>");

        }else{
          select.prepend("<option  value='0'>Select Grid...</option>");
        }

    });
    
  },

showPublishedModal: function(grid) {
  var site_url =  "https://" + window.location.host + "/";
  var modal = $("#view_published_modal").mj_modal();
  modal.children(".header").prepend("Published Grid Embed URL");


  modal.find(".publishedGridTitle").html(grid.grid_title);
  var attr = "max-width: 1030px;";
  attr += "min-width: 1000;min-height: 600px;";
  attr += "width: 100%;margin-left: auto;";
  attr += "display: block;margin-right: auto;";
  var style = "style='"+attr+"'";

  modal.find(".publishedEmbedWrapper").val("<iframe  "+style+" src='"+site_url+User.data.settings.current_project_url+"/"+grid.slug+"'></iframe>");
  modal.find(".publishedShareLink").val(site_url+User.data.settings.current_project_url+"/"+grid.slug);
  var publish_modal_id = "publish-"+User.data.settings.publish_cnt;
  User.data.settings.publish_cnt++;
  modal.find(".publishedEmbedWrapper").parent().parent().attr("id",publish_modal_id);

  modal.find(".copy-embed").on("click", function() {
      var clipboard = new Clipboard('.copy-embed', {
          target: function() {
            
                return document.querySelector('#'+publish_modal_id + ' .publishedEmbedWrapper');
          }
      });
  });
  modal.find(".copy-link").on("click", function() {
      var clipboard = new Clipboard('.copy-link', {
          target: function() {
            
                return document.querySelector('#'+publish_modal_id + ' .publishedShareLink');
          }
      });
  });
  modal.find(".link").on("click", function() {
      modal.find(".publishedShareLink, .copy-link").show();
      modal.find(".publishedEmbedWrapper, .copy-embed").hide();
  });
  modal.find(".embed").on("click", function() {
      modal.find(".publishedShareLink, .copy-link").hide();
      modal.find(".publishedEmbedWrapper, .copy-embed").show();
  });

},

publishGrid: async function(publish_info) {
  $(".contact-name").val(publish_info.contact_name);
  $(".email").val(publish_info.email);
  $(".message").val(publish_info.message);
  $(".phone").val(publish_info.phone);
  $(".contact-username").val(publish_info.username);
  var csrf = await CSRF.token();
    console.log('csrf',csrf);
    //    console.log('form_id',form_id);
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
  return $.ajax({
      type: "POST",
	    headers:apiRequestHeader,
      url: '/grid/publishGrid',
      dataType: "json",
      data:publish_info
  });
},

  renderPublishedAsListItem: function(published)
  {


  var container_div = $("<div/>", {class:"listItem",id:"published_"+published.grid_id});
  var title_container_div = $("<div/>", {class:"listItemTitle unselectable"}).html(published.grid_title).on("click", function() {
    // $(".listItem.active").removeClass("active");
    // $(this).parent().addClass("active");
    Published.showPublishedModal(published);
  });

  var items = {

                  "delete": {
                      name: "Delete", 
                      callback: function(key, options) {
                        if (confirm("Are you sure you want to delete this published grid? This will break any outside links or embeds to this grid.")) {
                  
                          container_div.remove();
                          Navigation.updateFrames();
                          Grid.deleteGrid(published.grid_id);
                }
                    }
                    }
  };

  var gear_icon = gearMenu(items);
  container_div.append(title_container_div,gear_icon);

  container_div.append("<input type='hidden' class='navPublishedID' value='"+published.grid_id+"'>");

  return container_div;
  }

};