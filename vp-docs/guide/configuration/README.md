---
sidebarDepth: 3
---

# Table Options

These options relate to the table as a whole

## columns

type: `Array`

Array containing objects that describe table columns. The column object itself can contain many [configurable properties](/guide/configuration/column-options.md).
```javascript
[
    {
      label: 'Name',
      field: 'name',
    }
    //...
]
```

## rows

type: `Array`

Array containing row objects. Each row object contains data that will be displayed in the table row.
```javascript
[
    {
      id:1,
      name:"John",
      age:20
    },
    //...
]
```

::: tip
for **grouped rows**, you need a nested format. Refer to [Grouped Table](/guide/advanced/grouped-table.md) for examples.
:::

## max-height

type: `String`
Set a maximum height for table body

```vue
<vue-good-table
  :columns="columns"
  :rows="rows"
  max-height="300px">
</vue-good-table>
```

## fixed-header

type: `Boolean (default: false)`
fix header so it stays in view as you scroll the table.

```vue
<vue-good-table
  :columns="columns"
  :rows="rows"
  max-height="200px"
  :fixed-header="true">
</vue-good-table>
```
<fixed-header />

::: tip
Fixed header should probably be used with max-height
:::


## line-numbers

type: `Boolean (default: false)`
Show line number for each row
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :line-numbers="true">
</vue-good-table>
```
<line-numbers-table />

## row-style-class 

type: `String` or `Function`

property to assign a class to rows. This can either be a string representing a css class-name or a function.

```vue
<vue-good-table
  :columns="columns"
  :rows="rows"
  :row-style-class="rowStyleClassFn">
</vue-good-table>
```

```js
methods: {
  rowStyleClassFn(row) {
    return row.age > 18 ? 'green' : 'red';
  },
}
```


## rtl 

type: `Boolean (default: false)`

Enable Right-To-Left layout for the table
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :rtl="true">
</vue-good-table>
```
<rtl-table />

## Table Actions Slot
If you want to add table specific actions like a print button for example, you can use the Table Actions Slot. If you have global search enabled, the action panel will show up to the right of that.

::: tip Note
You don't have to have global search enabled to use this slot.
:::

```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <div slot="table-actions">
    This will show up on the top right of the table. 
  </div>
</vue-good-table>
```
<action-slot-table />


## Table Actions Footer Slot

If you want a space for your buttons between pagination and the table. This is the slot you use. 

```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <div slot="table-actions-bottom">
    This will show up on the bottom of the table. 
  </div>
</vue-good-table>
```

## Empty state slot
You can provide html for empty state slot as well. Example:

```html
<vue-good-table
  :columns="columns"
  :rows="rows">
  <div slot="emptystate">
    This will show up when there are no rows
  </div>
</vue-good-table>
```

## mode

type: `String`

Set mode=`remote` to allow sorting/filtering etc to be powered by server side instead of client side.

for a detailed workflow example check out [Server Side Workflow](/guide/advanced/remote-workflow.md)

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  mode="remote">
</vue-good-table>
```

## totalRecords

type: `Number`
::: tip
totalRecords is only useful for remote mode. When server controls pagination the table needs to know how many total rows exist.
:::

total number of rows that exist given a table/filter. refer to [remote workflow](/guide/advanced/remote-workflow.md) for more details

## compactMode

type: `Boolean (default: false)`

Enable mobile-friendly List view on small devices (screenSize below 576px)
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  compactMode>
</vue-good-table>
```
<rtl-table />