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

parasails.registerComponent('projectGrid', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'id',
    'grids',
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
          {{grid.totalFunding}}
        </div>
        <div class="col col-md-3 total-revenue">
          {{grid.totalProfits}}
        </div>
        <div class="col col-md-3 total-payouts">
          {{grid.totalDividends}}
        </div>
        <div class="col col-md-3 spending-balance">
          {{grid.spendingBalance}}
        </div>
        <div class="col col-md-3 pay-out-balance">
          {{grid.dividendBalance}}
        </div>
        <div class="col col-md-3 edit-grid">
          <a class="btn" :href="'/dashboard/project/create'+grid_id">Edit</a>
        </div>
        <div class="col col-md-2 createdAt">
          <js-timestamp :at="grid.createdAt"></js-timestamp>
        </div>
        <div class="col col-md-2 pay">
          <button type="button" class="btn pay-btn">Pay Now</button>
          <input class="grid_id" type="hidden" :value="grid.spending" />
        </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
  },

  beforeDestroy: function() {
  },

  mounted: async function() {
    this.bindUIActions();
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

  methods: {

    bindUIActions: function() {
      var Grid = this;
      Grid.pay();
    },

    pay: async function() {
      var Grid = this;
      var id = this.id;

      $('#'+id+' .pay-btn').off('click').on('click', function(event){
        event.preventDefault();
        console.log($event.target).parents('.grid').length;
        console.log($event.target).parents('.grid').find('.grid_id').length;
        var gridId = ($event.target).parents('.grid').find('.grid_id').val();
        console.log(gridId);
        Grid.payGrid(gridId);
      });
    },

    payGrid: async function(gridId) {
      var Grid = this;
      var id = this.id;
      this.sync = true;

      var csrf = await CSRF.token();
      console.log(csrf);
      console.log(gridId);
      var apiRequestHeader = {
        'X-CSRF-Token':csrf,_csrf,
      };
      return io.socket.request({
        method: 'post',
        url: '/api/v1/'
      })
    }
  }


});
