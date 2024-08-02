const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
console.log( "string");
    //get the req object from context
   // const req = context.req; 

    console.log("req: " + req);
    
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log("the token: " + token);

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    console.log("token", token)

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log("the data from the token is: " + data);
      req.user = data;
      console.log("Token verified successfully", data);
    }
    catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ userName, email, _id }) {
    const payload = { userName, email, _id };

    return jwt.sign(
      { data: payload },
      secret,
      { expiresIn: expiration }
    );
  }
};