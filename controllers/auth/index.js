const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const changeSubscription = require('./changeSubscription');
const { controllerWrapper } = require('../../helpers');

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  changeSubscription: controllerWrapper(changeSubscription),
};
