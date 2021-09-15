const router = require('express').Router();
const auth = require('../middlewares/auth');
const Reservation = require('../models/ReservationModel');
const { PERMISSIONS } = require('../constants');
const { isDateValid } = require('../utils/date');

router.get('/', auth(PERMISSIONS.USER_READ_RESERVATIONS), async ({ user }, res) => {
   try {
       const reservations = await Reservation.find({
           userID: user?.id,
       });
       res.json(reservations);
   } catch(e) {
       res.status(400).json({message: e?.message || 'Something went wrong'});
   }
});

router.get('/calendar/year/:year/month/:month/day/:day', auth(PERMISSIONS.USER_READ_CALENDAR),  async ({ params }, res) => {
    try {
      const { year, month, day } = params;
      const requestDate = new Date( parseInt(year), parseInt(month), parseInt(day) );
      if(isNaN(requestDate.getTime()) || !isDateValid({ year, month, day })) return res.status(400).json({ message: 'Invalid date' });
      const reservations = await Reservation.find({
          year,
          month,
          day
      });
      res.json(reservations);
    } catch (e){
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.post('/create', auth(PERMISSIONS.USER_CREATE_RESERVATION), async ({ body }, res) => {
   try {
       const { year, month, day, hour } = body;
       const requestDate = new Date( parseInt(year), parseInt(month)-1, parseInt(day), parseInt(hour) );
       if(isNaN(requestDate.getTime()) || !isDateValid({ year, month, day, hour })) return res.status(400).json({ message: 'Invalid date' });
       const currentDate = new Date();
       if(requestDate.getTime() < currentDate.getTime()) return res.status(400).json({ message: 'Cannot make a reservation in past' });
        const result = await Reservation.findOne({year, month, day, hour});
        if(result) return res.status(400).json({message: 'Reservation already exists'});
        const newReservation = new Reservation({...body});
        const savedReservation = await newReservation.save();
        res.json(savedReservation);
   } catch (e) {
       res.status(400).json({message: e?.message || 'Something went wrong'});
   }
});

router.delete('/:id', auth( PERMISSIONS.USER_DELETE_RESERVATION ), async ( { params }, res ) => {
    try{
        await Reservation.findOneAndDelete({_id: params?.id});
        res.json();
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;