const joi = require('joi');

// Validation schemas
const registerSchema = joi.object({
    fullName: joi.string().min(2).max(50).required().messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name cannot exceed 50 characters',
        'any.required': 'Full name is required'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().min(6).max(128).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'any.required': 'Password is required'
    }),
    profileImageUrl: joi.string().uri().optional().allow(null, '')
});

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

const expenseSchema = joi.object({
    category: joi.string().min(1).max(50).required().messages({
        'string.min': 'Category cannot be empty',
        'string.max': 'Category cannot exceed 50 characters',
        'any.required': 'Category is required'
    }),
    amount: joi.number().positive().precision(2).required().messages({
        'number.positive': 'Amount must be a positive number',
        'any.required': 'Amount is required'
    }),
    date: joi.date().required().messages({
        'any.required': 'Date is required'
    }),
    icon: joi.string().optional().allow(null, '')
});

const incomeSchema = joi.object({
    source: joi.string().min(1).max(50).required().messages({
        'string.min': 'Income source cannot be empty',
        'string.max': 'Income source cannot exceed 50 characters',
        'any.required': 'Income source is required'
    }),
    amount: joi.number().positive().precision(2).required().messages({
        'number.positive': 'Amount must be a positive number',
        'any.required': 'Amount is required'
    }),
    date: joi.date().required().messages({
        'any.required': 'Date is required'
    }),
    icon: joi.string().optional().allow(null, '')
});

const updateProfileSchema = joi.object({
    fullName: joi.string().min(2).max(50).optional().messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name cannot exceed 50 characters'
    }),
    profileImageUrl: joi.string().uri().optional().allow(null, '').messages({
        'string.uri': 'Profile image URL must be a valid URI'
    })
});

const changePasswordSchema = joi.object({
    currentPassword: joi.string().required().messages({
        'any.required': 'Current password is required'
    }),
    newPassword: joi.string().min(6).max(128).required().messages({
        'string.min': 'New password must be at least 6 characters long',
        'string.max': 'New password cannot exceed 128 characters',
        'any.required': 'New password is required'
    })
});

// Validation middleware functions
const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details[0].message
        });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details[0].message
        });
    }
    next();
};

const validateExpense = (req, res, next) => {
    const { error } = expenseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details[0].message
        });
    }
    next();
};

const validateIncome = (req, res, next) => {
    const { error } = incomeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details[0].message
        });
    }
    next();
};

const validateUpdateProfile = (req, res, next) => {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details[0].message
        });
    }
    next();
};

const validateChangePassword = (req, res, next) => {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details[0].message
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateExpense,
    validateIncome,
    validateUpdateProfile,
    validateChangePassword
};
