# Grouped Table

To create grouped rows, you need two things. 
#### 1. Add groupOptions to table component
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :groupOptions="{
  	enabled: true
  }">
</vue-good-table>
```

#### 2. Make sure the rows are formatted correctly. Grouped rows need to be nested with headers rows containing rows in their children property. For example: 

```js
rows: [{
  mode: 'span', // span means this header will span all columns
  label: 'Header Two', // this is the label that'll be used for the header
  children: [
    { name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
    { name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
  ]
}]
```

<grouped-table :options="{enabled: true}" />


#### 3. Sometimes, you might want a summary row instead of a header row. For example, if you want to show total score for your group

```javascript
rows: [{
  name: 'Total', // this is the label that'll be used for the header
  age: undefined,
  createdAt: undefined,
  score: 0.3, // total score here
  children: [
    { name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
    { name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
  ]
}]
```

#### 4. If you want the header/summary row to show up at the bottom of the group, you can specify that in the groupOptions property of the table.
```html
<vue-good-table
  :columns="columns"
  :rows="rows"
  :groupOptions="{
  	enabled: true,
    headerPosition: 'bottom',
  }">
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
  sumCount(rowObj) {
    console.log(rowObj);
    let sum = 0;
    for (let i = 0; i < rowObj.children.length; i++) {
      sum += rowObj.children[i].count;
    }
    return sum;
  },
},

```



