
# Drag It
A reusable JavaScript class to handle the drag and drop

### Demo
https://hui-w.github.io/misc-fragment/drag-it/

### How to use
```js
var obj = document.getElementById("objId");

//create the instance of DragIt and register the callback
var d = new DragIt(obj);
d.registerCallback(function(offset) {
    //offset = {left: X, top: Y}
    obj.style.left = offset.left + "px";
    obj.style.top = offset.top + "px";
});
```

# Javascript Excel

#### Demo
https://hui-w.github.io/misc-fragment/js-excel/

#### How to use the demo
1. On the demo page, download the files of data and sub collections
2. Drag the data file and drop it into the 1st file area, then the sheet names will be listed
3. Drag the sub collections file and drop it into the 2nd file area, then all the data will be listed
4. Select the sheet "Project Tracker" from the dropdown list
5. Select the column "B" from the column dropdown list
6. Select the row "4" from the row dropdown list
7. Click "Process" button, then the table of selected data will be displayed
8. Click "Export" button, the table will be exported as an XLSX file

# Rate Calculator

#### Demo
https://hui-w.github.io/misc-fragment/rate-calc/

# React ES6
It's an enviroment configuration for "webpack + react + es6" with no real functionality.