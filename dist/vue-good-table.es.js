/**
 * vue-good-table v2.21.12
 * (c) 2018-present xaksis <shay@crayonbits.com>
 * https://github.com/xaksis/vue-good-table
 * Released under the MIT License.
 */

import isEqual from 'lodash.isequal';
import { isValid, compareAsc, parse, format } from 'date-fns';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var DEFAULT_SORT_TYPE = 'asc';
var SORT_TYPES = {
  Ascending: 'asc',
  Descending: 'desc',
  None: 'none'
};
var PAGINATION_MODES = {
  Pages: 'pages',
  Records: 'records'
};
var DEFAULT_ROWS_PER_PAGE_DROPDOWN = [10, 20, 30, 40, 50];

// all diacritics
var diacritics = {
  a: ["a", "à", "á", "â", "ã", "ä", "å", "æ", "ā", "ă", "ą", "ǎ", "ǟ", "ǡ", "ǻ", "ȁ", "ȃ", "ȧ", "ɐ", "ɑ", "ɒ", "ͣ", "а", "ӑ", "ӓ", "ᵃ", "ᵄ", "ᶏ", "ḁ", "ẚ", "ạ", "ả", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ắ", "ằ", "ẳ", "ẵ", "ặ", "ₐ", "ⱥ", "ａ"],
  b: ["b", "ƀ", "ƃ", "ɓ", "ᖯ", "ᵇ", "ᵬ", "ᶀ", "ḃ", "ḅ", "ḇ", "ｂ"],
  c: ["c", "ç", "ć", "ĉ", "ċ", "č", "ƈ", "ȼ", "ɕ", "ͨ", "ᴄ", "ᶜ", "ḉ", "ↄ", "ｃ"],
  d: ["d", "ď", "đ", "Ƌ", "ƌ", "ȡ", "ɖ", "ɗ", "ͩ", "ᵈ", "ᵭ", "ᶁ", "ᶑ", "ḋ", "ḍ", "ḏ", "ḑ", "ḓ", "ｄ"],
  e: ["e", "è", "é", "ê", "ë", "ē", "ĕ", "ė", "ę", "ě", "ǝ", "ȅ", "ȇ", "ȩ", "ɇ", "ɘ", "ͤ", "ᵉ", "ᶒ", "ḕ", "ḗ", "ḙ", "ḛ", "ḝ", "ẹ", "ẻ", "ẽ", "ế", "ề", "ể", "ễ", "ệ", "ₑ", "ｅ"],
  f: ["f", "ƒ", "ᵮ", "ᶂ", "ᶠ", "ḟ", "ｆ"],
  g: ["g", "ĝ", "ğ", "ġ", "ģ", "ǥ", "ǧ", "ǵ", "ɠ", "ɡ", "ᵍ", "ᵷ", "ᵹ", "ᶃ", "ᶢ", "ḡ", "ｇ"],
  h: ["h", "ĥ", "ħ", "ƕ", "ȟ", "ɥ", "ɦ", "ʮ", "ʯ", "ʰ", "ʱ", "ͪ", "Һ", "һ", "ᑋ", "ᶣ", "ḣ", "ḥ", "ḧ", "ḩ", "ḫ", "ⱨ", "ｈ"],
  i: ["i", "ì", "í", "î", "ï", "ĩ", "ī", "ĭ", "į", "ǐ", "ȉ", "ȋ", "ɨ", "ͥ", "ᴉ", "ᵎ", "ᵢ", "ᶖ", "ᶤ", "ḭ", "ḯ", "ỉ", "ị", "ｉ"],
  j: ["j", "ĵ", "ǰ", "ɉ", "ʝ", "ʲ", "ᶡ", "ᶨ", "ｊ"],
  k: ["k", "ķ", "ƙ", "ǩ", "ʞ", "ᵏ", "ᶄ", "ḱ", "ḳ", "ḵ", "ⱪ", "ｋ"],
  l: ["l", "ĺ", "ļ", "ľ", "ŀ", "ł", "ƚ", "ȴ", "ɫ", "ɬ", "ɭ", "ˡ", "ᶅ", "ᶩ", "ᶪ", "ḷ", "ḹ", "ḻ", "ḽ", "ℓ", "ⱡ"],
  m: ["m", "ɯ", "ɰ", "ɱ", "ͫ", "ᴟ", "ᵐ", "ᵚ", "ᵯ", "ᶆ", "ᶬ", "ᶭ", "ḿ", "ṁ", "ṃ", "㎡", "㎥", "ｍ"],
  n: ["n", "ñ", "ń", "ņ", "ň", "ŉ", "ƞ", "ǹ", "ȵ", "ɲ", "ɳ", "ᵰ", "ᶇ", "ᶮ", "ᶯ", "ṅ", "ṇ", "ṉ", "ṋ", "ⁿ", "ｎ"],
  o: ["o", "ò", "ó", "ô", "õ", "ö", "ø", "ō", "ŏ", "ő", "ơ", "ǒ", "ǫ", "ǭ", "ǿ", "ȍ", "ȏ", "ȫ", "ȭ", "ȯ", "ȱ", "ɵ", "ͦ", "о", "ӧ", "ө", "ᴏ", "ᴑ", "ᴓ", "ᴼ", "ᵒ", "ᶱ", "ṍ", "ṏ", "ṑ", "ṓ", "ọ", "ỏ", "ố", "ồ", "ổ", "ỗ", "ộ", "ớ", "ờ", "ở", "ỡ", "ợ", "ₒ", "ｏ", "𐐬"],
  p: ["p", "ᵖ", "ᵱ", "ᵽ", "ᶈ", "ṕ", "ṗ", "ｐ"],
  q: ["q", "ɋ", "ʠ", "ᛩ", "ｑ"],
  r: ["r", "ŕ", "ŗ", "ř", "ȑ", "ȓ", "ɍ", "ɹ", "ɻ", "ʳ", "ʴ", "ʵ", "ͬ", "ᵣ", "ᵲ", "ᶉ", "ṙ", "ṛ", "ṝ", "ṟ"],
  s: ["s", "ś", "ŝ", "ş", "š", "ș", "ʂ", "ᔆ", "ᶊ", "ṡ", "ṣ", "ṥ", "ṧ", "ṩ", "ｓ"],
  t: ["t", "ţ", "ť", "ŧ", "ƫ", "ƭ", "ț", "ʇ", "ͭ", "ᵀ", "ᵗ", "ᵵ", "ᶵ", "ṫ", "ṭ", "ṯ", "ṱ", "ẗ", "ｔ"],
  u: ["u", "ù", "ú", "û", "ü", "ũ", "ū", "ŭ", "ů", "ű", "ų", "ư", "ǔ", "ǖ", "ǘ", "ǚ", "ǜ", "ȕ", "ȗ", "ͧ", "ߎ", "ᵘ", "ᵤ", "ṳ", "ṵ", "ṷ", "ṹ", "ṻ", "ụ", "ủ", "ứ", "ừ", "ử", "ữ", "ự", "ｕ"],
  v: ["v", "ʋ", "ͮ", "ᵛ", "ᵥ", "ᶹ", "ṽ", "ṿ", "ⱱ", "ｖ", "ⱴ"],
  w: ["w", "ŵ", "ʷ", "ᵂ", "ẁ", "ẃ", "ẅ", "ẇ", "ẉ", "ẘ", "ⱳ", "ｗ"],
  x: ["x", "̽", "͓", "ᶍ", "ͯ", "ẋ", "ẍ", "ₓ", "ｘ"],
  y: ["y", "ý", "ÿ", "ŷ", "ȳ", "ɏ", "ʸ", "ẏ", "ỳ", "ỵ", "ỷ", "ỹ", "ｙ"],
  z: ["z", "ź", "ż", "ž", "ƶ", "ȥ", "ɀ", "ʐ", "ʑ", "ᙆ", "ᙇ", "ᶻ", "ᶼ", "ᶽ", "ẑ", "ẓ", "ẕ", "ⱬ", "ｚ"]
};

// Precompiled Object with { key = Diacritic, value = real-Character }
var compiledDiactitics = function () {
  var x = {};
  for (var key in diacritics) {
    var ok = diacritics[key];
    for (var rval in ok) {
      var val = ok[rval];

      // Do not replace the char with itself
      if (val !== key) {
        x[val] = key;
      }
    }
  }
  return x;
}();

// Regex for detecting non-ASCII-Characters in String
var regexNonASCII = /[^a-z0-9\s,.-]/;

/*
 * Main function of the module which removes all diacritics from the received text
 */
var diacriticless = function diacriticless(text) {
  // When there are only ascii-Characters in the string, skip processing and return text right away
  if (text.search(regexNonASCII) === -1) {
    return text;
  }
  var result = "";
  var len = text.length;
  for (var i = 0; i < len; i++) {
    var searchChar = text.charAt(i);

    // If applicable replace the diacritic character with the real one or use the original value
    result += searchChar in compiledDiactitics ? compiledDiactitics[searchChar] : searchChar;
  }
  return result;
};

var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};
var defaultType = {
  format: function format(x) {
    return x;
  },
  filterPredicate: function filterPredicate(rowval, filter) {
    var skipDiacritics = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var fromDropdown = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // take care of nulls
    if (typeof rowval === 'undefined' || rowval === null) {
      return false;
    }

    // row value
    var rowValue = skipDiacritics ? String(rowval).toLowerCase() : diacriticless(escapeRegExp(String(rowval)).toLowerCase());

    // search term
    var searchTerm = skipDiacritics ? filter.toLowerCase() : diacriticless(escapeRegExp(filter).toLowerCase());

    // comparison
    return fromDropdown ? rowValue === searchTerm : rowValue.indexOf(searchTerm) > -1;
  },
  compare: function compare(x, y) {
    function cook(d) {
      if (typeof d === 'undefined' || d === null) return '';
      return diacriticless(String(d).toLowerCase());
    }
    x = cook(x);
    y = cook(y);
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  }
};

//
var script$6 = {
  name: 'VgtPaginationPageInfo',
  props: {
    currentPage: {
      "default": 1
    },
    lastPage: {
      "default": 1
    },
    totalRecords: {
      "default": 0
    },
    ofText: {
      "default": 'of',
      type: String
    },
    pageText: {
      "default": 'page',
      type: String
    },
    currentPerPage: {},
    mode: {
      "default": PAGINATION_MODES.Records
    },
    infoFn: {
      "default": null
    }
  },
  data: function data() {
    return {
      id: this.getId()
    };
  },
  computed: {
    pageInfo: function pageInfo() {
      return "".concat(this.ofText, " ").concat(this.lastPage);
    },
    firstRecordOnPage: function firstRecordOnPage() {
      return (this.currentPage - 1) * this.currentPerPage + 1;
    },
    lastRecordOnPage: function lastRecordOnPage() {
      // if the setting is set to 'all'
      if (this.currentPerPage === -1) {
        return this.totalRecords;
      }
      return Math.min(this.totalRecords, this.currentPage * this.currentPerPage);
    },
    recordInfo: function recordInfo() {
      var first = this.firstRecordOnPage;
      var last = this.lastRecordOnPage;
      if (last === 0) {
        first = 0;
      }
      return "".concat(first, " - ").concat(last, " ").concat(this.ofText, " ").concat(this.totalRecords);
    },
    infoParams: function infoParams() {
      var first = this.firstRecordOnPage;
      var last = this.lastRecordOnPage;
      if (last === 0) {
        first = 0;
      }
      return {
        firstRecordOnPage: first,
        lastRecordOnPage: last,
        totalRecords: this.totalRecords,
        currentPage: this.currentPage,
        totalPage: this.lastPage
      };
    }
  },
  methods: {
    getId: function getId() {
      return "vgt-page-input-".concat(Math.floor(Math.random() * Date.now()));
    },
    changePage: function changePage(event) {
      var value = parseInt(event.target.value, 10);

      //! invalid number
      if (Number.isNaN(value) || value > this.lastPage || value < 1) {
        event.target.value = this.currentPage;
        return false;
      }

      //* valid number
      event.target.value = value;
      this.$emit('page-changed', value);
    }
  },
  mounted: function mounted() {},
  components: {}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__$6 = script$6;
/* template */
var __vue_render__$6 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "footer__navigation__page-info"
  }, [_vm.infoFn ? _c('div', [_vm._v("\r\n    " + _vm._s(_vm.infoFn(_vm.infoParams)) + "\r\n  ")]) : _vm.mode === 'pages' ? _c('form', {
    on: {
      "submit": function submit($event) {
        $event.preventDefault();
      }
    }
  }, [_c('label', {
    staticClass: "page-info__label",
    attrs: {
      "for": _vm.id
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.pageText))]), _vm._v(" "), _c('input', {
    staticClass: "footer__navigation__page-info__current-entry",
    attrs: {
      "id": _vm.id,
      "aria-describedby": "change-page-hint",
      "aria-controls": "vgb-table",
      "type": "text"
    },
    domProps: {
      "value": _vm.currentPage
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }
        $event.stopPropagation();
        return _vm.changePage.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.pageInfo))])]), _vm._v(" "), _c('span', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "change-page-hint"
    }
  }, [_vm._v("\r\n      Type a page number and press Enter to change the page.\r\n    ")])]) : _c('div', [_vm._v("\r\n    " + _vm._s(_vm.recordInfo) + "\r\n  ")])]);
};
var __vue_staticRenderFns__$6 = [];

