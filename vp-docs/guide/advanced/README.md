# Customizations

## Custom Row Template

Sometimes you might want to customize exactly how rows are displayed in a table. Vue-good-table also supports dynamic td templates where you dictate how to display the cells. Example:
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'age'">
      <span style="font-weight: bold; color: blue;">{{props.row.age}}</span> 
    </span>
    <span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
  </template>
</vue-good-table>
```

### Result
<custom-row />

::: tip NOTE
* The original row object can be accessed via `props.row`
* The currently displayed table row index can be accessed via `props.index` . 
* The original row index can be accessed via `props.row.originalIndex`. You can then access the original row object by using `rows[props.row.originalIndex]`.
* The column object can be accessed via `props.column`
* You can access the formatted row data (for example - formatted date) via `props.formattedRow`
:::

## Adding custom columns

Sometimes you might want to add columns to the table that are not part of your row data. Maybe before or after the other columns. 

```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'before'">
      before
    </span>
    <span v-else-if="props.column.field == 'after'">
      after
    </span>
    <span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
  </template>
</vue-good-table>
```

keep in mind that you'll need to add the custom columns to your column definition.
```js
{
  label: 'Before',
  field: 'before'
},
{
  label: 'After',
  field: 'after'
},
```

### Result
<before-after-columns />

## Custom column headers
Sometimes you might want to customize column headers. You can do that in the following way
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

## Custom column filters
Sometimes you might want a custom filter. You can do that in the following way:
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="column-filter" slot-scope="props">
    <my-custom-filter
      v-if="props.column.filterOptions.customFilter"       
      @input="handleCustomFilter"/>
  </template>
</vue-good-table>
```
Add a custom property in your `columns` to conditionally render the `custom-filter` slot where needed. 
```javascript
columns: [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Category',
    field: 'category'
  },
  {
    label: 'Statistics',
    field: 'statistics',
    filterOptions: {
      customFilter: true
    }
  } 
]
// in your methods
handleCustomFilter(value) {
  // filtering logic here
}
````
Instead of handling the custom filtering in your own component, the `updateFilters` method can be used. 
The `updateFilters` method passes your column filter value into `vue-good-table` with the rest of the column filters. 
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="column-filter" slot-scope="{ column, updateFilters }">
    <my-custom-filter
      v-if="column.customFilter"       
      @input="(value) => updateFilters(column, value)"/>
  </template>
</vue-good-table>
```
In your columns, you may want to display the value from one property but need to filter on another. 
If you set a `slotFilterField` in your filterOptions, that property will be used for the custom filter slot. 
```javascript
{
  label: 'Name',
  field: 'name.displayName',
  filterOptions: {
    customFilter: true,
    slotFilterField: 'name.id'
  }
}
```

## Custom pagination

Sometimes you might want to customize the pagination. You can do that in the following way:
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :pagination-options="{enabled: true}">
  <template slot="pagination-bottom" slot-scope="props">
    <custom-pagination
      :total="props.total"
      :pageChanged="props.pageChanged"
      :perPageChanged="props.perPageChanged">
    </custom-pagination>
  </template>
</vue-good-table>
```

```js
// within your <custom-pagination> component
props: {
  pageChanged: {
    type: Function,
  },
  perPageChanged: {
    type: Function,
  },
}
// and...
methods: {
  customPageChange(customCurrentPage) {
    this.pageChanged({currentPage: customCurrentPage});
  },
  customPerPageChange(customPerPage) {
    this.perPageChanged({currentPerPage: customPerPage});
  }
}
```

::: warning
You will have to implement your own pagination system:

* The total number of rows can be accessed via `props.total`
* The function to call when the current page has changed can be accessed via `props.pageChanged`.
* The function to call when the per page value has changed can be accessed via `props.perPageChanged` .
:::