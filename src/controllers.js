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

// find ticker controllers

exports.findAll = (req, res) => {
  const tickets = ticketCollection.find();
  res.status(200).json({
    items: tickets,
    total: tickets.length,
  });
};

// single tickets

exports.findById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketCollection.findById(id);
  if (!ticket) {
    return res.status(404).json({
      message: '404 not found!',
    });
  }
  res.status(200).json(ticket);
};

exports.findTicketByUserName = (req, res) => {
  const username = req.params.username;
  const tickets = ticketCollection.findTicketByUserName(username);
  res.status(200).json({
    items: tickets,
    total: tickets.length,
  });
};
