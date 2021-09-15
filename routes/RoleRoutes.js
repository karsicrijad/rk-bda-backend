const router = require('express').Router();
const auth = require('../middlewares/auth');
const Role = require('../models/RoleModel');
const { PERMISSIONS } = require('../constants');

router.get('/', auth( PERMISSIONS.ADMIN_READ_ROLES ), async ( req , res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch(e){
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.get('/:id', auth( PERMISSIONS.ADMIN_READ_ROLES ), async ({ params }, res) => {
    try {
        const role = await Role.findById(params?.id);
        res.json(role);
    } catch (e) {
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.post('/create', auth( PERMISSIONS.ADMIN_CREATE_ROLE ), async ( { body }, res ) => {
    try {
        const permissions = body?.permissions;
        // Check if all permissions exist
        let permissionsValid = true;
        permissions.forEach((permission) => {
            if( !Object.values(PERMISSIONS).includes(permission) ) permissionsValid = false;
        });

        if(!permissionsValid) return res.status(400).json({ message: 'Unknown permission' });

        // Check if permissions are mixed up
        if(permissions.length){
            const part = permissions[0]?.split(':')[0];
            permissions.forEach((permission) => {
                if(!permission.includes(part)) permissionsValid = false;
            });
        }

        if(!permissionsValid) return res.status(400).json( { message: 'Mixed roles are not valid' } );

        const newRole = new Role({...body});
        const savedRole = await newRole.save();
        res.json(savedRole);
    } catch (e) {
        if(e?.message?.includes('name_1 dup key'))
            return res.status(400).json({message: 'Role already exists'});
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.post('/update/:id', auth( PERMISSIONS.ADMIN_UPDATE_ROLE ), async ({ body, params }, res) => {
    try {
        const permissions = body?.permissions;
        // Check if all permissions exist
        permissions.forEach((permission) => {
            if( !Object.values(PERMISSIONS).includes(permission) ) return res.status(400).json({ message: 'Unknown permission' });
        });

        // Check if permissions are mixed up
        if(permissions.length){
            const part = permissions[0]?.split(':')[0];
            permissions.forEach((permission) => {
                if(!permission.includes(part)) return res.status(400).json( { message: 'Mixed roles are not valid' } );
            });
        }

        await Role.findOneAndUpdate({_id: params?.id}, {...body});
        res.json();
    } catch (e) {
        if(e?.message?.includes('name_1 dup key'))
            return res.status(400).json({message: 'Role already exists'});
        res.status(400).json({message: e?.message || 'Something went wrong'});
    }
});

router.delete('/:id', auth( PERMISSIONS.ADMIN_DELETE_USER ), async ( { params }, res ) => {
    try{
        await Role.findOneAndDelete({_id: params?.id});
        res.json();
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;