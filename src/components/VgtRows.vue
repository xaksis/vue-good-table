<template>
    <tr v-if="groupOptions.collapsable ? headerRow.vgtIsExpanded : true">
        <td :colspan="fullColspan">
            <table :class="tableStyleClasses">
                <tbody>
                    <tr
                        :key="row.originalIndex"
                        :class="getRowStyleClass(row)"
                        @mouseenter="onMouseenter(row, index)"
                        @mouseleave="onMouseleave(row, index)"
                        @dblclick="onRowDoubleClicked(row, index, $event)"
                        @click="onRowClicked(row, index, $event)"
                        @auxclick="onRowAuxClicked(row, index, $event)">
                        <th
                            v-if="lineNumbers"
                            class="line-numbers"
                        >
                            {{ getCurrentIndex(index) }}
                        </th>
                        <th
                            v-if="selectable"
                            @click.stop="onCheckboxClicked(row, index, $event)"
                            class="vgt-checkbox-col"
                        >
                            <input
                            type="checkbox"
                            :checked="row.vgtSelected"
                            />
                        </th>
                        <td
                            @click="onCellClicked(row, column, index, $event)"
                            v-for="(column, i) in columns"
                            :key="i"
                            :class="getClasses(i, 'td', row)"
                            v-if="!column.hidden && column.field"
                        >
                            <span v-if="columnCollapsable(i)" class="triangle" :class="{ 'expand': headerRow.vgtIsExpanded }"></span>
                            <slot
                            name="table-row"
                            :row="row"
                            :column="column"
                            :formattedRow="formattedRow(row)"
                            :index="index"
                            >
                            <span v-if="!column.html">
                                {{ collectFormatted(row, column) }}
                            </span>
                            <span
                                v-if="column.html"
                                v-html="collect(row, column.field)"
                            >
                            </span>
                            </slot>
                        </td>
                    </tr>
                    <vgt-rows 
                        v-if="row.children && row.children.length"
                        v-for="(childRow, childIndex) in row.children"
                        :key="childIndex + childRow.name"
                        :index="childIndex"
                        :headerRow="row"
                        :row="childRow"
                        :groupOptions="groupOptions"
                        :getRowStyleClass="getRowStyleClass"
                        :getClasses="getClasses"
                        :lineNumbers="lineNumbers"
                        :selectable="selectable"
                        :columns="columns"
                        :collectFormatted="collectFormatted"
                        :fullColspan="fullColspan"
                        :formattedRow="formattedRow"
                        :getCurrentIndex="getCurrentIndex"
                        :onMouseenter="onMouseenter"
                        :onMouseleave="onMouseleave"
                        :onRowDoubleClicked="onRowDoubleClicked"
                        :onRowClicked="onRowClicked"
                        :onRowAuxClicked="onRowAuxClicked"
                        :onCheckboxClicked="onCheckboxClicked"
                        :onCellClicked="onCellClicked">
                    </vgt-rows>
                </tbody>
            </table>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'VgtRows',
    props: {
        headerRow: {},
        row: {},
        index: {},
        groupOptions: {},
        getRowStyleClass: {},
        lineNumbers: {},
        selectable: {},
        columns: {},
        getClasses: {},
        tableStyleClasses: {},
        collectFormatted: {},
        formattedRow: {},
        fullColspan: {},
        getCurrentIndex: {},
        onMouseenter: {},
        onMouseleave: {},
        onRowDoubleClicked: {},
        onRowClicked: {},
        onRowAuxClicked: {},
        onCheckboxClicked: {},
        onCellClicked: {},
    },
    methods: {
    }
}
</script>