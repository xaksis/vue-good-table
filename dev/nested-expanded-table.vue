<template>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :select-options="{
      enabled: true,
      selectOnCheckboxOnly: true
    }"
    @on-select-all="onSelectAll"
    @on-search="onSelectAll"
    @on-row-mouseenter="onMouseover"
    @on-row-mouseleave="onMouseover"
    :search-options="{
      enabled: false,
    }"
    :group-options="{
      enabled: true,
      headerPosition: 'top',
      collapsable: -1
    }"
    :sort-options="{
      depthLevel: 0
    }"
    styleClass="vgt-table condensed bordered"
    ref="groupedTable"
  ></vue-good-table>
</template>

<script>
export default {
  name: "nested-expandable-table",
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name"
          //   filterOptions: {
          //     enabled: true,
          //   },
        },
        {
          label: "Diet",
          field: "diet",
          type: "text"
          //   hidden: true,
        },
        {
          label: "Count",
          field: "count",
          type: "number"
        }
      ],
      rows: [
        {
          name: "Animals",
          diet: "omnivore",
          count: "100",
          children: [
            {
              name: "Reptiles",
              diet: "carnivore",
              count: 40,
              children: [
                { name: "lizard", diet: "insectivore", count: 34 },
                { name: "crocodile", diet: "carnivore", count: 22 },
                { name: "turtles", diet: "herbivore", count: 29 }
              ]
            },
            {
              name: "Mamals",
              diet: "omnivore",
              count: 40,
              children: [
                { name: "Elephant", diet: "herbivore", count: 5 },
                { name: "Cat", diet: "carnivore", count: 28 },
                { name: "Dog", diet: "omnivore", count: 12 }
              ]
            }
          ]
        },
        {
          name: "coconutTotal",
          diet: "coconut",
          count: "100",
          children: [
            {
              name: "coconut 1",
              diet: "carnivore",
              count: 10,
              children: [
                { name: "lizard", diet: "insectivore", count: 34 },
                { name: "crocodile", diet: "carnivore", count: 22 },
                { name: "turtles", diet: "herbivore", count: 29 }
              ]
            },
            {
              name: "coconut 2",
              diet: "carnivore",
              count: 20,
              children: [
                { name: "lizard", diet: "insectivore", count: 34 },
                { name: "crocodile", diet: "carnivore", count: 22 },
                { name: "turtles", diet: "herbivore", count: 29 }
              ]
            },
            {
              name: "coconut 3",
              diet: "carnivore",
              count: 40,
              children: [
                { name: "lizard", diet: "insectivore", count: 34 },
                { name: "crocodile", diet: "carnivore", count: 22 },
                { name: "turtles", diet: "herbivore", count: 29 }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    expandAll() {
      this.$refs.groupedTable.expandAll();
    },
    collapseAll() {
      this.$refs.groupedTable.collapseAll();
    },
    onSelectAll(params) {
      console.log(params);
    },
    onMouseover(params) {
      console.log(params);
    },
    sumCount(rowObj) {
      // let sum = 0;
      // for (let i = 0; i < rowObj.children.length; i++) {
      //   sum += rowObj.children[i].count;
      // }
      // return sum;
    }
  }
};
</script> 