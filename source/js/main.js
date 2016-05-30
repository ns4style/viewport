var blocks = {};

window.addEventListener('load', function() {
    initBlocks();
});

/**
 * Initialize all blocks on page
 */
function initBlocks() {
  for (var key in blocks) {
    if (blocks[key]) {
      if ($('.' + key).length && blocks[key].init) {
        blocks[key].init();
      }
    }
  }
}