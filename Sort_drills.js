const { LinkedList, display } = require("./linkedlist_drills");

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function mSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);
  console.log(left, right);
  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    console.log(leftIndex, rightIndex);
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }
  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  console.log(j);
  return j;
}

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}

// 1. Understanding merge sort
const nums = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40];
// A. [ 21, 1 ] [ 26, 45 ]
// B. [ 1, 2, 9, 16, 21, 26, 27, 28, 29, 34, 39, 40, 43, 45, 46, 49 ]
// C. [ 21, 1, 26, 45, 29, 28, 2, 9 ] [ 16, 49, 39, 27, 43, 34, 46, 40 ]
// d. [ 29 ] [ 28 ]

// console.log(mSort(nums))

// 2. Understanding quicksort

// console.log(qSort([14, 17, 13, 15, 19, 10, 3, 16, 9, 12], 0, 14))
// console.log(qSort([14, 17, 13, 15, 19, 10, 3, 16, 9, 12], 0, 12))
// A. Answer is b. because the numbers are next to each other in the array if sorted a < b

// o	When using the last item on the list as a pivot
// Partition #1: (Pivot = 12) [10, 3, 9, 12, 14, 17, 13, 15, 19, 16]
// Partition #2: (Left - side, pivot = 9)[3, 9, 10, 12, 14, 17, 13, 15, 19, 16]

// o	When using the first item on the list as a pivot
// Partition #1: (pivot = 14) [13, 10, 3, 9, 12, 14, 17, 15, 19, 16]
// Partition #2: (Left - side, pivot = 13)[10, 3, 9, 12, 13, 14, 17, 15, 19, 16]

const num = [
  89,
  30,
  25,
  32,
  72,
  70,
  51,
  42,
  25,
  24,
  53,
  55,
  78,
  50,
  13,
  40,
  48,
  32,
  26,
  2,
  14,
  33,
  45,
  72,
  56,
  44,
  21,
  88,
  27,
  68,
  15,
  62,
  93,
  98,
  73,
  28,
  16,
  46,
  87,
  28,
  65,
  38,
  67,
  16,
  85,
  63,
  23,
  69,
  64,
  91,
  9,
  70,
  81,
  27,
  97,
  82,
  6,
  88,
  3,
  7,
  46,
  13,
  11,
  64,
  76,
  31,
  26,
  38,
  28,
  13,
  17,
  69,
  90,
  1,
  6,
  7,
  64,
  43,
  9,
  73,
  80,
  98,
  46,
  27,
  22,
  87,
  49,
  83,
  6,
  39,
  42,
  51,
  54,
  84,
  34,
  53,
  78,
  40,
  14,
  5,
];

// 3. Implementing quicksort
// console.log(qSort(num))

// 4. Implementing merge sort
// console.log(mSort(num));

//  5. Sorting a linked list using merge sort
function mSortList(list) {
  let currNode = list.head;
  if (currNode.next === null) {
    return list;
  }
  let length = 1;
  while (currNode.next !== null) {
    length++;
    currNode = currNode.next;
  }
  const middleI = Math.floor(length / 2);
  let leftList = splitList(list, 0, middleI);
  let rightList = splitList(list, middleI, length);
  leftList = mSortList(leftList);
  rightList = mSortList(rightList);
  return mergeLists(leftList, rightList);
}

function splitList(list, startI, endI) {
  let currNode = list.head;
  if (currNode === null) return;
  const returnList = new LinkedList();
  let i = 0;
  while (currNode !== null) {
    if (i >= startI && i < endI) {
      returnList.insertLast(currNode.value);
    }
    i++;
    currNode = currNode.next;
  }
  return returnList;
}

