define(['./levelgenerator', './Renderer'],function(levelGenerator, Renderer){



    /**
    *
    *
    */
    function updateLevel(renderer){
      var seedValue = rangeSlider.value || 1231231;
      map = levelGenerator.createNewMap(true, seedValue);
      tiles = map.tiles;

      // renderer
      // var renderer = new Renderer();
      Renderer.drawMap(tiles);
      Renderer.drawHeights(map);
      Renderer.drawSections(map);
    }

    function renderLevelInfo(){
      levelInfo['difficulty'] = lg.difficulty;
      var text = "";
      for(var key in levelInfo){

        if(levelInfo[key].constructor == Array){
        
          var array = levelInfo[key];
          text += turnIntoText(array);
        
        } else{
          text += "<li> " + key + " : " + levelInfo[key] + "</li>";
        }
      }
      document.getElementById('text').innerHTML = text;
    }

    function turnIntoText(arr){
      var text = ""
      for(var i = 0; i < arr.length; i++){
        var item = arr[i];
        text += "<li>height : " + item.height + ", length : " + item.length + "</li>";
      }
      return text;
    }

    /**
    *
    *
    */


  var tiles;
  var map;
  var rangeSlider = document.getElementById('range');
  var levelInfo = {};


  var rangeSlider = document.getElementById('range');


  rangeSlider.addEventListener('change', function(){
    updateLevel();
    levelInfo['seed'] = rangeSlider.value;
    // renderLevelInfo();
    
  });

    return {
      updateLevel : updateLevel

    }
   
});
