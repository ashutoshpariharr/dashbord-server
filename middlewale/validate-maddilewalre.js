const { Schema } = require("zod");

const validate = (Schema) => async (req, res, next) => {
  try {
    const parseBody = await Schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 410;

    const message = "Fill the input field properlyy.";
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
    };

    console.log(error);
    next(error);
  }
};

module.exports = validate;
