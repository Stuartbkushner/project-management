/**
 * <js-timestamp>
 * -----------------------------------------------------------------------------
 * A human-readable, self-updating "timeago" timestamp, with some special rules:
 *
 * • Within 24 hours, displays in "timeago" format.
 * • Within a month, displays month, day, and time of day.
 * • Within a year, displays just the month and day.
 * • Older/newer than that, displays the month and day with the full year.
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('jsTimestamp', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'at',// « The JS timestamp to format
    'short',// « Whether to shorten the formatted date by not including the time of day (may only be used with timeago, and even then only applicable in certain situations)
    'format',// « one of: 'calendar', 'timeago' (defaults to 'timeago'.  Otherwise, the "calendar" format displays data as US-style calendar dates with a four-character year, separated by dashes.  In other words: "MM-DD-YYYY")
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
    <div :id="id" class="project-grids">
      <div v-for="grid in project" class="row grid">
        <div class="col col-md-3 grid-title" href='#'>
          {{grid.grid_title}}
        </div>
        <div class="col col-md-3 total-funding">
          {{balance_id.totalFunding}}
        </div>
        <div class="col col-md-3 total-revenue">
          {{balance_id.totalProfits}}
        </div>
        <div class="col col-md-3 total-payouts">
          {{balance_id.totalDividends}}
        </div>
        <div class="col col-md-3 spending-balance">
          {{balance_id.spendingBalance}}
        </div>
        <div class="col col-md-3 pay-out-balance">
          {{balance_id.dividendBalance}}
        </div>
        <div class="col col-md-3 edit-grid">
          <a class="btn" :href='#'>Edit</a>
        </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
  },

  beforeDestroy: function() {
  },

  watch: {
  }


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝


});
