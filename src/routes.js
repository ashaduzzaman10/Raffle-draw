const router = require('express').Router();
const { sellingBulkTicket, sellingSingleTicket } = require('./controllers');
router.route('/t/:id').get().put().delete();

router.route('/u/:username').get().put().delete();

router.post('/bulk',sellingBulkTicket);
router.get('/draw',);


router.route('/').get().post(sellingSingleTicket);

module.exports = router;
