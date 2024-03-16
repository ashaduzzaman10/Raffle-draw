const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets');

const TicketCollection = {
  constructor() {
    this[tickets] = [];
  },

  /**
   * create and save new ticket
   *
   * @param {string} username
   * @param {number} price
   * @return {Ticket}
   */

  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    return tickets;
  },

  /**
   *  create bulk tickets
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @return {Ticket[]}
   */

  createBulk(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    return result;
  },

  /**
   * return all ticket from db
   * @return {Ticket}
   */
  find() {
    return this[tickets];
  },

  /**
   * find single ticket by id
   * @param {string} id
   * @return {Ticket}
   */

  findTicketById(id) {
    const ticket = this[tickets].find(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => {
        ticket.id === id;
      }
    );
    return ticket;
  },

  /**
   * find tickets by username
   * @param {string} username
   * @return {Ticket[]}
   */

  findTicketByUserName(username) {
    const ticket = this[tickets].filter(
      /**
       
       * @param {Ticket} ticket
       */
      (ticket) => {
        ticket.username === username;
      }
    );
    return ticket;
  },

  /**
   * update by id
   * @param {string} ticketId
   * @param {{username : string, price : number }} ticketBody
   * @return {Ticket}
   */

  updateById(ticketId, ticketBody) {
    const ticket = this.findTicketById(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    return ticket;
  },

  /**
   *  update bulk tickets
   * @param {string} username
   * @param {{username : string , price : number}} ticketBody
   * @return {Ticket[]}
   */

  updateBulk(username, ticketBody) {
    const userTickets = this.findTicketByUserName(username);
    const updatedTickets = userTickets.map(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => this.updateById(ticket.id, ticketBody)
    );
    return updatedTickets;
  },

  /**
   * deleted tickets by id
   * @param {string} ticketId
   * @return {boolean}
   */
  deleteById(ticketId) {
    const index = this[tickets].findIndex(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );
    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      return true;
    }
  },

  /**
   *  bulk delete by username
   * @param {string} username
   * @return {boolean[]}
   */
  deleteBulk(username) {
    const userTickets = this.findTicketByUserName(username);
    const deletedResult = userTickets.map(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => this.deleteById(ticket.id)
    );
    return deletedResult;
  },

  /**
   * find winners
   * @param {number} winnerCount
   * @return {Ticket[]}
   */

  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);
    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex;
        continue;
      }
    }
    const winners = winnerIndexes.map(
      /**
       * winners index
       * @param {number} index
       * @returns
       */
      (index) => this[tickets][index]
    );
    return winners;
  },
};

const ticketCollection = new TicketCollection();
module.exports = ticketCollection;
