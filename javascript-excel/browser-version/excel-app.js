function ExcelApp() {
  // Data
  this.wbData = null;
  this.dataSheets = [];

  // Sub collections
  this.wbSub = null;
  this.subCollections = [];

  // Sheet array
  this.sheetArray = null;

  // Dom objects
  this.dataTitleDom = null;
  this.subTitleDom = null;
  this.dataDropDom = null;
  this.subDropDom = null;
  this.actionContainerDOM = null;
  this.sheetSelectorDOM = null;
  this.columnSelectorDOM = null;
  this.processButton = null;
  this.exportButton = null;
  this.tableContainerDom = null;
  this.outputTableDom = null;
};

ExcelApp.prototype = {
  getWorkbook: function(file, onComplete) {
    var reader = new FileReader();
    var name = file.name;
    reader.onload = function(e) {
      var data = e.target.result;

      // If binary string, read with type 'binary'
      var workbook = XLSX.read(data, {
        type: 'binary'
      });

      // Start the job
      onComplete(workbook);
    };
    reader.readAsBinaryString(file);
  },

  getCellInfo: function(cellName) {
    var regx = /([A-Z]+)([0-9]+)/;
    var group = cellName.match(regx);
    return {
      row: group[2],
      col: group[1]
    };
  },

  sheetToArray: function(worksheet) {
    var sheetArray = [];

    var colKeys = [];
    var rowKeys = [];

    var colObj = {};
    var rowObj = {};

    // Get the array of column and row names
    for (var cellKey in worksheet) {
      if (cellKey[0] === '!') {
        continue
      };
      var info = this.getCellInfo(cellKey);

      // Check the column: "A-Z"
      if (!colObj[info.col]) {
        colObj[info.col] = true;
        colKeys.push(info.col);
      }

      // Check the row: "0-9"
      if (!rowObj[info.row]) {
        rowObj[info.row] = true;
        rowKeys.push(info.row);
      }
    }

    // Init the array
    for (var row = 0; row < rowKeys.length; row ++) {
      var rowArray = [];
      for (var col = 0; col < colKeys.length; col ++) {
        var colKey = colKeys[col] + rowKeys[row];
        if (worksheet[colKey]) {
          rowArray.push(worksheet[colKey].v);
        } else {
          rowArray.push('');
        }
        
      }
      sheetArray.push(rowArray);
    }

    return {
      colKeys: colKeys,
      rowKeys: rowKeys,
      sheetArray: sheetArray
    };
  },

  getColumns: function(worksheet) {
    var colKeys = [];
    var colObj = {};
    for (var cellName in worksheet) {
      if (cellName[0] === '!') {
        continue
      };
      var col = this.getCellInfo(cellName).col;
      if (!colObj[col]) {
        colObj[col] = true;
        colKeys.push(col);
      }
    }
    return colKeys;
  },

  renderColumnSelect: function(worksheet) {
    var that = this;

    // Render the column select
    if (this.columnSelectorDOM) {
      while (this.columnSelectorDOM.options.length > 0) {
        this.columnSelectorDOM.remove(0);
      }
      this.columnSelectorDOM.selectedIndex = 0;
    } else {
      this.columnSelectorDOM = this.actionContainerDOM.createChild('select');
    }

    // Render the column options
    var cols = this.getColumns(worksheet);
    cols.forEach(function(col) {
      that.columnSelectorDOM.createChild('option', {
        value: col
      }, col);
    });
  },

  renderSheetSelect: function(workbook) {
    var that = this;
    function sheetSelectChange() {
      var select = that.sheetSelectorDOM;
      var selectedSheetName = select.options[select.selectedIndex].value;
      var worksheet = that.wbData.Sheets[selectedSheetName];

      console.log(worksheet);
      console.log(that.sheetToArray(worksheet));

      that.renderColumnSelect(worksheet);
    };

    // Render the sheet select
    if (this.sheetSelectorDOM) {
      while (this.sheetSelectorDOM.options.length > 0) {
        this.sheetSelectorDOM.remove(0);
      }
      this.sheetSelectorDOM.selectedIndex = 0;
    } else {
      this.sheetSelectorDOM = this.actionContainerDOM.createChild('select');
      this.sheetSelectorDOM.addEventListener('change', sheetSelectChange, false);
    }

    // Render the sheet options
    workbook.SheetNames.forEach(function(sheetName) {
      that.sheetSelectorDOM.createChild('option', {
        value: sheetName
      }, sheetName);
    });

    // Trigger the sheet change
    sheetSelectChange();
  },

  readData: function(file) {
    var that = this;

    this.getWorkbook(file, function(workbook) {
      that.wbData = workbook;
      that.dataSheets = workbook.SheetNames;

      // Data read complete
      that.dataDropDom.addClassName('dropped');
      that.dataDropDom.innerHTML = 'Data Sheets: ' + that.dataSheets.join(', ');

      // Render the sheet select
      that.renderSheetSelect(workbook);

      that.enableProcessButton();
    });
  },

  readSub: function(file) {
    var that = this;
    this.getWorkbook(file, function(workbook) {
      that.wbSub = workbook;
      that.subCollections = [];

      // Read the sub collections
      var sheets = workbook.SheetNames;
      sheets.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        for (var z in worksheet) {
          if (z[0] === '!') continue;
          //console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
          that.subCollections.push(worksheet[z].v);
        }
      });

      // Sub read complete
      that.subDropDom.addClassName('dropped');
      that.subDropDom.innerHTML = 'Sub Collections: ' + that.subCollections.join(', ');
      that.enableProcessButton();
    });
  },

  render: function(dom) {
    dom.createChild('div', {
      class: 'section'
    }, 'Supported File Types: [XLSX / XLSM / XLSB / ODS / XLS / XML]');

    // Data
    var dataSection = dom.createChild('div', {
      class: 'section'
    });
    var dataTitle = dataSection.createChild('div', {
      class: 'title'
    }, 'Data: ');
    this.dataTitleDom = dataTitle.createChild('span', {
      class: 'file-name'
    });
    this.dataDropDom = dataSection.createChild('div', {
      class: 'drop'
    }, 'Drop a file here');

    // Select container
    this.actionContainerDOM = dom.createChild('div', {
      class: 'section'
    });

    // Sub
    var subSection = dom.createChild('div', {
      class: 'section'
    });
    var subTitle = subSection.createChild('div', {
      class: 'title'
    }, 'Sub Collection: ');
    this.subTitleDom = subTitle.createChild('span', {
      class: 'file-name'
    });
    this.subDropDom = subSection.createChild('div', {
      class: 'drop'
    }, 'Drop a file here');

    // Table
    this.tableContainerDom = dom.createChild('div', {
      class: 'section'
    });

    // Bind the drop handlers
    this.bindDrop();
  },

  bindDrop: function() {
    var that = this;

    function handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }

    this.dataDropDom.addEventListener('dragenter', handleDragover, false);
    this.dataDropDom.addEventListener('dragover', handleDragover, false);
    this.dataDropDom.addEventListener('drop', function(e) {
      that.acceptDropFile(e, true);
    }, false);

    this.subDropDom.addEventListener('dragenter', handleDragover, false);
    this.subDropDom.addEventListener('dragover', handleDragover, false);
    this.subDropDom.addEventListener('drop', function(e) {
      that.acceptDropFile(e, false);
    }, false);
  },

  acceptDropFile: function(e, isData) {
    var that = this;

    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    // for (i = 0, f = files[i]; i != files.length; ++i) {
    if (files.length <= 0) {
      return;
    }

    var file = files[0];
    if (isData) {
      this.dataTitleDom.innerHTML = file.name;
      this.readData(file)
    } else {
      this.subTitleDom.innerHTML = file.name;
      this.readSub(file)
    }
  },

  enableProcessButton: function() {
    var that = this;

    if (!this.wbData || !this.wbSub) {
      return;
    }

    if (!this.processButton) {
      this.processButton = this.actionContainerDOM.createChild('input', {
        type: 'button',
        value: 'Process',
        class: 'action-button'
      });
      this.processButton.addEventListener('click', function() {
        that.processData();
      }, false);
    }
  },

  processData: function() {
    var sheetName = this.sheetSelectorDOM.options[this.sheetSelectorDOM.selectedIndex].value;
    var columnName = this.columnSelectorDOM.options[this.columnSelectorDOM.selectedIndex].value;

    var subCollections = this.subCollections;
    var worksheet = this.wbData.Sheets[sheetName];

    // Rows to export
    var rows = [];

    // Find rows
    for (z in worksheet) {
      if (z[0] === '!') {
        continue;
      }

      var cellInfo = this.getCellInfo(z);
      if (cellInfo.col !== columnName) {
        continue;
      }

      if (this.foundInSub(worksheet[z].v)) {
        rows.push(cellInfo.row);
      }
    }

    // Export rows
    var cols = this.getColumns(worksheet);

    var data = [];
    for (var i = 0; i < rows.length; i++) {
      var dataRow = [];
      for (var j = 0; j < cols.length; j++) {
        dataRow.push(null);
      }
      data.push(dataRow);
    }

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < cols.length; j++) {
        var columnName = cols[j] + rows[i];
        if (worksheet[columnName]) {
          data[i][j] = worksheet[columnName].v;
        }
      }
    }

    // Render table
    if (this.outputTableDom) {
      this.tableContainerDom.removeChild(this.outputTableDom);
    }

    this.outputTableDom = this.tableContainerDom.createChild('table', {
      class: 'output-table',
      id: 'output-table'
    });
    for (var i = 0; i < data.length; i++) {
      var tr = this.outputTableDom.createChild('tr');
      for (var j = 0; j < data[i].length; j++) {
        tr.createChild('td', {}, data[i][j] ? data[i][j] : '');
      }
    }

    // Render export button
    if (!this.exportButton) {
      this.exportButton = this.actionContainerDOM.createChild('input', {
        type: 'button',
        value: 'Export',
        class: 'action-button'
      });
      this.exportButton.addEventListener('click', function() {
        export_table_to_excel('output-table');;
      }, false);
    }
  },

  foundInSub: function(val) {
    for (var i = 0; i < this.subCollections.length; i++) {
      if (this.subCollections[i] === val) {
        return true;
      }
    }

    return false;
  }
}