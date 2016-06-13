define(function(reqsuire) {
    
    var randomSeedTemplate = require('hbs!UI/templates/randomseed');
    var controlpanelTemplate = require('hbs!UI/templates/controlpanel');


    var config = {
        seed : {
            name : 'seed',
            type : 'number',
            min : 0,
            max : 200000
        },
        direction : {
            options : [
                'horizontal',
                'vertical'
            ]
        }
    }

    var seed = {
        name : 'seed',
        type : 'number',
        min : 0,
        max : 200000
    };

    var s = randomSeedTemplate(seed);

    document.getElementById('cp2').innerHTML = controlpanelTemplate(config);

});