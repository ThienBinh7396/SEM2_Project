!function(t,i){"function"==typeof define&&define.amd?define("p5.play",["p5"],function(t){i(t)}):"object"==typeof exports?i(require("../p5")):i(t.p5)}(this,function(X){function t(i,e){Object.defineProperty(X.prototype,i,{configurable:!0,enumerable:!0,get:function(){var t=this instanceof X&&!this._isGlobal?this:window;return void 0===t._p5PlayProperties&&(t._p5PlayProperties={}),i in t._p5PlayProperties||(t._p5PlayProperties[i]=e.call(t)),t._p5PlayProperties[i]}})}function i(e){if("function"!=typeof e)throw new Error("constructor must be a function");return function(){var i=this;function t(){var t=Array.prototype.slice.call(arguments);return e.apply(this,[i].concat(t))}return t.prototype=e.prototype,t}}function k(e){return function(t){var i=e[t];if("function"!=typeof i)throw new Error('"'+t+'" is not a p5 method');return i.bind(e)}}X.prototype.registerMethod("init",function(){this.camera=new e(this,0,0,1),this.camera.init=!1});var z=X.prototype.abs,L=X.prototype.radians,K=X.prototype.dist,q=X.prototype.degrees,G=X.prototype.pow,V=X.prototype.round;t("allSprites",function(){return new X.prototype.Group}),X.prototype.spriteUpdate=!0,X.prototype.createSprite=function(t,i,e,s){var o=new Q(this,t,i,e,s);return o.depth=this.allSprites.maxDepth()+1,this.allSprites.add(o),o},X.prototype.removeSprite=function(t){t.remove()},X.prototype.updateSprites=function(t){if(!1===t&&(this.spriteUpdate=!1),!0===t&&(this.spriteUpdate=!0),this.spriteUpdate)for(var i=0;i<this.allSprites.size();i++)this.allSprites.get(i).update()},X.prototype.getSprites=function(){if(0===arguments.length)return this.allSprites.toArray();for(var t=[],i=0;i<arguments.length;i++)for(var e=0;e<this.allSprites.size();e++)this.allSprites.get(e).isTagged(arguments[i])&&t.push(this.allSprites.get(e));return t},X.prototype.drawSprites=function(t){if("function"!=typeof(t=t||this.allSprites).draw)throw"Error: with drawSprites you can only draw all sprites or a group";t.draw()},X.prototype.drawSprite=function(t){t&&t.display()},X.prototype.loadAnimation=function(){return tt(this.Animation,arguments)},X.prototype.loadSpriteSheet=function(){return tt(this.SpriteSheet,arguments)},X.prototype.animation=function(t,i,e){t.draw(i,e)},t("_p5play",function(){return{keyStates:{},mouseStates:{}}});function Q(A,t,i,e,s){var o=k(A),P=o("createVector"),n=o("color"),h=o("random"),r=o("print"),a=o("push"),l=o("pop"),c=o("colorMode"),u=o("noStroke"),f=o("rectMode"),d=o("ellipseMode"),p=o("imageMode"),g=o("translate"),y=o("scale"),m=o("rotate"),v=o("stroke"),x=o("strokeWeight"),_=o("line"),b=o("noFill"),S=o("fill"),w=o("textAlign"),I=o("textSize"),M=o("text"),T=o("rect"),E=o("cos"),D=o("sin"),O=o("atan2"),C=A.quadTree,W=A.camera,N=X.prototype.RGB,F=X.prototype.CENTER,R=X.prototype.LEFT,B=X.prototype.BOTTOM;this.position=P(t,i),this.previousPosition=P(t,i),this.newPosition=P(t,i),this.deltaX=0,this.deltaY=0,this.velocity=P(0,0),this.maxSpeed=-1,this.friction=0,this.collider=void 0,this.colliderType="none",this.touching={},this.touching.left=!1,this.touching.right=!1,this.touching.top=!1,this.touching.bottom=!1,this.mass=1,this.immovable=!1,this.restitution=1,Object.defineProperty(this,"rotation",{enumerable:!0,get:function(){return this._rotation},set:function(t){this._rotation=t,this.rotateToDirection&&this.setSpeed(this.getSpeed(),t)}}),this._rotation=0,this.rotationSpeed=0,this.rotateToDirection=!1,this.depth=0;var Y=this.scale=1,H=1;this.visible=!0,this.mouseActive=!1,this.mouseIsOver=!1,this.mouseIsPressed=!1,this._internalWidth=e,this._internalHeight=s,Object.defineProperty(this,"width",{enumerable:!0,configurable:!0,get:function(){return this._internalWidth},set:function(t){this._internalWidth=t}}),this.width=void 0===e?100:e,Object.defineProperty(this,"height",{enumerable:!0,configurable:!0,get:function(){return this._internalHeight},set:function(t){this._internalHeight=t}}),this.height=void 0===s?100:s,this.originalWidth=this._internalWidth,this.originalHeight=this._internalHeight,this.removed=!1,this.life=-1,this.debug=!1,this.shapeColor=n(h(255),h(255),h(255)),this.groups=[];var U={},j="";this.animation=void 0,this._syncAnimationSizes=function(){"default"===this.colliderType&&1!==U[j].getWidth()&&1!==U[j].getHeight()&&(this.collider=this.getBoundingBox(),this.colliderType="image",this._internalWidth=U[j].getWidth()*z(this._getScaleX()),this._internalHeight=U[j].getHeight()*z(this._getScaleY())),(U[j].frameChanged||void 0===this.width||void 0===this.height)&&(this._internalWidth=U[j].getWidth()*z(this._getScaleX()),this._internalHeight=U[j].getHeight()*z(this._getScaleY()))},this.update=function(){if(!this.removed){if(this.newPosition!==this.position?this.previousPosition=P(this.newPosition.x,this.newPosition.y):this.previousPosition=P(this.position.x,this.position.y),this.velocity.x*=1-this.friction,this.velocity.y*=1-this.friction,-1!==this.maxSpeed&&this.limitSpeed(this.maxSpeed),this.rotateToDirection&&0<this.velocity.mag()&&(this._rotation=this.getDirection()),this.rotation+=this.rotationSpeed,this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.newPosition=P(this.position.x,this.position.y),this.deltaX=this.position.x-this.previousPosition.x,this.deltaY=this.position.y-this.previousPosition.y,U[j]&&(U[j].update(),this._syncAnimationSizes()),this.collider){var t;if(this.collider instanceof Z)t=A._angleMode===A.RADIANS?L(this.rotation):this.rotation,"custom"===this.colliderType?(this.collider.extents.x=this.collider.originalExtents.x*z(this._getScaleX())*z(E(t))+this.collider.originalExtents.y*z(this._getScaleY())*z(D(t)),this.collider.extents.y=this.collider.originalExtents.x*z(this._getScaleX())*z(D(t))+this.collider.originalExtents.y*z(this._getScaleY())*z(E(t))):"default"===this.colliderType?(this.collider.extents.x=this._internalWidth*z(this._getScaleX())*z(E(t))+this._internalHeight*z(this._getScaleY())*z(D(t)),this.collider.extents.y=this._internalWidth*z(this._getScaleX())*z(D(t))+this._internalHeight*z(this._getScaleY())*z(E(t))):"image"===this.colliderType&&(this.collider.extents.x=this._internalWidth*z(E(t))+this._internalHeight*z(D(t)),this.collider.extents.y=this._internalWidth*z(D(t))+this._internalHeight*z(E(t)));this.collider instanceof J&&(this.collider.radius=this.collider.originalRadius*z(this.scale))}this.mouseActive?(this.collider||this.setDefaultCollider(),this.mouseUpdate()):"function"!=typeof this.onMouseOver&&"function"!=typeof this.onMouseOut&&"function"!=typeof this.onMousePressed&&"function"!=typeof this.onMouseReleased||(this.mouseActive=!0,this.collider||this.setDefaultCollider(),this.mouseUpdate()),0<this.life&&this.life--,0===this.life&&this.remove()}},this.setDefaultCollider=function(){U[j]&&1!==U[j].getWidth()&&1!==U[j].getHeight()?(this.collider=this.getBoundingBox(),this._internalWidth=U[j].getWidth()*z(this._getScaleX()),this._internalHeight=U[j].getHeight()*z(this._getScaleY()),this.colliderType="image"):U[j]&&1===U[j].getWidth()&&1===U[j].getHeight()||(this.collider=new Z(A,this.position,P(this._internalWidth,this._internalHeight)),this.colliderType="default"),A.quadTree.insert(this)},this.mouseUpdate=function(){var t,i=this.mouseIsOver,e=this.mouseIsPressed;this.mouseIsOver=!1,this.mouseIsPressed=!1,t=W.active?P(W.mouseX,W.mouseY):P(A.mouseX,A.mouseY),this.collider&&(this.collider instanceof J?K(t.x,t.y,this.collider.center.x,this.collider.center.y)<this.collider.radius&&(this.mouseIsOver=!0):this.collider instanceof Z&&t.x>this.collider.left()&&t.y>this.collider.top()&&t.x<this.collider.right()&&t.y<this.collider.bottom()&&(this.mouseIsOver=!0),this.mouseIsOver&&A.mouseIsPressed&&(this.mouseIsPressed=!0),!i&&this.mouseIsOver&&void 0!==this.onMouseOver&&("function"==typeof this.onMouseOver?this.onMouseOver.call(this,this):r("Warning: onMouseOver should be a function")),i&&!this.mouseIsOver&&void 0!==this.onMouseOut&&("function"==typeof this.onMouseOut?this.onMouseOut.call(this,this):r("Warning: onMouseOut should be a function")),!e&&this.mouseIsPressed&&void 0!==this.onMousePressed&&("function"==typeof this.onMousePressed?this.onMousePressed.call(this,this):r("Warning: onMousePressed should be a function")),!e||A.mouseIsPressed||this.mouseIsPressed||void 0===this.onMouseReleased||("function"==typeof this.onMouseReleased?this.onMouseReleased.call(this,this):r("Warning: onMouseReleased should be a function")))},this.setCollider=function(t,i,e,s,o){if("rectangle"!==t&&"circle"!==t)throw new TypeError('setCollider expects the first argument to be either "circle" or "rectangle"');if("circle"===t&&1!==arguments.length&&4!==arguments.length)throw new TypeError('Usage: setCollider("circle") or setCollider("circle", offsetX, offsetY, radius)');if("rectangle"===t&&1!==arguments.length&&5!==arguments.length)throw new TypeError('Usage: setCollider("rectangle") or setCollider("rectangle", offsetX, offsetY, width, height)');this.colliderType="custom";var n=P(i,e);"rectangle"===t&&1===arguments.length?this.collider=new Z(A,this.position,P(this.width,this.height)):"rectangle"===t&&5===arguments.length?this.collider=new Z(A,this.position,P(s,o),n):"circle"===t&&1===arguments.length?this.collider=new J(A,this.position,Math.floor(Math.max(this.width,this.height)/2)):"circle"===t&&4===arguments.length&&(this.collider=new J(A,this.position,s,n)),C.insert(this)},this.getBoundingBox=function(){var t=U[j].getWidth()*z(this._getScaleX()),i=U[j].getHeight()*z(this._getScaleY());return new Z(A,this.position,P(t,i))},this.mirrorX=function(t){if(1!==t&&-1!==t)return Y;Y=t},this.mirrorY=function(t){if(1!==t&&-1!==t)return H;H=t},this._getScaleX=function(){return this.scale},this._getScaleY=function(){return this.scale},this.display=function(){this.visible&&!this.removed&&(a(),c(N),u(),f(F),d(F),p(F),g(this.position.x,this.position.y),y(this._getScaleX()*Y,this._getScaleY()*H),A._angleMode===A.RADIANS?m(L(this.rotation)):m(this.rotation),this.draw(),l(),this.debug&&(a(),v(0,255,0),x(1),_(this.position.x-10,this.position.y,this.position.x+10,this.position.y),_(this.position.x,this.position.y-10,this.position.x,this.position.y+10),b(),u(),S(0,255,0),w(R,B),I(16),M(this.depth+"",this.position.x+4,this.position.y-2),b(),v(0,255,0),void 0!==this.collider&&this.collider.draw(),l()))},this.draw=function(){""!==j&&U?U[j]&&U[j].draw(0,0,0):(u(),S(this.shapeColor),T(0,0,this._internalWidth,this._internalHeight))},this.remove=function(){for(this.removed=!0,C.removeObject(this);0<this.groups.length;)this.groups[0].remove(this)},this.setVelocity=function(t,i){this.velocity.x=t,this.velocity.y=i},this.getSpeed=function(){return this.velocity.mag()},this.getDirection=function(){var t=O(this.velocity.y,this.velocity.x);return isNaN(t)&&(t=0),A._angleMode===A.RADIANS&&(t=q(t)),t},this.addToGroup=function(t){t instanceof Array?t.add(this):r("addToGroup error: "+t+" is not a group")},this.limitSpeed=function(t){var i=this.getSpeed();if(z(i)>t){var e=t/z(i);this.velocity.x*=e,this.velocity.y*=e}},this.setSpeed=function(t,i){var e;e=void 0===i?0!==this.velocity.x||0!==this.velocity.y?A.atan2(this.velocity.y,this.velocity.x):A._angleMode===A.RADIANS?L(this._rotation):this._rotation:A._angleMode===A.RADIANS?L(i):i,this.velocity.x=E(e)*t,this.velocity.y=D(e)*t},this.addSpeed=function(t,i){var e;e=A._angleMode===A.RADIANS?L(i):i,this.velocity.x+=E(e)*t,this.velocity.y+=D(e)*t},this.attractionPoint=function(t,i,e){var s=O(e-this.position.y,i-this.position.x);this.velocity.x+=E(s)*t,this.velocity.y+=D(s)*t},this.addImage=function(){if("string"==typeof arguments[0]&&arguments[1]instanceof X.Image)this.addAnimation(arguments[0],arguments[1]);else{if(!(arguments[0]instanceof X.Image))throw"addImage error: allowed usages are <image> or <label>, <image>";this.addAnimation("normal",arguments[0])}},this.addAnimation=function(t){var i;if("string"!=typeof t)return r("Sprite.addAnimation error: the first argument must be a label (String)"),-1;if(arguments.length<2)return r("addAnimation error: you must specify a label and n frame images"),-1;if(arguments[1]instanceof $){var e=arguments[1].clone();return U[t]=e,""===j&&(j=t,this.animation=e),e.isSpriteAnimation=!0,this._internalWidth=e.getWidth()*z(this._getScaleX()),this._internalHeight=e.getHeight()*z(this._getScaleY()),e}for(var s=[],o=1;o<arguments.length;o++)s.push(arguments[o]);return i=tt(A.Animation,s),U[t]=i,""===j&&(j=t,this.animation=i),i.isSpriteAnimation=!0,this._internalWidth=i.getWidth()*z(this._getScaleX()),this._internalHeight=i.getHeight()*z(this._getScaleY()),i},this.changeImage=function(t){this.changeAnimation(t)},this.getAnimationLabel=function(){return j},this.changeAnimation=function(t){U[t]?(j=t,this.animation=U[t]):r("changeAnimation error: no animation labeled "+t)},this.overlapPixel=function(t,i){var e=P(t,i),s=this.animation.getFrameImage();return e.x-=this.position.x-s.width/2,e.y-=this.position.y-s.height/2,!(e.x<0||e.x>s.width||e.y<0||e.y>s.height)&&(0===this.rotation&&1===this.scale?255===s.get(e.x,e.y)[3]:(r("Error: overlapPixel doesn't work with scaled or rotated sprites yet"),!1))},this.overlapPoint=function(t,i){var e=P(t,i);if(this.collider||this.setDefaultCollider(),void 0!==this.collider){if(this.collider instanceof Z)return e.x>this.collider.left()&&e.x<this.collider.right()&&e.y>this.collider.top()&&e.y<this.collider.bottom();if(this.collider instanceof J){var s=this.collider.radius*this.collider.radius;return G(this.collider.center.x-e.x,2)+G(this.collider.center.y-e.y,2)<s}return!1}return!1},this.overlap=function(t,i){return this.AABBops("overlap",t,i)},this.collide=function(t,i){return this.AABBops("collide",t,i)},this.displace=function(t,i){return this.AABBops("displace",t,i)},this.bounce=function(t,i){return this.AABBops("bounce",t,i)},this.AABBops=function(t,i,e){this.touching.left=!1,this.touching.right=!1,this.touching.top=!1;var s=this.touching.bottom=!1,o=[];if(i instanceof Q)o.push(i);else{if(!(i instanceof Array))throw"Error: overlap can only be checked between sprites or groups";void 0!==C&&C.active&&(o=C.retrieveFromGroup(this,i)),0===o.length&&(o=i)}for(var n=0;n<o.length;n++)if(this!==o[n]&&!this.removed){var h,r=o[n];if(void 0===this.collider&&this.setDefaultCollider(),void 0===r.collider&&r.setDefaultCollider(),void 0!==this.collider&&void 0!==r.collider)if("overlap"===t)(this.collider instanceof J?r.collider.overlap(this.collider):this.collider.overlap(r.collider))&&(s=!0,void 0!==e&&"function"==typeof e&&e.call(this,this,r));else if("collide"===t||"displace"===t||"bounce"===t){h=P(0,0);var a=z(this.velocity.x-r.velocity.x)>=r.collider.extents.x/2&&0===V(this.deltaX-this.velocity.x),l=z(this.velocity.y-r.velocity.y)>=r.collider.size().y/2&&0===V(this.deltaY-this.velocity.y);if(a||l){var c=P((this.position.x+this.previousPosition.x)/2,(this.position.y+this.previousPosition.y)/2),u=P(z(this.position.x-this.previousPosition.x)+this.collider.extents.x,z(this.position.y-this.previousPosition.y)+this.collider.extents.y);new Z(A,c,u,this.collider.offset).overlap(r.collider)&&(a&&(this.velocity.x<0?h.x=r.collider.right()-this.collider.left()+1:0<this.velocity.x&&(h.x=r.collider.left()-this.collider.right()-1)),l&&(0<this.velocity.y?h.y=r.collider.top()-this.collider.bottom()-1:this.velocity.y<0&&(h.y=r.collider.bottom()-this.collider.top()+1)))}else h=this.collider instanceof J?r.collider.collide(this.collider).mult(-1):this.collider.collide(r.collider);if(0!==h.x||0!==h.y){var f,d,p,g;if("displace"!==t||r.immovable?"collide"!==t&&"bounce"!==t||this.immovable||(this.position.add(h),this.previousPosition=P(this.position.x,this.position.y),this.newPosition=P(this.position.x,this.position.y)):r.position.sub(h),0<h.x&&(this.touching.left=!0),h.x<0&&(this.touching.right=!0),h.y<0&&(this.touching.bottom=!0),0<h.y&&(this.touching.top=!0),"bounce"===t)if(this.collider instanceof J&&r.collider instanceof J){var y=X.Vector.sub(this.position,r.position),m=X.Vector.sub(r.position,this.position),v=y.magSq(),x=this.mass+r.mass,_=0,b=0;this.immovable?b=2:r.immovable?_=2:(_=2*r.mass/x,b=2*this.mass/x);var S=y.mult(_*X.Vector.sub(this.velocity,r.velocity).dot(y)/v),w=m.mult(b*X.Vector.sub(r.velocity,this.velocity).dot(m)/v);this.velocity.sub(S.mult(this.restitution)),r.velocity.sub(w.mult(r.restitution))}else r.immovable?(f=-this.velocity.x+r.velocity.x,d=-this.velocity.y+r.velocity.y):(f=(this.velocity.x*(this.mass-r.mass)+2*r.mass*r.velocity.x)/(this.mass+r.mass),d=(this.velocity.y*(this.mass-r.mass)+2*r.mass*r.velocity.y)/(this.mass+r.mass),p=(r.velocity.x*(r.mass-this.mass)+2*this.mass*this.velocity.x)/(this.mass+r.mass),g=(r.velocity.y*(r.mass-this.mass)+2*this.mass*this.velocity.y)/(this.mass+r.mass)),z(h.x)>z(h.y)&&(this.immovable||(this.velocity.x=f*this.restitution),r.immovable||(r.velocity.x=p*r.restitution)),z(h.x)<z(h.y)&&(this.immovable||(this.velocity.y=d*this.restitution),r.immovable||(r.velocity.y=g*r.restitution));void 0!==e&&"function"==typeof e&&e.call(this,this,r),s=!0}}}return s}}function e(t,i,e,s){this.position=t.createVector(i,e),this.zoom=s,this.mouseX=t.mouseX,this.mouseY=t.mouseY,this.active=!1,this.on=function(){this.active||(o.call(t),this.active=!0)},this.off=function(){this.active&&(n.call(t),this.active=!1)}}function o(){var t=this,i=t.camera;i.init||0!==i.position.x||0!==i.position.y||(i.position.x=t.width/2,i.position.y=t.height/2,i.init=!0),i.mouseX=t.mouseX+i.position.x-t.width/2,i.mouseY=t.mouseY+i.position.y-t.height/2,i.active||(i.active=!0,t.push(),t.scale(i.zoom),t.translate(-i.position.x+t.width/2/i.zoom,-i.position.y+t.height/2/i.zoom))}function n(){this.camera.active&&(this.pop(),this.camera.active=!1)}function J(a,t,i,e){var l=k(a)("createVector"),s=X.prototype.CENTER;this.center=t,this.radius=i,this.originalRadius=i,this.offset=void 0===e?l(0,0):e,this.extents=l(2*i,2*i),this.draw=function(){a.noFill(),a.stroke(0,255,0),a.rectMode(s),a.ellipse(this.center.x+this.offset.x,this.center.y+this.offset.y,2*this.radius,2*this.radius)},this.overlap=function(t){var i=this.radius+t.radius;i*=i;var e=this.center.x+this.offset.x,s=this.center.y+this.offset.y,o=t.center.x+t.offset.x,n=t.center.y+t.offset.y;return G(e-o,2)+G(s-n,2)<i},this.collide=function(t){if(this.overlap(t)){var i=this.center.x+this.offset.x,e=this.center.y+this.offset.y,s=t.center.x+t.offset.x,o=t.center.y+t.offset.y,n=a.atan2(e-o,i-s),h=this.radius+t.radius,r=z(h-K(i,e,s,o));return l(a.cos(n)*r,a.sin(n)*r)}return l(0,0)},this.size=function(){return l(2*this.radius,2*this.radius)},this.left=function(){return this.center.x+this.offset.x-this.radius},this.right=function(){return this.center.x+this.offset.x+this.radius},this.top=function(){return this.center.y+this.offset.y-this.radius},this.bottom=function(){return this.center.y+this.offset.y+this.radius}}function Z(r,t,i,e){var a=k(r)("createVector"),s=X.prototype.CENTER,l=X.prototype.PI;this.center=t,this.extents=i,this.originalExtents=i.copy(),this.offset=void 0===e?a(0,0):e,this.min=function(){return a(this.center.x+this.offset.x-this.extents.x,this.center.y+this.offset.y-this.extents.y)},this.max=function(){return a(this.center.x+this.offset.x+this.extents.x,this.center.y+this.offset.y+this.extents.y)},this.right=function(){return this.center.x+this.offset.x+this.extents.x/2},this.left=function(){return this.center.x+this.offset.x-this.extents.x/2},this.top=function(){return this.center.y+this.offset.y-this.extents.y/2},this.bottom=function(){return this.center.y+this.offset.y+this.extents.y/2},this.size=function(){return a(2*this.extents.x,2*this.extents.y)},this.rotate=function(t){var i;i=r._angleMode===r.RADIANS?L(t):t;var e=this.extents.x*z(r.cos(i))+this.extents.y*z(r.sin(i)),s=this.extents.x*z(r.sin(i))+this.extents.y*z(r.cos(i));this.extents.x=e,this.extents.y=s},this.draw=function(){r.noFill(),r.stroke(0,255,0),r.rectMode(s),r.rect(this.center.x+this.offset.x,this.center.y+this.offset.y,this.size().x/2,this.size().y/2)},this.overlap=function(t){if(t instanceof Z){var i=t.minkowskiDifference(this);return i.min().x<=0&&0<=i.max().x&&i.min().y<=0&&0<=i.max().y}if(t instanceof J){var e=a(t.center.x,t.center.y);return t.center.x<this.left()?e.x=this.left():t.center.x>this.right()&&(e.x=this.right()),t.center.y<this.top()?e.y=this.top():t.center.y>this.bottom()&&(e.y=this.bottom()),e.dist(t.center)<t.radius}},this.collide=function(t){if(t instanceof Z){var i=t.minkowskiDifference(this);return i.min().x<=0&&0<=i.max().x&&i.min().y<=0&&0<=i.max().y?i.closestPointOnBoundsToPoint(a(0,0)):a(0,0)}if(t instanceof J){var e,s=a(t.center.x,t.center.y);if(t.center.x<this.left()?s.x=this.left():t.center.x>this.right()&&(s.x=this.right()),t.center.y<this.top()?s.y=this.top():t.center.y>this.bottom()&&(s.y=this.bottom()),s.dist(t.center)<t.radius){if(s.x===t.center.x&&s.y===t.center.y){var o=s.x-this.center.x,n=s.y-this.center.y;z(o)<z(n)?s.x=0<o?this.right():this.left():s.y=n<0?this.top():this.bottom(),0===(e=r.atan2(t.center.y-s.y,t.center.x-s.x))&&(s.x===this.right()&&(e=l),s.y===this.top()&&(e=l/2),s.y===this.bottom()&&(e=-l/2))}else e=r.atan2(s.y-t.center.y,s.x-t.center.x);var h=a(s.x-t.center.x,s.y-t.center.y);return a(r.cos(e)*t.radius-h.x,r.sin(e)*t.radius-h.y)}return a(0,0)}},this.minkowskiDifference=function(t){var i=this.min().sub(t.max()),e=this.size().add(t.size());return new Z(r,i.add(e.div(2)),e.div(2))},this.closestPointOnBoundsToPoint=function(t){var i=z(t.x-this.min().x),e=a(this.min().x,t.y);return z(this.max().x-t.x)<i&&(i=z(this.max().x-t.x),e=a(this.max().x,t.y)),z(this.max().y-t.y)<i&&(i=z(this.max().y-t.y),e=a(t.x,this.max().y)),z(this.min().y-t.y)<i&&(i=z(this.min.y-t.y),e=a(t.x,this.min().y)),e}}function $(o){var t,i=Array.prototype.slice.call(arguments,1),n=X.prototype.CENTER;this.images=[];var h=0,e=0,s=-1;if(this.offX=0,this.offY=0,this.frameDelay=4,this.playing=!0,this.visible=!0,this.looping=!0,this.frameChanged=!1,this.imageCollider=!1,2===i.length&&"string"==typeof i[0]&&"string"==typeof i[1]){var r=i[0],a=i[1];if(".png"!==r.substring(r.length-4,r.length)&&(o.print("Animation error: you need to use .png files (filename "+r+")"),r=-1),".png"!==a.substring(a.length-4,a.length)&&(o.print("Animation error: you need to use .png files (filename "+a+")"),a=-1),-1!==r&&-1!==a){var l=0,c=0;for(t=r.length-5;0<=t;t--)"0"<=r.charAt(t)&&r.charAt(t)<="9"&&l++;for(t=a.length-5;0<=t;t--)"0"<=a.charAt(t)&&a.charAt(t)<="9"&&c++;var u,f=r.substring(0,r.length-(4+l)),d=a.substring(0,a.length-(4+c)),p=parseInt(r.substring(r.length-(4+l),r.length-4),10),g=parseInt(a.substring(a.length-(4+c),a.length-4),10);if(g<p){var y=g;g=p,p=y}if(f!==d)this.images.push(o.loadImage(r)),this.images.push(o.loadImage(a));else if(l===c)for(t=p;t<=g;t++)u=f+o.nf(t,l)+".png",this.images.push(o.loadImage(u));else for(t=p;t<=g;t++)u=f+t+".png",this.images.push(o.loadImage(u))}}else if(1===i.length&&i[0]instanceof m)this.spriteSheet=i[0],this.images=this.spriteSheet.frames;else if(0!==i.length)for(t=0;t<i.length;t++)i[t]instanceof X.Image?this.images.push(i[t]):this.images.push(o.loadImage(i[t]));this.clone=function(){var t=new $(o);return t.images=[],this.spriteSheet&&(t.spriteSheet=this.spriteSheet.clone()),t.images=this.images.slice(),t.offX=this.offX,t.offY=this.offY,t.frameDelay=this.frameDelay,t.playing=this.playing,t.looping=this.looping,t},this.draw=function(t,i,e){if(this.xpos=t,this.ypos=i,this.rotation=e||0,this.visible){if(this.isSpriteAnimation||this.update(),o.push(),o.imageMode(n),o.translate(this.xpos,this.ypos),o._angleMode===o.RADIANS?o.rotate(L(this.rotation)):o.rotate(this.rotation),void 0!==this.images[h])if(this.spriteSheet){var s=this.images[h].frame;o.image(this.spriteSheet.image,s.x,s.y,s.width,s.height,this.offX,this.offY,s.width,s.height)}else o.image(this.images[h],this.offX,this.offY);else o.print("Warning undefined frame "+h);o.pop()}},this.update=function(){e++;var t=h;this.frameChanged=!1,1===this.images.length&&(this.playing=!1,h=0),this.playing&&e%this.frameDelay==0&&(h<s&&-1!==s?h++:s<h&&-1!==s?h--:s===h&&-1!==s?this.playing=!1:this.looping?h>=this.images.length-1?h=0:h++:h<this.images.length-1&&h++),t!==h&&(this.frameChanged=!0)},this.play=function(){this.playing=!0,s=-1},this.stop=function(){this.playing=!1},this.rewind=function(){h=0},this.changeFrame=function(t){h=t<this.images.length?t:this.images.length-1,s=-1},this.nextFrame=function(){h<this.images.length-1?h+=1:this.looping&&(h=0),s=-1,this.playing=!1},this.previousFrame=function(){0<h?h-=1:this.looping&&(h=this.images.length-1),s=-1,this.playing=!1},this.goToFrame=function(t){t<0||t>=this.images.length||(s=t)!==h&&(this.playing=!0)},this.getFrame=function(){return h},this.getLastFrame=function(){return this.images.length-1},this.getFrameImage=function(){return this.images[h]},this.getImageAt=function(t){return this.images[t]},this.getWidth=function(){return this.images[h]instanceof X.Image?this.images[h].width:this.images[h]?this.images[h].frame.width:1},this.getHeight=function(){return this.images[h]instanceof X.Image?this.images[h].height:this.images[h]?this.images[h].frame.height:1}}function m(l){var t=Array.prototype.slice.call(arguments,1);this.image=null,this.frames=[],this.frame_width=0,this.frame_height=0,this.num_frames=0,this._generateSheetFrames=function(){for(var t=0,i=0,e=0;e<this.num_frames;e++)this.frames.push({name:e,frame:{x:t,y:i,width:this.frame_width,height:this.frame_height}}),(t+=this.frame_width)>=this.image.width&&(t=0,(i+=this.frame_height)>=this.image.height&&(i=0))},2===t.length&&Array.isArray(t[1])?(this.frames=t[1],this.num_frames=this.frames.length):4===t.length&&"number"==typeof t[1]&&"number"==typeof t[2]&&"number"==typeof t[3]&&(this.frame_width=t[1],this.frame_height=t[2],this.num_frames=t[3]),t[0]instanceof X.Image?(this.image=t[0],4===t.length&&this._generateSheetFrames()):2===t.length?this.image=l.loadImage(t[0]):4===t.length&&(this.image=l.loadImage(t[0],this._generateSheetFrames.bind(this))),this.drawFrame=function(t,i,e,s,o){var n;if("number"==typeof t)n=this.frames[t].frame;else for(var h=0;h<this.frames.length;h++)if(this.frames[h].name===t){n=this.frames[h].frame;break}var r=s||n.width,a=o||n.height;l.image(this.image,n.x,n.y,n.width,n.height,i,e,r,a)},this.clone=function(){for(var t=new m(l),i=0;i<this.frames.length;i++){var e=this.frames[i].frame,s={name:e.name,frame:{x:e.x,y:e.y,width:e.width,height:e.height}};t.frames.push(s)}return t.image=this.image,t.frame_width=this.frame_width,t.frame_height=this.frame_height,t.num_frames=this.num_frames,t}}function tt(t,i){function e(){return t.apply(this,i)}return e.prototype=t.prototype,new e}function h(t,i,e,s){this.active=!0,this.max_objects=i||10,this.max_levels=e||4,this.level=s||0,this.bounds=t,this.objects=[],this.object_refs=[],this.nodes=[]}X.prototype.keyWentDown=function(t){return this._isKeyInState(t,1)},X.prototype.keyWentUp=function(t){return this._isKeyInState(t,3)},X.prototype.keyDown=function(t){return this._isKeyInState(t,2)},X.prototype._isKeyInState=function(t,i){var e,s=this._p5play.keyStates;return void 0===s[e="string"==typeof t?this._keyCodeFromAlias(t):t]&&(this.keyIsDown(e)?s[e]=2:s[e]=0),s[e]===i},X.prototype.mouseDown=function(t){return this._isMouseButtonInState(t,2)},X.prototype.mouseUp=function(t){return this._isMouseButtonInState(t,0)},X.prototype.mouseWentUp=function(t){return this._isMouseButtonInState(t,3)},X.prototype.mouseWentDown=function(t){return this._isMouseButtonInState(t,1)},X.prototype._isMouseButtonInState=function(t,i){var e=this._p5play.mouseStates;return void 0===t&&(t=this.LEFT),void 0===e[t]&&(this.mouseIsPressed&&this.mouseButton===t?e[t]=2:e[t]=0),e[t]===i},X.prototype.KEY={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32," ":32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,LEFT:37,UP_ARROW:38,UP:38,RIGHT_ARROW:39,RIGHT:39,DOWN_ARROW:40,DOWN:40,INSERT:45,DELETE:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,"0NUMPAD":96,"1NUMPAD":97,"2NUMPAD":98,"3NUMPAD":99,"4NUMPAD":100,"5NUMPAD":101,"6NUMPAD":102,"7NUMPAD":103,"8NUMPAD":104,"9NUMPAD":105,MULTIPLY:106,PLUS:107,MINUS:109,DOT:110,SLASH1:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,EQUAL:187,COMMA:188,SLASH:191,BACKSLASH:220},X.prototype.KEY_DEPRECATIONS={MINUT:"MINUS",COMA:"COMMA"},X.prototype._keyCodeFromAlias=function(t){return t=t.toUpperCase(),this.KEY_DEPRECATIONS[t]&&(this._warn('Key literal "'+t+'" is deprecated and may be removed in a future version of p5.play. Please use "'+this.KEY_DEPRECATIONS[t]+'" instead.'),t=this.KEY_DEPRECATIONS[t]),this.KEY[t]},X.prototype.readPresses=function(){var t=this._p5play.keyStates,i=this._p5play.mouseStates;for(var e in t)this.keyIsDown(e)?0===t[e]?t[e]=1:t[e]=2:2===t[e]?t[e]=3:t[e]=0;for(var s in i)this.mouseIsPressed&&this.mouseButton===s?0===i[s]?i[s]=1:i[s]=2:2===i[s]?i[s]=3:i[s]=0},X.prototype.useQuadTree=function(t){return void 0!==this.quadTree&&(void 0===t?this.quadTree.active:void(this.quadTree.active=!!t))},t("quadTree",function(){return new h({x:0,y:0,width:0,height:0},4)}),t("Sprite",i(Q)),t("Camera",i(e)),X.prototype.Group=function(){var n=[];function t(t,i,e){for(var s=!1,o=0;o<this.size();o++)s=this.get(o).AABBops(t,i,e)||s;return s}return n.get=function(t){return n[t]},n.contains=function(t){return-1<this.indexOf(t)},n.indexOf=function(t){for(var i=0,e=n.length;i<e;++i)if(s=t,o=n[i],null===s||null===o?null===s&&null===o:"string"==typeof s?s===o:"object"!=typeof s?s===o:s.equals instanceof Function?s.equals(o):s===o)return i;var s,o;return-1},n.add=function(t){if(!(t instanceof Q))throw"Error: you can only add sprites to a group";-1===this.indexOf(t)&&(n.push(t),t.groups.push(this))},n.size=function(){return n.length},n.removeSprites=function(){for(;0<n.length;)n[0].remove()},n.clear=function(){n.length=0},n.remove=function(t){if(!(t instanceof Q))throw"Error: you can only remove sprites from a group";var i,e=!1;for(i=n.length-1;0<=i;i--)n[i]===t&&(n.splice(i,1),e=!0);if(e)for(i=t.groups.length-1;0<=i;i--)t.groups[i]===this&&t.groups.splice(i,1);return e},n.toArray=function(){return n.slice(0)},n.maxDepth=function(){return 0===n.length?0:n.reduce(function(t,i){return Math.max(t,i.depth)},-1/0)},n.minDepth=function(){return 0===n.length?99999:n.reduce(function(t,i){return Math.min(t,i.depth)},1/0)},n.draw=function(){this.sort(function(t,i){return t.depth-i.depth});for(var t=0;t<this.size();t++)this.get(t).display()},n.overlap=t.bind(n,"overlap"),n.collide=t.bind(n,"collide"),n.displace=t.bind(n,"displace"),n.bounce=t.bind(n,"bounce"),n},t("CircleCollider",i(J)),t("AABB",i(Z)),t("Animation",i($)),t("SpriteSheet",i(m)),h.prototype.updateBounds=function(){for(var t=this.getAll(),i=1e4,e=1e4,s=-1e4,o=-1e4,n=0;n<t.length;n++)t[n].position.x<i&&(i=t[n].position.x),t[n].position.y<e&&(e=t[n].position.y),t[n].position.x>s&&(s=t[n].position.x),t[n].position.y>o&&(o=t[n].position.y);this.bounds={x:i,y:e,width:s,height:o}},h.prototype.split=function(){var t=this.level+1,i=Math.round(this.bounds.width/2),e=Math.round(this.bounds.height/2),s=Math.round(this.bounds.x),o=Math.round(this.bounds.y);this.nodes[0]=new h({x:s+i,y:o,width:i,height:e},this.max_objects,this.max_levels,t),this.nodes[1]=new h({x:s,y:o,width:i,height:e},this.max_objects,this.max_levels,t),this.nodes[2]=new h({x:s,y:o+e,width:i,height:e},this.max_objects,this.max_levels,t),this.nodes[3]=new h({x:s+i,y:o+e,width:i,height:e},this.max_objects,this.max_levels,t)},h.prototype.getIndex=function(t){if(t.collider){var i=-1,e=this.bounds.x+this.bounds.width/2,s=this.bounds.y+this.bounds.height/2,o=t.collider.top()<s&&t.collider.top()+t.collider.size().y<s,n=t.collider.top()>s;return t.collider.left()<e&&t.collider.left()+t.collider.size().x<e?o?i=1:n&&(i=2):t.collider.left()>e&&(o?i=0:n&&(i=3)),i}return-1},h.prototype.insert=function(t){if(-1===this.objects.indexOf(t)){var i,e=0;if(void 0!==this.nodes[0]&&-1!==(i=this.getIndex(t)))return void this.nodes[i].insert(t);if(this.objects.push(t),this.objects.length>this.max_objects&&this.level<this.max_levels)for(void 0===this.nodes[0]&&this.split();e<this.objects.length;)-1!==(i=this.getIndex(this.objects[e]))?this.nodes[i].insert(this.objects.splice(e,1)[0]):e+=1}},h.prototype.retrieve=function(t){var i=this.getIndex(t),e=this.objects;if(void 0!==this.nodes[0])if(-1!==i)e=e.concat(this.nodes[i].retrieve(t));else for(var s=0;s<this.nodes.length;s+=1)e=e.concat(this.nodes[s].retrieve(t));return e},h.prototype.retrieveFromGroup=function(t,i){for(var e=[],s=this.retrieve(t),o=0;o<s.length;o++)i.contains(s[o])&&e.push(s[o]);return e},h.prototype.getAll=function(){for(var t=this.objects,i=0;i<this.nodes.length;i+=1)t=t.concat(this.nodes[i].getAll());return t},h.prototype.getObjectNode=function(t){var i;if(!this.nodes.length)return this;if(-1===(i=this.getIndex(t)))return this;var e=this.nodes[i].getObjectNode(t);return e||!1},h.prototype.removeObject=function(t){var i=this.getObjectNode(t),e=i.objects.indexOf(t);if(-1===e)return!1;i.objects.splice(e,1)},h.prototype.clear=function(){if(this.objects=[],this.nodes.length){for(var t=0;t<this.nodes.length;t+=1)this.nodes[t].clear();this.nodes=[]}},h.prototype.cleanup=function(){var t=this.getAll();this.clear();for(var i=0;i<t.length;i++)this.insert(t[i])},X.prototype.registerMethod("pre",X.prototype.readPresses),X.prototype.registerMethod("pre",X.prototype.updateSprites),X.prototype.registerMethod("post",function(){this.quadTree.active&&(this.quadTree.updateBounds(),this.quadTree.cleanup())}),X.prototype.registerMethod("pre",o),X.prototype.registerMethod("post",n),X.prototype._warn=function(t){var i=window.console;i&&("function"==typeof i.warn?i.warn(t):"function"==typeof i.log&&i.log("Warning: "+t))}});