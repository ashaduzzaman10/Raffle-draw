const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets');

const TicketCollection = {
  async constructor() {
    this[tickets] = await readFile();
  },

  async create(username, price) {
    await this.constructor(); // Ensure that the constructor is called before accessing tickets
    const ticket = new Ticket(username, price);
    this[tickets] = this[tickets] || []; // Initialize tickets as an empty array if it's undefined
    this[tickets].push(ticket);
    await writeFile(this[tickets]);
    return ticket;
  },

  async createBulk(username, price, quantity) {
    await this.constructor(); // Ensure that the constructor is called before accessing tickets
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = await this.create(username, price);
      result.push(ticket);
    }
    await writeFile(this[tickets]);
    return result;
  },

  async find() {
    await this.constructor(); // Ensure that the constructor is called before accessing tickets
    return this[tickets] || []; // Return empty array if tickets is undefined
  },

  async findTicketById(id) {
    await this.constructor(); // Ensure that the constructor is called before accessing tickets
    return this[tickets]
      ? this[tickets].find((ticket) => ticket.id === id)
      : null; // Return null if tickets is undefined
  },

  async findTicketByUserName(username) {
    await this.constructor(); // Ensure that the constructor is called before accessing tickets
    return this[tickets]
      ? this[tickets].filter((ticket) => ticket.username === username)
      : []; // Return empty array if tickets is undefined
  },

  // Other methods...
};

const ticketCollection = Object.create(TicketCollection);
ticketCollection.constructor();

module.exports = ticketCollection;
