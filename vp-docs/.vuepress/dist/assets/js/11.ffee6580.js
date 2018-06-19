(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{189:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("To create grouped rows, you need two things.")]),t._m(1),t._m(2),t._m(3),t._m(4),a("grouped-table",{attrs:{options:{enabled:!0}}}),t._m(5),t._m(6),t._m(7),t._m(8),a("grouped-table",{attrs:{options:{enabled:!0,headerPosition:"bottom"}}}),t._m(9),t._m(10),t._m(11)],1)},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"grouped-table"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#grouped-table","aria-hidden":"true"}},[this._v("#")]),this._v(" Grouped Table")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_1-add-groupoptions-to-table-component"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-add-groupoptions-to-table-component","aria-hidden":"true"}},[this._v("#")]),this._v(" 1. Add groupOptions to table component")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("vue-good-table")]),t._v("\n  "),a("span",{attrs:{class:"token attr-name"}},[t._v(":columns")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("columns"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{attrs:{class:"token attr-name"}},[t._v(":rows")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("rows"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{attrs:{class:"token attr-name"}},[t._v(":groupOptions")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n  \tenabled: true\n  }"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("vue-good-table")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_2-make-sure-the-rows-are-formatted-correctly-grouped-rows-need-to-be-nested-with-headers-rows-containing-rows-in-their-children-property-for-example"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-make-sure-the-rows-are-formatted-correctly-grouped-rows-need-to-be-nested-with-headers-rows-containing-rows-in-their-children-property-for-example","aria-hidden":"true"}},[this._v("#")]),this._v(" 2. Make sure the rows are formatted correctly. Grouped rows need to be nested with headers rows containing rows in their children property. For example:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("rows"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  mode"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'span'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// span means this header will span all columns")]),t._v("\n  label"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Header Two'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// this is the label that'll be used for the header")]),t._v("\n  children"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Chris'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("55")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" createdAt"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'2011-10-11'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0.03343")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Dan'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("40")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" createdAt"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'2011-10-21'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0.03343")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_3-sometimes-you-might-want-a-summary-row-instead-of-a-header-row-for-example-if-you-want-to-show-total-score-for-your-group"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-sometimes-you-might-want-a-summary-row-instead-of-a-header-row-for-example-if-you-want-to-show-total-score-for-your-group","aria-hidden":"true"}},[this._v("#")]),this._v(" 3. Sometimes, you might want a summary row instead of a header row. For example, if you want to show total score for your group")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("rows"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Total'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// this is the label that'll be used for the header")]),t._v("\n  age"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" undefined"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  createdAt"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" undefined"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  score"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0.3")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// total score here")]),t._v("\n  children"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Chris'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("55")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" createdAt"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'2011-10-11'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0.03343")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Dan'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("40")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" createdAt"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'2011-10-21'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0.03343")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_4-if-you-want-the-header-summary-row-to-show-up-at-the-bottom-of-the-group-you-can-specify-that-in-the-groupoptions-property-of-the-table"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-if-you-want-the-header-summary-row-to-show-up-at-the-bottom-of-the-group-you-can-specify-that-in-the-groupoptions-property-of-the-table","aria-hidden":"true"}},[this._v("#")]),this._v(" 4. If you want the header/summary row to show up at the bottom of the group, you can specify that in the groupOptions property of the table.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("vue-good-table")]),t._v("\n  "),a("span",{attrs:{class:"token attr-name"}},[t._v(":columns")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("columns"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{attrs:{class:"token attr-name"}},[t._v(":rows")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("rows"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{attrs:{class:"token attr-name"}},[t._v(":groupOptions")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n  \tenabled: true,\n    headerPosition: "),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("bottom"),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(",\n  }"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("vue-good-table")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_5-what-if-you-wanted-to-add-a-total-count-in-summary-rows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-what-if-you-wanted-to-add-a-total-count-in-summary-rows","aria-hidden":"true"}},[this._v("#")]),this._v(" 5. What if you wanted to add a total count in summary rows?")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("In your column definition add a property, "),s("code",[this._v("headerField")]),this._v(". This is just like "),s("code",[this._v("field")]),this._v(" property but for summary/header rows only. So lets say we wanted to add a "),s("strong",[this._v("sum function")]),this._v(" to this field.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// in columns")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  label"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'Count'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  field"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'count'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  headerField"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sumCount"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  type"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'number'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// in methods we define sumCount")]),t._v("\nmethods"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token function"}},[t._v("sumCount")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rowObj"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rowObj"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" sum "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" rowObj"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{attrs:{class:"token operator"}},[t._v("++")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      sum "),a("span",{attrs:{class:"token operator"}},[t._v("+=")]),t._v(" rowObj"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("count"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" sum"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n")])])])}],!1,null,null,null);s.default=e.exports}}]);