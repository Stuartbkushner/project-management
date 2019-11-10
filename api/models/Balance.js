/**
 * Balance.js
 *
 * A balance held by an address
 */

module.exports = {
  primaryKey: 'balance_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    balance_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      // required: true,
    },
    key: {
        type: 'string',
        description: 'ownerEthAddress_tokenId_currencyTokenId_paymentTokenId',
        required: true,
        unique: true,
        extendedDescription:
        `
        ownerEthAddress is the users ethAddress  or tokens library
        tokenId is the id of the token that owns the balance or 0 if a user ownes it
        .`
    },

    pending: {
        type: 'number',
        description: 'amount being trasnfered to available' 
    },
    available : {
        type: 'number',
        description: 'amount that can be spent' 
    },
    payment : {
        type: 'number',
        description: 'total dividend payment owed' 
    },
    ownerTokenWorth : {
        type: 'number',
        description: 'records how much in total owner or owners tokens have been paid' 
    },
    order : {
        type: 'number',
        description: 'amount held for market buy/ sell orders' 
    },
    ownershipPercent : {
        type: 'number',
        description: 'perecntage of total supply owend but this balance' 
    },
    totalFunding: {
      type: 'number',
      description: 'Total amount depositedd into this balance',

    },
    totalSpending: {
      type: 'number',
      description: 'Total amount spent in cost into this balance',
    },
    totalProfits: {
      type: 'number',
      description: 'Total amount made in revenue into this balance',
      example: 'https://site/avatar.jpg'

    },
    totalDividends: {
      type: 'number',
      description: 'Total amount payed out in royalties into this balance',
      example: 'https://site/avatar.jpg'

    },
    spendingBalance: {
      type: 'number',
      description: 'current amount avlible to spend',
      example: 'https://site/avatar.jpg'

    },
    dividendBalance: {
      type: 'number',
      description: 'current amount avlible to pay out in royaltiee',
      example: 'https://site/avatar.jpg'
    },
    ownerType: {
      type: 'string',
      description: 'is this owned by token or user',
    },
    ownerId: {
      type: 'number',
      description: 'token id or user id',
    },




    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // Add eth addres of owner user or lib 
    // owner: {
    //     model: 'address',
    //     description: 'this will be user address or libary address of smart contract that holds balance',
    // },
    // // //if token owns balance
    // tokenId:{
    //     model: "token",
    //     description: 'if balance is owned buy token this will be set',

    // },
   

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    //if tok
    // currency:{
    //     model: "token",
    //     // required: true
    // },
    // dividendCurrency:{
    //     model: "token",
    //     // required: true
    // },
    user_id:{
        model: "user",
        required: true
    },

  },


};
