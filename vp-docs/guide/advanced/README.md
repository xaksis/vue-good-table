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
```
You can add a function to handle the filtering logic in your own component, or optionally `updateFilters` can be used. 
The `updateFilters` method is in `vue-good-table` and will include your custom filter value with the other column filters. 
You can also provide a function to `formatValue` inside of `filterOptions` to transform the value before filtering on it. 
```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <template slot="column-filter" slot-scope="{ column, updateFilters }">
    <my-custom-filter
      v-if="column.filterOptions.customFilter"       
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
    slotFilterField: 'name.id',
    formatValue: function (value) {
      return valueArray.join(',');  
    } 
  }
}
```
Note the `formatValue` function. This is where you can provide formatting logic to transform your filter value. 

::: tip Upgrading from versions 2.19.0-2.20.0
Older versions of `vue-good-table` included a built-in multiselect filter.
If you upgrade to the latest version and would still like to use this filter, follow these steps:
* Install and set up `vue-select` in your project, follwing the guide at https://vue-select.org.
``` html
<v-select
  :options="optionList"
  multiple
  @input="(value) => updateFilters(column, value)"
/>
```
* Make sure to set the `multiple` attribute for a multiselect filter.
* Set an array of options on the `options` attribute of `v-select`. If you were using the 
built in multiselect filter, move them from the column property `filterOptions.multiSelectDropdownItems`.
* `vue-select` emits an array of values when set to `multiple`. To convert the array of data into 
a comma separated string or another format, provide a function on `filterOptions.formatValue`.  
``` html
<v-select
  :options="optionList"
  multiple
  @input="(valuesArray) => updateFilters(column, valuesArray)"
/>
```
``` javascript
// vue-select emits an array of any objects selected in the dropdown
// which is being converted to a string of ids to pass into the column filter value
data: {
  optionList: [
    {
      name: 'Joan',
      id: 1
    },
    {
      name: 'Don',
      id: 2
    }
  ],
  columns: [
    {
      label: 'name',
      field: 'name',
      filterOptions: {
        customFilter: true,
        formatValue: this.formatFilterValue
    }
  ]
},
methods: {
  formatFilterValue(valuesArray) {
    return values.map((value) => value.id).join(',');
  }
}
```
:::

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
