const axios = require('axios');

module.exports.all = () => {
    axios.get('http://localhost:8000/api/commands/index')
            .then(res =>{
                return res.data.results;
            })
            .catch(err =>{
                console.log(err);
            })
};

module.exports.onebyid = (x) => {
    axios.get('http://localhost:8000/api/commands/findid/'+ x)
            .then(res =>{
                return res.data.results;
            })
            .catch(err =>{
                console.log(err);
            })
};

module.exports.onebyname = (x) => {
    return axios.get('http://localhost:8000/api/commands/findname/'+ x)
            .then(res =>{
                return res.data.results;
            })
            .catch(err =>{
                console.log(err);
            })
};

