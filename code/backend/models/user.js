const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone: {
        type: String, 
        required: true, 
        validate: {
            validator: (e) => {
                return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(e);
                //return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e); mail
            },
            message: props => `sdt ${props.value} khong hop le !`
        }
    },
    password: {type: String, required: true},
    role: String,
    created_at: Date,
    deleted: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', userSchema);