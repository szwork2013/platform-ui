const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer',
}

//业务错误代码
const EnumErrorCode = {
  NETWORK_ERROR: 600,
  BUSINESS_ERROR: 601,
  RULE_SCRIPT_FAILED: 1,
  USER_NOT_FOUND: 2,
  USER_ACCOUNT_LOCKED: 3,
  NEED_AUTHENTICATION: 4,
  SESSION_OUT_OF_DATE: 41,
  NEED_PERMISSION: 5,
  SHIRO_ERROR: 6,
  VALIDATION_FAILED : 7,
  LOGIN_FALED: 8,
}

export {
  EnumRoleType,
  EnumErrorCode,
}
