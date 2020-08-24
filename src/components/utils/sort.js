const DEFAULT_SORT_TYPE = 'asc';

function getColumnFirstSortType(column) {
  return column.firstSortType || DEFAULT_SORT_TYPE;
}

function getCurrentPrimarySort(sortArray, column) {
  return ( sortArray.length === 1 && sortArray[0].field === column.field )
  ? sortArray[0].type
  : undefined;
}

function getNextSort(currentSort) {
  return (currentSort === 'asc')
    ? 'desc'
    : DEFAULT_SORT_TYPE;
}

function getIndex(sortArray, column) {
  for (let i = 0; i < sortArray.length; i++) {
    if (column.field === sortArray[i].field) return i;
  }
  return -1;
}

exports.primarySort = (sortArray, column) => {
  const currentPrimarySort = getCurrentPrimarySort(sortArray, column);
  return [{
    field: column.field,
    type: currentPrimarySort ? getNextSort(currentPrimarySort) : getColumnFirstSortType(column),
  }];
};

exports.secondarySort = (sortArray, column) => {
  const index = getIndex(sortArray, column);
  if (index === -1) {
    sortArray.push({
      field: column.field,
      type: getColumnFirstSortType(column),
    });
  } else {
    sortArray[index].type = getNextSort(sortArray[index].type);
  }
  return sortArray;
};