/* style */
var __vue_inject_styles__$6 = undefined;
/* scoped */
var __vue_scope_id__$6 = "data-v-25f32d10";
/* module identifier */
var __vue_module_identifier__$6 = undefined;
/* functional template */
var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

//
var script$5 = {
  name: 'VgtPagination',
  props: {
    styleClass: {
      "default": 'table table-bordered'
    },
    total: {
      "default": null
    },
    perPage: {},
    rtl: {
      "default": false
    },
    perPageDropdownEnabled: {
      "default": true
    },
    customRowsPerPageDropdown: {
      "default": function _default() {
        return [];
      }
    },
    paginateDropdownAllowAll: {
      "default": true
    },
    mode: {
      "default": PAGINATION_MODES.Records
    },
    jumpFirstOrLast: {
      "default": false
    },
    // text options
    firstText: {
      "default": "First"
    },
    lastText: {
      "default": "Last"
    },
    nextText: {
      "default": 'Next'
    },
    prevText: {
      "default": 'Prev'
    },
    rowsPerPageText: {
      "default": 'Rows per page:'
    },
    ofText: {
      "default": 'of'
    },
    pageText: {
      "default": 'page'
    },
    allText: {
      "default": 'All'
    },
    infoFn: {
      "default": null
    }
  },
  data: function data() {
    return {
      id: this.getId(),
      currentPage: 1,
      prevPage: 0,
      currentPerPage: 10,
      rowsPerPageOptions: []
    };
  },
  watch: {
    perPage: {
      handler: function handler(newValue, oldValue) {
        this.handlePerPage();
        this.perPageChanged(oldValue);
      },
      immediate: true
    },
    customRowsPerPageDropdown: function customRowsPerPageDropdown() {
      this.handlePerPage();
    },
    total: {
      handler: function handler(newValue, oldValue) {
        if (this.rowsPerPageOptions.indexOf(this.currentPerPage) === -1) {
          this.currentPerPage = newValue;
        }
      }
    }
  },
  computed: {
    // Number of pages
    pagesCount: function pagesCount() {
      // if the setting is set to 'all'
      if (this.currentPerPage === -1) {
        return 1;
      }
      var quotient = Math.floor(this.total / this.currentPerPage);
      var remainder = this.total % this.currentPerPage;
      return remainder === 0 ? quotient : quotient + 1;
    },
    // Can go to first page
    firstIsPossible: function firstIsPossible() {
      return this.currentPage > 1;
    },
    // Can go to last page
    lastIsPossible: function lastIsPossible() {
      return this.currentPage < Math.ceil(this.total / this.currentPerPage);
    },
    // Can go to next page
    nextIsPossible: function nextIsPossible() {
      return this.currentPage < this.pagesCount;
    },
    // Can go to previous page
    prevIsPossible: function prevIsPossible() {
      return this.currentPage > 1;
    }
  },
  methods: {
    getId: function getId() {
      return "vgt-select-rpp-".concat(Math.floor(Math.random() * Date.now()));
    },
    // Change current page
    changePage: function changePage(pageNumber) {
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (pageNumber > 0 && this.total > this.currentPerPage * (pageNumber - 1)) {
        this.prevPage = this.currentPage;
        this.currentPage = pageNumber;
        this.pageChanged(emit);
      }
    },
    // Go to first page
    firstPage: function firstPage() {
      if (this.firstIsPossible) {
        this.currentPage = 1;
        this.prevPage = 0;
        this.pageChanged();
      }
    },
    // Go to last page
    lastPage: function lastPage() {
      if (this.lastIsPossible) {
        this.currentPage = this.pagesCount;
        this.prev = this.currentPage - 1;
        this.pageChanged();
      }
    },
    // Go to next page
    nextPage: function nextPage() {
      if (this.nextIsPossible) {
        this.prevPage = this.currentPage;
        ++this.currentPage;
        this.pageChanged();
      }
    },
    // Go to previous page
    previousPage: function previousPage() {
      if (this.prevIsPossible) {
        this.prevPage = this.currentPage;
        --this.currentPage;
        this.pageChanged();
      }
    },
    // Indicate page changing
    pageChanged: function pageChanged() {
      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var payload = {
        currentPage: this.currentPage,
        prevPage: this.prevPage
      };
      if (!emit) payload.noEmit = true;
      this.$emit('page-changed', payload);
    },
    // Indicate per page changing
    perPageChanged: function perPageChanged(oldValue) {
      // go back to first page
      if (oldValue) {
        //* only emit if this isn't first initialization
        this.$emit('per-page-changed', {
          currentPerPage: this.currentPerPage
        });
      }
      this.changePage(1, false);
    },
    // Handle per page changing
    handlePerPage: function handlePerPage() {
      //* if there's a custom dropdown then we use that
      if (this.customRowsPerPageDropdown !== null && Array.isArray(this.customRowsPerPageDropdown) && this.customRowsPerPageDropdown.length !== 0) {
        this.rowsPerPageOptions = JSON.parse(JSON.stringify(this.customRowsPerPageDropdown));
      } else {
        //* otherwise we use the default rows per page dropdown
        this.rowsPerPageOptions = JSON.parse(JSON.stringify(DEFAULT_ROWS_PER_PAGE_DROPDOWN));
      }
      if (this.perPage) {
        this.currentPerPage = this.perPage;
        // if perPage doesn't already exist, we add it
        var found = false;
        for (var i = 0; i < this.rowsPerPageOptions.length; i++) {
          if (this.rowsPerPageOptions[i] === this.perPage) {
            found = true;
          }
        }
        if (!found && this.perPage !== -1) {
          this.rowsPerPageOptions.unshift(this.perPage);
        }
      } else {
        // reset to default
        this.currentPerPage = 10;
      }
    }
  },
  mounted: function mounted() {},
  components: {
    'pagination-page-info': __vue_component__$6
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "vgt-wrap__footer vgt-clearfix"
  }, [_vm.perPageDropdownEnabled ? _c('div', {
    staticClass: "footer__row-count vgt-pull-left"
  }, [_c('form', [_c('label', {
    staticClass: "footer__row-count__label",
    attrs: {
      "for": _vm.id
    }
  }, [_vm._v(_vm._s(_vm.rowsPerPageText) + ":")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentPerPage,
      expression: "currentPerPage"
    }],
    staticClass: "footer__row-count__select",
    attrs: {
      "id": _vm.id,
      "autocomplete": "off",
      "name": "perPageSelect",
      "aria-controls": "vgt-table"
    },
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.currentPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, _vm.perPageChanged]
    }
  }, [_vm._l(_vm.rowsPerPageOptions, function (option, idx) {
    return _c('option', {
      key: idx,
      domProps: {
        "value": option
      }
    }, [_vm._v("\n          " + _vm._s(option) + "\n        ")]);
  }), _vm._v(" "), _vm.paginateDropdownAllowAll ? _c('option', {
    domProps: {
      "value": -1
    }
  }, [_vm._v(_vm._s(_vm.allText))]) : _vm._e()], 2)])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "footer__navigation vgt-pull-right"
  }, [_c('pagination-page-info', {
    attrs: {
      "total-records": _vm.total,
      "last-page": _vm.pagesCount,
      "current-page": _vm.currentPage,
      "current-per-page": _vm.currentPerPage,
      "of-text": _vm.ofText,
      "page-text": _vm.pageText,
      "info-fn": _vm.infoFn,
      "mode": _vm.mode
    },
    on: {
      "page-changed": _vm.changePage
    }
  }), _vm._v(" "), _vm.jumpFirstOrLast ? _c('button', {
    staticClass: "footer__navigation__page-btn",
    "class": {
      disabled: !_vm.firstIsPossible
    },
    attrs: {
      "type": "button",
      "aria-controls": "vgt-table"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.firstPage.apply(null, arguments);
      }
    }
  }, [_c('span', {
    staticClass: "chevron",
    "class": {
      left: !_vm.rtl,
      right: _vm.rtl
    },
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.firstText))])]) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "footer__navigation__page-btn",
    "class": {
      disabled: !_vm.prevIsPossible
    },
    attrs: {
      "type": "button",
      "aria-controls": "vgt-table"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.previousPage.apply(null, arguments);
      }
    }
  }, [_c('span', {
    staticClass: "chevron",
    "class": {
      'left': !_vm.rtl,
      'right': _vm.rtl
    },
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.prevText))])]), _vm._v(" "), _c('button', {
    staticClass: "footer__navigation__page-btn",
    "class": {
      disabled: !_vm.nextIsPossible
    },
    attrs: {
      "type": "button",
      "aria-controls": "vgt-table"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.nextPage.apply(null, arguments);
      }
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.nextText))]), _vm._v(" "), _c('span', {
    staticClass: "chevron",
    "class": {
      'right': !_vm.rtl,
      'left': _vm.rtl
    },
    attrs: {
      "aria-hidden": "true"
    }
  })]), _vm._v(" "), _vm.jumpFirstOrLast ? _c('button', {
    staticClass: "footer__navigation__page-btn",
    "class": {
      disabled: !_vm.lastIsPossible
    },
    attrs: {
      "type": "button",
      "aria-controls": "vgt-table"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.lastPage.apply(null, arguments);
      }
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.lastText))]), _vm._v(" "), _c('span', {
    staticClass: "chevron",
    "class": {
      right: !_vm.rtl,
      left: _vm.rtl
    },
    attrs: {
      "aria-hidden": "true"
    }
  })]) : _vm._e()], 1)]);
};
var __vue_staticRenderFns__$5 = [];

/* style */
var __vue_inject_styles__$5 = undefined;
/* scoped */
var __vue_scope_id__$5 = undefined;
/* module identifier */
var __vue_module_identifier__$5 = undefined;
/* functional template */
var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  name: 'VgtGlobalSearch',
  props: ['value', 'searchEnabled', 'globalSearchPlaceholder'],
  data: function data() {
    return {
      globalSearchTerm: null,
      id: this.getId()
    };
  },
  computed: {
    showControlBar: function showControlBar() {
      if (this.searchEnabled) return true;
      if (this.$slots && this.$slots['internal-table-actions']) return true;
      return false;
    }
  },
  methods: {
    updateValue: function updateValue(value) {
      this.$emit('input', value);
      this.$emit('on-keyup', value);
    },
    entered: function entered(value) {
      this.$emit('on-enter', value);
    },
    getId: function getId() {
      return "vgt-search-".concat(Math.floor(Math.random() * Date.now()));
    }
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.showControlBar ? _c('div', {
    staticClass: "vgt-global-search vgt-clearfix"
  }, [_c('div', {
    staticClass: "vgt-global-search__input vgt-pull-left"
  }, [_vm.searchEnabled ? _c('form', {
    attrs: {
      "role": "search"
    },
    on: {
      "submit": function submit($event) {
        $event.preventDefault();
      }
    }
  }, [_c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Search")])]), _vm._v(" "), _c('input', {
    staticClass: "vgt-input vgt-pull-left",
    attrs: {
      "id": _vm.id,
      "type": "text",
      "placeholder": _vm.globalSearchPlaceholder
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function input($event) {
        return _vm.updateValue($event.target.value);
      },
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }
        return _vm.entered($event.target.value);
      }
    }
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "vgt-global-search__actions vgt-pull-right"
  }, [_vm._t("internal-table-actions")], 2)]) : _vm._e();
};
var __vue_staticRenderFns__$4 = [function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('span', {
    staticClass: "input__icon",
    attrs: {
      "aria-hidden": "true"
    }
  }, [_c('div', {
    staticClass: "magnifying-glass"
  })]);
}];

