# Pagination Options

A set of options that are related to table pagination. Each of these are optional and reasonable defaults will be used if you leave off the property.

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 5,
    position: 'top',
    perPageDropdown: [3, 7, 9],
    dropdownAllowAll: false,
    setCurrentPage: 2,
    nextLabel: 'next',
    prevLabel: 'prev',
    rowsPerPageLabel: 'Rows per page',
    ofLabel: 'of',
    pageLabel: 'page', // for 'pages' mode
    allLabel: 'All',
  }">
</vue-good-table>
```

## enabled

type: `Boolean (default: false)`

Enable Pagination for table. By default the paginator is created at the bottom of the table.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true
  }">
</vue-good-table>
```

## mode

type: `String (default: 'records')`

You can render pagination controls in two modes - 'records' and 'pages'. Below, you'll find examples of both. 

::: tip 
For tables that may have many pages, 'pages' mode offers the ability to jump to any valid page. 
:::

### records mode (default)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    mode: 'records'
  }">
</vue-good-table>
```
<pagination-table
  :options="{
    enabled: true,
    mode: 'records',
    perPage: 2,
  }" />

### pages mode
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    mode: 'pages'
  }">
</vue-good-table>
```
<pagination-table
  :options="{
    enabled: true,
    mode: 'pages',
    perPage: 2,
  }" />

## position

type: `String (default: 'bottom')`

Add pagination on 'top' or 'bottom' (top and bottom) of the table (default position is bottom)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    position: 'top'
  }">
</vue-good-table>
```

## perPage

type: `Integer (default: 10)`

Number of rows to show per page
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    perPage: 5
  }">
</vue-good-table>
```
## perPageDropdownEnabled

type: `Boolean (default: true)`

Show or hide the per page dropdown
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    perPageDropdownEnabled: false,
  }">
</vue-good-table>
```

## perPageDropdown

type: `Array (default: [10,20,30,40,50])`

Customize the dropdown options for the amount of items per page
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    perPageDropdown: [3, 7, 9]
  }">
</vue-good-table>
```

## dropdownAllowAll

type: `Boolean (default: true)`

enables/disables 'All' in the per page dropdown.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    perPageDropdown: [3, 7, 9],
    dropdownAllowAll: false,
  }">
</vue-good-table>
```

## setCurrentPage

type: `Number`

set current page programmatically. 
::: warning
There's no validation for number of pages so please be careful using this.
:::

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    setCurrentPage: 2,
  }">
</vue-good-table>
```

## pagination label/text options
you can change one or more of the texts shown on pagination by overriding the labels in the following way: 
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{
    enabled: true,
    nextLabel: 'next',
    prevLabel: 'prev',
    rowsPerPageLabel: 'Rows per page',
    ofLabel: 'of',
    pageLabel: 'page', // for 'pages' mode
    allLabel: 'All',
  }">
</vue-good-table>
```

## Replace Pagination Component

you can also replace the pagination component with your own component - [Custom Pagination](/guide/advanced/#custom-pagination)