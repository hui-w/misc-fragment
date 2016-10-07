var app = angular.module("rateApp", []);
//app.controller("rateCtrl", controller);
app.controller("rateCtrl", ['$scope', controller]);

app.filter(
	'to_trusted', ['$sce', function ($sce) {
			return function (text) {
				return $sce.trustAsHtml(text);
			}
		}
	]);

app.filter('range',  function()  {
	return function(input,  total)  {
		total  =  parseInt(total);
		for (var i = 0;  i <=  total;  i++)
		input.push(i);
		return input;
	};
});
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});