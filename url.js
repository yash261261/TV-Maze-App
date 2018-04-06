const 
     config = require("./config"),
     superagent = require("superagent")

    
const _fetch = (command) =>{
        return superagent.get(`${config.url}${command}`)
            .then(response => response.body)
            .catch(error => error.response.body)    
}

exports.wordsearch = (item) =>{

    if(item)
        return _fetch(`/search/shows?q=${item}`)
        

}

exports.idsearch = (item) =>{
        if(item)
           return _fetch(`shows/${item}`)
           
}