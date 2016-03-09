;(function(gallery){

  var PhotoGallery = function(items){
    this.items = items;
    this.currentIndex = 0;
  };

  PhotoGallery.prototype = {

    render: function(parentSelector){
      this.parentEl = goog.dom.query(parentSelector);
      goog.soy.renderElement(this.parentEl[0], gallery.galleryList, {
        items: this.items
      });
      this.listEl = goog.dom.query('.slider-list');
      this.itemEl = goog.dom.query('.slider-list-item');
      this.prevEl = goog.dom.query('.slider-prev');
      this.nextEl = goog.dom.query('.slider-next');
      goog.array.forEach(this.itemEl, function(el){
        goog.style.showElement(el, false);
      });
      goog.style.showElement(this.itemEl[0], true);
      this.handleEvents();
    },

    handleEvents: function(){
      var self = this;

      goog.events.listen(this.prevEl[0], goog.events.EventType.CLICK,
        this.prev, false, this);
      goog.events.listen(this.nextEl[0], goog.events.EventType.CLICK,
        this.next, false, this);

      var countChanges = 0;
      var positionX = false;
      this.listEl[0]['on'+goog.events.EventType.TOUCHMOVE] = function(e){
        if (positionX === false){
          positionX = e.touches[0].pageX;
        }
        countChanges++;
        if (countChanges === 5){
          if (positionX > e.touches[0].pageX){
            self.prev();
          } else {
            self.next();
          }
        }
      };

      this.listEl[0]['on'+goog.events.EventType.TOUCHCANCEL] = function(){
        countChanges = 0;
        positionX = false;
      };

      this.listEl[0]['on'+goog.events.EventType.TOUCHEND] = function(){
        countChanges = 0;
        positionX = false;
      };

    },

    prev: function(){
      this.hide(this.currentIndex);
      this.currentIndex--;
      if (this.currentIndex < 0){
        this.currentIndex = this.itemEl.length - 1;
      }
      this.show(this.currentIndex);
    },

    next: function(){
      this.hide(this.currentIndex);
      this.currentIndex++;
      if (this.currentIndex >= this.itemEl.length){
        this.currentIndex = 0;
      }
      this.show(this.currentIndex);
    },

    hide: function(index){
      var anim = new goog.fx.AnimationParallelQueue();
      anim.add(new goog.fx.dom.FadeOutAndHide(this.itemEl[index], 500));
      anim.play();
    },

    show: function(index){
      var anim = new goog.fx.AnimationParallelQueue();
      anim.add(new goog.fx.dom.FadeInAndShow(this.itemEl[index], 500));
      anim.play();
    }

  };

  var showButton = goog.dom.query('#showGallery');
  goog.events.listen(showButton[0],
    goog.events.EventType.CLICK, function(){

      var photoGalleryInstance = new PhotoGallery([
        '/img/phot2.jpg',
        '/img/photo1.jpg',
        '/img/photo3.jpg',
        '/img/photo4.jpg'
      ]);

      photoGalleryInstance.render('#view');

  }, false, showButton[0]);

})(zr.gallery);
