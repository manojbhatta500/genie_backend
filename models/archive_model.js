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
    title:{
        type:String,
        required:true
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const ArchiveModel = mongoose.model('ArchiveSchema', archiveSchema);

module.exports = ArchiveModel;
 
