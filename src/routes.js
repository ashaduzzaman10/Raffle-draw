const router = require('express').Router();
const { sellingBulkTicket, sellingSingleTicket,findAll,findById,findTicketByUserName } = require('./controllers');


router.route('/t/:id').get(findById).put().delete();


router.route('/u/:username').get(findTicketByUserName).put().delete();

router.post('/bulk',sellingBulkTicket);
router.get('/draw',);


router.route('/').get(findAll).post(sellingSingleTicket);

module.exports = router;
