# Checkbox Table

One of the most common customizations in datatables is selectable rows. Creating a checkbox table with **vue-good-table** is easier than ever.


## Configuration 

type: `Object`

Object containing select options
```html
<vue-good-table
  @on-select-all="allSelected"
  @on-row-click="rowSelected"
  :columns="columns"
  :rows="rows"
  :selectOptions="{
    enabled: true,
    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
    selectionInfoClass: 'custom-class',
    selectionText: 'rows selected',
    clearSelectionText: 'clear',
  }">
```



you can also programmatically get selected rows at any time by putting a `ref` on the table and then doing

```js
this.$refs['my-table'].selectedRows;
```

### Example
```vue
<vue-good-table
  @on-select-all="selectAll"
  @on-row-click="toggleSelectRow"
  :columns="columns"
  :rows="rows"
  :select-options="{ enabled: true }"
  :search-options="{ enabled: true }">
</vue-good-table>
```

<checkbox-table />


## Selected row action slot
Once you select a row, an info bar shows up. This bar allows for a customizable slot for your action buttons. 

### Example

```html
<vue-good-table
  @on-select-all="selectAll"
  @on-row-click="toggleSelectRow"
  :columns="columns"
  :rows="rows"
  :select-options="{ 
    enabled: true,
  }"
  :search-options="{ enabled: true }">
  <div slot="selected-row-actions">
    <button>Action 1</button>
  </div>
</vue-good-table>
```


