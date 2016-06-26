define(function(require, exports, module) {
    'use strict';

    var localStorageAdapter = require('./localStorageAdapter');

    var mappings = {
        'randomSeed' : {
            dataType : 'number' 
        },
        'isRandom' : {
            dataType : 'bool'
        },
        'direction' : {
            dataType : 'direction'
        },
        'generateRandomLevel' : {
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
        },
        'direction' : function (key) {
            var value = localStorageAdapter.get(key);
            var directions = {
                '0' : 'horizontal',
                '1' : 'vertical'
            };
            // return directions[value];
            return value;
        }
    };


    /**
     * gets and sets all the options for the game. saves them to local storage
     * @class OptionsManager
     */
    module.exports = {
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
        },
        /**
         * Get all the options the user has saved
         */
        getAll : function () {

        }
    };
});