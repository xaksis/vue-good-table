# Sort Options

Set of options related to table sorting

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :sort-options="{
    enabled: true,
    initialSortBy: {field: 'name', type: 'asc'},
    resetAfterThirdClick: true
  }">
</vue-good-table>
```

## enabled

type: `Boolean (default: true)`

Enable/disable sorting on table as a whole. 
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :sort-options="{
    enabled: true,
  }">
</vue-good-table>
```

## initialSortBy

::: tip Update
`initialSortBy` now allows for sort by multiple columns
:::

type: `Object` or `Array`

Allows specifying a default sort for the table on wakeup. Both **field** and **type** values are required.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :sort-options="{
    enabled: true,
    initialSortBy: {field: 'name', type: 'asc'}
  }">
</vue-good-table>
```

## Multiple Column Sort
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :sort-options="{
    enabled: true,
    initialSortBy: [
      {field: 'name', type: 'asc'},
      {field: 'age', type: 'desc'}
    ],
  }">
</vue-good-table>
```

Users can shift-click on multiple columns to sort by multiple columns. The first column in the array gets primary sort.

## resetAfterThirdClick
type: `Boolean (default: false)`
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :sort-options="{
    enabled: true,
    resetAfterThirdClick: true
  }">
</vue-good-table>
```

Users can reset the sorting of a column, when it's clicked for the third time, so that the table behaves more like a
spreadsheet.