function mergeLists(leftList, rightList) {
  const mergedList = new LinkedList();
  let currLeft = leftList.head;
  let currRight = rightList.head;
  while (currLeft && currRight) {
    if (currLeft.value <= currRight.value) {
      mergedList.insertLast(currLeft.value);
      currLeft = currLeft.next;
    } else {
      mergedList.insertLast(currRight.value);
      currRight = currRight.next;
    }
  }
  while (currLeft) {
    mergedList.insertLast(currLeft.value);
    currLeft = currLeft.next;
  }
  while (currRight) {
    mergedList.insertLast(currRight.value);
    currRight = currRight.next;
  }
  return mergedList;
}

function mSortList_main() {
  const LL = new LinkedList();
  LL.insertFirst(7);
  LL.insertFirst(8);
  LL.insertFirst(3);
  LL.insertFirst(6);
  LL.insertFirst(4);
  LL.insertFirst(1);
  LL.insertFirst(2);
  LL.insertFirst(5);

  const sorted = mSortList(LL);
  display(sorted);
}
// mSortList_main();

//  6. Bucket sort
function bucketSort(arr, min, max) {
  const numMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (numMap.get(arr[i]) === undefined) {
      numMap.set(arr[i], 1);
    } else {
      numMap.set(arr[i], numMap.get(arr[i]) + 1);
    }
  }
  let arrI = 0;
  for (let i = min; i <= max; i++) {
    let numAppearing = numMap.get(i);
    while (numAppearing) {
      arr[arrI] = i;
      numAppearing--;
      arrI++;
    }
  }
  return arr;
}

function bucketSort_main() {
  const ARR = [3, 7, 4, 9, 12, 5, 19, 4, 2, 9, 1, 5];
  const MAX = Math.max(...ARR);
  const MIN = Math.min(...ARR);
  bucketSort(ARR, MIN, MAX);
  console.log(ARR);
}
// bucketSort_main();

// 7. Sort in place
function shuffle(array) {
  let ran = Math.floor(Math.random() * array.length);
  for (let i = 0; i < array.length - 1; i++) {
    swap(array, i, ran);
  }
  return array;
}
// console.log(shuffle([4, 2, 9, 1, 5]));

// 8. Sorting books
const books = [
  "In Search of Lost Time",
  "The Great Gatsby",
  "One Hundred Years of Solitude",
  "War and Peace",
  "The Odyssey",
  "The Brothers Karamazov",
  "Crime and Punishment",
  "The Divine Comedy",
  "The Adventures of Huckleberry Finn",
  "Alice's Adventures in Wonderland",
  "Pride and Prejudice",
  "Wuthering Heights",
  "Goodnight Moon",
  "Tome of Horrors",
  "Where the Wild Things Are",
  "Papercraft",
  "Grimms Fairy Tales",
  "Bedtime Bestsellers",
  "To the Lighthouse",
  "A Confederacy of Dunces",
];

function charCompare(str1, str2, index = 0) {
  if (str1 === str2) {
    return true;
  }
  if (
    str1.toLowerCase().charCodeAt(index) < str2.toLowerCase().charCodeAt(index)
  ) {
    return true;
  } else if (
    str1.toLowerCase().charCodeAt(index) > str2.toLowerCase().charCodeAt(index)
  ) {
    return false;
  } else {
    return charCompare(str1, str2, index + 1);
  }
}

function bookSort(books) {
  if (books.length <= 1) return books;
  const mid = Math.floor(books.length / 2);
  let left = books.slice(0, mid);
  let right = books.slice(mid, books.length);
  left = bookSort(left);
  right = bookSort(right);
  let lIdx = 0;
  let rIdx = 0;
  let outIdx = 0;
  while (lIdx < left.length && rIdx < right.length) {
    if (charCompare(left[lIdx], right[rIdx])) books[outIdx++] = left[lIdx++];
    else books[outIdx++] = right[rIdx++];
  }
  for (let i = lIdx; i < left.length; i++) {
    books[outIdx++] = left[i];
  }
  for (let j = rIdx; j < right.length; j++) {
    books[outIdx++] = right[j];
  }
  return books;
}

// console.log(bookSort(books));
