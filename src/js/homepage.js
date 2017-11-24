var isHover = false;
var hoverElement = null;
var isLeavingMosaic = false;

$(document).ready(function(){
  $('.film-section').mousemove(function(e){
    // get current mouse pointer on film-section
    x = e.pageX - $('.mosaic').offset().left;
    y = e.pageY - $('.mosaic').offset().top;

    // check if mouse is hovering any mosaic-item which is overlaped by film-section
    // if so, bring that mosaic-item to front
    $('.mosaic > div').each(function(index){
      // determine the boundary of each mosaic-item
      var left = parseInt($(this).css('left'));
      var top = parseInt($(this).css('top'));
      var right = parseInt($(this).css('width')) + left;
      var bottom = parseInt($(this).css('height')) + top;

      // check if pointer is belonging to the boundary
      isHover = (x >= left && x <= right && y >= top && y <= bottom);

      if(isHover){
        // if there has already been hover element, remove attributes of hover
        // on the previous
        if(hoverElement !== null)
          hoverElement.removeClass('mosaic-items-hover');

        // set attributes of hover on the latest
        hoverElement = $(this);
        hoverElement.addClass('mosaic-items-hover');

        // end checking when finding an hovered item
        return false;
      }

    });

    // if there has already been hover element, and now the pointer is not hovering
    // on any elements, remove attributes of hover on the previous
    if(!isHover && hoverElement !== null){
      hoverElement.removeClass('mosaic-items-hover');
      hoverElement = null;
    }

  });

  // avoid mosaic-items overlap img and p in film-section
  $('.film-section img, p').mousemove(function(e){
    e.stopPropagation();
  }).mouseleave(function(e){
    e.stopPropagation();
  });

  // show and hide tooltip
  $('.mosaic-items').on({
    mousemove: function(e){
      displayTooltip(e.pageX, e.pageY);
    },
    mouseleave: function(e){
      hideTooltip();
    }
  });

});

function displayTooltip (x, y){
  $('.tool-tip').css('display', 'block')

  // set tooltip horizontal the mouse's pointer
  var width = parseInt($('.tool-tip').css('width'));
  $('.tool-tip').css('left', x - width / 2);
  $('.tool-tip').css('top', y + 50);
}

function hideTooltip (){
  $('.tool-tip').css('display', 'none');
}
