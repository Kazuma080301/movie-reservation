const { z } = require("zod");

const emailSchema = z.string().email("Invalid email format")

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")

const registerSchema = z.object({
    name: z.string("Invalid name format"),
    email: emailSchema,
    password: passwordSchema,
});

const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

const forgotPasswordSchema = z.object({
    email: emailSchema
});

const resetPasswordSchema = z.object({
    newPassword: passwordSchema
});

module.exports = { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };
