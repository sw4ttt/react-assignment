import axios from "axios";

export function SaveSurvey(answers, callback) {

    console.log("SaveSurvey send answers=",answers)
    let options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: answers,
        url: "/api/survey/save",
    };

    axios(options)
        .then((response) => {
            console.log("response=",response.status,response.data);
            if(response.status !== 200){
                return callback(response.data);
            }
            return callback(null,response.data);
        })
        .catch(function (error) {
            console.log(error.toJSON());
            return callback(error.toJSON());
        });

}

export function SaveTestimony(age,testimony,selectedFile, callback) {

    const data = new FormData() 

    data.append('age', age);
    data.append('testimony', testimony);
    data.append('image', selectedFile);

    let url = "/api/testimonial/save";

    axios.post(url, data, {headers: {
        'content-type': 'multipart/form-data'
    } })
    .then(response => {
        //console.log("response",response)
        return response.data
    })
    .then(data => {
        //console.log("data",data)
        return callback();
    })
    .catch(error => {
        console.log("catch",error.response.data.error)
        return callback(error.response.data.error);
    })
}
