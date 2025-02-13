// Generated by CoffeeScript 1.6.1
(function() {

  this.XBlock = {
    Runtime: {},
    initializeBlock: function(element) {
      var $element, block, children, elementTag, initFn, initFnName, runtime, version, _ref;
      $element = $(element);
      children = this.initializeBlocks($element);
      runtime = $element.data("runtime-class");
      version = $element.data("runtime-version");
      initFnName = $element.data("init");
      $element.prop('xblock_children', children);
      if ((runtime != null) && (version != null) && (initFnName != null)) {
        runtime = new window[runtime]["v" + version];
        initFn = window[initFnName];
        block = (_ref = initFn(runtime, element)) != null ? _ref : {};
        block.runtime = runtime;
      } else {
        elementTag = $('<div>').append($element.clone()).html();
        console.log("Block " + elementTag + " is missing data-runtime, data-runtime-version or data-init, and can't be initialized");
        block = {};
      }
      block.element = element;
      block.name = $element.data("name");
      $element.trigger("xblock-initialized");
      $element.data("initialized", true);
      $element.addClass("xblock-initialized");
      return block;
    },
    initializeBlocks: function(element) {
      var _this = this;
      return $(element).immediateDescendents(".xblock").map(function(idx, elem) {
        return _this.initializeBlock(elem);
      }).toArray();
    }
  };

}).call(this);
