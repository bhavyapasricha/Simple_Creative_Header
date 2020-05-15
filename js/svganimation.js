var speedy = false;

var $container = $('#container');

var startH = 220;
var endH = 220;
var startS = 70;
var endS = 70;
var startL = 85;
var endL = 35;
var startA = 1;
var endA = 0;

var outerRad = 110;
var innerRad = 90;

var numParticles = 100;
var spinDur = 12;
var offset = 0.03;
var numTwists = 12;
var rad = 2;

var spinTl = new TimelineMax();

var emitProps1 = {
  dist:outerRad, 
  rotation:0
}

var emitProps2 = {
  dist:innerRad, 
  rotation:0
}


function build() {
  
  var $g1 = $(svgNs('g'));
  TweenMax.set($g1, {
    x:150, 
    y:150
  });
  
  var $g2 = $(svgNs('g'));
  TweenMax.set($g2, {
    x:150, 
    y:150
  });
  
  
  for(var i = 0; i < numParticles; i++) {
    var $p = $(svgNs('g'));
    
    var h = startH - i * ((startH - endH) / numParticles);
    var s = startS - i * ((startS - endS) / numParticles);
    var l = startL - i * ((startL - endL) / numParticles);
    var a = startA - i * ((startA - endA) / numParticles);
    
    var hsla = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
    
    var $c = $(svgNs('circle'));
    $c.attr({
      cx:0, 
      cy:0, 
      r:rad
    });
    TweenMax.set($c, {
      y:outerRad, 
      fill:hsla
    });
    
    $p.append($c);
    
    spinTl.to($p, spinDur, {
      rotation:360, 
      svgOrigin:'0 0', 
      ease:Linear.easeNone, 
      repeat:-1
    }, i * (offset));
    
    spinTl.to($c, spinDur / numTwists, {
      y:innerRad, 
      ease:Sine.easeInOut, 
      repeat:-1, 
      yoyo:true
    }, i * offset);
    
    $g1.append($p);
  }
  
  for(var i = 0; i < numParticles; i++) {
    var $p = $(svgNs('g'));
    
    var h = startH - i * ((startH - endH) / numParticles);
    var s = startS - i * ((startS - endS) / numParticles);
    var l = startL - i * ((startL - endL) / numParticles);
    var a = startA - i * ((startA - endA) / numParticles);
    
    var hsla = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
    
    var $c = $(svgNs('circle'));
    $c.attr({
      cx:0, 
      cy:0, 
      r:rad
    });
    TweenMax.set($c, {
      y:innerRad, 
      fill:hsla
    });
    
    $p.append($c);
    
    spinTl.to($p, spinDur, {
      rotation:360, 
      svgOrigin:'0 0', 
      ease:Linear.easeNone, 
      repeat:-1
    }, i * (offset));
    
    spinTl.to($c, spinDur / numTwists, {
      y:outerRad, 
      ease:Sine.easeInOut, 
      repeat:-1, 
      yoyo:true
    }, i * offset);
    
    $g2.append($p);
  }
  
  // Glowy bits
  var $pl1 = $(svgNs('g'));
  
  var $gl1 = $(svgNs('circle'));
  $gl1.attr({
    cx:0, 
    cy:0, 
    r:30, 
    fill:'url(#rad-grad)'
  });
  TweenMax.set($gl1, {
    y:outerRad, 
    opacity:1
  });
  
  $pl1.append($gl1);
  $g1.append($pl1);
  
  spinTl.to($pl1, spinDur, {
    rotation:360, 
    svgOrigin:'0 0', 
    ease:Linear.easeNone, 
    repeat:-1
  }, 0 * offset);
  
  spinTl.to($gl1, spinDur / numTwists, {
    y:innerRad, 
    ease:Sine.easeInOut, 
    repeat:-1, 
    yoyo:true
  }, 0 * offset);
  
  var $pl2 = $(svgNs('g'));
  
  var $gl2 = $(svgNs('circle'));
  $gl2.attr({
    cx:0, 
    cy:0, 
    r:30, 
    fill:'url(#rad-grad)'
  });
  TweenMax.set($gl2, {
    y:innerRad, 
    opacity:1
  });
  
  $pl2.append($gl2);
  $g2.append($pl2);
  
  spinTl.to($pl2, spinDur, {
    rotation:360, 
    svgOrigin:'0 0', 
    ease:Linear.easeNone, 
    repeat:-1
  }, 0 * offset);
  
  spinTl.to($gl2, spinDur / numTwists, {
    y:outerRad, 
    ease:Sine.easeInOut, 
    repeat:-1, 
    yoyo:true
  }, 0 * offset);
  
  // Emitters
  spinTl.to(emitProps1, spinDur, {
    rotation:Math.PI * 2, 
    repeat:-1, 
    ease:Linear.easeNone
  }, (-numParticles * offset));
  
  spinTl.to(emitProps1, spinDur / numTwists, {
    dist:innerRad, 
    repeat:-1, 
    ease:Sine.easeInOut, 
    yoyo:true
  }, 0);
  
  spinTl.to(emitProps2, spinDur, {
    rotation:Math.PI * 2, 
    repeat:-1, 
    ease:Linear.easeNone
  }, (-numParticles * offset));
  
  spinTl.to(emitProps2, spinDur / numTwists, {
    dist:outerRad, 
    repeat:-1, 
    ease:Sine.easeInOut, 
    yoyo:true
  }, 0);
  
  
  $container.append($g1);
  $container.append($g2);
  
}

