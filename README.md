# @markomatic/express-authentication

Just another authentication library for express.

## Install

```
npm i git+https://git@github.com/markomatic/express-authentication.git --save
```

## API

### createJwtMiddleware

Function that creates JWT authentication middleware.

#### Arguments

- secretOrKey - JWT secret

#### Returns

Function with arguments:
- app - express application to apply middleware on;
- path - path on which middleware will be applied;
- authenticate ({ req, res, next, jwtPayload, error, info }) - callback function which does authentication;

### buildUnauthorizedResponse

Helper function for returning unauthorized response.

#### Arguments

- res - response object;
- error - error object;

#### Returns

Response with status `401` and body with `message` containing error message.

## Example

```
const app = express();

... Login token generation

const token = jwt.sign({
    id: 'someId',
    email: 'someEmail'
}, JWT_SECRET);

...

createJwtMiddleware({ secretOrKey: JWT_SECRET })({
    app,
    path: '/protected/path',
    authenticate: async ({ req, res, next, error, jwtPayload: { id } = {}, info }) => {
        if (error || !id) {
            return buildUnauthorizedResponse({ res, error: info || error });
        }

        try {
            const user = await db.user.findById(id);

            if (user) {
                req.user = user;
                return next();
            }

            error = new Error('Unauthorized user.');
        } catch (err) {
            error = err;
        }

        return buildUnauthorizedResponse({ res, error });
    }
});
```
