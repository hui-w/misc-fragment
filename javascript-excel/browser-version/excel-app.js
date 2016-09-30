function ExcelApp(file) {
  this.file = file;
  this.workbook = null;

  // Read and process the file
  this.init();
};

ExcelApp.prototype = {
  init: function() {
    var that = this;
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      // If binary string, read with type 'binary'
      var workbook = XLSX.read(data, {type: 'binary'});

      // Get the workbook
      that.workbook = workbook;

      // Start the job
      that.processWorkbook();
    };
    reader.readAsBinaryString(f);
  },

  processWorkbook: function() {
    console.log(this.workbook);
  }
}