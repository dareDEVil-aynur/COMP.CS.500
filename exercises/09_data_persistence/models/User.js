const mongoose = require('./../mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        match: [emailRegex, 'Please fill a valid email address!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, 'Password needs to be at least 6 characters long!']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: 'Invalid role!'
        },
        default: 'user'
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Post-save hook to handle unique email constraint error
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const validationError = new mongoose.Error.ValidationError();
        validationError.errors = {
            email: new mongoose.Error.ValidatorError({
                message: 'Email is already in use!',
                path: 'email',
                value: doc.email
            })
        };
        next(validationError);
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
