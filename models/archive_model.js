const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    types: {
        type: String,
        enum: ['Song', 'Poetry', 'Story'],
        required:true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const ArchiveModel = mongoose.model('archiveSchema', archiveSchema);

module.exports = ArchiveModel;
 