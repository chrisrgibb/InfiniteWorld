define(function(require) {
    'use strict';

    var localStorageAdapter = require('./localStorageAdapter');

    var mappings = {
        'randomSeed' : {
            dataType : 'number' 
        },
        'isRandom' : {
            dataType : 'bool'
        }
    };

    var getFunctions = {
        'number' : function (key) {
            if(key == null) {
                return 0;
            } else {
                return parseFloat(localStorageAdapter.get(key));
            }
        },
        'bool' : function (key) {
            return localStorageAdapter.get(key) === 'true';
        }
    };


    var userDefinedOptions = {
        direction : 1,
        seedValue : parseInt(localStorage['infinite.alexkidd.randomSeed']) || 6,
        isRandom : localStorage['infinite.alexkidd.generateRandomLevel'] === "true"
    };

    var currentOptions = {

    };


    return {
        get : function(key) {
            var info = mappings[key];
            if(info && info.dataType) {
                var func = getFunctions[info.dataType];
                return func(key);
            }
            return localStorageAdapter.get(key);
        },
        /**
         * UPDATE THE LOCAl
         */
        update : function(key, value) {
            localStorageAdapter.update(key, value);
        },
        getMany : function(arr) {

            var ob = {};
            arr.forEach(function(t){
                var val = this.get(t);
                ob[t] = val;
            }, this);
            return ob;
        },
        getCurrent : function(){
            return currentOptions;
        }
    };
});