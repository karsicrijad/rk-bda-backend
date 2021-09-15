const DATABASE_MODEL_NAMES = {
    USER: 'USER',
    ROLE: 'ROLE',
    RESERVATION: 'RESERVATION',
    NOTIFICATION: 'NOTIFICATION',
};

const PERMISSIONS = {
    ADMIN_READ_USERS: 'admin:read_users',
    ADMIN_CREATE_USER: 'admin:create_user',
    ADMIN_UPDATE_USER: 'admin:update_user',
    ADMIN_DELETE_USER: 'admin:delete_user',
    ADMIN_READ_ROLES: 'admin:read_roles',
    ADMIN_CREATE_ROLE: 'admin:create_role',
    ADMIN_UPDATE_ROLE: 'admin:update_role',
    ADMIN_DELETE_ROLE: 'admin:delete_role',
    USER_READ_NOTIFICATIONS: 'user:read_notifications',
    ADMIN_CREATE_NOTIFICATION: 'admin:create_notification',
    USER_MARK_NOTIFICATION_AS_READ: 'user:mark_notification_as_read',
    USER_MARK_NOTIFICATION_AS_UNREAD: 'user:mark_notification_as_unread',
    USER_DELETE_NOTIFICATION: 'user:delete_notification',
    USER_READ_RESERVATIONS: 'user:read_reservations',
    USER_CREATE_RESERVATION: 'user:create_reservation',
    USER_READ_CALENDAR: 'user:read_calendar',
    USER_DELETE_RESERVATION: 'user:delete_reservation',
    USER_EDIT_PROFILE: 'user:edit_profile',
};

const BLOOD_TYPES = {
    A_NEGATIVE: 'a:negative',
    A_POSITIVE: 'a:positive',
    B_NEGATIVE: 'b:negative',
    B_POSITIVE: 'b:positive',
    AB_NEGATIVE: 'ab:negative',
    AB_POSITIVE: 'ab:positive',
    ZERO_NEGATIVE: 'zero:negative',
    ZERO_POSITIVE: 'zero:positive',
};

const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

module.exports = {
    DATABASE_MODEL_NAMES,
    PERMISSIONS,
    BLOOD_TYPES,
    DAYS_IN_MONTHS,
};