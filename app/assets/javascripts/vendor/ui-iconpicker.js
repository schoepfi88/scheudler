/**
 * ui-iconpicker
 *
 * @version   v0.1.4
 * @author    Justin Lau <justin@tclau.com>
 * @copyright Copyright (c) 2014 Justin Lau <justin@tclau.com>
 * @license   The MIT License (MIT)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("values/icon-groups-map", ["angular"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/values/icon-groups-map", []);
    return module.value("iconGroupsMap", {
      "font-awesome": {
        prefix: "flaticon-",
        classes: 
        ["aim5",  "americanfootball", "americanfootball1", "american21", "arrow571", "award47", "badminton1", "badminton5", "ball12", "ball19", "ball23", "ball39", "ball6", "barbell", "baseball24", "baseball28", "baseball3", "basket", "basketball19", "basketball3", "basketball31", "basketball35", "bat", "biceps", "bicycle14", "black276", "bowling2", "bowling21", "bowling23", "boxing3", "brazil6", "checkered12", "chronograph", "chronometer19", "climb", "climbing5", "climbing6", "competition", "crashhelmet", "cricket2", "cycling", "cycling4", "dart13", "dart18", "disk", "dumbbell20", "dumbbell21", "dumbbell25", "dumbbells2", "excercising", "exercise", "exercise1", "exercising", "extreme1", "finish", "finish1", "first33", "first6", "fishing11", "flag76", "flexions", "floating1", "flying12", "football", "football102", "football116", "football118", "football124", "football157", "football160", "football28", "football37", "football68", "football69", "football75", "football78", "football96", "game64", "girl2", "goal", "golf1", "golf17", "golf22", "golf31", "golf9", "group9", "guru1", "gym8", "heart11", "heart288", "hiking", "hiking1", "hunter", "hunting", "ice57", "ice79", "ice81", "jumping2", "karate", "kitesurfing", "male2", "man252", "man255", "man271", "man362", "man429", "man459", "man56", "martial2", "men2", "motorcycle7", "motorcyclist2", "mountain18", "mountain24", "musculous", "objective", "padding", "person17", "person209", "person228", "person242", "person243", "person316", "ping3", "pulling", "recognition6", "regular", "regular2", "riding", "rugby98", "runer", "runner5", "running", "running30", "running31", "running33", "silhouette1", "silhouette2", "silhouette4", "silhouette66", "silhouettes", "ski2", "ski4", "skidiving", "skiing", "skiing1", "skiing7", "soccer", "soccer18", "soccer19", "soccer24", "soccer29", "soccer31", "soccer32", "soccer34", "soccer38", "soccer39", "soccer4", "soccer43", "soccer44", "soccer60", "soccer66", "soccer68", "soccer71", "sport11", "sportive18", "sportive27", "sportive36", "sportive4", "sports26", "sports27", "sports3", "sports5", "squash", "standing92", "star157", "stopwatch1", "stopwatch7", "strategy8", "surf", "surf3", "surfer", "swim1", "swimmer9", "swimming18", "swimming20", "swimming21", "swimming22", "tabletennis", "target51", "tennis", "tennis1", "tennis17", "tennis18", "tennis27", "three13", "time13", "time21", "trail", "trainer", "trainers1", "trekking", "triumph", "trophy33", "trophy4", "trophy42", "trophy45", "trophy53", "trophy69", "upper20", "vehicle33", "volleyball3", "volleyball4", "volleyball6", "volleyball7", "volleyball9", "walking17", "weight11", "weight9", "weightlift", "weightlifter2", "weightlifter3", "windsurf1", "winner1", "winner2", "winners", "yoga12", "yoga13"]  

      }
    });
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("services/IconGroupCollection", ["angular", "values/icon-groups-map"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/services/IconGroupCollection", ["ui-iconpicker/values/icon-groups-map"]);
    return module.factory("IconGroupCollection", [
      "iconGroupsMap", function(iconGroupsMap) {
        var IconGroupCollection;
        return IconGroupCollection = (function() {
          function IconGroupCollection(groupIdLiteral) {
            if (groupIdLiteral == null) {
              groupIdLiteral = "bootstrap";
            }
            this.iconGroupsMap = {};
            this.includeGroups(groupIdLiteral);
          }

          IconGroupCollection.prototype.filterByGroups = function(groupIdLiteral) {
            var group, groupId, groupIds, _ref;
            if (groupIdLiteral == null) {
              groupIdLiteral = "bootstrap";
            }
            if (groupIdLiteral !== "all") {
              groupIds = groupIdLiteral.split(" ");
              _ref = this.iconGroupsMap;
              for (groupId in _ref) {
                group = _ref[groupId];
                if (groupIds.indexOf(groupId) !== -1) {
                  delete this.iconGroupsMap[groupId];
                }
              }
            }
            return this;
          };

          IconGroupCollection.prototype.includeGroups = function(groupIdLiteral) {
            var group, groupId, groupIds;
            if (groupIdLiteral == null) {
              groupIdLiteral = "bootstrap";
            }
            groupIds = groupIdLiteral.split(" ");
            for (groupId in iconGroupsMap) {
              group = iconGroupsMap[groupId];
              if (this.iconGroupsMap[groupId] == null) {
                if (groupIdLiteral === "all" || groupIds.indexOf(groupId) !== -1) {
                  this.iconGroupsMap[groupId] = group;
                }
              }
            }
            return this;
          };

          IconGroupCollection.prototype.getClassArray = function() {
            var classes, group, iconClass, id, _i, _len, _ref, _ref1;
            classes = [];
            _ref = this.iconGroupsMap;
            for (id in _ref) {
              group = _ref[id];
              _ref1 = group.classes;
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                iconClass = _ref1[_i];
                classes.push(group.prefix + iconClass);
              }
            }
            return classes;
          };

          return IconGroupCollection;

        })();
      }
    ]);
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("templates/iconpicker", ["angular", "angular-bootstrap"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/templates/iconpicker", ["ui.bootstrap"]);
    return module.run([
      "$templateCache", function($templateCache) {
        return $templateCache.put("templates/iconpicker.html", "<span class=\"btn-group ui-iconpicker\" ng-class=\"{ disabled: disabled }\">\n	<button type=\"button\" class=\"btn btn-default dropdown-toggle\"><i class=\"{{ iconClass }}\"></i><span class=\"caret\"></span>\n	</button>\n	<ul class=\"dropdown-menu\" role=\"menu\">\n		<li ng-repeat=\"class in availableIconClasses\">\n			<button class=\"btn btn-default\" type=\"button\" ng-click=\"$parent.iconClass = class\"><span class=\"{{ class }}\"></span></button>\n		</li>\n	</ul>\n	<input name=\"{{ name }}\" type=\"hidden\" value=\"{{ iconClass }}\" ng-if=\"name\" />\n</span>");
      }
    ]);
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("directives/ui-iconpicker", ["angular", "services/IconGroupCollection", "templates/iconpicker"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/directives/ui-iconpicker", ["ui-iconpicker/services/IconGroupCollection", "ui-iconpicker/templates/iconpicker"]);
    return module.directive("uiIconpicker", [
      "IconGroupCollection", function(IconGroupCollection) {
        return {
          replace: true,
          restrict: "E",
          scope: {
            name: "@",
            model: "=?ngModel"
          },
          templateUrl: "templates/iconpicker.html",
          link: function($scope, $element, attrs) {
            var _ref;
            $scope.availableIconClasses = (new IconGroupCollection(attrs.groups)).getClassArray();
            $scope.iconClass = (_ref = attrs.value) != null ? _ref : $scope.availableIconClasses[0];
            if (attrs.ngModel) {
              $scope.model = $scope[attrs.ngModel];
              $scope.$watch("iconClass", function() {
                return $scope.model = $scope.iconClass;
              });
              $scope.$watch("model", function() {
                return $scope.iconClass = $scope.model;
              });
            }
            $scope.$dropdownButton = $element.find("button").eq(0);
            return $scope.disabled = attrs.disabled != null;
          }
        };
      }
    ]);
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("ui-iconpicker", ["angular", "directives/ui-iconpicker"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    return angular.module("ui-iconpicker", ["ui-iconpicker/directives/ui-iconpicker"]);
  });

}).call(this);

