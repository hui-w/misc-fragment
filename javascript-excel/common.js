var Util = {
  $: function() {
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
      var element = arguments[i];
      if (typeof element == 'string')
        element = document.getElementById(element);
      if (arguments.length == 1)
        return element;
      elements.push(element);
    }
    return elements;
  }
};

Element.prototype.createChild = function (tag, param, innerHTML) {
  var element = document.createElement(tag);
  this.appendChild(element);
  if (param) {
    for (key in param) {
      element.setAttribute(key, param[key]);
    }
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

Element.prototype.hasClassName = function (a) {
  return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
}

Element.prototype.addClassName = function (a) {
  if (!this.hasClassName(a)) {
    this.className = [this.className, a].join(" ");
  }
}

Element.prototype.removeClassName = function (b) {
  if (this.hasClassName(b)) {
    var a = this.className;
    this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
  }
}

Element.prototype.getStyle = function(key) {
  var style = this.getAttribute("style");
  if (style != null && style.trim().length > 0) {
    var keyValuePairs = style.split(";");
    for (var i = 0; i < keyValuePairs.length && keyValuePairs[i].trim().length > 0; i++) {
      var keyAndValue = keyValuePairs[i].split(":");
      if (keyAndValue.length != 2) {
        continue;
      }
      if (key == keyAndValue[0].trim()) {
        return keyAndValue[1].trim();
      }
    }
  }
  return null;
};

Element.prototype.updateStyle = function(key, value) {
  var oldStyle = this.getAttribute("style");
  var keyExisting = false;
  var newStyle = "";
  if (oldStyle != null && oldStyle.trim().length > 0) {
    var keyValuePairs = oldStyle.split(";");
    for (var i = 0; i < keyValuePairs.length && keyValuePairs[i].trim().length > 0; i++) {
      var keyAndValue = keyValuePairs[i].split(":");
      if (keyAndValue.length != 2) {
        continue;
      }
      if (key == keyAndValue[0].trim()) {
        //apply new value to the key
        keyExisting = true;
        if (value != null) {
          newStyle += key + ": " + value + "; ";
        } else {
          //the value is set as null
        }
      } else {
        //other style key and value
        newStyle += keyAndValue[0].trim() + ": " + keyAndValue[1].trim() + "; ";
      }
    }
  }
  if (!keyExisting) {
    //append to the end
    newStyle += key + ": " + value + "; ";
  }
  this.setAttribute("style", newStyle)
};

Array.prototype.each = function(func, param) {
  var items = this.findItem(param);
  for (var i = 0; i < items.length; i++) {
    if (typeof func == "function") {
      func.call(items[i]);
    }
  }
};

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,
    function(m, i) {
      return args[i];
    });
};
