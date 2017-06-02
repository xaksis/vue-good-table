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
  <div>
    <vue-good-table
      title="Demo Table"
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :lineNumbers="true"/>
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
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          inputFormat: 'YYYYMMDD',
          outputFormat: 'MMM Do YY',
          filterable: false,
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

<strong>Note:</strong> vue-good-table also supports dynamic td templates where you dictate how to display the cells. Example: 
```html
<vue-good-table
  title="Dynamic Table"
  :columns="columns"
  :rows="rows"
  :lineNumbers="true"
  :defaultSortBy="{field: 'age', type: 'asec'}"
  :globalSearch="true"
  :paginate="true"
  styleClass="table condensed table-bordered table-striped">
  <template slot="table-row" scope="props">
    <td>{{ props.row.name }}</td>
    <td class="fancy">{{ props.row.age }}</td>
    <td>{{ props.row.btn }}</td>
  </template>
</vue-good-table>
```

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
      <td>Title shows up above the table</td>
      <td>String, <code>"Test Table"</code><br>
        If not set, the title region is not created.
      </td>
    </tr>
    <tr>
      <td>columns</td>
      <td>Array containing objects that describe table columns</td>
      <td>
<pre lang="javascript">
  [
    {
      label: 'Name',
      field: 'name',
      filterable: true,
    }
    //...
  ]
</pre>
      <em>For all column properties, see below</em>
      </td>
    </tr>
    <tr>
      <td>rows</td>
      <td>Array containing row objects</td>
      <td>
<pre lang="javascript">
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
    <tr>
      <td>styleClass</td>
      <td>Allows applying your own classes to table</td>
      <td>String <em>default: 'table table-bordered'</em></td>
    </tr>
    <tr>
      <td>globalSearch</td>
      <td>Allows a single search input for the whole table <em>Note: enabling this filter disables column filters</em></td>
      <td>Boolean <em>default: false</em></td>
    </tr>
    <tr>
      <td>lineNumbers</td>
      <td>Enable sorting by clicking column</td>
      <td>Boolean <em>default: false</em></td>
    </tr>
    <tr>
      <td>defaultSortBy</td>
      <td>Allows specifying a default sort for the table on wakeup</td>
      <td>Object, example:
<pre lang="javascript">
{
  field: 'name', 
  type: 'asc' //asc or desc (default: 'asc')
}
</pre>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <strong>Text Options</strong> - for those interested in using other languages
      </td>
    </tr>
    <tr>
      <td>globalSearchPlaceholder</td>
      <td>Text for global search input place holder</td>
      <td>default: "Search Table"</td>
    </tr>
    <tr>
      <td>nextText</td>
      <td>Text for pagination 'Next' link </td>
      <td>default: "Next"</td>
    </tr>
    <tr>
      <td>prevText</td>
      <td>Text for pagination 'Prev' link </td>
      <td>default: "Prev"</td>
    </tr>
    <tr>
      <td>rowsPerPageText</td>
      <td>Text for pagination 'Rows per page' label </td>
      <td>default: "Rows per page"</td>
    </tr>
  </tbody>
</table>

### Column Options
<table>
  <thead>
    <tr>
      <td>Option</td>
      <td>Description</td>
      <td>Type, example</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>label (required)</td>
      <td>Label to put on column header</td>
      <td>String <code>{label: "Name"}</code></td>
    </tr>
    <tr>
      <td>field (required)</td>
      <td>Row object property that this column corresponds to</td>
      <td>
        Could be: 
        <ul>
          <li>String <code>eg: 'name'</code> - simple row property name</li>
          <li>String <code>eg: 'location.lat'</code>- nested row property name. lets say if the row had a property 'location' which was an object containing 'lat' and 'lon'
          </li>
          <li>Function - a function that returns a value to be displayed based on the row object</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>type (optional)</td>
      <td>type of column. default: 'text'. This determines the formatting for the column and filter behavior as well</td>
      <td>
        Possible values: 
        <ul>
          <li>number - right aligned</li>
          <li>decimal - right aligned, 2 decimal places</li>
          <li>percentage - expects a decimal like 0.03 and formats it as 3.00%</li>
          <li>date - expects a string representation of date eg <code>'20170530'</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>inputFormat <strong>(if type is date)</strong></td>
      <td>provide the format to parse date string</td>
      <td>String eg: <code>'YYYYMMDD' //where date strings are '20170530'</code></td>
    </tr>
    <tr>
      <td>outputFormat <strong>(if type is date)</strong></td>
      <td>provide the format for output date</td>
      <td>String eg: <code>'MMM Do YY' //where date will be output like 'May 30th 17'</code></td>
    </tr>
    <tr>
      <td>filterable (optional)</td>
      <td>provides the column with a filter input</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>html (optional)</td>
      <td>indicates whether this column will require html rendering or not</td>
      <td>Boolean, example: if row had a property 'htmlContent' like <code>htmlContent: '&lt;button&gt;Hello&lt;/button&gt;'</code>, then html: true on the column will render a button</td>
    </tr>
    <tr>
      <td>width (optional)</td>
      <td>provide a width value for this column</td>
      <td>example: <code>width: '50px'</code></td>
    </tr>
  </tbody>
</table>


### Style Options

Vue-good-table allows providing your own css classes for the table via **styleClass** option but it also has in-built classes that you can make use of

#### .table
![Table Screenshot](README/images/table.png)

#### .table .table-bordered
![Table Bordered Screenshot](README/images/table-bordered.png)

#### .table .table-stripped
![Table Bordered Striped Screenshot](README/images/table-bordered-striped.png)

#### .table .table-stripped .table-bordered .condensed
![Table Bordered Striped Screenshot](README/images/condensed.png)


## Authors

* **Akshay Anand** - *Initial work* - [xaksis](https://github.com/xaksis)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

Inspiration taken from
* MicroDroid's [vue-materialize-datatable](https://github.com/MicroDroid/vue-materialize-datatable)
* Bootstrap's [table styles](https://getbootstrap.com/)


