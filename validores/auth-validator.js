const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .email({ message: "Invalid Email address!" })
    .min(10, { message: "Email content atlest more then 10 character" })
    .max(100, { message: "That's a more text for email!" }),

  password: z
    .string({ required_error: "password is required!" })
    .min(6, { message: "password content atlest more then 8 character" })
    .max(50, { message: "That's a more text for password!" }),
});


const singupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required!" })
    .trim()
    .min(3, { message: "Name content atlest more then 3 character" })
    .max(30, { message: "That's a more text for username!" }),

  email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .email({ message: "Invalid Email address!" })
    .min(10, { message: "Email content atlest more then 10 character" })
    .max(100, { message: "That's a more text for email!" }),

  phone: z
    .string({ required_error: "phone is required!" })
    .trim()
    .min(10, { message: "phone content atlest more then 10 character" })
    .max(20, { message: "That's a more text for phone!" }),

  password: z
    .string({ required_error: "password is required!" })
    .min(6, { message: "password content atlest more then 8 character" })
    .max(50, { message: "That's a more text for password!" }),
});

module.exports = { singupSchema, loginSchema };
