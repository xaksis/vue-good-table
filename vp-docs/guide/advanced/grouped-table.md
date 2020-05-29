# Grouped Table

To create grouped rows, you need two things.

#### 1. Add groupOptions to table component

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :group-options="{
    enabled: true
  }"
>
</vue-good-table>
```

#### 2. Make sure the rows are formatted correctly. Grouped rows need to be nested within header rows containing data rows in their children property. For example:

```js
rows: [
  {
    mode: 'span', // span means this header will span all columns
    label: 'Mammal', // this is the label that'll be used for the header
    html: false, // if this is true, label will be rendered as html
    children: [
      { name: 'Elephant', diet: 'herbivore', count: 5 },
      { name: 'Cat', diet: 'carnivore', count: 28 }
    ]
  }
];
```

<grouped-table :options="{enabled: true}" />

#### 3. Sometimes, you might want a summary row instead of a header row. For example, if you want to show total count for your group

```javascript
rows: [
  {
    name: 'Mammals Total', // this is the label that'll be used for the header
    diet: undefined,
    count: '', // total count will be displayed here
    children: [
      { name: 'Elephant', diet: 'herbivore', count: 5 },
      { name: 'Cat', diet: 'carnivore', count: 28 }
    ]
  }
];
```

#### 4. If you want the header/summary row to show up at the bottom of the group, you can specify that in the groupOptions property of the table.

```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :group-options="{
    enabled: true,
    headerPosition: 'bottom'
  }"
>
</vue-good-table>
```

<grouped-table :options="{enabled: true, headerPosition: 'bottom'}" />

#### 5. What if you wanted to add a total count in summary rows?

In your column definition add a property, `headerField`. This is just like `field` property but for summary/header rows only. So lets say we wanted to add a **sum function** to this field.

```js
// in columns
{
  label: 'Count',
  field: 'count',
  headerField: this.sumCount,
  type: 'number',
},

// in methods we define sumCount
methods: {
  sumCount: function (rowObj) {
    console.log(rowObj);
    let sum = 0;
    for (let i = 0; i < rowObj.children.length; i++) {
      sum += rowObj.children[i].count;
    }
    return sum;
  },
},

```

## Customizing Header Row

If you want more control over what the header row looks like, you can use slots the same way you [customize rows](/guide/advanced/#custom-row-template). For example if you want to add a button in the header row or something, this would be the way to do it.

### When mode is 'span'

In this case, the header row spans across all columns

```vue
<vue-good-table
  :columns="columns"
  :rows="rows"
  :group-options="{
    enabled: true,
    headerPosition: 'top'
  }"
>
  <template slot="table-header-row" slot-scope="props">
    <span class="my-fancy-class">
      {{ props.row.label }}
    </span>
  </template>
</vue-good-table>
```

<grouped-custom-span :options="{enabled: true, headerPosition: 'top'}"/>

### When mode is not 'span'

In this case header row expects a value for each column

```vue
<vue-good-table
  :columns="columns"
  :rows="rows"
  :group-options="{
    enabled: true,
    headerPosition: 'top'
  }"
>
  <template slot="table-header-row" slot-scope="props">
    <span v-if="props.column.field == 'action'">
      <button class="fancy-btn">Action</button>
    </span>
    <span v-else>
      {{ props.formattedRow[props.column.field] }}
    </span>
  </template>
</vue-good-table>
```

<grouped-custom :options="{enabled: true, headerPosition: 'top'}"/>

::: tip

- The original row object can be accessed via `props.row`
- The column object can be accessed via `props.column`
- You can access the formatted row data (for example - formatted date) via `props.formattedRow`
  :::

## Collapsable Rows

To allow the row to collapse and expand you can use the groupOption "collapsable". You can either pass in a boolean or a number.
If `collapsable` is set to `true` then it will default to making the first column collapsable. Alternatively, you can specify the column index number.
If you only add new rows to your table at the end, then the expanded or collapsed state of your rows will be maintained. 
However if you need to insert rows before the last one, you can pass in `rowKey` inside of `groupOptions` with a unique identifier for your rows. 
The expanded and collapsed state will then be maintained. 
```html
<vue-good-table
  ref="myCustomTable"
  :columns="columns"
  :rows="rows"
  :group-options="{
    enabled: true,
    rowKey="id"
    collapsable: true // or column index
  }"
>
</vue-good-table>
```
To expand/collapse all you can use the method called `expandAll` or `collapseAll`.
```js
this.$refs.myCustomTable.expandAll();
this.$refs.myCustomTable.collapseAll();
```

* **Live Demo:** https://jsfiddle.net/nb6fcqs7

