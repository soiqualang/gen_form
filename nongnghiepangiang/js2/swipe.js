/*----------------------
Ham detect-a-finger-swipe
----------------------*/
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
			//alert('left');
			w3_close();
        } else {
            /* right swipe */
			//alert('right');
			w3_open();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
			//alert('up');
        } else { 
            /* down swipe */
			//alert('down');
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};


