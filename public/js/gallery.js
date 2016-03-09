// This file was automatically generated from gallery.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zr.gallery.
 */

if (typeof zr == 'undefined') { var zr = {}; }
if (typeof zr.gallery == 'undefined') { zr.gallery = {}; }


zr.gallery.galleryList = function(opt_data, opt_ignored) {
  var output = '<div class="slider"><div class="slider-list">';
  var itemList4 = opt_data.items;
  var itemListLen4 = itemList4.length;
  for (var itemIndex4 = 0; itemIndex4 < itemListLen4; itemIndex4++) {
    var itemData4 = itemList4[itemIndex4];
    output += zr.gallery.galleryItem({imageLink: itemData4});
  }
  output += '</div><div class="slider-prev">Prev</div><div class="slider-next">Next</div></div>';
  return output;
};
if (goog.DEBUG) {
  zr.gallery.galleryList.soyTemplateName = 'zr.gallery.galleryList';
}


zr.gallery.galleryItem = function(opt_data, opt_ignored) {
  return '<div class="slider-list-item"><img src="' + soy.$$escapeHtml(opt_data.imageLink) + '"></div></ul>';
};
if (goog.DEBUG) {
  zr.gallery.galleryItem.soyTemplateName = 'zr.gallery.galleryItem';
}
