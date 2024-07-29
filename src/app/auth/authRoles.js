/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['superadmin'],
  staff: ['admin', 'superadmin'],
  user: ['admin', 'superadmin', 'user'],
  onlyGuest: []
}

export default authRoles