/* style */
var __vue_inject_styles__$4 = undefined;
/* scoped */
var __vue_scope_id__$4 = undefined;
/* module identifier */
var __vue_module_identifier__$4 = undefined;
/* functional template */
var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'VgtFilterRow',
  props: ['lineNumbers', 'columns', 'typedColumns', 'globalSearchEnabled', 'selectable', 'mode'],
  watch: {
    columns: {
      handler: function handler(newValue, oldValue) {
        this.populateInitialFilters();
      },
      deep: true,
      immediate: true
    }
  },
  data: function data() {
    return {
      columnFilters: {},
      timer: null
    };
  },
  computed: {
    // to create a filter row, we need to
    // make sure that there is atleast 1 column
    // that requires filtering
    hasFilterRow: function hasFilterRow() {
      // if (this.mode === 'remote' || !this.globalSearchEnabled) {
      for (var i = 0; i < this.columns.length; i++) {
        var col = this.columns[i];
        if (col.filterOptions && col.filterOptions.enabled) {
          return true;
        }
      }
      // }
      return false;
    }
  },
  methods: {
    fieldKey: function fieldKey(field) {
      if (typeof field === 'function' && field.name) {
        return field.name;
      }
      return field;
    },
    reset: function reset() {
      var emitEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.columnFilters = {};
      if (emitEvent) {
        this.$emit('filter-changed', this.columnFilters);
      }
    },
    isFilterable: function isFilterable(column) {
      return column.filterOptions && column.filterOptions.enabled;
    },
    isDropdown: function isDropdown(column) {
      return this.isFilterable(column) && column.filterOptions.filterDropdownItems && column.filterOptions.filterDropdownItems.length;
    },
    isDropdownObjects: function isDropdownObjects(column) {
      return this.isDropdown(column) && _typeof(column.filterOptions.filterDropdownItems[0]) === 'object';
    },
    isDropdownArray: function isDropdownArray(column) {
      return this.isDropdown(column) && _typeof(column.filterOptions.filterDropdownItems[0]) !== 'object';
    },
    getClasses: function getClasses(column) {
      var firstClass = 'filter-th';
      return column.filterOptions && column.filterOptions.styleClass ? [firstClass].concat(_toConsumableArray(column.filterOptions.styleClass.split(' '))).join(' ') : firstClass;
    },
    // get column's defined placeholder or default one
    getPlaceholder: function getPlaceholder(column) {
      var placeholder = this.isFilterable(column) && column.filterOptions.placeholder || "Filter ".concat(column.label);
      return placeholder;
    },
    getName: function getName(column) {
      return "vgt-".concat(this.fieldKey(column.field));
    },
    updateFiltersOnEnter: function updateFiltersOnEnter(column, value) {
      if (this.timer) clearTimeout(this.timer);
      this.updateFiltersImmediately(column.field, value);
    },
    updateFiltersOnKeyup: function updateFiltersOnKeyup(column, value) {
      // if the trigger is enter, we don't filter on keyup
      if (column.filterOptions.trigger === 'enter') return;
      this.updateFilters(column, value);
    },
    updateSlotFilter: function updateSlotFilter(column, value) {
      var fieldToFilter = column.filterOptions.slotFilterField || column.field;
      if (typeof column.filterOptions.formatValue === 'function') {
        value = column.filterOptions.formatValue(value);
      }
      this.updateFiltersImmediately(fieldToFilter, value);
    },
    // since vue doesn't detect property addition and deletion, we
    // need to create helper function to set property etc
    updateFilters: function updateFilters(column, value) {
      var _this = this;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.updateFiltersImmediately(column.field, value);
      }, 400);
    },
    updateFiltersImmediately: function updateFiltersImmediately(field, value) {
      this.$set(this.columnFilters, this.fieldKey(field), value);
      this.$emit('filter-changed', this.columnFilters);
    },
    populateInitialFilters: function populateInitialFilters() {
      for (var i = 0; i < this.columns.length; i++) {
        var col = this.columns[i];
        // lets see if there are initial
        // filters supplied by user
        if (this.isFilterable(col) && typeof col.filterOptions.filterValue !== 'undefined' && col.filterOptions.filterValue !== null) {
          this.$set(this.columnFilters, this.fieldKey(col.field), col.filterOptions.filterValue);
          // this.updateFilters(col, col.filterOptions.filterValue);
          // this.$set(col.filterOptions, 'filterValue', undefined);
        }
      }
      //* lets emit event once all filters are set
      this.$emit('filter-changed', this.columnFilters);
    }
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.hasFilterRow ? _c('tr', [_vm.lineNumbers ? _c('th') : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th') : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
    return !column.hidden ? _c('th', {
      key: index,
      "class": _vm.getClasses(column)
    }, [_vm._t("column-filter", function () {
      return [_vm.isFilterable(column) ? _c('div', [!_vm.isDropdown(column) ? _c('input', {
        staticClass: "vgt-input",
        attrs: {
          "name": _vm.getName(column),
          "type": "text",
          "placeholder": _vm.getPlaceholder(column)
        },
        domProps: {
          "value": _vm.columnFilters[_vm.fieldKey(column.field)]
        },
        on: {
          "keyup": function keyup($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }
            return _vm.updateFiltersOnEnter(column, $event.target.value);
          },
          "input": function input($event) {
            return _vm.updateFiltersOnKeyup(column, $event.target.value);
          }
        }
      }) : _vm._e(), _vm._v(" "), _vm.isDropdownArray(column) ? _c('select', {
        staticClass: "vgt-select",
        attrs: {
          "name": _vm.getName(column)
        },
        domProps: {
          "value": _vm.columnFilters[_vm.fieldKey(column.field)]
        },
        on: {
          "change": function change($event) {
            return _vm.updateFiltersImmediately(column.field, $event.target.value);
          }
        }
      }, [_c('option', {
        key: "-1",
        attrs: {
          "value": ""
        }
      }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function (option, i) {
        return _c('option', {
          key: i,
          domProps: {
            "value": option
          }
        }, [_vm._v("\r\n              " + _vm._s(option) + "\r\n            ")]);
      })], 2) : _vm._e(), _vm._v(" "), _vm.isDropdownObjects(column) ? _c('select', {
        staticClass: "vgt-select",
        attrs: {
          "name": _vm.getName(column)
        },
        domProps: {
          "value": _vm.columnFilters[_vm.fieldKey(column.field)]
        },
        on: {
          "change": function change($event) {
            return _vm.updateFiltersImmediately(column.field, $event.target.value);
          }
        }
      }, [_c('option', {
        key: "-1",
        attrs: {
          "value": ""
        }
      }, [_vm._v(_vm._s(_vm.getPlaceholder(column)))]), _vm._v(" "), _vm._l(column.filterOptions.filterDropdownItems, function (option, i) {
        return _c('option', {
          key: i,
          domProps: {
            "value": option.value
          }
        }, [_vm._v(_vm._s(option.text))]);
      })], 2) : _vm._e()]) : _vm._e()];
    }, {
      "column": column,
      "updateFilters": _vm.updateSlotFilter
    })], 2) : _vm._e();
  })], 2) : _vm._e();
};
var __vue_staticRenderFns__$3 = [];

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = "data-v-bab6bcb0";
/* module identifier */
var __vue_module_identifier__$3 = undefined;
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

function getColumnFirstSortType(column) {
  return column.firstSortType || DEFAULT_SORT_TYPE;
}
function getCurrentPrimarySort(sortArray, column) {
  return sortArray.length === 1 && sortArray[0].field === column.field ? sortArray[0].type : undefined;
}
function getNextSort(currentSort, column) {
  if (SORT_TYPES.Descending === getColumnFirstSortType(column) && currentSort === SORT_TYPES.Ascending) {
    return SORT_TYPES.None;
  } else if (currentSort === SORT_TYPES.Ascending) {
    return SORT_TYPES.Descending;
  }
  if (SORT_TYPES.Descending === getColumnFirstSortType(column) && currentSort === SORT_TYPES.Descending) {
    return SORT_TYPES.Ascending;
  } else if (currentSort === SORT_TYPES.Descending) {
    return SORT_TYPES.None;
  }
  if (SORT_TYPES.Descending === getColumnFirstSortType(column) && currentSort === SORT_TYPES.None) {
    return SORT_TYPES.Descending;
  } else {
    return SORT_TYPES.Ascending;
  }
}
function getIndex(sortArray, column) {
  for (var i = 0; i < sortArray.length; i++) {
    if (column.field === sortArray[i].field) return i;
  }
  return -1;
}
var primarySort = function primarySort(sortArray, column) {
  var currentPrimarySort = getCurrentPrimarySort(sortArray, column);
  var nextPrimarySort = getNextSort(currentPrimarySort, column);
  return [{
    field: column.field,
    type: currentPrimarySort ? nextPrimarySort : getColumnFirstSortType(column)
  }];
};
var secondarySort = function secondarySort(sortArray, column) {
  var index = getIndex(sortArray, column);
  if (index === -1) {
    sortArray.push({
      field: column.field,
      type: getColumnFirstSortType(column)
    });
  } else {
    sortArray[index].type = getNextSort(sortArray[index].type, column);
  }
  return sortArray;
};

//
var script$2 = {
  name: 'VgtTableHeader',
  props: {
    lineNumbers: {
      "default": false,
      type: Boolean
    },
    selectable: {
      "default": false,
      type: Boolean
    },
    allSelected: {
      "default": false,
      type: Boolean
    },
    allSelectedIndeterminate: {
      "default": false,
      type: Boolean
    },
    columns: {
      type: Array
    },
    mode: {
      type: String
    },
    typedColumns: {},
    //* Sort related
    sortable: {
      type: Boolean
    },
    multipleColumnSort: {
      type: Boolean,
      "default": true
    },
    getClasses: {
      type: Function
    },
    //* search related
    searchEnabled: {
      type: Boolean
    },
    tableRef: {},
    paginated: {}
  },
  watch: {
    columns: {
      handler: function handler() {
        this.setColumnStyles();
      },
      immediate: true
    },
    tableRef: {
      handler: function handler() {
        this.setColumnStyles();
      },
      immediate: true
    },
    paginated: {
      handler: function handler() {
        if (this.tableRef) {
          this.setColumnStyles();
        }
      },
      deep: true
    }
  },
  data: function data() {
    return {
      checkBoxThStyle: {},
      lineNumberThStyle: {},
      columnStyles: [],
      sorts: [],
      ro: null
    };
  },
  computed: {},
  methods: {
    reset: function reset() {
      this.$refs['filter-row'].reset(true);
    },
    toggleSelectAll: function toggleSelectAll(e) {
      this.$emit('on-toggle-select-all', {
        revert: !!e.button
      });
    },
    isSortableColumn: function isSortableColumn(column) {
      var sortable = column.sortable;
      var isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
      return isSortable;
    },
    sort: function sort(e, column) {
      //* if column is not sortable, return right here
      if (!this.isSortableColumn(column)) return;
      if (e.shiftKey && this.multipleColumnSort) {
        this.sorts = secondarySort(this.sorts, column);
      } else {
        this.sorts = primarySort(this.sorts, column);
      }
      this.$emit('on-sort-change', this.sorts);
    },
    setInitialSort: function setInitialSort(sorts) {
      this.sorts = sorts;
      this.$emit('on-sort-change', this.sorts);
    },
    getColumnSort: function getColumnSort(column) {
      for (var i = 0; i < this.sorts.length; i += 1) {
        if (this.sorts[i].field === column.field) {
          return this.sorts[i].type || 'asc';
        }
      }
      return null;
    },
    getColumnSortLong: function getColumnSortLong(column) {
      return this.getColumnSort(column) === 'asc' ? 'ascending' : 'descending';
    },
    getHeaderClasses: function getHeaderClasses(column, index) {
      var classes = Object.assign({}, this.getClasses(index, 'th'), {
        sortable: this.isSortableColumn(column),
        'sorting sorting-desc': this.getColumnSort(column) === 'desc',
        'sorting sorting-asc': this.getColumnSort(column) === 'asc'
      });
      return classes;
    },
    filterRows: function filterRows(columnFilters) {
      this.$emit('filter-changed', columnFilters);
    },
    getWidthStyle: function getWidthStyle(dom) {
      if (window && window.getComputedStyle && dom) {
        var cellStyle = window.getComputedStyle(dom, null);
        return {
          width: cellStyle.width
        };
      }
      return {
        width: 'auto'
      };
    },
    setColumnStyles: function setColumnStyles() {
      var colStyles = [];
      for (var i = 0; i < this.columns.length; i++) {
        if (this.tableRef) {
          var skip = 0;
          if (this.selectable) skip++;
          if (this.lineNumbers) skip++;
          var cell = this.tableRef.rows[0].cells[i + skip];
          colStyles.push(this.getWidthStyle(cell));
        } else {
          colStyles.push({
            minWidth: this.columns[i].width ? this.columns[i].width : 'auto',
            maxWidth: this.columns[i].width ? this.columns[i].width : 'auto',
            width: this.columns[i].width ? this.columns[i].width : 'auto'
          });
        }
      }
      this.columnStyles = colStyles;
    },
    getColumnStyle: function getColumnStyle(column, index) {
      var styleObject = {
        minWidth: column.width ? column.width : 'auto',
        maxWidth: column.width ? column.width : 'auto',
        width: column.width ? column.width : 'auto'
      };
      //* if fixed header we need to get width from original table
      if (this.tableRef) {
        if (this.selectable) index++;
        if (this.lineNumbers) index++;
        var cell = this.tableRef.rows[0].cells[index];
        var cellStyle = window.getComputedStyle(cell, null);
        styleObject.width = cellStyle.width;
      }
      return styleObject;
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.$nextTick(function () {
      // We're going to watch the parent element for resize events, and calculate column widths if it changes
      if ('ResizeObserver' in window) {
        _this.ro = new ResizeObserver(function () {
          _this.setColumnStyles();
        });
        _this.ro.observe(_this.$parent.$el);

        // If this is a fixed-header table, we want to observe each column header from the non-fixed header.
        // You can imagine two columns swapping widths, which wouldn't cause the above to trigger.
        // This gets the first tr element of the primary table header, and iterates through its children (the th elements)
        if (_this.tableRef) {
          Array.from(_this.$parent.$refs['table-header-primary'].$el.children[0].children).forEach(function (header) {
            _this.ro.observe(header);
          });
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.ro) {
      this.ro.disconnect();
    }
  },
  components: {
    'vgt-filter-row': __vue_component__$3
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('thead', [_c('tr', [_vm.lineNumbers ? _c('th', {
    staticClass: "line-numbers",
    attrs: {
      "scope": "col"
    }
  }) : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th', {
    staticClass: "vgt-checkbox-col",
    attrs: {
      "scope": "col"
    }
  }, [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.allSelected,
      "indeterminate": _vm.allSelectedIndeterminate
    },
    on: {
      "change": _vm.toggleSelectAll,
      "contextmenu": function contextmenu($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.toggleSelectAll.apply(null, arguments);
      }
    }
  })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
    return !column.hidden ? _c('th', {
      key: index,
      "class": _vm.getHeaderClasses(column, index),
      style: _vm.columnStyles[index],
      attrs: {
        "scope": "col",
        "title": column.tooltip,
        "aria-sort": _vm.getColumnSortLong(column),
        "aria-controls": "col-" + index
      }
    }, [_vm._t("table-column", function () {
      return [_vm._v("\r\n        " + _vm._s(column.label) + "\r\n      ")];
    }, {
      "column": column
    }), _vm._v(" "), _vm.isSortableColumn(column) ? _c('button', {
      on: {
        "click": function click($event) {
          return _vm.sort($event, column);
        }
      }
    }, [_c('span', {
      staticClass: "sr-only"
    }, [_vm._v("\r\n          Sort table by " + _vm._s(column.label) + " in " + _vm._s(_vm.getColumnSortLong(column)) + " order\r\n          ")])]) : _vm._e()], 2) : _vm._e();
  })], 2), _vm._v(" "), _c("vgt-filter-row", {
    ref: "filter-row",
    tag: "tr",
    attrs: {
      "global-search-enabled": _vm.searchEnabled,
      "line-numbers": _vm.lineNumbers,
      "selectable": _vm.selectable,
      "columns": _vm.columns,
      "mode": _vm.mode,
      "typed-columns": _vm.typedColumns
    },
    on: {
      "filter-changed": _vm.filterRows
    },
    scopedSlots: _vm._u([{
      key: "column-filter",
      fn: function fn(props) {
        return [_vm._t("column-filter", null, {
          "column": props.column,
          "updateFilters": props.updateFilters
        })];
      }
    }], null, true)
  })], 1);
};
var __vue_staticRenderFns__$2 = [];