build();

spinTl.seek(spinDur);


var emitRadMin = 0.5;
var emitRadMax = 1;
var emitDurMin = 1.8;
var emitDurMax = 2.2;
var emitDistMin = 20;
var emitDistMax = 30;
var emitScale = 4;

var emitFrequency = 0.05;
var emitChance = 0.8;
var emitNum = 2;

var emitTl1 = new TimelineMax({
  repeat:-1, 
  repeatDelay:emitFrequency
});

emitTl1.call(function() {
  if(rand(0, 1) < emitChance) {
    for(var i = 0; i < emitNum; i++) {
      var x = emitProps1.dist * Math.cos(emitProps1.rotation);
      var y = emitProps1.dist * Math.sin(emitProps1.rotation);
      var driftX = rand(emitDistMin, emitDistMax) * Math.cos(rand(0, Math.PI * 2));
      var driftY = rand(emitDistMin, emitDistMax) * Math.sin(rand(0, Math.PI * 2));
      
      var $c = $(svgNs('circle'));
      $c.attr({
        cx:0, 
        cy:0, 
        r:rand(emitRadMin, emitRadMax)
      });
      TweenMax.set($c, {
        fill:'hsl(220, 50%, 70%)', 
        x:150 + x, 
        y:150 + y
      });
      
      TweenMax.to($c, rand(emitDurMin, emitDurMax), {
        x:'+=' + driftX, 
        y:'+=' + driftY, 
        scale:emitScale, 
        transformOrigin:'50% 50%', 
        alpha:0, 
        ease:Power1.easeOut, 
        callbackScope:this, 
        onComplete:function() {
          $c.remove();
        }
      });
      
      $container.append($c);
    }
  }
}, null, null, 0.01);


var emitTl2 = new TimelineMax({
  repeat:-1, 
  repeatDelay:emitFrequency
});

emitTl2.call(function() {
  if(rand(0, 1) < emitChance) {
    for(var i = 0; i < emitNum; i++) {
      var x = emitProps2.dist * Math.cos(emitProps2.rotation);
      var y = emitProps2.dist * Math.sin(emitProps2.rotation);
      var driftX = rand(emitDistMin, emitDistMax) * Math.cos(rand(0, Math.PI * 2));
      var driftY = rand(emitDistMin, emitDistMax) * Math.sin(rand(0, Math.PI * 2));
      
      var $c = $(svgNs('circle'));
      $c.attr({
        cx:0, 
        cy:0, 
        r:rand(emitRadMin, emitRadMax)
      });
      TweenMax.set($c, {
        fill:'hsl(220, 50%, 70%)', 
        x:150 + x, 
        y:150 + y
      });
      
      TweenMax.to($c, rand(emitDurMin, emitDurMax), {
        x:'+=' + driftX, 
        y:'+=' + driftY, 
        scale:emitScale, 
        transformOrigin:'50% 50%', 
        alpha:0, 
        ease:Power1.easeOut, 
        callbackScope:this, 
        onComplete:function() {
          $c.remove();
        }
      });
      
      $container.append($c);
    }
  }
}, null, null, 0.01);


$container.click(function() {
  var clickTl = new TimelineMax();
  
  clickTl.to(spinTl, 3, {
    timeScale:!speedy ? 2 : 1
  });
  emitNum = !speedy ? 3 : 2;
  emitScale = !speedy ? 5 : 4;
  
  speedy = !speedy;
});



/*
 * Utility functions
 */

function rand(min, max) {
	return min + (Math.random() * (max - min));
}

function randInt(min, max) {
	return Math.floor(min + (Math.random() * (max - min)));
}

function clickable(elem) {
		$(elem).removeClass('no-select').addClass('hitarea');
	}

function clickables(elems) {
  for(var i in elems) {
    $(elems[i]).removeClass('no-select').addClass('hitarea');
  }
}

function unclickable(elem) {
  $(elem).removeClass('hitarea').addClass('no-select');
}

function unclickables(elems) {
  for(var i in elems) {
    $(elems[i]).removeClass('hitarea').addClass('no-select');
  }
}

/*
 * Borrowed from http://stackoverflow.com/questions/6148859/is-it-possible-to-work-with-jquery-and-svg-directly-no-plugins
 */
function svgNs(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}