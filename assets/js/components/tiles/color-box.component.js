/**
 * <color-box>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to color 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('color-box', {
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

    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="createTileByColor">
        <div class="colorBox" style="background:#4d6473;"></div>
        <div class="colorBox" style="background:#fdf8c5;"></div>
        <div class="colorBox" style="background:#efe0c1;"></div>
        <div class="colorBox" style="background:#fddbbc;"></div>
        <div class="colorBox" style="background:#f6d2e2;"></div>
        <div class="colorBox" style="background:#e6cfe4;"></div>
        <div class="colorBox" style="background:#d0c8e3;"></div>
        <div class="colorBox" style="background:#c7e9f6;"></div>
        <div class="colorBox" style="background:#b5e0dd;"></div>
        <div class="colorBox" style="background:#c4dcb6;"></div>
        <div class="colorBox" style="background:#e2ecb5;"></div>
    </div>
  
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: function(){

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    
  }
});