/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'VgtHeaderRow',
  props: {
    headerRow: {
      type: Object
    },
    columns: {
      type: Array
    },
    lineNumbers: {
      type: Boolean
    },
    selectable: {
      type: Boolean
    },
    selectAllByGroup: {
      type: Boolean
    },
    collapsable: {
      type: [Boolean, Number],
      "default": false
    },
    collectFormatted: {
      type: Function
    },
    formattedRow: {
      type: Function
    },
    getClasses: {
      type: Function
    },
    fullColspan: {
      type: Number
    },
    groupIndex: {
      type: Number
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    allSelected: function allSelected() {
      var headerRow = this.headerRow;
        this.groupChildObject;
      return headerRow.children.filter(function (row) {
        return row.vgtSelected;
      }).length === headerRow.children.length;
    }
  },
  methods: {
    columnCollapsable: function columnCollapsable(currentIndex) {
      if (this.collapsable === true) {
        return currentIndex === 0;
      }
      return currentIndex === this.collapsable;
    },
    toggleSelectGroup: function toggleSelectGroup(event) {
      this.$emit('on-select-group-change', {
        groupIndex: this.groupIndex,
        checked: event.target.checked
      });
    }
  },
  mounted: function mounted() {},
  components: {}
};

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('tr', [_vm.headerRow.mode === 'span' ? _c('th', {
    staticClass: "vgt-left-align vgt-row-header",
    attrs: {
      "colspan": _vm.fullColspan
    }
  }, [_vm.selectAllByGroup ? [_vm._t("table-header-group-select", function () {
    return [_c('input', {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.allSelected
      },
      on: {
        "change": function change($event) {
          return _vm.toggleSelectGroup($event);
        }
      }
    })];
  }, {
    "columns": _vm.columns,
    "row": _vm.headerRow
  })] : _vm._e(), _vm._v(" "), _c('span', {
    on: {
      "click": function click($event) {
        _vm.collapsable ? _vm.$emit('vgtExpand', !_vm.headerRow.vgtIsExpanded) : function () {};
      }
    }
  }, [_vm.collapsable ? _c('span', {
    staticClass: "triangle",
    "class": {
      'expand': _vm.headerRow.vgtIsExpanded
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("table-header-row", function () {
    return [_vm.headerRow.html ? _c('span', {
      domProps: {
        "innerHTML": _vm._s(_vm.headerRow.label)
      }
    }) : _c('span', [_vm._v("\r\n          " + _vm._s(_vm.headerRow.label) + "\r\n        ")])];
  }, {
    "row": _vm.headerRow
  })], 2)], 2) : _vm._e(), _vm._v(" "), _vm.headerRow.mode !== 'span' && _vm.lineNumbers ? _c('th', {
    staticClass: "vgt-row-header"
  }) : _vm._e(), _vm._v(" "), _vm.headerRow.mode !== 'span' && _vm.selectable ? _c('th', {
    staticClass: "vgt-row-header"
  }, [_vm.selectAllByGroup ? [_vm._t("table-header-group-select", function () {
    return [_c('input', {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.allSelected
      },
      on: {
        "change": function change($event) {
          return _vm.toggleSelectGroup($event);
        }
      }
    })];
  }, {
    "columns": _vm.columns,
    "row": _vm.headerRow
  })] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
    return _vm.headerRow.mode !== 'span' && !column.hidden ? _c('th', {
      key: i,
      staticClass: "vgt-row-header",
      "class": _vm.getClasses(i, 'td'),
      on: {
        "click": function click($event) {
          _vm.columnCollapsable(i) ? _vm.$emit('vgtExpand', !_vm.headerRow.vgtIsExpanded) : function () {};
        }
      }
    }, [_vm.columnCollapsable(i) ? _c('span', {
      staticClass: "triangle",
      "class": {
        'expand': _vm.headerRow.vgtIsExpanded
      }
    }) : _vm._e(), _vm._v(" "), _vm._t("table-header-row", function () {
      return [!column.html ? _c('span', [_vm._v("\r\n        " + _vm._s(_vm.collectFormatted(_vm.headerRow, column, true)) + "\r\n      ")]) : _vm._e(), _vm._v(" "), column.html ? _c('span', {
        domProps: {
          "innerHTML": _vm._s(_vm.collectFormatted(_vm.headerRow, column, true))
        }
      }) : _vm._e()];
    }, {
      "row": _vm.headerRow,
      "column": column,
      "formattedRow": _vm.formattedRow(_vm.headerRow, true)
    })], 2) : _vm._e();
  })], 2);
};
var __vue_staticRenderFns__$1 = [];

/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var date = Object.assign({}, defaultType);
date.isRight = true;
date.compare = function (x, y, column) {
  function cook(d) {
    if (column && column.dateInputFormat) {
      return parse("".concat(d), "".concat(column.dateInputFormat), new Date());
    }
    return d;
  }
  x = cook(x);
  y = cook(y);
  if (!isValid(x)) {
    return -1;
  }
  if (!isValid(y)) {
    return 1;
  }
  return compareAsc(x, y);
};
date.format = function (v, column) {
  if (v === undefined || v === null) return '';
  // convert to date
  var date = parse(v, column.dateInputFormat, new Date());
  if (isValid(date)) {
    return format(date, column.dateOutputFormat);
  }
  console.error("Not a valid date: \"".concat(v, "\""));
  return null;
};

var date$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': date
});

var number = Object.assign({}, defaultType);
number.isRight = true;
number.filterPredicate = function (rowval, filter) {
  return number.compare(rowval, filter) === 0;
};
number.compare = function (x, y) {
  function cook(d) {
    // if d is null or undefined we give it the smallest
    // possible value
    if (d === undefined || d === null) return -Infinity;
    return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d, 10);
  }
  x = typeof x === 'number' ? x : cook(x);
  y = typeof y === 'number' ? y : cook(y);
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
};

var number$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': number
});

var decimal = Object.assign({}, number);
decimal.format = function (v) {
  if (v === undefined || v === null) return '';
  return parseFloat(Math.round(v * 100) / 100).toFixed(2);
};

var decimal$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': decimal
});

var percentage = Object.assign({}, number);
percentage.format = function (v) {
  if (v === undefined || v === null) return '';
  return "".concat(parseFloat(v * 100).toFixed(2), "%");
};

var percentage$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': percentage
});

var _boolean = Object.assign({}, defaultType);
_boolean.isRight = true;
_boolean.filterPredicate = function (rowval, filter) {
  return _boolean.compare(rowval, filter) === 0;
};
_boolean.compare = function (x, y) {
  function cook(d) {
    if (typeof d === 'boolean') return d ? 1 : 0;
    if (typeof d === 'string') return d === 'true' ? 1 : 0;
    return -Infinity;
  }
  x = cook(x);
  y = cook(y);
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
};

var _boolean$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _boolean
});

var index = {
  date: date$1,
  decimal: decimal$1,
  number: number$1,
  percentage: percentage$1,
  "boolean": _boolean$1
};

