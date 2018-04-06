const
    url = require('./url'),
    Table =require('cli-table'),
   // uimage=require('url-to-image'),
   // fs =require('fs')
    inquirer=require('inquirer')
   // png=require('console-png').attachTo(console)

    let table= new Table({
        head: ['Name', 'Type','Language',
         'Genres','Status','Premiered','OfficialSite'
        ,'Schedule','Rating','Streamed On'
        ,'Externals','Images','summary'
    ] 
      , colWidths: [15,10,10,10,10,10,10,10,10,10,10,10,10
    ]
    });

const search = (item) => {

        let shows=[]

        url.wordsearch(item)
            .then(result =>{

                    result.forEach(element => {

                        shows.push({'name':element.show['name'],'value':element.show['id']})

                    })
               inquirer.prompt([{
                type: 'checkbox',
                message: 'select tvshows you want see',
                name: 'tvshow',
                pageSize:25,
                choices:shows,  
                validate: (answer) => {
                    if(answer.length<1)
                    {
                        return "You must choose at least one tvshow";
                    }
                    return true;
                } 
            }]).then((answer)=>{
                printresult(answer)
            })
            })
            .catch(err => console.log(err))
    
}

const printresult = (answer) =>{

  const promises =answer.tvshow.map((show)=>{
            return addTable(show)
        })

     Promise.all(promises)
       .then(()=>{
           console.log(table.toString())
       })
       .catch(error=>{
           console.log('error',error)
       })
}


const addTable = (answer) =>{

  return new Promise((resolve,reject)=>{

   url.idsearch(answer)
        .then(element=>{

            clean(element)

            table.push([element['name'],
                            element['type'],
                            element['language'],
                            element['genres'],
                            element['status'],
                            element['premiered'],
                            element['officialSite'],
                            `Time :${element['schedule']['time']} \n Days: ${element['schedule']['days']}`,
                            element['rating'],
                            ` name:${element['network']['name']}\n Country: ${element['network']['country']}`,
                            `tvrage:${element['externals']['tvrage']}\n thetvdb:${element['externals']['thetvdb']}\n imdb:${element['externals']['imdb']}`,
                            `medium:${element['image']['medium']}\n original:${element['image']['original']}`,
                        element['summary']
                        ])
      
         resolve()
       })    
})}


const clean = (obj) => {
    for (var propName in obj) { 

        if(typeof obj[propName] === 'object'){
            if (obj[propName] === null || obj[propName] === undefined) {
                obj[propName]="NA"
             }
             else {
                clean(obj[propName])
             }
        }    
    }
}

module.exports = {
    search
}
 