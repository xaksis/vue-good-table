# Vue-good-table
A simple, clean data table for VueJS (2.x) with essential features like sorting, column filtering, pagination etc

![Basic Screenshot](README/images/screenshot.png)

## Getting Started

### Prerequisites

The plugin is meant to be used with existing Vue 2.x projects. It uses ES6 features so as long as your build process includes a transpiler, you're good to go.


### Installing

Install with npm:
```
npm install --save vue-good-table
```

import into project:
```
import Vue from 'vue';
import VueGoodTable from 'vue-good-table';

Vue.use(VueGoodTable);
```

## Example Usage

```html
<template>
  <div class="myclass">
    <vue-good-table
      title="Test Table"
      :columns="columns"
      :rows="rows"
      :paginate="true">
      
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: 'test',
  data(){
    return {
      columns: [
        {
          label: 'Id',
          field: 'id',
          type: 'number',
          html: false,
          width: '50px',
        },
        {
          label: 'Name',
          field: 'name',
          html: false,
          filterable: true,
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          html: false,
          filterable: true,
        },
        {
          label: 'Percent',
          field: 'btn',
          type: 'percentage',
          html: false,
          filterable: true,
        },
      ],
      rows: [
          {id:1, name:"John",age:"20",btn: 0.03343},
          {id:2, name:"Jane",age:"24",btn: 0.03343},
          {id:3, name:"Susan",age:"16",btn: 0.03343},
          {id:4, name:"Chris",age:"55",btn: 0.03343},
          {id:5, name:"Dan",age:"40",btn: 0.03343},
          {id:6, name:"John",age:"20",btn: 0.03343},
          {id:7, name:"Jane",age:"24",btn: 0.03343},
          {id:8, name:"Susan",age:"16",btn: 0.03343},
          {id:9, name:"Chris",age:"55",btn: 0.03343},
          {id:10, name:"Dan",age:"40",btn: 0.03343},
      ],
    };
  },
};
</script>
```
This should result in the screenshot seen above

### Component Options

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Type, Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>title</td>
      <td>Array containing objects that describe table columns</td>
      <td>String, <code>"Test Table"</code></td>
    </tr>
    <tr>
      <td>columns</td>
      <td>Array containing objects that describe table columns</td>
      <td>
      <pre lang="json">
        [
          {
            label: 'Name',
            field: 'name',
            filterable: true,
          }
          //...
        ]
      </pre>
      </td>
    </tr>
    <tr>
      <td>rows</td>
      <td>Array containing row objects</td>
      <td>
        <pre lang="json">
          [
            {
              id:1, 
              name:"John",
              age:"20"
            },
            //...
          ]
        </pre>
      </td>
    </tr>
    <tr>
      <td>paginate</td>
      <td>Enable Pagination for table</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>perPage</td>
      <td>Number of rows per page</td>
      <td>Integer (<em>default: 10</em>)</td>
    </tr>
    <tr>
      <td>onClick</td>
      <td>Function to run when a row is clicked</td>
      <td>
        <pre lang="javascript">
        function(row){
          console.log(row);
        }
        </pre>
      </td>
    </tr>
    <tr>
      <td>sortable</td>
      <td>Enable sorting by clicking column</td>
      <td>Boolean</td>
    </tr>
  </tbody>
</table>

## Authors

* **Akshay Anand** - *Initial work* - [xaksis](https://github.com/xaksis)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

Inspiration taken from
* MicroDroid's [vue-materialize-datatable](https://github.com/MicroDroid/vue-materialize-datatable)
* Bootstrap's [table styles](https://getbootstrap.com/)


