const ticketCollection = require('./tickets');

// Ticket selling controllers
exports.sellingSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);
  res.status(201).json({
    message: 'Ticket created successfully',
    ticket,
  });
};

exports.sellingBulkTicket = async (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = await ticketCollection.createBulk(username, price, quantity);
  res.status(201).json({
    message: 'Tickets created successfully',
    tickets,
  });
};

// Find ticket controllers
exports.findAll = async (_req, res) => {
  try {
    const tickets = await ticketCollection.find();
    if (!tickets) {
      return res.status(404).json({ message: 'No tickets found' });
    }
    res.status(200).json({
      items: tickets,
      total: tickets.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await ticketCollection.findTicketById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.findTicketByUserName = async (req, res) => {
  try {
    const username = req.params.username;
    const tickets = await ticketCollection.findTicketByUserName(username);
    res.status(200).json({
      items: tickets,
      total: tickets.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update controllers
exports.updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await ticketCollection.updateById(id, req.body);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateByUserName = async (req, res) => {
  try {
    const username = req.params.username;
    const tickets = await ticketCollection.updateBulk(username, req.body);
    res.status(200).json({
      items: tickets,
      total: tickets.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete controllers

exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const isDeleted = await ticketCollection.deleteById(id);
    if (isDeleted) {
      return res.status(204).send();
    }
    res.status(404).json({ message: 'Ticket not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteByUserName = async (req, res) => {
  try {
    const username = req.params.username;
    await ticketCollection.deleteBulk(username);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.drawWinners = async (req, res) => {
  try {
    const wc = req.query.wc ?? 3;
    const winners = await ticketCollection.draw(wc);
    res.status(200).json(winners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
