# Server Side Table

## Why Remote Mode?

Vue-good-table's in-built features like sorting, paging, filtering etc. are all performed client side and therefore are great for most of the use-cases. Sometimes though, we might have **too much data to render all of it at once on the UI**. In such cases, we would want to do things like sorting, paging, filtering on the server side. Fortunately, vue-good-table comes with `remote mode` to switch from client side to server side. 

When remote mode is on, vue-good-table does not perform sorting, paging, filtering etc. on the client side but instead emits events that we can use to then send proper parameters to the back-end. The server then is expected to send the correct rows to display on the UI. 

Following is a workflow you can use to get a server powered vue-good-table instance: 

## Prep Work
### What do we send to server?

Before we dive into remote mode, lets agree on what we're going to be sending to the server. A set of parameters that tells the server exactly what rows I need to get back. Here's a proposed parameter object to send: 

```js
serverParams: {
  // a map of column filters example: {name: 'john', age: '20'}
  columnFilters: {
  },
  sort: [
    {
      field: '', // example: 'name'
      type: '' // 'asc' or 'desc'
    }
  ],

  page: 1, // what page I want to show
  perPage: 10 // how many items I'm showing per page
}
```
With the above information, server should be able to generate the relevant rows to send back.

### What does the server send back?
Two things are required for the server to send back 
1. **relevant rows** - set of rows for the current page, matching the current filter and sort. 
2. **totalRecords** - number of total records matching the params we sent (not just the current page). This is required for the pagination to work correctly.

## Set mode to remote

```html
<vue-good-table
  mode="remote"
  :pagination-options="{
    enabled: true,
  }"
  :totalRows="totalRecords"
  :rows="rows"
  :columns="columns"/>
```
this tells VGT to not do client side paging/sorting/filtering

## Provide handlers for user events

Now instead of doing the above client side, each user interaction will generate events. So lets provide handlers for those events:
```html
<vue-good-table
  mode="remote"
  @page-change="onPageChange"
  @sort-change="onSortChange"
  @column-filter="onColumnFilter"
  @per-page-change="onPerPageChange"
  :totalRows="totalRecords"
  :isLoading.sync="isLoading"
  :pagination-options="{
    enabled: true,
  }"
  :rows="rows"
  :columns="columns"/>
```

... in data
```javascript
data() {
  return {
    isLoading: false,
    columns: [
      //...
    ],
    rows: [],
    totalRecords: 0,
    serverParams: {
      columnFilters: {
      },
      sort: [
        {
          field: '',
          type: ''
        }
      ],
      page: 1, 
      perPage: 10
    }
  }; 
},
```

... handlers

```javascript
methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    
    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },

    onPerPageChange(params) {
      this.updateParams({perPage: params.currentPerPage});
      this.loadItems();
    },

    onSortChange(params) {
      this.updateParams({
        sort: [{
          type: params.sortType,
          field: this.columns[params.columnIndex].field,
        }],
      });
      this.loadItems();
    },
    
    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    }

    // load items is what brings back the rows from server
    loadItems() {
      getFromServer(this.serverParams).then(response => {
         this.totalRecords = response.totalRecords;
         this.rows = response.rows;
      });
    }
}
```

## So, what is happening?
1. Everytime the user interacts with the table, an appropriate event is emitted.
1. Along with this, VGT knows that this event will now result in fetching things from the backend. So it starts a loading screen. 
1. In the handler of that event, we first update the `serverParams` and then send a request to the backend. 
1. When we get the response back, we update both the totalRecords and the rows data objects. 
1. Row object's update signifies to VGT that the loading event is now done, and VGT shows the new rows on the table. 

::: tip
If you want to show loading notification manually, you can do so using table's `:isLoading.sync="isLoading"` property.
:::

::: tip
to style the loading dom, you can use the slot - `loadingContent`
:::

## Conclusion
So that wasn't too bad. You now have VGT that's powered completely by your backend server.

