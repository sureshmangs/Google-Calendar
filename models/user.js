const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        name: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }

}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {
    try {
        // Do not run for google or facebook
        if (this.method !== 'local') {
            next();
        }

        // generate a salt
        const salt = await bcrypt.genSalt(10);
        // generate the hashed password (ie; salt + password)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // assign the gashed password to the plain password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

// create a model
const User = mongoose.model('user', userSchema);

//export the model
module.exports = User;