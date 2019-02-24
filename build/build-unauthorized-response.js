"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var res = _ref.res,
      error = _ref.error;
  return res.status(401).json({
    message: error ? error.message : 'Unauthorized'
  });
};

exports.default = _default;