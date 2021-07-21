var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var flatCache = require('flat-cache');
const { v4: uuidv4 } = require('uuid');

exports.getAll = function() {
    var cacheSurveys = flatCache.load('dbSurveys',path.resolve('./public/data'));
    let dataSurveys = cacheSurveys.all();

    let surveysResponse = [];
    if(!_.isEmpty(dataSurveys)){
        _.forEach(dataSurveys,(value,key)=>{

            let item = {
                idQuestion: key,
                answers: _.map(value,(item,key)=>{
                    let response = {
                        answer: key,
                        times: item
                    };
                    return response;
                })
            }
            item.total = _.sumBy(item.answers, 'times');
            _.forEach(item.answers,function(answer,key){
                item.answers[key]['percentage'] = ((answer.times * 100)/item.total).toFixed(0) + "%";
            })
            item.max = _.maxBy(item.answers, function(answer) { return answer.times; });
            surveysResponse.push(item);
        })
    }


    var cacheTestimonials = flatCache.load('dbTestimonials',path.resolve('./public/data'));
    let dataTestimonials = cacheTestimonials.all();

    var testinomialResponse = _.values(dataTestimonials);

    return {surveys: surveysResponse, testimonial: testinomialResponse};
}

exports.save = function(data) {
    var cache = flatCache.load('dbSurveys',path.resolve('./public/data'));

    //each surveyItem item has: idQuestion, answers=[string]
    _.forEach(data,(surveyItem)=>{
        let question = cache.getKey(surveyItem.idQuestion)
        if(!question){
            question = {}
            _.forEach(surveyItem.answers,(answer)=>{
                question[answer] = 1;
            })
        }
        else{
            _.forEach(surveyItem.answers,(answer)=>{
                question[answer] = parseInt(_.get(question,answer,0)) + 1;
            })

        }
        cache.setKey(surveyItem.idQuestion, question);
    })

    cache.save(true);
}

exports.testimonialSave = function(imageFile,data,callback) {

    var name = uuidv4() + "." + imageFile.type.toString().split('/')[1];
    var movePath = "./public/images/" + name;

    var objectToSave = {
        imagePath: "./images/"+ name,
        age: data.age,
        testimony: data.testimony
    }

    fs.rename(imageFile.path, movePath,function(err){
        if(err)
            return callback(err);
        var cache = flatCache.load('dbTestimonials',path.resolve('./public/data'));
        cache.setKey(uuidv4(), objectToSave);
        cache.save(true);
        return callback()
    });
}

