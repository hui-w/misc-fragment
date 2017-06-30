String.prototype.trim = function() {
    return this.replace(/(^\s*)(\s*$)/g, '');
}

String.prototype.isNumber = function() {
    var number = this.search(/^\d+$/);
    if (number == -1)
        return false;
    return true;
}

String.format = function() {
    if (arguments.length == 0) {
        return null;
    }
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

function getOutput(income, rule) {
    var outStr = "<table border=\"0\">";
    //outStr += "<tr>";
    //outStr += String.format("<td colspan=\"3\"><strong>{0}</strong></td>", title);
    //outStr += "</tr>";
    
    outStr += "<tr>";
    outStr += "<td colspan=\"2\">税前收入:</td>";
    outStr += "<td>" + income + "</td>";
    outStr += "</tr>";

    var taxIncome = income - rule[0];
    outStr += "<tr>";
    outStr += "<td colspan=\"2\">应纳税收入:</td>";
    outStr += String.format("<td>{0} - {1}<br /> = <strong>{2}</strong></td>", income, rule[0], taxIncome);
    outStr += "</tr>";

    var totalTax = 0;
    for (var i = 1; i < rule.length; i++) {
        var levelFrom = rule[i][0];
        var leveTo = (i == rule.length - 1) ? 0 : rule[i + 1][0];
        var levelIncome = 0;
        var levelRate = rule[i][1];
        
        
        outStr += "<tr>";
        if (leveTo == 0) {
            outStr += String.format("<td>{0} 以上</td>", rule[i][0]);
            outStr += String.format("<td>{0}%</td>", levelRate)

            levelIncome = taxIncome;
        }
        else {
            outStr += String.format("<td>{0} - {1}</td>", rule[i][0], rule[i + 1][0]);
            outStr += String.format("<td>{0}%</td>", levelRate)

            var levelSize = leveTo - levelFrom;
            levelIncome = (taxIncome > levelSize) ? levelSize : taxIncome;
        }
        taxIncome -= levelIncome;

        if (levelIncome > 0) {
            var levelTax = levelIncome * levelRate / 100;
            outStr += String.format("<td>{0} * {1}%<br />  = <strong>{2}</strong></td>", levelIncome, levelRate, levelTax);
            totalTax += levelTax;
        }
        else {
            outStr += String.format("<td>0</td>");
        }
        outStr += "</tr>";
    }

    outStr += "<tr>";
    outStr += "<td colspan=\"2\">总计纳税:</td>";
    outStr += String.format("<td>{0}</td>", totalTax);
    outStr += "</tr>";

    outStr += "<tr>";
    outStr += "<td colspan=\"2\" class=\"last\">税后收入:</td>";
    outStr += String.format("<td class=\"last\">{0} - {1}<br /> = <strong>{2}</strong></td>", income, totalTax, income - totalTax);
    outStr += "</tr>";
    outStr += "</table>";

    return outStr;
}

var rule2 = [3500, 
[0, 3],
[1500, 10],
[4500, 20],
[9000, 25],
[35000, 30],
[55000, 35],
[80000, 45]
];

var rule4 = [0,
[0, 5],
[15000, 10],
[30000, 20],
[60000, 30],
[100000, 35]
];