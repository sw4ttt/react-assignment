var _ = require('lodash');
var filesManager = require('../filesManager');
var fs = require('fs');

exports.getAll = function(req, res) {
    return res.status(200).json(filesManager.getAll());
}

exports.save = function(req, res) {
    var data = [];

    if(_.isObject(req.body)){
        _.forEach(req.body,function(value,key){
            var item = {
                idQuestion: key,
                answers: _.keys(value)
            };
            data.push(item);
        })
    }
    else{
        data = req.body
    }

    filesManager.save(data);
    return res.status(200).json({success: true});
}

exports.testimonialSave = function(req, res) {
    
    if(_.isEmpty(req.files))
        return res.status(400).json({error: 'MISSING_IMAGE_FILE'});

    if(_.get(req.files,'image.size',0) === 0 || !_.startsWith(_.get(req.files,'image.type','none'), 'image'))
        return res.status(400).json({error: 'INVALID_IMAGE_FILE'});

    if(_.get(req.files,'image.size',0) === 0 || !_.startsWith(_.get(req.files,'image.type','none'), 'image'))
        return res.status(400).json({error: 'INVALID_IMAGE_FILE'});

    filesManager.testimonialSave(req.files.image,req.body,(err)=>{
        if(err)
            return res.status(400).json(err);
        return res.status(200).json({success: true});
    });
    
}

exports.getImage = function(req, res) {

    if(_.isEmpty(req.query.image))
        return res.status(400).json({error: 'INVALID_IMAGE_ULR'});

    var img = null;
    try {
    img = fs.readFileSync(req.query.image);
    } catch (ex){
    img = fs.readFileSync('./public/image/default-image.png');
    }
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
}