
# Getting Started

## Installation

Install with npm:

```bash
npm install --save vue-good-table
```

Import globally in app:

```javascript
import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);
```

**or** you can import into your component:
```js
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

// add to component
components: {
  VueGoodTable,
}
```


## Basic Example

<basic-table/>

```vue
<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"/>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
    };
  },
};
</script>
```

## Usage with Nuxt.js

Create your own plugin by creating a file called `vue-good-table.js` inside your Nuxt `plugins` folder. Shoud look something like this:

```
import Vue from 'vue'
import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);
```

As you can see, the only difference from the normal installation is that we need to reference Vue using `import Vue from 'vue'`.

Next we need to declare the plugin inside your `nuxt.config.js` like so:

```
plugins: [
  { src: '~/plugins/vue-good-table', ssr: false }
],
```

This should now work as expected.