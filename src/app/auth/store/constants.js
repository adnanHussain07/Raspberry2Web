export const Roles = {
  superadmin: 'superadmin',
  admin: 'admin',
  user: 'user',
};

export const Permissions = {
  EXPORT: "EXPORT",
  ADDUSER: "ADDUSER",
  ADDREGISTER: "ADDREGISTER",
  ADDITEM: "ADDITEM",
  DELETEITEM: "DELETEITEM",
  DELETEUSER: "DELETEUSER",
  DELETEREGISTER: "DELETEREGISTER",
  CHANGESTATUS: "CHANGESTATUS",
  SEEREGISTERUSERS: "SEEREGISTERUSERS",
}

export const Menus = {
  DASH: 'dashboard',
  APP: 'applications',
  ITEMS: 'items',
  USERS: 'manageusers',
  CREATEITEM: 'itemcreate',
  CREATEUSER: 'usercreate',
  REGISTERUSER: 'userregister',
  LOGS: 'logs',
  ADD: 'Add',
  CHANGEPASS: 'changepass',
  //////////////////////////////OLD
  REQUESTS: 'requests',
  REQASSIGN: 'reqassign',
  WEIGHT: 'weights',
  CUSTOMERS: 'customers',
  FEEDBACK: 'feedback',
  DRIVERS: 'drivers',
  SETTING: 'settings',
  NOTIFICATION: 'managenotification',
  NOTIFYASSIGN: 'notifyassign',
};

export const RoleMenus = [
  // default created super admin
  {
    id: Roles.superadmin,
    access: [
      Menus.ITEMS,
      Menus.USERS,
      Menus.CREATEITEM,
      Menus.CREATEUSER,
      Menus.LOGS,
      Menus.REGISTERUSER,
      Menus.ADD,
      Menus.CHANGEPASS,
      Menus.DASH
    ],
    permissions: [
      Permissions.ADDITEM,
      Permissions.ADDREGISTER,
      Permissions.ADDUSER,
      Permissions.CHANGESTATUS,
      Permissions.DELETEITEM,
      Permissions.DELETEREGISTER,
      Permissions.DELETEUSER,
      Permissions.EXPORT,
      Permissions.SEEREGISTERUSERS,
    ],
  },
  // register admin
  {
    id: Roles.admin,
    access: [
      Menus.ITEMS,
      Menus.USERS,
      Menus.CREATEITEM,
      Menus.CREATEUSER,
      Menus.LOGS,
      Menus.REGISTERUSER,
      Menus.ADD,
      Menus.CHANGEPASS,
      Menus.DASH
    ],
    permissions: [
      Permissions.ADDITEM,
      Permissions.ADDREGISTER,
      Permissions.ADDUSER,
      Permissions.CHANGESTATUS,
      Permissions.DELETEITEM,
      Permissions.DELETEREGISTER,
      Permissions.DELETEUSER,
      Permissions.EXPORT,
      Permissions.SEEREGISTERUSERS,
    ],
  },
  // register user
  {
    id: Roles.user,
    access: [
      Menus.ITEMS,
      Menus.USERS,
      Menus.CREATEITEM,
      Menus.CREATEUSER,
      Menus.LOGS,
      Menus.ADD,
      Menus.CHANGEPASS,
      Menus.DASH
    ],
    permissions: [
      Permissions.ADDITEM,
      Permissions.ADDUSER,
      Permissions.CHANGESTATUS,
    ],
  },
];

export const DefFilters = {
  NEW: 14,
  INPROGRESS: 15,
  COMPLETED: 16,
  PENDING: 17,
  DONE: 18,
  OTHER: -1,
  ALL: 0
}

export const ReqColorCodes = {
  code1: 'rgb(202 201 201 / 47%)',
  code2: 'rgb(190 187 187 / 63%)',
}

export const ReqSource = {
  WEB: 'SRC_WEB',
  MOB: 'SRC_APP',
  PHONE: 'SRC_CAL',
  EMAIL: 'SRC_EMA',
}

export const DateTimeFormat = 'DD/MM/YYYY hh:mm a';
export const DateFormat = 'DD/MM/YYYY';
export const GoogleMapUri = 'https://www.google.com/maps/search/?api=1&query=';

export const StoreLabs = [
  {
    id: 1,
    name: "Lab 19",
  },
  {
    id: 2,
    name: "Lab 26",
  },
  {
    id: 3,
    name: "Lab 32",
  },
  {
    id: 4,
    name: "Lab36",
  },
  {
    id: 4,
    name: "Lab42",
  }
];