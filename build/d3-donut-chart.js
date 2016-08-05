(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function donutChart() {
    return 42;
  };

  exports.donutchart = donutChart;

  Object.defineProperty(exports, '__esModule', { value: true });

}));