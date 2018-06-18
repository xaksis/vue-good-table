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
      filterable: true,
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

## lineNumbers

type: `Boolean (default: false)`
Show line number for each row
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :lineNumbers="true">
</vue-good-table>
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

total number of rows that exist given a table/filter. refer to [remote workflow]() for more details