var dataTypes = {};
var coreDataTypes = index;
Object.keys(coreDataTypes).forEach(function (key) {
  var compName = key.replace(/^\.\//, '').replace(/\.js/, '');
  dataTypes[compName] = coreDataTypes[key]["default"];
});
function flat(obj) {
  return JSON.parse(JSON.stringify(obj));
}
var script = {
  name: 'vue-good-table',
  props: {
    isLoading: {
      "default": null,
      type: Boolean
    },
    maxHeight: {
      "default": null,
      type: String
    },
    fixedHeader: Boolean,
    theme: {
      "default": ''
    },
    mode: {
      "default": 'local'
    },
    // could be remote
    totalRows: {},
    // required if mode = 'remote'
    styleClass: {
      "default": 'vgt-table bordered'
    },
    columns: {},
    rows: {},
    lineNumbers: Boolean,
    responsive: {
      "default": true,
      type: Boolean
    },
    rtl: Boolean,
    rowStyleClass: {
      "default": null,
      type: [Function, String]
    },
    compactMode: Boolean,
    groupOptions: {
      "default": function _default() {
        return {
          enabled: false,
          collapsable: false,
          rowKey: null
        };
      }
    },
    selectOptions: {
      "default": function _default() {
        return {
          enabled: false,
          selectionInfoClass: '',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: false,
          selectAllByGroup: false
        };
      }
    },
    // sort
    sortOptions: {
      "default": function _default() {
        return {
          enabled: true,
          multipleColumns: true,
          initialSortBy: {}
        };
      }
    },
    // pagination
    paginationOptions: {
      "default": function _default() {
        var _ref;
        return _ref = {
          enabled: false,
          position: 'bottom',
          perPage: 10,
          perPageDropdown: null,
          perPageDropdownEnabled: true
        }, _defineProperty(_ref, "position", 'bottom'), _defineProperty(_ref, "dropdownAllowAll", true), _defineProperty(_ref, "mode", 'records'), _defineProperty(_ref, "infoFn", null), _defineProperty(_ref, "jumpFirstOrLast", false), _ref;
      }
    },
    virtualPaginationOptions: {
      "default": function _default() {
        return {
          enabled: false,
          height: 32
        };
      }
    },
    searchOptions: {
      "default": function _default() {
        return {
          enabled: false,
          trigger: null,
          externalQuery: null,
          searchFn: null,
          placeholder: 'Search Table'
        };
      }
    }
  },
  data: function data() {
    return {
      // loading state for remote mode
      tableLoading: false,
      // text options
      firstText: "First",
      lastText: "Last",
      nextText: 'Next',
      prevText: 'Previous',
      rowsPerPageText: 'Rows per page',
      ofText: 'of',
      allText: 'All',
      pageText: 'page',
      // internal select options
      selectable: false,
      selectOnCheckboxOnly: false,
      selectAllByPage: true,
      disableSelectInfo: false,
      selectionInfoClass: '',
      selectionText: 'rows selected',
      clearSelectionText: 'clear',
      // keys for rows that are currently expanded
      maintainExpanded: true,
      expandedRowKeys: new Set(),
      // internal sort options
      sortable: true,
      defaultSortBy: null,
      multipleColumnSort: true,
      // internal search options
      searchEnabled: false,
      searchTrigger: null,
      externalSearchQuery: null,
      searchFn: null,
      searchPlaceholder: 'Search Table',
      searchSkipDiacritics: false,
      // internal pagination options
      perPage: null,
      paginate: false,
      paginateOnTop: false,
      paginateOnBottom: true,
      customRowsPerPageDropdown: [],
      paginateDropdownAllowAll: true,
      paginationMode: 'records',
      paginationInfoFn: null,
      currentPage: 1,
      currentPerPage: 10,
      sorts: [],
      globalSearchTerm: '',
      filteredRows: [],
      columnFilters: {},
      forceSearch: false,
      sortChanged: false,
      dataTypes: dataTypes || {},
      scrollTop: 0,
      scrollHeight: 0
    };
  },
  watch: {
    rows: {
      handler: function handler() {
        this.$emit('update:isLoading', false);
        this.filterRows(this.columnFilters, false);
      },
      deep: true,
      immediate: true
    },
    selectOptions: {
      handler: function handler() {
        this.initializeSelect();
      },
      deep: true,
      immediate: true
    },
    paginationOptions: {
      handler: function handler(newValue, oldValue) {
        if (!isEqual(newValue, oldValue)) {
          this.initializePagination();
        }
      },
      deep: true,
      immediate: true
    },
    searchOptions: {
      handler: function handler() {
        if (this.searchOptions.externalQuery !== undefined && this.searchOptions.externalQuery !== this.searchTerm) {
          //* we need to set searchTerm to externalQuery first.
          this.externalSearchQuery = this.searchOptions.externalQuery;
          this.handleSearch();
        }
        this.initializeSearch();
      },
      deep: true,
      immediate: true
    },
    sortOptions: {
      handler: function handler(newValue, oldValue) {
        if (!isEqual(newValue, oldValue)) {
          this.initializeSort();
        }
      },
      deep: true
    },
    selectedRows: function selectedRows(newValue, oldValue) {
      if (!isEqual(newValue, oldValue)) {
        this.$emit('on-selected-rows-change', {
          selectedRows: this.selectedRows
        });
      }
    }
  },
  computed: {
    tableStyles: function tableStyles() {
      if (this.compactMode) return this.tableStyleClasses + 'vgt-compact';else return this.tableStyleClasses;
    },
    hasFooterSlot: function hasFooterSlot() {
      return !!this.$slots['table-actions-bottom'];
    },
    wrapperStyles: function wrapperStyles() {
      return {
        overflow: 'scroll-y',
        maxHeight: this.maxHeight ? this.maxHeight : 'auto'
      };
    },
    rowKeyField: function rowKeyField() {
      return this.groupOptions.rowKey || 'vgt_header_id';
    },
    hasHeaderRowTemplate: function hasHeaderRowTemplate() {
      return !!this.$slots['table-header-row'] || !!this.$scopedSlots['table-header-row'];
    },
    showEmptySlot: function showEmptySlot() {
      if (!this.paginated.length) return true;
      if (this.paginated[0].label === 'no groups' && !this.paginated[0].children.length) {
        return true;
      }
      return false;
    },
    allSelected: function allSelected() {
      return this.selectedRowCount > 0 && (this.selectAllByPage && this.selectedPageRowsCount === this.totalPageRowCount || !this.selectAllByPage && this.selectedRowCount === this.totalRowCount);
    },
    allSelectedIndeterminate: function allSelectedIndeterminate() {
      return !this.allSelected && (this.selectAllByPage && this.selectedPageRowsCount > 0 || !this.selectAllByPage && this.selectedRowCount > 0);
    },
    selectionInfo: function selectionInfo() {
      return "".concat(this.selectedRowCount, " ").concat(this.selectionText);
    },
    selectedRowCount: function selectedRowCount() {
      return this.selectedRows.length;
    },
    selectedPageRowsCount: function selectedPageRowsCount() {
      return this.selectedPageRows.length;
    },
    selectedPageRows: function selectedPageRows() {
      var selectedRows = [];
      this.paginated.forEach(function (headerRow) {
        headerRow.children.forEach(function (row) {
          if (row.vgtSelected) {
            selectedRows.push(row);
          }
        });
      });
      return selectedRows;
    },
    selectedRows: function selectedRows() {
      var selectedRows = [];
      this.processedRows.forEach(function (headerRow) {
        headerRow.children.forEach(function (row) {
          if (row.vgtSelected) {
            selectedRows.push(row);
          }
        });
      });
      return selectedRows.sort(function (r1, r2) {
        return r1.originalIndex - r2.originalIndex;
      });
    },
    fullColspan: function fullColspan() {
      var fullColspan = 0;
      for (var i = 0; i < this.columns.length; i += 1) {
        if (!this.columns[i].hidden) {
          fullColspan += 1;
        }
      }
      if (this.lineNumbers) fullColspan++;
      if (this.selectable) fullColspan++;
      return fullColspan;
    },
    groupHeaderOnTop: function groupHeaderOnTop() {
      if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === 'bottom') {
        return false;
      }
      if (this.groupOptions && this.groupOptions.enabled) return true;

      // will only get here if groupOptions is false
      return false;
    },
    groupHeaderOnBottom: function groupHeaderOnBottom() {
      if (this.groupOptions && this.groupOptions.enabled && this.groupOptions.headerPosition && this.groupOptions.headerPosition === 'bottom') {
        return true;
      }
      return false;
    },
    totalRowCount: function totalRowCount() {
      var total = this.processedRows.reduce(function (total, headerRow) {
        var childrenCount = headerRow.children ? headerRow.children.length : 0;
        return total + childrenCount;
      }, 0);
      return total;
    },
    totalPageRowCount: function totalPageRowCount() {
      var total = this.paginated.reduce(function (total, headerRow) {
        var childrenCount = headerRow.children ? headerRow.children.length : 0;
        return total + childrenCount;
      }, 0);
      return total;
    },
    wrapStyleClasses: function wrapStyleClasses() {
      var classes = 'vgt-wrap';
      if (this.rtl) classes += ' rtl';
      classes += " ".concat(this.theme);
      return classes;
    },
    tableStyleClasses: function tableStyleClasses() {
      var classes = this.styleClass;
      classes += " ".concat(this.theme);
      return classes;
    },
    searchTerm: function searchTerm() {
      return this.externalSearchQuery != null ? this.externalSearchQuery : this.globalSearchTerm;
    },
    //
    globalSearchAllowed: function globalSearchAllowed() {
      if (this.searchEnabled && !!this.globalSearchTerm && this.searchTrigger !== 'enter') {
        return true;
      }
      if (this.externalSearchQuery != null && this.searchTrigger !== 'enter') {
        return true;
      }
      if (this.forceSearch) {
        this.forceSearch = false;
        return true;
      }
      return false;
    },
    // this is done everytime sortColumn
    // or sort type changes
    //----------------------------------------
    processedRows: function processedRows() {
      var _this = this;
      // we only process rows when mode is local
      var computedRows = this.filteredRows;
      if (this.mode === 'remote') {
        return computedRows;
      }

      // take care of the global filter here also
      if (this.globalSearchAllowed) {
        // here also we need to de-construct and then
        // re-construct the rows.
        var allRows = [];
        this.filteredRows.forEach(function (headerRow) {
          allRows.push.apply(allRows, _toConsumableArray(headerRow.children));
        });
        var filteredRows = [];
        allRows.forEach(function (row) {
          for (var i = 0; i < _this.columns.length; i += 1) {
            var col = _this.columns[i];
            // if col does not have search disabled,
            if (!col.globalSearchDisabled) {
              // if a search function is provided,
              // use that for searching, otherwise,
              // use the default search behavior
              if (_this.searchFn) {
                var foundMatch = _this.searchFn(row, col, _this.collectFormatted(row, col), _this.searchTerm);
                if (foundMatch) {
                  filteredRows.push(row);
                  break; // break the loop
                }
              } else {
                // comparison
                var matched = defaultType.filterPredicate(_this.collectFormatted(row, col), _this.searchTerm, _this.searchSkipDiacritics);
                if (matched) {
                  filteredRows.push(row);
                  break; // break loop
                }
              }
            }
          }
        });

        // this is where we emit on search
        this.$emit('on-search', {
          searchTerm: this.searchTerm,
          rowCount: filteredRows.length
        });

        // here we need to reconstruct the nested structure
        // of rows
        computedRows = [];
        this.filteredRows.forEach(function (headerRow) {
          var i = headerRow.vgt_header_id;
          var children = filteredRows.filter(function (r) {
            return r.vgt_id === i;
          });
          if (children.length) {
            var newHeaderRow = flat(headerRow);
            newHeaderRow.children = children;
            computedRows.push(newHeaderRow);
          }
        });
      }
      if (this.sorts.length) {
        //* we need to sort
        computedRows.forEach(function (cRows) {
          cRows.children.sort(function (xRow, yRow) {
            //* we need to get column for each sort
            var sortValue;
            for (var i = 0; i < _this.sorts.length; i += 1) {
              var srt = _this.sorts[i];
              if (srt.type === SORT_TYPES.None) {
                //* if no sort, we need to use the original index to sort.
                sortValue = sortValue || xRow.originalIndex - yRow.originalIndex;
              } else {
                var column = _this.getColumnForField(srt.field);
                var xvalue = _this.collect(xRow, srt.field);
                var yvalue = _this.collect(yRow, srt.field);

                //* if a custom sort function has been provided we use that
                var sortFn = column.sortFn;
                if (sortFn && typeof sortFn === 'function') {
                  sortValue = sortValue || sortFn(xvalue, yvalue, column, xRow, yRow) * (srt.type === SORT_TYPES.Descending ? -1 : 1);
                } else {
                  //* else we use our own sort
                  sortValue = sortValue || column.typeDef.compare(xvalue, yvalue, column) * (srt.type === SORT_TYPES.Descending ? -1 : 1);
                }
              }
            }
            return sortValue;
          });
        });
      }

      // if the filtering is event based, we need to maintain filter
      // rows
      if (this.searchTrigger === 'enter') {
        this.filteredRows = computedRows;
      }
      return computedRows;
    },
    paginated2ScrollTop: function paginated2ScrollTop() {
      //https://codesandbox.io/s/0bdq0?file=/src/components/HelloWorld.vue:2629-2640
      var max = this.paginated2ScrollHeight; //this.$refs.scroller.scrollHeight - this.$refs.scroller.offsetHeight
      var diff = this.scrollTop % this.virtualPaginationOptions.height;
      return Math.min(max, this.scrollTop - diff); // - (this.$refs.scroller?.offsetHeight||400)
    },
    paginated2ScrollHeight: function paginated2ScrollHeight() {
      return this.rows.length * this.virtualPaginationOptions.height;
    },
    paginated2Start: function paginated2Start() {
      if (!this.virtualPaginationOptions.enabled) return 0;
      return Math.max(0, this.scrollTop / this.virtualPaginationOptions.height - 1);
    },
    paginated2: function paginated2() {
      if (!this.virtualPaginationOptions.enabled) return this.paginated;
      var rows = this.filteredRows;
      var count = this.scrollHeight / this.virtualPaginationOptions.height + 2 || 30; // = this.$refs.fixedHeader?.offsetHeight || 60;
      var start = this.scrollTop / this.virtualPaginationOptions.height - 1;
      var startfloor = Math.floor(start);
      var end = startfloor + count;
      return [Object.assign({}, rows[0], {
        children: rows[0].children.filter(function (f, i) {
          return i >= startfloor && i < end;
        })
      })]; // .slice(start, end);
    },
    paginated: function paginated() {
      var _this2 = this;
      if (!this.processedRows.length) return [];
      if (this.mode === 'remote') {
        return this.processedRows;
      }

      //* flatten the rows for paging.
      var paginatedRows = [];
      this.processedRows.forEach(function (childRows) {
        var _paginatedRows;
        //* only add headers when group options are enabled.
        if (_this2.groupOptions.enabled) {
          paginatedRows.push(childRows);
        }
        (_paginatedRows = paginatedRows).push.apply(_paginatedRows, _toConsumableArray(childRows.children));
      });
      if (this.paginate) {
        var pageStart = (this.currentPage - 1) * this.currentPerPage;

        // in case of filtering we might be on a page that is
        // not relevant anymore
        // also, if setting to all, current page will not be valid
        if (pageStart >= paginatedRows.length || this.currentPerPage === -1) {
          this.currentPage = 1;
          pageStart = 0;
        }

        // calculate page end now
        var pageEnd = paginatedRows.length + 1;

        // if the setting is not set to 'all'
        if (this.currentPerPage !== -1) {
          pageEnd = this.currentPage * this.currentPerPage;
        }
        paginatedRows = paginatedRows.slice(pageStart, pageEnd);
      }
      // reconstruct paginated rows here
      var reconstructedRows = [];
      paginatedRows.forEach(function (flatRow) {
        //* header row?
        if (flatRow.vgt_header_id !== undefined) {
          _this2.handleExpanded(flatRow);
          var newHeaderRow = flat(flatRow);
          newHeaderRow.children = [];
          reconstructedRows.push(newHeaderRow);
        } else {
          //* child row
          var hRow = reconstructedRows.find(function (r) {
            return r.vgt_header_id === flatRow.vgt_id;
          });
          if (!hRow) {
            hRow = _this2.processedRows.find(function (r) {
              return r.vgt_header_id === flatRow.vgt_id;
            });
            if (hRow) {
              hRow = flat(hRow);
              hRow.children = [];
              reconstructedRows.push(hRow);
            }
          }
          hRow.children.push(flatRow);
        }
      });
      return reconstructedRows;
    },
    originalRows: function originalRows() {
      var rows = this.rows && this.rows.length ? flat(this.rows) : [];
      var nestedRows = [];
      if (!this.groupOptions.enabled) {
        nestedRows = this.handleGrouped([{
          label: 'no groups',
          children: rows
        }]);
      } else {
        nestedRows = this.handleGrouped(rows);
      }
      // we need to preserve the original index of
      // rows so lets do that
      var index = 0;
      nestedRows.forEach(function (headerRow) {
        headerRow.children.forEach(function (row) {
          row.originalIndex = index++;
        });
      });
      return nestedRows;
    },
    typedColumns: function typedColumns() {
      var columns = this.columns;
      for (var i = 0; i < this.columns.length; i++) {
        var column = columns[i];
        column.typeDef = this.dataTypes[column.type] || defaultType;
      }
      return columns;
    },
    hasRowClickListener: function hasRowClickListener() {
      return this.$listeners && this.$listeners['on-row-click'];
    }
  },
  methods: {
    //* we need to check for expanded row state here
    //* to maintain it when sorting/filtering
    handleExpanded: function handleExpanded(headerRow) {
      if (this.maintainExpanded && this.expandedRowKeys.has(headerRow[this.rowKeyField])) {
        this.$set(headerRow, 'vgtIsExpanded', true);
      } else {
        this.$set(headerRow, 'vgtIsExpanded', false);
      }
    },
    toggleExpand: function toggleExpand(id) {
      var _this3 = this;
      var headerRow = this.filteredRows.find(function (r) {
        return r[_this3.rowKeyField] === id;
      });
      if (headerRow) {
        this.$set(headerRow, 'vgtIsExpanded', !headerRow.vgtIsExpanded);
      }
      if (this.maintainExpanded && headerRow.vgtIsExpanded) {
        this.expandedRowKeys.add(headerRow[this.rowKeyField]);
      } else {
        this.expandedRowKeys["delete"](headerRow[this.rowKeyField]);
      }
    },
    expandAll: function expandAll() {
      var _this4 = this;
      this.filteredRows.forEach(function (row) {
        _this4.$set(row, 'vgtIsExpanded', true);
        if (_this4.maintainExpanded) {
          _this4.expandedRowKeys.add(row[_this4.rowKeyField]);
        }
      });
    },
    collapseAll: function collapseAll() {
      var _this5 = this;
      this.filteredRows.forEach(function (row) {
        _this5.$set(row, 'vgtIsExpanded', false);
        _this5.expandedRowKeys.clear();
      });
    },
    getColumnForField: function getColumnForField(field) {
      for (var i = 0; i < this.typedColumns.length; i += 1) {
        if (this.typedColumns[i].field === field) return this.typedColumns[i];
      }
    },
    handleSearch: function handleSearch() {
      this.resetTable();
      // for remote mode, we need to emit on-search
      if (this.mode === 'remote') {
        this.$emit('on-search', {
          searchTerm: this.searchTerm
        });
      }
    },
    reset: function reset() {
      this.initializeSort();
      this.changePage(1);
      this.$refs['table-header-primary'].reset(true);
      if (this.$refs['table-header-secondary']) {
        this.$refs['table-header-secondary'].reset(true);
      }
    },
    emitSelectedRows: function emitSelectedRows() {
      this.$emit('on-select-all', {
        selected: this.selectedRowCount === this.totalRowCount,
        selectedRows: this.selectedRows
      });
    },
    unselectAllInternal: function unselectAllInternal(forceAll) {
      var _this6 = this;
      var rows = this.selectAllByPage && !forceAll ? this.paginated : this.filteredRows;
      rows.forEach(function (headerRow, i) {
        headerRow.children.forEach(function (row, j) {
          _this6.$set(row, 'vgtSelected', false);
        });
      });
      this.emitSelectedRows();
    },
    toggleSelectAll: function toggleSelectAll(e) {
      var _this7 = this;
      if (this.allSelected) {
        this.unselectAllInternal();
        return;
      }
      var rows = this.selectAllByPage ? this.paginated : this.filteredRows;
      rows.forEach(function (headerRow) {
        headerRow.children.forEach(function (row) {
          _this7.$set(row, 'vgtSelected', e.revert ? !row.vgtSelected : true);
        });
      });
      this.emitSelectedRows();
    },
    toggleSelectGroup: function toggleSelectGroup(event, headerRow) {
      var _this8 = this;
      headerRow.children.forEach(function (row) {
        _this8.$set(row, 'vgtSelected', event.checked);
      });
    },
    changePage: function changePage(value) {
      var enabled = this.paginate;
      var _this$$refs = this.$refs,
        paginationBottom = _this$$refs.paginationBottom,
        paginationTop = _this$$refs.paginationTop;
      if (enabled) {
        if (this.paginateOnTop && paginationTop) {
          paginationTop.currentPage = value;
        }
        if (this.paginateOnBottom && paginationBottom) {
          paginationBottom.currentPage = value;
        }
        // we also need to set the currentPage
        // for table.
        this.currentPage = value;
      }
    },
    pageChangedEvent: function pageChangedEvent() {
      return {
        currentPage: this.currentPage,
        currentPerPage: this.currentPerPage,
        total: Math.floor(this.totalRowCount / this.currentPerPage)
      };
    },
    pageChanged: function pageChanged(pagination) {
      this.currentPage = pagination.currentPage;
      if (!pagination.noEmit) {
        var pageChangedEvent = this.pageChangedEvent();
        pageChangedEvent.prevPage = pagination.prevPage;
        this.$emit('on-page-change', pageChangedEvent);
        if (this.mode === 'remote') {
          this.$emit('update:isLoading', true);
        }
      }
    },
    perPageChanged: function perPageChanged(pagination) {
      this.currentPerPage = pagination.currentPerPage;
      // ensure that both sides of pagination are in agreement
      // this fixes changes during position = 'both'
      var paginationPosition = this.paginationOptions.position;
      if (this.$refs.paginationTop && (paginationPosition === 'top' || paginationPosition === 'both')) {
        this.$refs.paginationTop.currentPerPage = this.currentPerPage;
      }
      if (this.$refs.paginationBottom && (paginationPosition === 'bottom' || paginationPosition === 'both')) {
        this.$refs.paginationBottom.currentPerPage = this.currentPerPage;
      }
      //* update perPage also
      var perPageChangedEvent = this.pageChangedEvent();
      this.$emit('on-per-page-change', perPageChangedEvent);
      if (this.mode === 'remote') {
        this.$emit('update:isLoading', true);
      }
    },
    changeSort: function changeSort(sorts) {
      this.sorts = sorts;
      this.$emit('on-sort-change', sorts);

      // every time we change sort we need to reset to page 1
      this.changePage(1);

      // if the mode is remote, we don't need to do anything
      // after this. just set table loading to true
      if (this.mode === 'remote') {
        this.$emit('update:isLoading', true);
        return;
      }
      this.sortChanged = true;
    },
    // checkbox click should always do the following
    onCheckboxClicked: function onCheckboxClicked(row, index, event) {
      var offset = this.paginated2Start;
      var currentIndex = index + Math.floor(offset);
      if (event.shiftKey && this.lastIndex > -1) {
        // support for multiple select with shift
        var lastI = this.lastIndex;
        var first = Math.min(lastI, currentIndex),
          last = Math.max(lastI, currentIndex);
        for (var i = first; i <= last; i++) {
          this.$set(this.rows[i], 'vgtSelected', !row.vgtSelected);
        }
      }
      this.lastIndex = currentIndex;
      this.$set(row, 'vgtSelected', !row.vgtSelected);
      this.$emit('on-row-click', {
        row: row,
        pageIndex: currentIndex,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onRowDoubleClicked: function onRowDoubleClicked(row, index, event) {
      this.$emit('on-row-dblclick', {
        row: row,
        pageIndex: Math.floor(this.paginated2Start) + index,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onRowClicked: function onRowClicked(row, index, event) {
      if (this.selectable && !this.selectOnCheckboxOnly) {
        this.$set(row, 'vgtSelected', !row.vgtSelected);
      }
      this.$emit('on-row-click', {
        row: row,
        pageIndex: Math.floor(this.paginated2Start) + index,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onRowAuxClicked: function onRowAuxClicked(row, index, event) {
      this.$emit('on-row-aux-click', {
        row: row,
        pageIndex: Math.floor(this.paginated2Start) + index,
        selected: !!row.vgtSelected,
        event: event
      });
    },
    onCellClicked: function onCellClicked(row, column, rowIndex, event) {
      this.$emit('on-cell-click', {
        row: row,
        column: column,
        rowIndex: rowIndex,
        event: event
      });
    },
    onMouseenter: function onMouseenter(row, index) {
      this.$emit('on-row-mouseenter', {
        row: row,
        pageIndex: Math.floor(this.paginated2Start) + index
      });
    },
    onMouseleave: function onMouseleave(row, index) {
      this.$emit('on-row-mouseleave', {
        row: row,
        pageIndex: Math.floor(this.paginated2Start) + index
      });
    },
    searchTableOnEnter: function searchTableOnEnter() {
      if (this.searchTrigger === 'enter') {
        this.handleSearch();
        // we reset the filteredRows here because
        // we want to search across everything.
        this.filteredRows = flat(this.originalRows);
        this.forceSearch = true;
        this.sortChanged = true;
      }
    },
    searchTableOnKeyUp: function searchTableOnKeyUp() {
      if (this.searchTrigger !== 'enter') {
        this.handleSearch();
      }
    },
    resetTable: function resetTable() {
      this.unselectAllInternal(true);
      // every time we searchTable
      this.changePage(1);
    },
    // field can be:
    // 1. function (passed as a string using function.name. For example: 'bound myFunction')
    // 2. regular property - ex: 'prop'
    // 3. nested property path - ex: 'nested.prop'
    collect: function collect(obj, field) {
      // utility function to get nested property
      function dig(obj, selector) {
        var result = obj;
        var splitter = selector.split('.');
        for (var i = 0; i < splitter.length; i++) {
          if (typeof result === 'undefined' || result === null) {
            return undefined;
          }
          result = result[splitter[i]];
        }
        return result;
      }
      if (typeof field === 'function') return field(obj);
      if (typeof field === 'string') return dig(obj, field);
      return undefined;
    },
    collectFormatted: function collectFormatted(obj, column) {
      var headerRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var value;
      if (headerRow && column.headerField) {
        value = this.collect(obj, column.headerField);
      } else {
        value = this.collect(obj, column.field);
      }
      if (value === undefined) return '';

      // if user has supplied custom formatter,
      // use that here
      if (column.formatFn && typeof column.formatFn === 'function') {
        return column.formatFn(value, obj);
      }

      // lets format the resultant data
      var type = column.typeDef;
      // this will only happen if we try to collect formatted
      // before types have been initialized. for example: on
      // load when external query is specified.
      if (!type) {
        type = this.dataTypes[column.type] || defaultType;
      }
      var result = type.format(value, column);
      // we must have some values in compact mode
      if (this.compactMode && (result == '' || result == null)) return '-';
      return result;
    },
    formattedRow: function formattedRow(row) {
      var isHeaderRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var formattedRow = {};
      for (var i = 0; i < this.typedColumns.length; i++) {
        var col = this.typedColumns[i];
        // what happens if field is
        if (col.field) {
          formattedRow[col.field] = this.collectFormatted(row, col, isHeaderRow);
        }
      }
      return formattedRow;
    },
    // Get classes for the given column index & element.
    getClasses: function getClasses(index, element, row) {
      var _this$typedColumns$in = this.typedColumns[index],
        typeDef = _this$typedColumns$in.typeDef,
        custom = _this$typedColumns$in["".concat(element, "Class")];
      var isRight = typeDef.isRight;
      if (this.rtl) isRight = true;
      var classes = {
        'vgt-right-align': isRight,
        'vgt-left-align': !isRight
      };

      // for td we need to check if value is
      // a function.
      if (typeof custom === 'function') {
        classes[custom(row)] = true;
      } else if (typeof custom === 'string') {
        classes[custom] = true;
      }
      return classes;
    },
    // method to filter rows
    filterRows: function filterRows(columnFilters) {
      var _this9 = this;
      var fromFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // if (!this.rows.length) return;
      // this is invoked either as a result of changing filters
      // or as a result of modifying rows.
      this.columnFilters = columnFilters;
      var computedRows = flat(this.originalRows);
      var instancesOfFiltering = false;
      this.calculateTopSize();

      // do we have a filter to care about?
      // if not we don't need to do anything
      if (this.columnFilters && Object.keys(this.columnFilters).length) {
        var _ret = function () {
          // every time we filter rows, we need to set current page
          // to 1
          // if the mode is remote, we only need to reset, if this is
          // being called from filter, not when rows are changing
          if (_this9.mode !== 'remote' || fromFilter) {
            _this9.changePage(1);
          }
          // we need to emit an event and that's that.
          // but this only needs to be invoked if filter is changing
          // not when row object is modified.
          if (fromFilter) {
            _this9.$emit('on-column-filter', {
              columnFilters: _this9.columnFilters
            });
          }

          // if mode is remote, we don't do any filtering here.
          if (_this9.mode === 'remote') {
            if (fromFilter) {
              _this9.$emit('update:isLoading', true);
            } else {
              // if remote filtering has already been taken care of.
              _this9.filteredRows = computedRows;
            }
            return {
              v: void 0
            };
          }
          var fieldKey = function fieldKey(field) {
            if (typeof field === 'function' && field.name) {
              return field.name;
            }
            return field;
          };
          var _loop = function _loop(i) {
            var col = _this9.typedColumns[i];
            if (_this9.columnFilters[fieldKey(col.field)]) {
              instancesOfFiltering = true;
              computedRows.forEach(function (headerRow) {
                var newChildren = headerRow.children.filter(function (row) {
                  // If column has a custom filter, use that.
                  if (col.filterOptions && typeof col.filterOptions.filterFn === 'function') {
                    return col.filterOptions.filterFn(_this9.collect(row, col.field), _this9.columnFilters[fieldKey(col.field)]);
                  }

                  // Otherwise Use default filters
                  var typeDef = col.typeDef;
                  return typeDef.filterPredicate(_this9.collect(row, col.field), _this9.columnFilters[fieldKey(col.field)], false, col.filterOptions && _typeof(col.filterOptions.filterDropdownItems) === 'object');
                });
                // should we remove the header?
                headerRow.children = newChildren;
              });
            }
          };
          for (var i = 0; i < _this9.typedColumns.length; i++) {
            _loop(i);
          }
        }();
        if (_typeof(_ret) === "object") return _ret.v;
      }
      if (instancesOfFiltering) {
        this.filteredRows = computedRows.filter(function (h) {
          return h.children && h.children.length;
        });
      } else {
        this.filteredRows = computedRows;
      }
    },
    getCurrentIndex: function getCurrentIndex(rowId) {
      var index = 0;
      var found = false;
      for (var i = 0; i < this.paginated.length; i += 1) {
        var headerRow = this.paginated[i];
        var children = headerRow.children;
        if (children && children.length) {
          for (var j = 0; j < children.length; j += 1) {
            var c = children[j];
            if (c.originalIndex === rowId) {
              found = true;
              break;
            }
            index += 1;
          }
        }
        if (found) break;
      }
      return (this.currentPage - 1) * this.currentPerPage + index + 1;
    },
    getRowStyleClass: function getRowStyleClass(row) {
      var classes = '';
      if (this.hasRowClickListener) classes += 'clickable';
      var rowStyleClasses;
      if (typeof this.rowStyleClass === 'function') {
        rowStyleClasses = this.rowStyleClass(row);
      } else {
        rowStyleClasses = this.rowStyleClass;
      }
      if (rowStyleClasses) {
        classes += " ".concat(rowStyleClasses);
      }
      return classes;
    },
    handleGrouped: function handleGrouped(originalRows) {
      var _this10 = this;
      originalRows.forEach(function (headerRow, i) {
        headerRow.vgt_header_id = i;
        if (_this10.groupOptions.maintainExpanded && _this10.expandedRowKeys.has(headerRow[_this10.groupOptions.rowKey])) {
          _this10.$set(headerRow, 'vgtIsExpanded', true);
        }
        headerRow.children.forEach(function (childRow) {
          childRow.vgt_id = i;
        });
      });
      return originalRows;
    },
    initializePagination: function initializePagination() {
      var _this11 = this;
      var _this$paginationOptio = this.paginationOptions,
        enabled = _this$paginationOptio.enabled,
        perPage = _this$paginationOptio.perPage,
        position = _this$paginationOptio.position,
        perPageDropdown = _this$paginationOptio.perPageDropdown,
        perPageDropdownEnabled = _this$paginationOptio.perPageDropdownEnabled,
        dropdownAllowAll = _this$paginationOptio.dropdownAllowAll,
        firstLabel = _this$paginationOptio.firstLabel,
        lastLabel = _this$paginationOptio.lastLabel,
        nextLabel = _this$paginationOptio.nextLabel,
        prevLabel = _this$paginationOptio.prevLabel,
        rowsPerPageLabel = _this$paginationOptio.rowsPerPageLabel,
        ofLabel = _this$paginationOptio.ofLabel,
        pageLabel = _this$paginationOptio.pageLabel,
        allLabel = _this$paginationOptio.allLabel,
        setCurrentPage = _this$paginationOptio.setCurrentPage,
        mode = _this$paginationOptio.mode,
        infoFn = _this$paginationOptio.infoFn;
      if (typeof enabled === 'boolean') {
        this.paginate = enabled;
      }
      if (typeof perPage === 'number') {
        this.perPage = perPage;
      }
      if (position === 'top') {
        this.paginateOnTop = true; // default is false
        this.paginateOnBottom = false; // default is true
      } else if (position === 'both') {
        this.paginateOnTop = true;
        this.paginateOnBottom = true;
      }
      if (Array.isArray(perPageDropdown) && perPageDropdown.length) {
        this.customRowsPerPageDropdown = perPageDropdown;
        if (!this.perPage) {
          var _perPageDropdown = _slicedToArray(perPageDropdown, 1);
          this.perPage = _perPageDropdown[0];
        }
      }
      if (typeof perPageDropdownEnabled === 'boolean') {
        this.perPageDropdownEnabled = perPageDropdownEnabled;
      }
      if (typeof dropdownAllowAll === 'boolean') {
        this.paginateDropdownAllowAll = dropdownAllowAll;
      }
      if (typeof mode === 'string') {
        this.paginationMode = mode;
      }
      if (typeof firstLabel === 'string') {
        this.firstText = firstLabel;
      }
      if (typeof lastLabel === 'string') {
        this.lastText = lastLabel;
      }
      if (typeof nextLabel === 'string') {
        this.nextText = nextLabel;
      }
      if (typeof prevLabel === 'string') {
        this.prevText = prevLabel;
      }
      if (typeof rowsPerPageLabel === 'string') {
        this.rowsPerPageText = rowsPerPageLabel;
      }
      if (typeof ofLabel === 'string') {
        this.ofText = ofLabel;
      }
      if (typeof pageLabel === 'string') {
        this.pageText = pageLabel;
      }
      if (typeof allLabel === 'string') {
        this.allText = allLabel;
      }
      if (typeof setCurrentPage === 'number') {
        setTimeout(function () {
          _this11.changePage(setCurrentPage);
        }, 500);
      }
      if (typeof infoFn === 'function') {
        this.paginationInfoFn = infoFn;
      }
    },
    initializeSearch: function initializeSearch() {
      var _this$searchOptions = this.searchOptions,
        enabled = _this$searchOptions.enabled,
        trigger = _this$searchOptions.trigger,
        externalQuery = _this$searchOptions.externalQuery,
        searchFn = _this$searchOptions.searchFn,
        placeholder = _this$searchOptions.placeholder,
        skipDiacritics = _this$searchOptions.skipDiacritics;
      if (typeof enabled === 'boolean') {
        this.searchEnabled = enabled;
      }
      if (trigger === 'enter') {
        this.searchTrigger = trigger;
      }
      if (typeof externalQuery === 'string') {
        this.externalSearchQuery = externalQuery;
      }
      if (typeof searchFn === 'function') {
        this.searchFn = searchFn;
      }
      if (typeof placeholder === 'string') {
        this.searchPlaceholder = placeholder;
      }
      if (typeof skipDiacritics === 'boolean') {
        this.searchSkipDiacritics = skipDiacritics;
      }
    },
    initializeSort: function initializeSort() {
      var _this$sortOptions = this.sortOptions,
        enabled = _this$sortOptions.enabled,
        initialSortBy = _this$sortOptions.initialSortBy,
        multipleColumns = _this$sortOptions.multipleColumns;
      var initSortBy = flat(initialSortBy || {});
      if (typeof enabled === 'boolean') {
        this.sortable = enabled;
      }
      if (typeof multipleColumns === 'boolean') {
        this.multipleColumnSort = multipleColumns;
      }

      //* initialSortBy can be an array or an object
      if (_typeof(initSortBy) === 'object') {
        var ref = this.fixedHeader ? this.$refs['table-header-secondary'] : this.$refs['table-header-primary'];
        if (Array.isArray(initSortBy)) {
          ref.setInitialSort(initSortBy);
        } else {
          var hasField = Object.prototype.hasOwnProperty.call(initSortBy, 'field');
          if (hasField) ref.setInitialSort([initSortBy]);
        }
      }
    },
    initializeSelect: function initializeSelect() {
      var _this$selectOptions = this.selectOptions,
        enabled = _this$selectOptions.enabled,
        selectionInfoClass = _this$selectOptions.selectionInfoClass,
        selectionText = _this$selectOptions.selectionText,
        clearSelectionText = _this$selectOptions.clearSelectionText,
        selectOnCheckboxOnly = _this$selectOptions.selectOnCheckboxOnly,
        selectAllByPage = _this$selectOptions.selectAllByPage,
        disableSelectInfo = _this$selectOptions.disableSelectInfo,
        selectAllByGroup = _this$selectOptions.selectAllByGroup;
      if (typeof enabled === 'boolean') {
        this.selectable = enabled;
      }
      if (typeof selectOnCheckboxOnly === 'boolean') {
        this.selectOnCheckboxOnly = selectOnCheckboxOnly;
      }
      if (typeof selectAllByPage === 'boolean') {
        this.selectAllByPage = selectAllByPage;
      }
      if (typeof selectAllByGroup === 'boolean') {
        this.selectAllByGroup = selectAllByGroup;
      }
      if (typeof disableSelectInfo === 'boolean') {
        this.disableSelectInfo = disableSelectInfo;
      }
      if (typeof selectionInfoClass === 'string') {
        this.selectionInfoClass = selectionInfoClass;
      }
      if (typeof selectionText === 'string') {
        this.selectionText = selectionText;
      }
      if (typeof clearSelectionText === 'string') {
        this.clearSelectionText = clearSelectionText;
      }
    },
    calculateTopSize: function calculateTopSize() {
      var _this12 = this;
      this.$nextTick(function () {
        var heads = _this12.$el.querySelectorAll('thead');
        if (!heads[1]) return;
        heads[1].style.height = "".concat(heads[0].offsetHeight, "px");
      });
    }
  },
  mounted: function mounted() {
    var _this13 = this;
    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }
    var fHeight = function fHeight() {
      var _this13$$refs$scrolle, _this13$$refs$scrolle2, _this13$$refs$fixedHe;
      _this13.scrollTop = ((_this13$$refs$scrolle = _this13.$refs.scroller) === null || _this13$$refs$scrolle === void 0 ? void 0 : _this13$$refs$scrolle.scrollTop) || 0;
      _this13.scrollHeight = ((_this13$$refs$scrolle2 = _this13.$refs.scroller) === null || _this13$$refs$scrolle2 === void 0 ? void 0 : _this13$$refs$scrolle2.offsetHeight) - ((_this13$$refs$fixedHe = _this13.$refs.fixedHeader) === null || _this13$$refs$fixedHe === void 0 ? void 0 : _this13$$refs$fixedHe.offsetHeight) || 60;
    };
    this.$refs.scroller.addEventListener('scroll', fHeight);
    this.ro = new ResizeObserver(fHeight);
    this.ro.observe(this.$refs.scroller);
    this.initializeSort();
  },
  components: {
    'vgt-pagination': __vue_component__$5,
    'vgt-global-search': __vue_component__$4,
    'vgt-header-row': __vue_component__$1,
    'vgt-table-header': __vue_component__$2
  }
};

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    "class": _vm.wrapStyleClasses
  }, [_vm.isLoading ? _c('div', {
    staticClass: "vgt-loading vgt-center-align"
  }, [_vm._t("loadingContent", function () {
    return [_c('span', {
      staticClass: "vgt-loading__content"
    }, [_vm._v("\n        Loading...\n      ")])];
  })], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vgt-inner-wrap",
    "class": {
      'is-loading': _vm.isLoading
    }
  }, [_vm.paginate && _vm.paginateOnTop ? _vm._t("pagination-top", function () {
    return [_c('vgt-pagination', {
      ref: "paginationTop",
      attrs: {
        "perPage": _vm.perPage,
        "rtl": _vm.rtl,
        "total": _vm.totalRows || _vm.totalRowCount,
        "mode": _vm.paginationMode,
        "jumpFirstOrLast": _vm.paginationOptions.jumpFirstOrLast,
        "firstText": _vm.firstText,
        "lastText": _vm.lastText,
        "nextText": _vm.nextText,
        "prevText": _vm.prevText,
        "rowsPerPageText": _vm.rowsPerPageText,
        "perPageDropdownEnabled": _vm.paginationOptions.perPageDropdownEnabled,
        "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown,
        "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText,
        "allText": _vm.allText,
        "info-fn": _vm.paginationInfoFn
      },
      on: {
        "page-changed": _vm.pageChanged,
        "per-page-changed": _vm.perPageChanged
      }
    })];
  }, {
    "pageChanged": _vm.pageChanged,
    "perPageChanged": _vm.perPageChanged,
    "total": _vm.totalRows || _vm.totalRowCount
  }) : _vm._e(), _vm._v(" "), _c('vgt-global-search', {
    attrs: {
      "search-enabled": _vm.searchEnabled && _vm.externalSearchQuery == null,
      "global-search-placeholder": _vm.searchPlaceholder
    },
    on: {
      "on-keyup": _vm.searchTableOnKeyUp,
      "on-enter": _vm.searchTableOnEnter
    },
    model: {
      value: _vm.globalSearchTerm,
      callback: function callback($$v) {
        _vm.globalSearchTerm = $$v;
      },
      expression: "globalSearchTerm"
    }
  }, [_c('template', {
    slot: "internal-table-actions"
  }, [_vm._t("table-actions")], 2)], 2), _vm._v(" "), _vm.selectedRowCount && !_vm.disableSelectInfo ? _c('div', {
    staticClass: "vgt-selection-info-row clearfix",
    "class": _vm.selectionInfoClass
  }, [_vm._v("\n      " + _vm._s(_vm.selectionInfo) + "\n      "), _c('a', {
    attrs: {
      "href": ""
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.unselectAllInternal(true);
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.clearSelectionText) + "\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "vgt-selection-info-row__actions vgt-pull-right"
  }, [_vm._t("selected-row-actions")], 2)]) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "fixedHeader",
    staticClass: "vgt-fixed-header"
  }, [_vm.fixedHeader ? _c('table', {
    "class": _vm.tableStyleClasses,
    staticStyle: {
      "table-layout": "fixed"
    },
    attrs: {
      "id": "vgt-table"
    }
  }, [_c('colgroup', _vm._l(_vm.columns, function (column, index) {
    return _c('col', {
      key: index,
      attrs: {
        "id": "col-" + index
      }
    });
  }), 0), _vm._v(" "), _c("vgt-table-header", {
    ref: "table-header-secondary",
    tag: "thead",
    attrs: {
      "columns": _vm.columns,
      "line-numbers": _vm.lineNumbers,
      "selectable": _vm.selectable,
      "all-selected": _vm.allSelected,
      "all-selected-indeterminate": _vm.allSelectedIndeterminate,
      "mode": _vm.mode,
      "sortable": _vm.sortable,
      "multiple-column-sort": _vm.multipleColumnSort,
      "typed-columns": _vm.typedColumns,
      "getClasses": _vm.getClasses,
      "searchEnabled": _vm.searchEnabled,
      "paginated": _vm.paginated,
      "table-ref": _vm.$refs.table
    },
    on: {
      "on-toggle-select-all": _vm.toggleSelectAll,
      "on-sort-change": _vm.changeSort,
      "filter-changed": _vm.filterRows
    },
    scopedSlots: _vm._u([{
      key: "table-column",
      fn: function fn(props) {
        return [_vm._t("table-column", function () {
          return [_c('span', [_vm._v(_vm._s(props.column.label))])];
        }, {
          "column": props.column
        })];
      }
    }, {
      key: "column-filter",
      fn: function fn(props) {
        return [_vm._t("column-filter", null, {
          "column": props.column,
          "updateFilters": props.updateFilters
        })];
      }
    }], null, true)
  })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    ref: "scroller",
    "class": {
      'vgt-responsive': _vm.responsive
    },
    style: _vm.wrapperStyles
  }, [_c('table', {
    ref: "table",
    "class": _vm.tableStyles,
    style: {
      'transform': _vm.virtualPaginationOptions.enabled ? 'translate(0,' + _vm.paginated2ScrollTop + 'px)' : 'unset'
    },
    attrs: {
      "id": "vgt-table"
    }
  }, [_c('colgroup', _vm._l(_vm.columns, function (column, index) {
    return _c('col', {
      key: index,
      attrs: {
        "id": "col-" + index
      }
    });
  }), 0), _vm._v(" "), _c("vgt-table-header", {
    ref: "table-header-primary",
    tag: "thead",
    attrs: {
      "columns": _vm.columns,
      "line-numbers": _vm.lineNumbers,
      "selectable": _vm.selectable,
      "all-selected": _vm.allSelected,
      "all-selected-indeterminate": _vm.allSelectedIndeterminate,
      "mode": _vm.mode,
      "sortable": _vm.sortable,
      "multiple-column-sort": _vm.multipleColumnSort,
      "typed-columns": _vm.typedColumns,
      "getClasses": _vm.getClasses,
      "searchEnabled": _vm.searchEnabled
    },
    on: {
      "on-toggle-select-all": _vm.toggleSelectAll,
      "on-sort-change": _vm.changeSort,
      "filter-changed": _vm.filterRows
    },
    scopedSlots: _vm._u([{
      key: "table-column",
      fn: function fn(props) {
        return [_vm._t("table-column", function () {
          return [_c('span', [_vm._v(_vm._s(props.column.label))])];
        }, {
          "column": props.column
        })];
      }
    }, {
      key: "column-filter",
      fn: function fn(props) {
        return [!_vm.fixedHeader ? _vm._t("column-filter", null, {
          "column": props.column,
          "updateFilters": props.updateFilters
        }) : _c('span')];
      }
    }], null, true)
  }), _vm._v(" "), _vm._l(_vm.paginated2, function (headerRow, hIndex) {
    return _c('tbody', {
      key: hIndex
    }, [_vm.groupHeaderOnTop ? _c('vgt-header-row', {
      "class": _vm.getRowStyleClass(headerRow),
      attrs: {
        "header-row": headerRow,
        "columns": _vm.columns,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "select-all-by-group": _vm.selectAllByGroup,
        "collapsable": _vm.groupOptions.collapsable,
        "collect-formatted": _vm.collectFormatted,
        "formatted-row": _vm.formattedRow,
        "get-classes": _vm.getClasses,
        "full-colspan": _vm.fullColspan,
        "groupIndex": hIndex
      },
      on: {
        "vgtExpand": function vgtExpand($event) {
          return _vm.toggleExpand(headerRow[_vm.rowKeyField]);
        },
        "on-select-group-change": function onSelectGroupChange($event) {
          return _vm.toggleSelectGroup($event, headerRow);
        }
      },
      scopedSlots: _vm._u([{
        key: "table-header-row",
        fn: function fn(props) {
          return _vm.hasHeaderRowTemplate ? [_vm._t("table-header-row", null, {
            "column": props.column,
            "formattedRow": props.formattedRow,
            "row": props.row
          })] : undefined;
        }
      }], null, true)
    }) : _vm._e(), _vm._v(" "), _vm._l(headerRow.children, function (row, index) {
      return (_vm.groupOptions.collapsable ? headerRow.vgtIsExpanded : true) ? _c('tr', {
        key: row.originalIndex,
        "class": _vm.getRowStyleClass(row),
        on: {
          "mouseenter": function mouseenter($event) {
            return _vm.onMouseenter(row, index);
          },
          "mouseleave": function mouseleave($event) {
            return _vm.onMouseleave(row, index);
          },
          "dblclick": function dblclick($event) {
            return _vm.onRowDoubleClicked(row, index, $event);
          },
          "click": function click($event) {
            return _vm.onRowClicked(row, index, $event);
          },
          "auxclick": function auxclick($event) {
            return _vm.onRowAuxClicked(row, index, $event);
          }
        }
      }, [_vm.lineNumbers ? _c('th', {
        staticClass: "line-numbers"
      }, [_vm._v("\n              " + _vm._s(_vm.getCurrentIndex(row.originalIndex)) + "\n            ")]) : _vm._e(), _vm._v(" "), _vm.selectable ? _c('th', {
        staticClass: "vgt-checkbox-col",
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.onCheckboxClicked(row, index, $event);
          }
        }
      }, [_c('input', {
        attrs: {
          "type": "checkbox",
          "disabled": row.vgtDisabled
        },
        domProps: {
          "checked": row.vgtSelected
        }
      })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, i) {
        return !column.hidden && column.field ? _c('td', {
          key: i,
          "class": _vm.getClasses(i, 'td', row),
          attrs: {
            "data-label": _vm.compactMode ? column.label : undefined
          },
          on: {
            "click": function click($event) {
              return _vm.onCellClicked(row, column, index, $event);
            }
          }
        }, [_vm._t("table-row", function () {
          return [!column.html ? _c('span', [_vm._v("\n                  " + _vm._s(_vm.collectFormatted(row, column)) + "\n                ")]) : _c('span', {
            domProps: {
              "innerHTML": _vm._s(_vm.collect(row, column.field))
            }
          })];
        }, {
          "row": row,
          "column": column,
          "formattedRow": _vm.formattedRow(row),
          "index": index
        })], 2) : _vm._e();
      })], 2) : _vm._e();
    }), _vm._v(" "), _vm.groupHeaderOnBottom ? _c('vgt-header-row', {
      attrs: {
        "header-row": headerRow,
        "columns": _vm.columns,
        "line-numbers": _vm.lineNumbers,
        "selectable": _vm.selectable,
        "select-all-by-group": _vm.selectAllByGroup,
        "collect-formatted": _vm.collectFormatted,
        "formatted-row": _vm.formattedRow,
        "get-classes": _vm.getClasses,
        "full-colspan": _vm.fullColspan,
        "groupIndex": _vm.index
      },
      on: {
        "on-select-group-change": function onSelectGroupChange($event) {
          return _vm.toggleSelectGroup($event, headerRow);
        }
      },
      scopedSlots: _vm._u([{
        key: "table-header-row",
        fn: function fn(props) {
          return _vm.hasHeaderRowTemplate ? [_vm._t("table-header-row", null, {
            "column": props.column,
            "formattedRow": props.formattedRow,
            "row": props.row
          })] : undefined;
        }
      }], null, true)
    }) : _vm._e()], 2);
  }), _vm._v(" "), _vm.showEmptySlot ? _c('tbody', [_c('tr', [_c('td', {
    attrs: {
      "colspan": _vm.fullColspan
    }
  }, [_vm._t("emptystate", function () {
    return [_c('div', {
      staticClass: "vgt-center-align vgt-text-disabled"
    }, [_vm._v("\n                  No data for table\n                ")])];
  })], 2)])]) : _vm._e()], 2), _vm._v(" "), _vm.virtualPaginationOptions.enabled ? _c('div', {
    style: {
      height: _vm.paginated2ScrollHeight + 'px',
      'background-color': 'red'
    }
  }) : _vm._e()]), _vm._v(" "), _vm.hasFooterSlot ? _c('div', {
    staticClass: "vgt-wrap__actions-footer"
  }, [_vm._t("table-actions-bottom")], 2) : _vm._e(), _vm._v(" "), _vm.paginate && _vm.paginateOnBottom ? _vm._t("pagination-bottom", function () {
    return [_c('vgt-pagination', {
      ref: "paginationBottom",
      attrs: {
        "perPage": _vm.perPage,
        "rtl": _vm.rtl,
        "total": _vm.totalRows || _vm.totalRowCount,
        "mode": _vm.paginationMode,
        "jumpFirstOrLast": _vm.paginationOptions.jumpFirstOrLast,
        "firstText": _vm.firstText,
        "lastText": _vm.lastText,
        "nextText": _vm.nextText,
        "prevText": _vm.prevText,
        "rowsPerPageText": _vm.rowsPerPageText,
        "perPageDropdownEnabled": _vm.paginationOptions.perPageDropdownEnabled,
        "customRowsPerPageDropdown": _vm.customRowsPerPageDropdown,
        "paginateDropdownAllowAll": _vm.paginateDropdownAllowAll,
        "ofText": _vm.ofText,
        "pageText": _vm.pageText,
        "allText": _vm.allText,
        "info-fn": _vm.paginationInfoFn
      },
      on: {
        "page-changed": _vm.pageChanged,
        "per-page-changed": _vm.perPageChanged
      }
    })];
  }, {
    "pageChanged": _vm.pageChanged,
    "perPageChanged": _vm.perPageChanged,
    "total": _vm.totalRows || _vm.totalRowCount
  }) : _vm._e()], 2)]);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var VueGoodTablePlugin = {
  install: function install(Vue, options) {
    Vue.component(__vue_component__.name, __vue_component__);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueGoodTablePlugin);
}

export { __vue_component__ as VueGoodTable, VueGoodTablePlugin as default };
