
function getNextSort(currentSort) {
  if (currentSort === 'asc') return 'desc';
  // if (currentSort === 'desc') return null;
  return 'asc';
}

function getIndex(sortArray, column) {
  for (let i = 0; i < sortArray.length; i++) {
    if (column.field === sortArray[i].field) return i;
  }
  return -1;
}

exports.primarySort = (sortArray, column) => {
  if (sortArray.length
    && sortArray.length === 1
    && sortArray[0].field === column.field) {
    const type = getNextSort(sortArray[0].type);
    if (type) {
      sortArray[0].type = getNextSort(sortArray[0].type);
    } else {
      sortArray = [];
    }
  } else {
    sortArray = [{
      field: column.field,
      type: 'asc',
    }];
  }
  return sortArray;
};

exports.secondarySort = (sortArray, column) => {
  //* this means that primary sort exists, we're
  //* just adding a secondary sort
  const index = getIndex(sortArray, column);
  if (index === -1) {
    sortArray.push({
      field: column.field,
      type: 'asc',
    });
  } else {
    const type = getNextSort(sortArray[index].type);
    if (type) {
      sortArray[index].type = type;
    } else {
      sortArray.splice(index, 1);
    }
  }
  return sortArray;
};
