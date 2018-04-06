const
    url = require('./url'),
    Table =require('cli-table')

const search = (item) => {

    let table= new Table({
        head: ['Score','Id','Url','Name', 'Type','Language',
         'Genres','Status','Runtime','Premiered','OfficialSite'
         ,'Schedule','Rating','Weight','WebChannel',
         ,'Externals','Summary','Updated','_Links'
    ]
      , colWidths: [10,10,10,10,10,10,10,10,10,10,
                    25,25,25,25,25,10,10,10,10,10
                    ]
    });
    
    if(Number.isInteger(item))
    {
        url.idsearch(item)
            .then(result =>{
               
                console.log(table.toString())
            })
            .catch(err => console.log(err))
    }
    else
    {
        url.wordsearch(item)
            .then(result =>{
               
                    result.forEach(element => {
                        table.push([element.score,
                                    element.show['id'],
                                    element.show['url'],
                                    element.show['name'],
                                    element.show['type'],
                                    element.show['language'],
                                    element.show['genres'],
                                    element.show['status'],
                                  // element.show['runtime'],
                                    //element.show['premiered'],
                                    // element.show['officialSite'],
                                //     `Time :${element.show['schedule']['time']} \n Days: ${element.show['schedule']['days']}`,
                                //     element.show['rating'],
                                //     element.show['weight'],
                                //   //  `id:${element.show['network']['id']}\n name:${element.show['network']['name']}\n Country: ${element.show['network']['country']['name']},${element.show['network']['country']['code']},${element.show['network']['country']['timezone']}`,
                                //     element.show['webChannel'],
                                    `tvrage:${element.show['externals']['tvrage']}\n thetvdb:${element.show['externals']['thetvdb']}\n imdb:${element.show['externals']['imdb']}`,
                                  //  `medium:${element.show['image']['medium']}\n original:${element.show['image']['original']}`,
                                    element.show['summary'],
                                    element.show['updated'],
                                    `self:${element.show['_links']['self']}\n previousepisode:${element.show['_links']['previousepisode']}`
                                ])
                    })
                console.log(table.toString())
            })
            .catch(err => console.log(err))
    }

    
}


module.exports = {
    search
}