(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{191:function(e,t,n){},203:function(e,t,n){"use strict";var o=n(191);n.n(o).a},224:function(e,t,n){"use strict";n.r(t);var o={name:"checkbox-table",props:[],data:function(){return{columns:[{label:"Name",field:"name"},{label:"Age",field:"age",type:"number"},{label:"Created On",field:"createdAt",type:"date",dateInputFormat:"YYYY-MM-DD",dateOutputFormat:"MMM Do YY"},{label:"Percent",field:"score",type:"percentage"}],rows:[{id:1,name:"John",age:20,createdAt:"201-10-31:9: 35 am",score:.03343},{id:2,name:"Jane",age:24,createdAt:"2011-10-31",score:.03343},{id:3,name:"Susan",age:16,createdAt:"2011-10-30",score:.03343}]}},computed:{},methods:{selectAll:function(e){console.log(e)},toggleSelectRow:function(e){console.log(e)}},mounted:function(){},components:{}},l=(n(203),n(0)),a=Object(l.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("vue-good-table",{attrs:{columns:this.columns,rows:this.rows,"select-options":{enabled:!0},"search-options":{enabled:!0}},on:{"on-select-all":this.selectAll,"on-row-click":this.toggleSelectRow}})],1)},[],!1,null,null,null);t.default=a.exports}}]);