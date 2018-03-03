# Vue-good-table

[![npm](https://img.shields.io/npm/dm/vue-good-table.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-good-table)
[![npm](https://img.shields.io/github/package-json/v/xaksis/vue-good-table.svg?style=for-the-badge)](https://github.com/xaksis/vue-good-table/releases)
[![npm](https://img.shields.io/github/license/xaksis/vue-good-table.svg?style=for-the-badge)](https://github.com/xaksis/vue-good-table/blob/master/LICENSE)

A simple, clean data table for VueJS (2.x) with essential features like sorting, column filtering, pagination etc

![Basic Screenshot](README/images/vgt-table.png)

## Live Demo

[vue-good-table Demo Site](https://xaksis.github.io/vue-good-demos/#/simple-table)

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting Started](#getting-started)
  - [Installing](#installing)
  - [Example Usage](#example-usage)
- [Configuration](#configuration)
  - [Component Options](#component-options)
    - [Table](#table)
    - [Sort](#sort)
    - [Pagination](#pagination)
    - [Search](#search)
    - [Style/Theme](#styletheme)
    - [Text](#text)
  - [Column Options](#column-options)
    - [Column filter options](#column-filter-options)
  - [Style Options](#style-options)
    - [.vgt-table](#vgt-table)
    - [.vgt-table .stripped](#vgt-table-stripped)
    - [.vgt-table .condensed](#vgt-table-condensed)
- [Theme](#theme)
  - [default](#default)
  - [nocturnal `theme='nocturnal'`](#nocturnal-themenocturnal)
- [Advanced Customization](#advanced-customization)
  - [Custom row template](#custom-row-template)
  - [Additional columns before or after](#additional-columns-before-or-after)
  - [Custom column headers](#custom-column-headers)
  - [Empty state slot](#empty-state-slot)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

### Installing

Install with npm:
```
npm install --save vue-good-table@alpha
```

Import into project:
```
import Vue from 'vue';

import VueGoodTable from 'vue-good-table';
// import the styles 
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTable);
```

### Example Usage
```html
<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :paginate="true"/>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          html: false,
          filterable: true,
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          inputFormat: 'YYYYMMDD',
          outputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
          html: false,
        },
      ],
      rows: [
        {id:1, name:"John",age:20,createdAt: '201-10-31:9:35 am',score: 0.03343},
        {id:2, name:"Jane",age:24,createdAt: '2011-10-31',score: 0.03343},
        {id:3, name:"Susan",age:16,createdAt: '2011-10-30',score: 0.03343},
        {id:4, name:"Chris",age:55,createdAt: '2011-10-11',score: 0.03343},
        {id:5, name:"Dan",age:40,createdAt: '2011-10-21',score: 0.03343},
        {id:6, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
        {id:7, name:"Jane",age:24,createdAt: '20111031'},
        {id:8, name:"Susan",age:16,createdAt: '2013-10-31',score: 0.03343},
        {id:9, name:"Chris",age:55,createdAt: '2012-10-31',score: 0.03343},
        {id:10, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
        {id:11, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
        {id:12, name:"Jane",age:24,createdAt: '2011-07-31',score: 0.03343},
        {id:13, name:"Susan",age:16,createdAt: '2017-02-28',score: 0.03343},
        {id:14, name:"Chris",age:55,createdAt: '',score: 0.03343},
        {id:15, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
        {id:19, name:"Chris",age:55,createdAt: '2011-10-31',score: 0.03343},
        {id:20, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
      ],
    };
  },
};
</script>
```
This should result in the screenshot seen above

## Configuration
### Component Options
#### Table
  <div class="option">
    <div class="option__name">
      <strong>columns</strong> <i class="tag">Array of column objects</i>
    </div>
    <div class="option__description">
      <p>Array containing objects that describe table columns</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">[
    {
      label: 'Name',
      field: 'name',
      filterable: true,
    }
    //...
]</code></pre>      
    </div>
  </div>
  <div class="option">
    <div class="option__name">
      <strong>rows</strong> <i class="tag">Array of row objects</i>
    </div>
    <div class="option__description">
      <p>Array containing row objects</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">[
    {
      id:1,
      name:"John",
      age:20
    },
    //...
]</code></pre>      
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>rtl</strong> <i class="tag">Boolean (default: false)</i>
    </div>
    <div class="option__description">
      <p>Enable Right-To-Left layout for the table</p>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>lineNumbers</strong> <i class="tag">Boolean (default: false)</i>
    </div>
    <div class="option__description">
      <p>Show line number for each row</p>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>responsive</strong> <i class="tag">Boolean (default: true)</i>
    </div>
    <div class="option__description">
      <p>Add responsive class to wrapper</p>
    </div>
  </div>

#### Sort
  <div class="option space-top">
    <div class="option__name">
      <strong>sortable</strong> <i class="tag">Boolean (default: true)</i>
    </div>
    <div class="option__description">
      <p>Enable sorting table by clicking on column</p>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>defaultSortBy</strong> <i class="tag">Object</i>
    </div>
    <div class="option__description">
      <p>Allows specifying a default sort for the table on wakeup</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">{
  field: 'name',
  type: 'asc' //asc or desc (default: 'asc')
}</code></pre>      
    </div>
  </div>

#### Pagination
  <div class="option">
    <div class="option__name">
      <strong>paginate</strong> <i class="tag">Boolean</i>
    </div>
    <div class="option__description">
      <p>Enable Pagination for table</p>
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>paginateOnTop</strong> <i class="tag">Boolean</i>
    </div>
    <div class="option__description">
      <p>Add pagination on top of the table (default position is bottom)</p>
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>perPage</strong> <i class="tag">Integer (default: 10)</i>
    </div>
    <div class="option__description">
      <p>Number of rows per page</p>
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>customRowsPerPageDropdown</strong> <i class="tag">Array (default: [10,20,30,40,50])</i>
    </div>
    <div class="option__description">
      <p>Customize the dropdown options for the amount of items per page</p>
    </div>
  </div>

#### Search
  <div class="option space-top">
    <div class="option__name">
      <strong>searchEnabled</strong> <i class="tag">Boolean (default: false)</i>
    </div>
    <div class="option__description">
      <p>Allows a single search input for the whole table *Note: enabling this filter disables column filters*</p>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>searchTrigger</strong> <i class="tag">String (default: '')</i>
    </div>
    <div class="option__description">
      <p>Allows user to specify if they want search to trigger on enter event of the input. By default search happens on the fly</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">searchTrigger='enter'</code></pre>      
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>searchFn</strong> <i class="tag">Function</i>
    </div>
    <div class="option__description">
      <p>Allows you to specify your own search function for the global search</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">&lt;vue-good-table
  :columns="columns"
  :rows="rows"
  :searchEnabled="true"
  :globalSearchFn="searchFn"/&gt;
// in js
methods: {
  searchFn(row, col, cellValue, searchTerm){
    return value === 'my value';
  },
}</code></pre>      
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>searchPlaceholder</strong> <i class="tag">String (default: 'Filter Table')</i>
    </div>
    <div class="option__description">
      <p>Text for global search input place holder</p>
    </div>
    <div class="option__example">   
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>externalSearchQuery</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>Allows global search via your own input field</p>
    </div>
    <div class="option__example">   
<pre v-highlightjs><code class="javascript">&lt;input type=&quot;text&quot; v-model=&quot;searchTerm&quot; /&gt;
&lt;vue-good-table
  :columns=&quot;columns&quot;
  :paginate=&quot;true&quot;
  :externalSearchQuery=&quot;searchTerm&quot;
  :rows=&quot;rows&quot;/&gt;
// and in data
data(){
    return {
      searchTerm: '',
      // rows, columns etc...
    };
}</code></pre> 
    </div>
  </div>

#### Style/Theme
  <div class="option space-top">
    <div class="option__name">
      <strong>styleClass</strong> <i class="tag">String (default: 'vgt-table bordered')</i>
    </div>
    <div class="option__description">
      <p>Allows applying your own classes to table</p>
      <p>other in-built classes: condensed, striped, bordered</p>
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>rowStyleClass</strong> <i class="tag">String or Function</i>
    </div>
    <div class="option__description">
      <p>Allows providing custom styles for rows</p>
    </div>
    <div class="option__example">
it can be a string: 'my-class' or: 
<pre v-highlightjs><code class="javascript">myStyleFn(row){ 
  // if row has something return a specific class 
  if(row.fancy) {
    return 'fancy-class';
  }
  return '';
}</code></pre>      
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>theme</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>Allows using other themes</p>
      <p>in-built theme: 'nocturnal'</p>
    </div>
  </div>

#### Text
  <div class="option space-top">
    <div class="option__name">
      <strong>nextText</strong> <i class="tag">String (default: 'Next')</i>
    </div>
    <div class="option__description">
      <p>Text for pagination 'Next' link</p>
    </div>
    <div class="option__example">   
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>prevText</strong> <i class="tag">String (default: 'Prev')</i>
    </div>
    <div class="option__description">
      <p>Text for pagination 'Prev' link</p>
    </div>
    <div class="option__example"> 
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>rowsPerPageText</strong> <i class="tag">String (default: 'Rows per page')</i>
    </div>
    <div class="option__description">
      <p>Text for pagination 'Rows per page' label</p>
    </div>
    <div class="option__example">   
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>ofText</strong> <i class="tag">String (default: 'of')</i>
    </div>
    <div class="option__description">
      <p>Text for pagination 'x of y' label</p>
    </div>
    <div class="option__example">   
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>allText</strong> <i class="tag">String (default: 'All')</i>
    </div>
    <div class="option__description">
      <p>Text for the last option in the items per page dropdown</p>
    </div>
    <div class="option__example">   
    </div>
  </div>

### Column Options
Each column objects can contain the following configuration options:
  <div class="option space-top">
    <div class="option__name">
      <strong>label</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>Text to put on column header</p>
    </div>
    <div class="option__example">
it can be a string: 'my-class' or: 
<pre v-highlightjs><code class="javascript">{ 
  label: 'name'
}</code></pre>      
    </div>
  </div>
  <div class="option space-top">
    <div class="option__name">
      <strong>field</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>Row object property that this column corresponds to</p>
    </div>
    <div class="option__example">
Can be:
  <ul>
    <li>String <code>eg: 'name'</code> - simple row property name</li>
    <li>String <code>eg: 'location.lat'</code>- nested row property name. lets say if the row had a property 'location' which was an object containing 'lat' and 'lon'
    </li>
    <li>Function - a function that returns a value to be displayed based on the row object
<pre v-highlightjs><code class="javascript">{
  field: fieldFn
}
// in methods
fieldFn(rowObj) {
  // do something with the row object
}</code></pre> 
    </li>
  </ul>
    </div>
  </div>
  
  <div class="option space-top">
    <div class="option__name">
      <strong>type</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>type of column. default: 'text'. This determines the formatting for the column and filter behavior as well</p>
    </div>
    <div class="option__example">
      Possible values:
      <ul>
        <li>number - right aligned</li>
        <li>decimal - right aligned, 2 decimal places</li>
        <li>percentage - expects a decimal like 0.03 and formats it as 3.00%</li>
        <li>date - expects a string representation of date eg <code>'20170530'</code>. You should also specify dateInputFormat and dateOutputForamt</li>
      </ul>    
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>dateInputFormat</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>provide the format to parse date string</p>
    </div>
    <div class="option__example">
      String eg: <code>'YYYYMMDD' //where date strings are '20170530'</code>   
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>dateOutputFormat</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>provide the format for output date</p>
    </div>
    <div class="option__example">
      String eg: <code>'MMM Do YY' //where date will be output like 'May 30th 17'</code>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>sortable</strong> <i class="tag">Boolean</i>
    </div>
    <div class="option__description">
      <p>enable/disable sorting on columns. This property is higher priority than global sortable property</p>
    </div>
    <div class="option__example">
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>sortFn</strong> <i class="tag">Function</i>
    </div>
    <div class="option__description">
      <p>custom sort function. If you want to supply your own sort function you can use this property to supply it.</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">// in data
column: [
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    sortFn: this.sortFn,
  }
  //...
],
// in methods
methods: {
  sortFn(x, y, col) {
    return (x < y ? -1 : (x > y ? 1 : 0));
  }
}</code></pre> 
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>formatFn</strong> <i class="tag">Function</i>
    </div>
    <div class="option__description">
      <p>Allows for custom format of values, <code>function(value)</code>,
      should return the formatted value to display.</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">formatFn: function(value) {
  return '$' + value;
}</code></pre> 
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>html</strong> <i class="tag">Boolean</i>
    </div>
    <div class="option__description">
      <p>indicates whether this column will require html rendering or not</p>
    </div>
    <div class="option__example">
      example: if row had a property 'htmlContent' like <code>htmlContent: '&lt;button&gt;Hello&lt;/button&gt;'</code>, then `html: true` on the column will render a button
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>width</strong> <i class="tag">Number</i>
    </div>
    <div class="option__description">
      <p>provide a width value for this column</p>
    </div>
    <div class="option__example">
<code>width: '50px'</code>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>hidden</strong> <i class="tag">Boolean</i>
    </div>
    <div class="option__description">
      <p>allow hiding a column on table</p>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>thClass</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>provide custom class(es) to the th</p>
    </div>
    <div class="option__example">
      example: <code>thClass: 'custom-th-class'</code>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>tdClass</strong> <i class="tag">String</i>
    </div>
    <div class="option__description">
      <p>provide custom class(es) to the td</p>
    </div>
    <div class="option__example">
      example: <code>tdClass: 'text-center'</code>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>globalSearchDisabled</strong> <i class="tag">Boolean (default: false)</i>
    </div>
    <div class="option__description">
      <p>if true, this column will be ignored by the global search</p>
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>filterOptions</strong> <i class="tag">Object</i>
    </div>
    <div class="option__description">
      <p>A collection of filter specific properties</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">{
  enabled: true, // enable filter for this column
	placeholder: 'Filter This Thing', // placeholder for filter input
	filterValue: 'Jane', // initial populated value for this filter
	filterDropdownItems: [], // dropdown (with selected values) instead of text input
	filterFn: this.columnFilterFn, //custom filter function that 
}</code></pre> 
    </div>
  </div>

#### Column filter options
  <div class="option space-top">
    <div class="option__name">
      <strong>filterDropdownItems</strong> <i class="tag">Array of strings or array of objects</i>
    </div>
    <div class="option__description">
      <p>allows creating a dropdown for filter as opposed to an input</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">//array
filterOptions: ['Blue', 'Red', 'Yellow']
//or
filterOptions: [  
  { value: 'n', text: 'Inactive' },  
  { value: 'y', text: 'Active' },  
  { value: 'c', text: 'Check' }  
],
</code></pre> 
    </div>
  </div>

  <div class="option space-top">
    <div class="option__name">
      <strong>filterFn</strong> <i class="tag">Function</i>
    </div>
    <div class="option__description">
      <p>Custom filter, function of two variables: <code>function(data, filterString)</code>, should return true if data matches the filterString, otherwise false.</p>
    </div>
    <div class="option__example">
<pre v-highlightjs><code class="javascript">filterFn: function(data, filterString) {
  var x = parseInt(filterString)
  return data >= x-5 && data <= x+5
}
//would create a filter matching numbers within 5 of the provided value.</code></pre> 
    </div>
  </div>

### Style Options

Vue-good-table allows providing your own css classes for the table via **styleClass** option but it also has in-built classes that you can make use of

#### .vgt-table
![Table Screenshot](README/images/vgt-table.regular.png)

#### .vgt-table .stripped
![Table Bordered Striped Screenshot](README/images/vgt-table.png)

#### .vgt-table .condensed
![Table Bordered Striped Screenshot](README/images/vgt-table.condensed.png)


## Theme
Vue-good-table currently comes in two themes
### default
### nocturnal `theme='nocturnal'`
![Nocturnal Theme Screenshot](README/images/vgt-table.nocturnal.png)

## Advanced Customization

### Custom row template
vue-good-table also supports dynamic td templates where you dictate how to display the cells. Example:
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="table-row" slot-scope="props">
    <td>{{ props.row.name }}</td>
    <td class="fancy">{{ props.row.age }}</td>
    <td>{{ props.formattedRow.date }}</td>
    <td>{{ props.index }}</td>
  </template>
</vue-good-table>
```
**Note:** 
* The original row object can be accessed via `props.row`
* The currently displayed table row index can be accessed via `props.index` . 
* The original row index can be accessed via `props.row.originalIndex`. You can then access the original row object by using `row[props.row.originalIndex]`.
* You can access the formatted row data (for example - formatted date) via `props.formattedRow` 

### Additional columns before or after
If you want the table to do all your rendering and want to add some columns to the beginning or end of the row, you can use additional slots: 
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
    <template slot="table-row-before" slot-scope="props">
      <td>
        <input type="checkbox" />
      </td>
    </template>
    <!-- all the regular row items will be populated here -->
    <template slot="table-row-after" slot-scope="props">
      <td>
        <button @click="doSomething(props.index)">show</button>
      </td>
    </template>
</vue-good-table>
```
**Note**
Make sure you add the columns in the columns array for the additional <code>td</code> that you create.


### Custom column headers
Sometimes you might want to use custom column formatting. You can do that in the following way
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="table-column" slot-scope="props">
     <span v-if="props.column.label =='Name'">
        <i class="fa fa-address-book"></i> {{props.column.label}}
     </span>
     <span v-else>
        {{props.column.label}}
     </span>
  </template>
</vue-good-table>
```

### Empty state slot
You can provide html for empty state slot as well. Example:

```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <div slot="emptystate">
    This will show up when there are no columns
  </div>
</vue-good-table>
```

## Authors

* **Akshay Anand** - *Initial work* - [xaksis](https://github.com/xaksis)
* [Other Contributors](https://github.com/xaksis/vue-good-table/graphs/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

Inspiration taken from
* MicroDroid's [vue-materialize-datatable](https://github.com/MicroDroid/vue-materialize-datatable)
* Bootstrap's [table styles](https://getbootstrap.com/)
