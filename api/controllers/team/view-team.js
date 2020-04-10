module.exports = {


  friendlyName: 'View team',


  description: 'Display "Team" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/team/team'
    }

  },


  fn: async function () {

    // Respond with view.
    /*
    TODO do the following 

    A few reminders:
      (1)  These files were generated assuming your Sails app is using
            Vue.js as its front-end framework.  (If you're unsure,
            head over to https://sailsjs.com/support)

      (2)  You'll need to manually add a route for this new page's
            action in your `config/routes.js` file; e.g.
                'GET /team/team': { action: 'team/view-team' },

      (3)  You'll need to manually import the new LESS stylesheet
            from your `assets/styles/importer.less` file; e.g.
                @import 'pages/team/team.less';

      (4)  Last but not least, since some of the above are backend changes,
            don't forget to re-lift the server before testing!

  In the view ejs file that is created add code that is like the dashboard at /views/pages/dashboard/welcome.ejs  
In the controller that is created add code that is like /api/controllers/project/view-project.js that filters resources by the teamId
You will need to add this line to controllers
var teamSlug = this.req.param("teamSlug");

    */
    return {};

  }


};
