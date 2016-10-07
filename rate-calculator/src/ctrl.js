var controller = function ($scope) {
	$scope.base = 100;
	$scope.rate = 1.01;
	$scope.count = 12;
	$scope.roiData = [];
	$scope.tipsHtml = null;
	$scope.selectedCell = null;

	$scope.cellClick = function (target, index) {
		if ($scope.selectedCell != null) {
			$scope.selectedCell.className = "right";
		}
		target.className += " highlighted";
		$scope.selectedCell = target;
	};

	$scope.onTextClick = function ($event) {
		$event.target.select();
	};

	$scope.calculate = function () {
		$scope.tipsHtml = null;
		$scope.roiData = [];

		if (!angular.isNumber($scope.base) || !angular.isNumber($scope.rate) || !angular.isNumber($scope.count)) {
			$scope.tipsHtml = "<div class=\"error\">Only decimals are allowed</div>";
			return;
		}

		if ($scope.count > 500) {
			$scope.tipsHtml = "<div class=\"error\">Maximum investment is 500</div>";
			return;
		}

		var currentValue = $scope.base;
		for (var i = 0; i <= $scope.count; i++) {
			$scope.roiData.push({
				index : i,
				value : currentValue.toFixed(3)
			});
			currentValue *= $scope.rate;
		}
	};
}
