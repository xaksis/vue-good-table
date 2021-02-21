const DEFAULT_SORT_TYPE = 'asc';
const SORT_TYPES = {
  Ascending: 'asc',
  Descending: 'desc',
  None: 'none',
};

function getColumnFirstSortType(column) {
  return column.firstSortType || DEFAULT_SORT_TYPE;
}

function getCurrentPrimarySort(sortArray, column) {
  return ( sortArray.length === 1 && sortArray[0].field === column.field )
  ? sortArray[0].type
  : undefined;
}

function getNextSort(currentSort) {
  if (currentSort === SORT_TYPES.Ascending) {
    return SORT_TYPES.Descending;
  }
  return SORT_TYPES.Ascending;
}

function getIndex(sortArray, column) {
  for (let i = 0; i < sortArray.length; i++) {
    if (column.field === sortArray[i].field) return i;
  }
  return -1;
}

exports.primarySort = (sortArray, column) => {
  const currentPrimarySort = getCurrentPrimarySort(sortArray, column);
  const nextPrimarySort = getNextSort(currentPrimarySort);
  return [{
    field: column.field,
    type: currentPrimarySort ? nextPrimarySort : getColumnFirstSortType(column),
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
