const ticketCollection = require('./tickets');
const TicketCollection = require('./tickets');

// ticket selling controllers

exports.sellingSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);
  res.status(201).json({
    message: 'ticket create successfully ',
    ticket,
  });
};

exports.sellingBulkTicket = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = ticketCollection.createBulk(username, price, quantity);
  res.status(201).json({
    message: 'ticket created successfully ',
    tickets,
  });
};
