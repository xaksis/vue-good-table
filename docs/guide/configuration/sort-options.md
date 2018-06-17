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

type: `Object`

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