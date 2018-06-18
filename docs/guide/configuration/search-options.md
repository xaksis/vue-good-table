# Search Options

Vue-good-table supports two ways of filtering the table. 
1. A global search that searches through all records in the table
1. [Column filters](/guide/configuration/column-filter-options.md) that filter based on a given column

This section talks about how to configure global search options.

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :search-options="{
    enabled: true,
    trigger: 'enter',
    searchFn: mySearchFn,
    placeholder: 'Search this table',
    externalQuery: searchQuery
  }">
</vue-good-table>
```

## enabled

type: `Boolean (default: false)`


Allows a single search input for the whole table 

::: warning
Enabling this option disables column filters
:::
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :search-options="{
    enabled: true
  }">
</vue-good-table>
```

## trigger

type: `String (default: '')`

Allows you to specify if you want search to trigger on 'enter' event of the input. By **default table searches on key-up**. 

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :search-options="{
    enabled: true,
    trigger: 'enter'
  }">
</vue-good-table>
```

## searchFn

type: `Function`


Allows you to specify your own search function for the global search

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :search-options="{
    enabled: true,
    searchFn: myFunc
  }">
</vue-good-table>
```
```javascript
// in js
methods: {
  myFunc(row, col, cellValue, searchTerm){
    return cellValue === 'my value';
  },
}
```

## placeholder

type: `String (default: 'Search Table')`

Text for global search input place holder
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :search-options="{
    enabled: true,
    placeholder: 'Search this table',
  }">
</vue-good-table>
```

## externalQuery

type: `String`


If you want to use your own input for searching the table, you can use this property

```html
<input type="text" v-model="searchTerm" >
<vue-good-table
  :columns="columns"
  :rows="rows"
  :search-options="{
    enabled: true,
    externalQuery: searchTerm
  }">
</vue-good-table>
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