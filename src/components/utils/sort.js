const DEFAULT_SORT_TYPE = 'asc';

function getColumnFirstSortType(column) {
  return column.firstSortType || DEFAULT_SORT_TYPE;
}

function getCurrentPrimarySort(sortArray, column) {
  return ( sortArray.length === 1 && sortArray[0].field === column.field )
  ? sortArray[0].type
  : undefined;
}

function getNextSort(currentSort, column, resetAfterThirdClick) {
  const columnFirstSortType = getColumnFirstSortType(column);
  if (currentSort === 'asc' && columnFirstSortType === 'asc') {
    return 'desc';
  } else if (currentSort === 'asc' && columnFirstSortType === 'desc' && resetAfterThirdClick) {
    return 'none';
  } else if (currentSort === 'asc' && columnFirstSortType === 'desc' && !resetAfterThirdClick) {
    return 'desc'
  } else if (currentSort === 'desc' && columnFirstSortType === 'desc') {
    return 'asc';
  } else if (currentSort === 'desc' && columnFirstSortType === 'asc' && resetAfterThirdClick) {
    return 'none';
  } else if (currentSort === 'desc' && columnFirstSortType === 'asc' && !resetAfterThirdClick) {
    return 'desc';
  }

  return DEFAULT_SORT_TYPE;
}

function getIndex(sortArray, column) {
  for (let i = 0; i < sortArray.length; i++) {
    if (column.field === sortArray[i].field) return i;
  }
  return -1;
}

exports.primarySort = (sortArray, column, resetAfterThirdClick) => {
  const currentPrimarySort = getCurrentPrimarySort(sortArray, column);

  if (!currentPrimarySort) {
    return [{
      field: column.field,
      type: getColumnFirstSortType(column)
    }];
  }

  const type = getNextSort(currentPrimarySort, column, resetAfterThirdClick);
  if (type === 'none') {
    return [];
  }

  return [{
    field: column.field,
    type
  }];
};

exports.secondarySort = (sortArray, column, resetAfterThirdClick) => {
  const index = getIndex(sortArray, column);
  if (index === -1) {
    sortArray.push({
      field: column.field,
      type: getColumnFirstSortType(column),
    });
  } else {
    sortArray[index].type = getNextSort(sortArray[index].type, column, resetAfterThirdClick);
  }
  return sortArray;
};
