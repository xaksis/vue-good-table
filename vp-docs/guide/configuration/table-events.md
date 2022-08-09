# Table Events

## @on-row-click
event emitted on table row click
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-row-click="onRowClick">
 ```
 ```javascript
 methods: {
   onRowClick(params) {
     // params.row - row object 
     // params.pageIndex - index of this row on the current page.
     // params.selected - if selection is enabled this argument 
     // indicates selected or not
     // params.event - click event
   }
 }
 ```

## @on-row-dblclick
event emitted on table row click
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-row-dblclick="onRowDoubleClick">
 ```
 ```javascript
 methods: {
   onRowDoubleClick(params) {
     // params.row - row object 
     // params.pageIndex - index of this row on the current page.
     // params.selected - if selection is enabled this argument 
     // indicates selected or not
     // params.event - click event
   }
}
```

 ## @on-cell-click
event emitted on table cell click
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-cell-click="onCellClick">
 ```
 ```javascript
 methods: {
   onCellClick(params) {
     // params.row - row object 
     // params.column - column object
     // params.rowIndex - index of this row on the current page.
     // params.event - click event
   }
 }
 ```
 
 ## @on-row-mouseenter
event emitted on row mouseenter
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-row-mouseenter="onRowMouseover">
 ```
 ```javascript
 methods: {
   onRowMouseover(params) {
     // params.row - row object 
     // params.pageIndex - index of this row on the current page.
   }
 }
 ```
 
 ## @on-row-mouseleave
event emitted on table row mouseleave
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-row-mouseleave="onRowMouseleave">
 ```
 ```javascript
 methods: {
   onRowMouseleave(row, pageIndex) {
     // row - row object 
     // pageIndex - index of this row on the current page.
   }
 }
 ```
 
## @on-search
event emitted on global search (when global search is enabled)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-search="onSearch">
 ```
 ```javascript
 methods: {
   onSearch(params) {
     // params.searchTerm - term being searched for
     // params.rowCount - number of rows that match search
   }
 }
 ```
 
## @on-page-change
event emitted on pagination page change (when pagination is enabled)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-page-change="onPageChange">
 ```
 ```javascript
 methods: {
   onPageChange(params) {
     // params.currentPage - current page that pagination is at
     // params.prevPage - previous page
     // params.currentPerPage - number of items per page
     // params.total - total number of items in the table
   }
 }
 ```
 
## @on-per-page-change
event emitted on per page dropdown change (when pagination is enabled)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-per-page-change="onPageChange">
```
```javascript
methods: {
  onPageChange(params) {
    // params.currentPage - current page that pagination is at
    // params.currentPerPage - number of items per page
    // params.total - total number of items in the table
  }
}
```

## @on-sort-change
event emitted on sort change.
::: tip
vue-good-table now supports sorting by multiple columns, so the params
is an array.
:::

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @sort-change="onSortChange">
```
```javascript
methods: {
  onSortChange(params) {
    // params[0].sortType - ascending or descending
    // params[0].columnIndex - index of column being sorted
  }
}
```

 
## @on-column-filter
event emitted when column is filtered (only emitted for remote mode)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  @on-column-filter="onColumnFilter">
 ```
 ```javascript
 methods: {
   onColumnFilter(params) {
     // params.columnFilters - filter values for each column in the following format:
     // {field1: 'filterTerm', field3: 'filterTerm2')
   }
 }
 ```

 ## @on-select-all
event emitted when all is selected (only emitted for checkbox tables)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :select-options="{ enabled: true }"
  @on-select-all="onSelectAll">
 ```
 ```javascript
 methods: {
   onSelectAll(params) {
     // params.selected - whether the select-all checkbox is checked or unchecked
     // params.selectedRows - all rows that are selected (this page)
   }
 }
 ```

 ## @on-selected-rows-change
 event emitted whenever selection is changed (on checkbox tables)
 ```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :select-options="{ enabled: true }"
  @on-selected-rows-change="selectionChanged">
 ```
 ```javascript
 methods: {
   selectionChanged(params) {
     // params.selectedRows - all rows that are selected (this page)
   }
 }
 ```