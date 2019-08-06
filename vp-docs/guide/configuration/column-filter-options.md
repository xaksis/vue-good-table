# Column Filter Options

## filterOptions

type `Object`

A collection of filter specific properties within a column object.

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
      filterMultiselectDropdownItems: [], // dropdown (with multiple selected values) instead of text input
      filterFn: this.columnFilterFn, //custom filter function that
      trigger: 'enter', //only trigger on enter not on keyup 
    },
  },
  // ...
]
```

## enabled

type: `Boolean`
Switch to enable column filter.

## placeholder

type: `String`
Placeholder to use on the column filter input.

## filterValue

type: `String`
If you want filter to be pre-populated, use this property

## trigger

type: `String (default: '')`
Allows specifying trigger for column filter. Default trigger is keyup. use 'enter' to filter only when enter key is pressed.

## filterDropdownItems

type `Array of strings or Array of objects`

allows creating a dropdown for filter as opposed to an input

```javascript
//array
filterDropdownItems: ['Blue', 'Red', 'Yellow']
//or
filterDropdownItems: [  
  { value: 'n', text: 'Inactive' },  
  { value: 'y', text: 'Active' },  
  { value: 'c', text: 'Check' }  
],
```

## filterMultiselectDropdownItems

type `Array of strings`

allows creating a dropdown for filtering multiple items as opposed to an input

```javascript
//array
filterMultiselectDropdownItems: ['Blue', 'Red', 'Yellow']
```

## filterFn

type `Function`

Custom filter, function of two variables: <code>function(data, filterString)</code>, should return true if data matches the filterString, otherwise false

```javascript
filterFn: function(data, filterString) {
  var x = parseInt(filterString)
  return data >= x - 5 && data <= x + 5;
}
// would create a filter matching numbers within 5 of the provided value
```