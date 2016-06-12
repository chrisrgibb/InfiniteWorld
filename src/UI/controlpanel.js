define(['hbs!UI/templates/randomseed'],function(randomSeedTemplate) {
    
    var seed = {
        name : 'seed',
        type : 'number',
        min : 0,
        max : 200000
    };

    var s = randomSeedTemplate(seed);

});