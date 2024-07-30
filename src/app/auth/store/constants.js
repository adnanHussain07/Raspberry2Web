export const Roles = {
  superadmin: 'superadmin',
  admin: 'admin',
  user: 'user'
}

export const Permissions = {
  ADDREGISTER: 'ADDREGISTER',
  ADDITEM: 'ADDITEM',
  DELETEITEM: 'DELETEITEM',
  DELETEUSER: 'DELETEUSER',
  DELETEREGISTER: 'DELETEREGISTER',
  SEEREGISTERUSERS: 'SEEREGISTERUSERS'
}

export const Menus = {
  DASH: 'dashboard',
  APP: 'applications',
  ITEMS: 'items',
  USERS: 'manageusers',
  CREATEITEM: 'itemcreate',
  CREATMODULE: 'modulecreate',
  REGISTERUSER: 'userregister',
  LOGS: 'logs',
  ADD: 'Add'
}

export const RoleMenus = [
  // default created super admin
  {
    id: Roles.superadmin,
    access: [
      Menus.ITEMS,
      Menus.USERS,
      Menus.CREATEITEM,
      Menus.CREATMODULE,
      Menus.LOGS,
      Menus.REGISTERUSER,
      Menus.ADD,
      Menus.DASH,
      Menus.APP
    ],
    permissions: [
      Permissions.ADDITEM,
      Permissions.ADDREGISTER,
      Permissions.DELETEITEM,
      Permissions.DELETEREGISTER,
      Permissions.DELETEUSER,
      Permissions.SEEREGISTERUSERS
    ]
  },
  // register admin
  {
    id: Roles.admin,
    access: [
      Menus.LOGS,
      Menus.REGISTERUSER,
      Menus.ADD,
      Menus.DASH,
      Menus.USERS
    ],
    permissions: [
      Permissions.ADDITEM,
      Permissions.ADDREGISTER,
      Permissions.DELETEITEM,
      Permissions.DELETEREGISTER,
      Permissions.DELETEUSER,
      Permissions.SEEREGISTERUSERS
    ]
  },
  // register user
  {
    id: Roles.user,
    access: [Menus.LOGS, Menus.DASH],
    permissions: []
  }
]

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
  code2: 'rgb(190 187 187 / 63%)'
}

export const ReqSource = {
  WEB: 'SRC_WEB',
  MOB: 'SRC_APP',
  PHONE: 'SRC_CAL',
  EMAIL: 'SRC_EMA'
}

export const DateTimeFormat = 'DD/MM/YYYY hh:mm a'
export const DateFormat = 'DD/MM/YYYY'
export const GoogleMapUri = 'https://www.google.com/maps/search/?api=1&query='

export const StoreLabs = [
  {
    id: 1,
    name: 'Lab 19'
  },
  {
    id: 2,
    name: 'Lab 26'
  },
  {
    id: 3,
    name: 'Lab 32'
  },
  {
    id: 4,
    name: 'Lab36'
  },
  {
    id: 4,
    name: 'Lab42'
  }
]
