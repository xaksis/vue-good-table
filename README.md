# Vue-good-table

[![npm](https://img.shields.io/npm/dm/vue-good-table.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-good-table)
[![npm](https://img.shields.io/github/package-json/v/xaksis/vue-good-table.svg?style=for-the-badge)](https://github.com/xaksis/vue-good-table/releases)
[![npm](https://img.shields.io/github/license/xaksis/vue-good-table.svg?style=for-the-badge)](https://github.com/xaksis/vue-good-table/blob/master/LICENSE)

A simple, clean data table for VueJS (2.x) with essential features like sorting, column filtering, pagination etc

Hey there! coming from 1.x? find the [upgrade guide here](https://github.com/xaksis/vue-good-table/wiki/Guide-to-upgrade-from-1.x-to-v2.0)

![Basic Screenshot](README/images/vgt-table.png)

## Demo

[vue-good-table Recipes](https://github.com/xaksis/vue-good-table/wiki/Vue-good-table-Recipes-(vue-good-table-2.x))

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
    - [Grouped Row Options](#grouped-row-options)
    - [Style/Theme](#styletheme)
    - [Text](#text)
  - [Column Options](#column-options)
    - [Column filter option in-depth](#column-filter-option-in-depth)
  - [Style Options](#style-options)
    - [.vgt-table](#vgt-table)
    - [.vgt-table .stripped](#vgt-table-stripped)
    - [.vgt-table .condensed](#vgt-table-condensed)
- [Theme](#theme)
  - [default](#default)
  - [nocturnal `theme='nocturnal'`](#nocturnal-themenocturnal)
- [Advanced Customization](#advanced-customization)
  - [Custom row template](#custom-row-template)
  - [Custom column headers](#custom-column-headers)
  - [Grouped Rows](#grouped-rows)
  - [Empty state slot](#empty-state-slot)
- [Authors](#authors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

### Installing

Install with npm:
```bash
npm install --save vue-good-table@beta
```

Import into project:
```javascript
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
      :perPage="5"
      :paginate="true"
      styleClass="vgt-table striped bordered"/>
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
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '201-10-31:9: 35 am',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
        { id:7, name:"Jane", age: 24, createdAt: '20111031' },
        { id:8, name:"Susan", age: 16, createdAt: '2013-10-31', score: 0.03343 },
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
These options relate to the table as a whole

##### columns `Array`

Array containing objects that describe table columns. The column object itself can contain many [configurable properties](#column-options).
```javascript
[
    {
      label: 'Name',
      field: 'name',
      filterable: true,
    }
    //...
]
```

##### rows `Array`

Array containing row objects. Each row object contains data that will be displayed in the table row.
```javascript
[
    {
      id:1,
      name:"John",
      age:20
    },
    //...
]
```
> for **grouped rows**, you need a nested format. Refer to [Grouped Rows](#grouped-rows) for an example.

##### rtl `Boolean (default: false)`

Enable Right-To-Left layout for the table
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :rtl="true">
</vue-good-table>
```

##### lineNumbers `Boolean (default: false)`
Show line number for each row
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :lineNumbers="true">
</vue-good-table>
```

#### Sort
---
These options are related to table sorting


##### sortable `Boolean (default: true)`
Enable/disable sorting on table as a whole. 
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :sortable="true">
</vue-good-table>
```

##### defaultSortBy `Object`
Allows specifying a default sort for the table on wakeup
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :defaultSortBy="defaultSort">
</vue-good-table>
```

```javascript
// in data
defaultSort: {
  field: 'name',
  type: 'asc' //asc or desc (default: 'asc')
}
```

#### Pagination
---
Following options are related to table pagination
##### paginate `Boolean`
Enable Pagination for table. By default the paginator is created at the bottom of the table.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :paginate="true">
</vue-good-table>
```

##### paginateOnTop `Boolean`
Add pagination on top of the table (default position is bottom)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :paginate="true"
  :paginateOnTop="true">
</vue-good-table>
```

##### perPage `Integer (default: 10)`
Number of rows to show per page
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :paginate="true"
  :perPage="5">
</vue-good-table>
```

##### customRowsPerPageDropdown `Array (default: [10,20,30,40,50])`
Customize the dropdown options for the amount of items per page
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :paginate="true"
  :customRowsPerPageDropdown="customPerPageDropdown">
</vue-good-table>
```
```javascript
// in data
customPerPageDropdown: [2, 5, 7],
```

#### Search
---
Search related options. These options pertain to the global table search.

##### searchEnabled `Boolean (default: false)`

Allows a single search input for the whole table 

>Note: enabling this option disables column filters
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :searchEnabled="true">
</vue-good-table>
```

##### searchTrigger `String (default: '')`
Allows you to specify if you want search to trigger on 'enter' event of the input. By default table searches on key-up. 

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :searchEnabled="true"
  searchTrigger="enter">
</vue-good-table>
```

##### searchFn `Function`

Allows you to specify your own search function for the global search

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :searchEnabled="true"
  :searchFn="myFunc" />;
```
```javascript
// in js
methods: {
  myFunc(row, col, cellValue, searchTerm){
    return value === 'my value';
  },
}
```

##### searchPlaceholder `String (default: 'Search Table')`
Text for global search input place holder
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :searchEnabled="true"
  searchPlaceholder="Search my awesome table">
</vue-good-table>
```

##### externalSearchQuery `String`

If you want to use your own input for searching the table, you can use this property

```html
<input type="text" v-model="searchTerm" >
<vue-good-table
  :columns="columns"
  :rows="rows"
  :externalSearchQuery="searchTerm">
 ```
 ```javascript
// and in data
data(){
  return {
    searchTerm: '',
    // rows, columns etc...
  };
}
```

#### Grouped Row Options
---
Sometimes you have a hierarchy in table and you want to group rows under subheadings, vue-good-table allows you to do that as well. Following properties relate to row grouping

##### groupOptions `Object`
Object containing group related options. 
```html
<input type="text" v-model="searchTerm" >
<vue-good-table
  :columns="columns"
  :rows="rows"
  :groupOptions="{
    enabled: true,
    headerPosition: 'bottom' 
  }">
 ```
> rows are formatted differently for grouped tables, refer to [Grouped Rows](#grouped-rows) section.

#### Style/Theme
---
Style options for table

##### styleClass `String (default:  'vgt-table bordered')`
Allows applying your own classes to table. Other in-built classes: condensed, striped, bordered
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  styleClass="vgt-table bordered striped">
</vue-good-table>
```

##### rowStyleClass `String or Function`

Allows providing custom styles for rows. It can be a string: 'my-class' or a function.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :rowStyleClass="myStyleFn">
</vue-good-table>
```
```javascript
// in methods
myStyleFn(row){ 
  // if row has something return a specific class 
  if(row.fancy) {
    return 'fancy-class';
  }
  return '';
}
```      

##### theme `String`
Allows using other themes. Currently there is one other theme - 'nocturnal'
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  theme="nocturnal">
</vue-good-table>
```

#### Text
---
text replacement options for all the texts we currently have in the table.

##### nextText `String (default: 'Next')`
Text for pagination 'Next' link

##### prevText `String (default: 'Prev')`
Text for pagination 'Prev' link

##### rowsPerPageText `String (default: 'Rows per page')`
Text for pagination 'Rows per page' label

##### ofText `String (default: 'of')`
Text for pagination 'x of y' label

##### allText `String (default: 'All')`
Text for the last option in the items per page dropdown


### Column Options
---
Each column objects can contain the following configuration options:


##### label `String`
Text to put on column header.

```javascript
columns: [
  { 
    label: 'name'
  },
  // ...
]
```

##### field `String`

Row object property that this column corresponds to. This can be: 

* String <code>eg: 'name'</code> - simple row property name
* String <code>eg: 'location.lat'</code>- nested row property name. lets say if the row had a property 'location' which was an object containing 'lat' and 'lon'
* Function - a function that returns a value to be displayed based on the row object
```javascript
columns: [
  { 
    label: 'name',
    field: this.fealdFn,
  },
  // ...
]
// in methods
fieldFn(rowObj) {
  return rowObj.name;
}
```

##### type `String`

type of column. default: 'text'. This determines the formatting for the column and filter behavior as well. Possible values:
* _number_ - right aligned
* _decimal_ - right aligned, 2 decimal places
* _percentage_ - expects a decimal like 0.03 and formats it as 3.00%
* _date_ - expects a string representation of date eg `'20170530'`. You should also specify [dateInputFormat](#dateinputformat) and [dateOutputFormat](dateoutputformat)

```javascript
columns: [
  { 
    label: 'joined On',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'YYYY-MM-DD', // expects 2018-03-16
    dateOutputFormat: 'MMM Do YYYY', // outputs Mar 16th 2018
  },
  // ...
]
```

##### dateInputFormat `String`
provide the format to parse date string

##### dateOutputFormat `String`
provide the format for output date

##### sortable `Boolean`
enable/disable sorting on columns. This property is higher priority than global sortable property
```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    sortable: false,
  },
  // ...
]
```

##### sortFn `Function`

custom sort function. If you want to supply your own sort function you can use this property.

```javascript
// in data
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
}
```

##### formatFn `Function`
Allows for custom format of values, <code>function(value)</code>, should return the formatted value to display.

```javascript
// in data
column: [
  {
    label: 'Salary',
    field: 'salary',
    sortable: true,
    formatFn: this.formatFn,
  }
  //...
],
// in methods
formatFn: function(value) {
  return '$' + value;
}
```

##### html `Boolean`
indicates whether this column will require html rendering. 
> The preferred way of creating columns that have html is by [using slots](#custom-row-template)
```javascript
// in data
column: [
  {
    label: 'Action',
    field: 'btn',
    html: true,
  }
  //...
],
rows: [
  {
    btn: '<button>My Action</button>',
    // ...
  }
]
```

##### width `Number`
provide a width value for this column

```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    width: '50px',
  },
  // ...
]
```

##### hidden `Boolean`
hide a column
```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    hidden: true,
  },
  // ...
]
```

##### thClass `String`
provide custom class(es) to the table header
```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    thClass: 'custom-th-class',
  },
  // ...
]
```

##### tdClass `String`
provide custom class(es) to the table cells
```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    tdClass: 'text-center',
  },
  // ...
]
```

##### globalSearchDisabled `Boolean (default: false)`
if true, this column will be ignored by the global search
```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    globalSearchDisabled: true,
  },
  // ...
]
```

##### filterOptions `Object`
A collection of filter specific properties. You can find more about these properties in [column filter options section](#column-filter-option-in-depth)

```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    filterOptions: {
  	  enabled: true, // enable filter for this column
	  placeholder: 'Filter This Thing', // placeholder for filter input
	  filterValue: 'Jane', // initial populated value for this filter
	  filterDropdownItems: [], // dropdown (with selected values) instead of text input
	  filterFn: this.columnFilterFn, //custom filter function that 
	},
  },
  // ...
]
```

#### Column filter option in-depth
---
Some filterOption properties need a little more explanation

##### filterDropdownItems `Array of strings or Array of objects`
allows creating a dropdown for filter as opposed to an input

```javascript
//array
filterOptions: ['Blue', 'Red', 'Yellow']
//or
filterOptions: [  
  { value: 'n', text: 'Inactive' },  
  { value: 'y', text: 'Active' },  
  { value: 'c', text: 'Check' }  
],
```

##### filterFn `Function`
Custom filter, function of two variables: <code>function(data, filterString)</code>, should return true if data matches the filterString, otherwise false

```javascript
filterFn: function(data, filterString) {
  var x = parseInt(filterString)
  return data >= x - 5 && data <= x + 5;
}
// would create a filter matching numbers within 5 of the provided value
```

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
    <span v-if="props.column.field == 'age'">
      age: {{props.row.age}}
    </span>
    <span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
  </template>
</vue-good-table>
```
**Note:** 
* The original row object can be accessed via `props.row`
* The currently displayed table row index can be accessed via `props.index` . 
* The original row index can be accessed via `props.row.originalIndex`. You can then access the original row object by using `rows[props.row.originalIndex]`.
* The column object can be accessed via `props.column`
* You can access the formatted row data (for example - formatted date) via `props.formattedRow`

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

### Grouped Rows
To create grouped rows, you need two things. 
1. add groupOptions to table component
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :groupOptions="{
  	enabled: true
  }">
</vue-good-table>
```

2. make sure the rows are formatted correctly. grouped rows need to be nested with headers rows containing rows in their children property. For example: 

```javascript
rows: [{
  mode: 'span', // span means this header will span all columns
  label: 'Header Two', // this is the label that'll be used for the header
  children: [
    { name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
    { name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
  ]
}]
```

3. sometimes, you might want a summary row instead of a header row. for example if you want to show total score for your group

```javascript
rows: [{
  name: 'Total', // this is the label that'll be used for the header
  age: undefined,
  createdAt: undefined,
  score: 0.3, // total score here
  children: [
    { name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
    { name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
  ]
}]
```

4. if you want the header/summary row to show up at the bottom of the group, you can specify that in the groupOptions property of the table.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :groupOptions="{
  	enabled: true,
    headerPosition: 'bottom',
  }">
</vue-good-table>
```

you can check out some live examples on the recipes page: 
[vue-good-table Recipes](https://github.com/xaksis/vue-good-table/wiki/Vue-good-table-Recipes-(vue-good-table-2.x))


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

* [xaksis](https://github.com/xaksis)
* [Other Contributors](https://github.com/xaksis/vue-good-table/graphs/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
