# Sort Options

Set of options related to table sorting

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

Allows specifying a default sort for the table on wakeup
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