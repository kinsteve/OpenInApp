// user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    phone_number: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Validates that the phone number is a 10-digit number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    priority: {
        type: Number,
        required: true,
        enum: {
            values: [0, 1, 2],
            message: '{VALUE} is not a valid priority. Priority must be 0(highest), 1, or 2(lowest).'
        },
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

export default User;
