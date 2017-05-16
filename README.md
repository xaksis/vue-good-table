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

| Options | Description | type |
|:------- | ----------- | ------- |
| title   | Title goes above the table | String |
| columns | Array containing objects that describe table columns |  ```json
[{
  label: 'Name',
  field: 'name',
  filterable: true,
}...]
``` *See below for full list of column options* |
| rows    | Array containing row objects| ```json 
[{id:1, name:"John",age:"20"}...]
``` |
| paginate | Enable Pagination for table | Boolean |
| perPage | Number of rows per page | Integer *default: 10* |
| onClick | Function to run when a row is clicked | Function (row as 1st param) | 
| sortable | Enable sorting by clicking column | Boolean |

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
      <td>String, `"Test Table"`</td>
    </tr>
    <tr>
      <td>columns</td>
      <td>Array containing objects that describe table columns</td>
      <td>
      ```json
        [
          {
            label: 'Name',
            field: 'name',
            filterable: true,
          }
          //...
        ]
      ```
      </td>
    </tr>
    <tr>
      <td>rows</td>
      <td>Array containing row objects</td>
      <td>```json 
          [
            {
              id:1, 
              name:"John",
              age:"20"
            },
            //...
          ]
        ```
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
      <td>Integer (*default: 10*)</td>
    </tr>
    <tr>
      <td>onClick</td>
      <td>Function to run when a row is clicked</td>
      <td>
        ```javascript
        function(row){
          console.log(row);
        }
        ```
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


