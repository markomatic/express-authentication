"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var secretOrKey = _ref.secretOrKey;

  _passport.default.use(new _passportJwt.Strategy({
    secretOrKey: secretOrKey,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  }, function (payload, done) {
    return done(null, payload);
  }));

  return function (_ref2) {
    var app = _ref2.app,
        path = _ref2.path,
        authenticate = _ref2.authenticate;
    app.use(path, function (req, res, next) {
      return _passport.default.authenticate('jwt', {
        session: false
      }, function (err, jwtPayload, info) {
        return authenticate({
          req: req,
          res: res,
          next: next,
          jwtPayload: jwtPayload,
          error: err,
          info: info
        });
      })(req, res, next);
    });
  };
};

exports.default = _default;