const router = require('express').Router();
const auth = require('../middlewares/auth');
const Notification = require('../models/NotificationModel');
const User = require('../models/UserModel');
const { PERMISSIONS } = require('../constants');

router.get('/', auth( PERMISSIONS.USER_READ_NOTIFICATIONS ), async ( { user } , res) => {
    try {
        const notifications = await Notification.find({userID: user.id});
        res.json(notifications);
    } catch(e){
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.post('/create', auth( PERMISSIONS.ADMIN_CREATE_NOTIFICATION ), async ( { body }, res ) => {
    try {
        const targetedUsers = await User.find({ bloodType: body?.bloodType });
        const notifications = targetedUsers.map(({_id}) => ({
            text: body?.text,
            isRead: false,
            userID: _id.toString()
        }));
        if(!notifications.length) return res.json();
        await Notification.collection.insertMany(notifications);
        res.json();
    } catch (e) {
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.patch('/mark_as_read/:id', auth( PERMISSIONS.USER_MARK_NOTIFICATION_AS_READ ), async ({ params }, res) => {
    try {
        const notification = await Notification.findById(params?.id);
        notification.isRead = true;
        await notification.save();
        res.json();
    } catch (e) {
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.patch('/mark_as_unread/:id', auth( PERMISSIONS.USER_MARK_NOTIFICATION_AS_UNREAD ), async ({ params }, res) => {
    try {
        const notification = await Notification.findById(params?.id);
        notification.isRead = false;
        await notification.save();
        res.json();
    } catch (e) {
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.delete('/:id', auth( PERMISSIONS.USER_DELETE_NOTIFICATION ), async ( { params }, res ) => {
    try{
        await Notification.findOneAndDelete({_id: params?.id});
        res.json();
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;