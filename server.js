const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, ATLAS_URI } = require('./config');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('mongodb:connection_established');
});

const AuthRouter = require('./routes/AuthRoutes');
const NotificationRouter = require('./routes/NotificationRoutes');
const ReservationRouter = require('./routes/ReservationRoutes');
const RoleRouter = require('./routes/RoleRoutes');
const UserRouter = require('./routes/UserRoutes');

app.use('/Auth', AuthRouter);
app.use('/Notifications', NotificationRouter);
app.use('/Reservations', ReservationRouter);
app.use('/Roles', RoleRouter);
app.use('/Users', UserRouter);

app.listen(PORT || 5000, () => {
    console.log(`server:running_port_${PORT || 5000}`);
});