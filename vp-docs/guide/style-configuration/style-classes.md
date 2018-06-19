# Style Classes

Vue-good-table allows providing your own css classes for the table via **styleClass** option but it also has in-built classes that you can make use of.

::: tip NOTE
by default, tables have 'vgt-table striped bordered'
:::

## .vgt-table
Base class that initializes all the core styles for the table.
```vue{4}
<vue-good-table
  :columns="columns"
  :rows="rows"
  styleClass="vgt-table">
</vue-good-table>
```
<theme-example styleClasses="vgt-table"/>

## .vgt-table .striped
Add row striping in your data table.
```vue{4}
<vue-good-table
  :columns="columns"
  :rows="rows"
  styleClass="vgt-table striped">
</vue-good-table>
```
<theme-example styleClasses="vgt-table striped"/>

## .vgt-table .bordered
Add borders to columns/rows
```vue{4}
<vue-good-table
  :columns="columns"
  :rows="rows"
  styleClass="vgt-table bordered">
</vue-good-table>
```
<theme-example styleClasses="vgt-table bordered"/>

## .vgt-table .condensed
Have lots of rows? use condensed class to get more compact rows.
```vue{4}
<vue-good-table
  :columns="columns"
  :rows="rows"
  styleClass="vgt-table condensed">
</vue-good-table>
```
<theme-example styleClasses="vgt-table condensed"/>