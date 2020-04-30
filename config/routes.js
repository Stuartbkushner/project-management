/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },
  'GET /project/:unused?':   { action: 'dashboard/view-project' },


  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },

  //mosaic
  'GET /dashboard/project/update': { action: 'dashboard/project/view-update' },
  'POST /dashboard/project/create': { action: 'dashboard/project/view-create' },
  'GET /dashboard/project/edit': { action: 'dashboard/project/view-edit' },

  //grids
  'GET /dashboard/grid/update': { action: 'dashboard/grid/view-update' },
  'POST /dashboard/grid/create': { action: 'dashboard/grid/view-create' },
  'GET /dashboard/grid/edit': { action: 'dashboard/grid/view-edit' },

  //tiles
  'POST /dashboard/tile/create': { action: 'dashboard/tile/view-create' },
  'GET /dashboard/tile/edit': { action: 'dashboard/tile/view-edit' },
  'GET /dashboard/tile/update': { action: 'dashboard/tile/view-update' },


  // project
  'POST /project/saveProject': { action: 'project/save-project' },
  'POST /project/deleteProject': { action: 'project/delete-project' },
  'POST /project/get': { action: 'project/get-project' },
  'POST /project/getGrids': { action: 'project/get-grids' },

  'GET /project/:projectSlug?': { action: 'project/view-project' },
  'GET /project': { action: 'project/view-project' },
  'GET /grid': { action: 'grid/view-view' },
  'GET /source': { action: 'source/view-source' },
  'GET /source/:sourceSlug?': { action: 'source/view-source' },

  //app routes minus dashboard
  'GET /:userSlug?/:projectSlug?/:gridSlug?': { action: 'grid/view-view' },
  'GET /:userSlug?/:projectSlug?/:sourceSlug?': { action: 'project/view-source' },
  'GET /:userSlug?/:projectSlug?/:projectSlug?': { action: 'project/view-project' },

  'GET /:userSlug?/:projectSlug?': { action: 'project/view-project' },
  //souces dont have team_id from legacy so this route wont work until updates are made
  'GET /:userSlug?/:projectSlug?/sources/:sourceSlug?': { action: 'source/view-source' },
  //this is a better source route that works with the legacy code and db structrue
  'GET /sources/:projectSlug?/:sourceSlug?': { action: 'source/view-source' },



  //grid 

  'GET /grid/view': { action: 'grid/view-view' },
  'POST /grid/get': { action: 'grid/get-grid' },

  'POST /grid/saveGrid': { action: 'grid/save-grid' },
  'POST /grid/copy': { action: 'grid/copy-grid' },
  'POST /grid/unlock': { action: 'grid/unlock-grid' },
  'POST /grid/lock': { action: 'grid/lock-grid' },
  'POST /grid/setPrivacy': { action: 'grid/set-privacy' },
  'POST /grid/saveDecision': { action: 'grid/save-decision' },
  'POST /grid/setDecisionShown': { action: 'grid/set-decision-shown' },
  'POST /grid/deleteGrid': { action: 'grid/delete-grid' },

  'POST /grid/publishGrid': { action: 'grid/publish-grid' },
  'GET /grid/template': { action: 'grid/view-template' },
  'GET /grid/published': { action: 'grid/view-published' },


  // tile
  'POST /tile/get': { action: 'tile/get-tile' },
  'POST /tile/update': { action: 'tile/update-tile' },
  'POST /tile/updateTile': { action: 'tile/update-tile' },
  'POST /tile/saveTileAndSource': { action: 'tile/save-tile-and-source' },
  'POST /tile/addGridTile': { action: 'tile/add-grid-tile' },
  'POST /tile/moveGridTile': { action: 'tile/move-grid-tile' },
  'POST /tile/placeTileOnGrid': { action: 'tile/place-tile-on-grid' },
  'POST /tile/editGroup': { action: 'tile/edit-group' },
  'POST /tile/group': { action: 'tile/group' },
  'POST /tile/ungroup': { action: 'tile/ungroup' },
  'POST /tile/deleteTileSingle': { action: 'tile/delete-tile-single' },
  'POST /tile/removeFromGrid': { action: 'tile/remove-from-grid' },
  'POST /tile/copyToNewGrid': { action: 'tile/copy-to-new-grid' },
  'POST /tile/moveToNewGrid': { action: 'tile/move-to-new-grid' },
  'POST /tile/saveTile': { action: 'tile/save-tile' },
  'POST /tile/starTile': { action: 'tile/star-tile' },
  'POST /tile/ungroup': { action: 'tile/ungroup' },
  'POST /tile/getPile': { action: 'tile/get-pile' },
  'POST /tile/saveFilters': { action: 'tile/save-filters' },



  'POST /tile/add2Group': { action: 'tile/add-2-group' },

  "GET /csrfToken": { action: "security/grant-csrf-token" },


  // source
  'GET /source/source': { action: 'source/view-source' },
  'POST /source/saveSource': { action: 'source/save-source' },
  'POST /source/editSource': { action: 'source/edit-source' },
  'POST /source/getSource': { action: 'source/get-source' },


  //published 
  'POST /user/saveContact': { action: 'user/save-contact' },

  //team 
  'POST /team/setTeam': { action: 'team/set-team' },
  'POST /team/declineInvitation': { action: 'team/decline-invitation' },
  'POST /team/acceptInvitation': { action: 'team/accept-invitation' },
  'POST /team/inviteUserToGroup': { action: 'team/invite-user' },
  'POST /team/getGroups': { action: 'team/get-teams' },
  'POST /team/createNewGroup': { action: 'team/save-team' },
  'POST /team/removeTeam': { action: 'team/remove-team' },
  'POST /team/makeTeamOwner': { action: 'team/make-team-owner' },
  'POST /team/removeTeamMember': { action: 'team/remove-team-member' },
  'POST /team/leaveTeam': { action: 'team/leave-team' },

  
  'GET /grid/listen': { action: 'grid/listen' , csrf: false },

  '/file':                           { action: 'FileController' },



  

  
  
  



};
