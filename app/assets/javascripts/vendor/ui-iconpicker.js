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
        //["basketball3", "barbell", "americanfootball", "envelope-o", "heart", "star", "star-o", "user", "film", "th-large", "th", "th-list", "check", "times", "search-plus", "search-minus", "power-off", "signal", "gear", "cog", "trash-o", "home", "file-o", "clock-o", "road", "download", "arrow-circle-o-down", "arrow-circle-o-up", "inbox", "play-circle-o", "rotate-right", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "dedent", "outdent", "indent", "video-camera", "picture-o", "pencil", "map-marker", "adjust", "tint", "edit", "pencil-square-o", "share-square-o", "check-square-o", "arrows", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-circle", "minus-circle", "times-circle", "check-circle", "question-circle", "info-circle", "crosshairs", "times-circle-o", "check-circle-o", "ban", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "mail-forward", "share", "expand", "compress", "plus", "minus", "asterisk", "exclamation-circle", "gift", "leaf", "fire", "eye", "eye-slash", "warning", "exclamation-triangle", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder", "folder-open", "arrows-v", "arrows-h", "bar-chart-o", "twitter-square", "facebook-square", "camera-retro", "key", "gears", "cogs", "comments", "thumbs-o-up", "thumbs-o-down", "star-half", "heart-o", "sign-out", "linkedin-square", "thumb-tack", "external-link", "sign-in", "trophy", "github-square", "upload", "lemon-o", "phone", "square-o", "bookmark-o", "phone-square", "twitter", "facebook", "github", "unlock", "credit-card", "rss", "hdd-o", "bullhorn", "bell", "certificate", "hand-o-right", "hand-o-left", "hand-o-up", "hand-o-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up", "arrow-circle-down", "globe", "wrench", "tasks", "filter", "briefcase", "arrows-alt", "group", "users", "chain", "link", "cloud", "flask", "cut", "scissors", "copy", "files-o", "paperclip", "save", "floppy-o", "square", "bars", "list-ul", "list-ol", "strikethrough", "underline", "table", "magic", "truck", "pinterest", "pinterest-square", "google-plus-square", "google-plus", "money", "caret-down", "caret-up", "caret-left", "caret-right", "columns", "unsorted", "sort", "sort-down", "sort-asc", "sort-up", "sort-desc", "envelope", "linkedin", "rotate-left", "undo", "legal", "gavel", "dashboard", "tachometer", "comment-o", "comments-o", "flash", "bolt", "sitemap", "umbrella", "paste", "clipboard", "lightbulb-o", "exchange", "cloud-download", "cloud-upload", "user-md", "stethoscope", "suitcase", "bell-o", "coffee", "cutlery", "file-text-o", "building-o", "hospital-o", "ambulance", "medkit", "fighter-jet", "beer", "h-square", "plus-square", "angle-double-left", "angle-double-right", "angle-double-up", "angle-double-down", "angle-left", "angle-right", "angle-up", "angle-down", "desktop", "laptop", "tablet", "mobile-phone", "mobile", "circle-o", "quote-left", "quote-right", "spinner", "circle", "mail-reply", "reply", "github-alt", "folder-o", "folder-open-o", "smile-o", "frown-o", "meh-o", "gamepad", "keyboard-o", "flag-o", "flag-checkered", "terminal", "code", "reply-all", "mail-reply-all", "star-half-empty", "star-half-full", "star-half-o", "location-arrow", "crop", "code-fork", "unlink", "chain-broken", "question", "info", "exclamation", "superscript", "subscript", "eraser", "puzzle-piece", "microphone", "microphone-slash", "shield", "calendar-o", "fire-extinguisher", "rocket", "maxcdn", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-circle-down", "html5", "css3", "anchor", "unlock-alt", "bullseye", "ellipsis-h", "ellipsis-v", "rss-square", "play-circle", "ticket", "minus-square", "minus-square-o", "level-up", "level-down", "check-square", "pencil-square", "external-link-square", "share-square", "compass", "toggle-down", "caret-square-o-down", "toggle-up", "caret-square-o-up", "toggle-right", "caret-square-o-right", "euro", "eur", "gbp", "dollar", "usd", "rupee", "inr", "cny", "rmb", "yen", "jpy", "ruble", "rouble", "rub", "won", "krw", "bitcoin", "btc", "file", "file-text", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-numeric-asc", "sort-numeric-desc", "thumbs-up", "thumbs-down", "youtube-square", "youtube", "xing", "xing-square", "youtube-play", "dropbox", "stack-overflow", "instagram", "flickr", "adn", "bitbucket", "bitbucket-square", "tumblr", "tumblr-square", "long-arrow-down", "long-arrow-up", "long-arrow-left", "long-arrow-right", "apple", "windows", "android", "linux", "dribbble", "skype", "foursquare", "trello", "female", "male", "gittip", "sun-o", "moon-o", "archive", "bug", "vk", "weibo", "renren", "pagelines", "stack-exchange", "arrow-circle-o-right", "arrow-circle-o-left", "toggle-left", "caret-square-o-left", "dot-circle-o", "wheelchair", "vimeo-square", "turkish-lira", "try", "plus-square-o"]
        ["aim5","americanfootball","americanfootball1","american21","arro ","award47","badminton1","badminton5","ball12 ","ball19 ","ball23 ","ball39 ","ball6 ","barbell ","baseball24 ","baseball28 ","baseball3 ","basket ","basketball19 ","basketball3 ","basketball31 ","basketball35 ","bat ","biceps ","bicycle14 ","blac  ","bowling2 ","bowling21 ","bowling23 ","boxing3 ","brazil6 ","checkered12 ","chronograph ", "chronometer19 ","climb ","climbing5 ","climbing6 ","competition ","crashhelmet ","cricket2 ","cycling ","cycling4 ","dart13 ","dart18 ","disk ","dumbbell20 ","dumbbell21 ","dumbbell25 ","dumbbells2 ","excercising ","exercise ","exercise1 ","exercising ","extreme1 ","finish ","finish1 ","first33 ","first6 ","fishing11 ","flag76 ","flexions ","floating1 ","flying12 ", "football124  ","football175", "football28 ","football37 ","football68 ","football69 " ,"football75 ","football78 ","football96 ","game64 ","girl2 ","goal ","golf1 ","golf17 ","golf22 ","golf31 ","golf9 ","group9 ","guru1 ","gym8 ","heart11 ","hear  ","hiking ","hiking1 ","hunter ","hunting ","ice57 ","ice79 ","ice81 ","jumping2 " ,"karate ","kitesurfing ","man56 ","martial2 ","men2 ","motorcycle7 ","motorcyclist2 " ,"mountain18 ","mountain24 ","musculous ","objective ","padding ","person17 ","ping3 ","pulling ","recognition6 ","regular ","regular2 ","riding ","rugby98 ","runer ","runner5 ","running ","running30 ","running31 ","running33 ","silhouette1 ","silhouette2 ","silhouette4 ","silhouette66 ","silhouettes ","ski2 ","ski4 ","skidiving ","skiing ","skiing1 ","skiing7 ","soccer ","soccer18 ","soccer19 ","soccer24 ","soccer29 ","soccer31 ","soccer32 ","soccer34 ","soccer38 ","soccer39 ","soccer4 ","soccer43 ","soccer44 ","soccer60 ","soccer66 ","soccer68 ","soccer71 ","sport11 ","sportive18 ","sportive27 ","sportive36 ","sportive4 ","sports26 ","sports27 ","sports3 ","sports5 ","squash ","standing92 ","stopwatch1 ","stopwatch7 ","strategy8 ","surf ","surf3 ","surfer ","swim1 ","swimmer9 ","swimming18 ","swimming20 ","swimming21 ","swimming22 ","tabletennis ","target51 ","tennis ","tennis1 ","tennis17 ","tennis18 ","tennis27 ","three13 ","time13 ","time21 ","trail ","trainer ","trainers1 ","trekking ","triumph ","trophy33 ","trophy4 ","trophy42 ","trophy45 ","trophy53 ","trophy69 ","upper20 ","vehicle33 ","volleyball3 ","volleyball4 ","volleyball6 ","volleyball7 ","volleyball9 ","walking17 ","weight11 ","weight9 ","weightlift ","weightlifter2 ","weightlifter3 ","windsurf1 ","winner1 ","winner2 ","winners ","yoga12 ","yoga13 "]

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

