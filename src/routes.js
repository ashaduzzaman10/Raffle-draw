const router = require('express').Router();
const {
  sellingBulkTicket,
  sellingSingleTicket,
  findAll,
  findById,
  findTicketByUserName,
  updateById,
  updateByUserName,
  deleteById,
  deleteByUserName,
  drawWinners,
} = require('./controllers');

router.route('/t/:id').get(findById).put(updateById).delete(deleteById);

router
  .route('/u/:username')
  .get(findTicketByUserName)
  .put(updateByUserName)
  .delete(deleteByUserName);

router.post('/bulk', sellingBulkTicket);
router.get('/draw', drawWinners);

router.route('/').get(findAll).post(sellingSingleTicket);

module.exports = router;
