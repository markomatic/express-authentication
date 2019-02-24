import passport from 'passport';
import {
    ExtractJwt,
    Strategy
} from 'passport-jwt';

export default (
    {
        secretOrKey
    }) => {
    passport.use(
        new Strategy(
            {
                secretOrKey,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            (payload, done) => done(null, payload)
        )
    );

    return (
        {
            app,
            path,
            authenticate
        }) => {
        app.use(path, (req, res, next) =>
            passport.authenticate('jwt', { session: false }, (err, jwtPayload, info) =>
                authenticate({ req, res, next, jwtPayload, error: err, info }))(req, res, next)
        );
    }
};
