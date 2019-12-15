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
  'GET /dashboard/project': { action: 'dashboard/view-project' },
  'GET /dashboardproject/update': { action: 'dashboard/view-update' },
  'POST /dashboard/project/update': { action: 'dashboard/edit-grid' },
  'POST /dashboard/project/create': { action: 'dashboard/create-grid' },
  'GET /dashboard/project/update/:grid_id?': { action: 'dashboard/view-update' },
  'PATCH /dashboard/project/update': { action: 'dashboard/update-project' },


  // project
  'POST /project/get': { action: 'project/get-project' },
  'POST /project/getGrids': { action: 'project/get-grids' },

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

  // tile
  'POST /tile/get': { action: 'tile/get-tile' },
  'POST /tile/update': { action: 'tile/update-tile' },
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



  'POST /tile/add2Group': { action: 'tile/add-2-group' },

  "GET /csrfToken": { action: "security/grant-csrf-token" },



};
