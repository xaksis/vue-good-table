# Column Options

Each column objects can contain the following configuration options:

## label

type `String`

Text to put on column header.

```javascript
columns: [
  { 
    label: 'name'
  },
  // ...
]
```

## field

type `String`

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

## type

type `String`

type of column. default: 'text'. This determines the formatting for the column and filter behavior as well. Possible values:
* _number_ - right aligned
* _decimal_ - right aligned, 2 decimal places
* _percentage_ - expects a decimal like 0.03 and formats it as 3.00%
* _boolean_ - right aligned
* _date_ - expects a string representation of date eg '20170530'. You should also specify [dateInputFormat](#dateinputformat) and [dateOutputFormat](#dateoutputformat)

```javascript
columns: [
  { 
    label: 'joined On',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd', // expects 2018-03-16
    dateOutputFormat: 'MMM do yyyy', // outputs Mar 16th 2018
  },
  // ...
]
```

## dateInputFormat

type `String`

provide the format to parse date string. 

::: tip
Vue-good-table uses date-fns for date parsing. [Check out their formats here](https://date-fns.org/v2.0.0-beta.4/docs/parse).
:::

## dateOutputFormat

type `String`

provide the format for output date

## sortable

type `Boolean`

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

## firstSortType

type `String (default: 'asc')`

controls the first sort type when sorting by the column. If you want the first sort type for this column to be descending, set this property to 'desc'. Possible values:
* _asc_ - the initial sort will be ascending
* _desc_ - the initial sort will be descending 


```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    sortable: true,
    firstSortType: 'desc'
  },
  // ...
]
```

## sortFn

type `Function`


custom sort function. If you want to supply your own sort function you can use this property.

```javascript
// in data
columns: [
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
  sortFn(x, y, col, rowX, rowY) {
    // x - row1 value for column
    // y - row2 value for column
    // col - column being sorted
    // rowX - row object for row1
    // rowY - row object for row2
    return (x < y ? -1 : (x > y ? 1 : 0));
  }
}
```

## formatFn

type `Function`

Allows for custom format of values, <code>function(value)</code>, should return the formatted value to display.

```javascript
// in data
columns: [
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

## html

type `Boolean`

indicates whether this column will require html rendering. 
::: tip 
The preferred way of creating columns that have html is by [using slots](../advanced/#custom-row-template)
:::

```javascript
// in data
columns: [
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

## width

type `Number`

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

## hidden

type `Boolean`

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

## thClass

type `String`

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

## tdClass

type `String` or `Function`

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
or

```javascript
columns: [
  { 
    label: 'name',
    field: 'user_name',
    tdClass: this.tdClassFunc,
  },
  // ...
]
// and later
methods: {
  tdClassFunc(row) {
    if (row.field > 50) {
      return 'red-class';
    }
    return 'green-class';
  },
}
```

## globalSearchDisabled

type `Boolean (default: false)`

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
