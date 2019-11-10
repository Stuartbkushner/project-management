module.exports = {


  friendlyName: 'Get',


  description: 'Get tile.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    /*
      public function get_tile($tile_id) {
        $query = "SELECT *, u.user_first,u.user_last FROM tiles AS t 
          INNER JOIN users AS u 
          ON t.tile_id = $tile_id
          AND u.user_id = t.user_id ";
        $tile = Tiles::sql($query, SimpleOrm::FETCH_ONE);
        $status = $this->status;
        $tile = $this->load_tile($tile,$status);
        return $tile;
        //need to todo sql

      }
    */
  }


};

