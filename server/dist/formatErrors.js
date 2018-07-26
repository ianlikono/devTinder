'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(x => _lodash2.default.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};