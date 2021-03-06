const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/UserModel');
const Role = require('../models/RoleModel');
const { PERMISSIONS } = require('../constants');

router.post('/login', async ({ body}, res) => {

    try{
        const { username, password } = body;
        if(!username || !password) return res.status(400).json({message: 'Username and password cannot be empty'});
        const user = await User.findOne({ username });
        if(!user) return res.status(400).json({message: 'Invalid username or password'});
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) return res.status(400).json({message: 'Invalid username or password'});
        const role = await Role.findById(user?.roleID);
        const token = jwt.sign({ id: user._id, permissions: role?.permissions }, JWT_SECRET, { expiresIn: 604800 });
        if(!token) return res.status(400).json({message: 'Something went wrong'});
        user.password = null;
        res.json({ user, token, permissions: role?.permissions });
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/register', async ({body}, res) => {
  try{
      let roleID;

      if(body?.password.length < 8)
          return res.status(400).json({message: 'Password minimum length is 8'});

      if(body?.username === 'admin')
          return res.status(400).json({message: 'Username already exists'});

      try {
          const newRole = new Role({
              name: 'ClientRole',
              description: 'This role is autogenerated.',
              permissions: Object.values(PERMISSIONS)
                  .filter((permission) => permission.includes('user:')),
          });
          const { _id } = await newRole.save();
          roleID = _id;
      } catch (e){
          const { _id } = await Role.findOne({ name: 'ClientRole' });
          roleID = _id;
      }
      const newUser = new User({...body, roleID });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);

      newUser.password = hash;
      const savedUser = await newUser.save();
      savedUser.password = null;

      const role = await Role.findById(savedUser?.roleID);
      const token = jwt.sign({ id: savedUser._id, permissions: role?.permissions }, JWT_SECRET, { expiresIn: 604800 });
      if(!token) return res.status(400).json({message: 'Something went wrong'});
      savedUser.password = null;
      res.json({ user: savedUser, token, permissions: role?.permissions });
  } catch(e){
      if(e?.message?.includes('email_1 dup key'))
          return res.status(400).json({message: 'Email already exists'});
      if(e?.message?.includes('username_1 dup key'))
          return res.status(400).json({message: 'Username already exists'});
      res.status(400).json({message: e?.message || 'Something went wrong'});
  }
});

module.exports = router;