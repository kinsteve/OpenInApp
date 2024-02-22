// user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    phone_number: {
        type: String, // Changed to String to allow non-numeric characters
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\+\d{10,15}$/.test(v); // Allows a plus sign followed by 10 to 15 digits
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
