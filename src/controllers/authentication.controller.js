const AuthService = require("../services/authentication.service");
const { formatResponse } = require("../utils/formatting/formatting.utils");

const SignUp = async (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = "User SignUp"
  /*
      #swagger.parameters['obj'] = {
          in: 'body',
          type: 'object',
          required: true,
          description: 'Create user',
          schema: {
              $fullName: "Full name",
              $email: "user@book.in",
              $phone: "9898989898",
              $password: "password",
              $confirmPassword: "password"
          }
      }
  */
  try {
    const payload = req.body;

    delete payload.confirm_password; // remove confirm password from payload

    const result = await AuthService.signup(payload);
    return formatResponse(res, result);
  } catch (error) {
    return formatResponse(res, error);
  }
};

const login = async (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = "login API"

  /*
    #swagger.parameters['obj'] = {
      in: 'body',
      type: 'object',
      required: true,
      schema: {
        $email: "user@gmail.com",
        $password: "password"
      }
    }
  */
  try {
    const payload = req.body;
    const result = await AuthService.login(payload);
    return formatResponse(res, result);
  }
  catch (error) {
    return formatResponse(res, error);
  }
};

const fetchUserProfile = async (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = "Get logged In user details"

  /*
    #swagger.parameters['authorization'] = {
      in: 'header',
      type: 'string',
      required: true,
      description: 'Authorization token'
    }
  */

  const user = req.user;
  return formatResponse(res, user);
};

module.exports = {
  login,
  SignUp,
  fetchUserProfile
};
