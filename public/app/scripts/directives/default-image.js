angular
  .module('defaultImage',[])
  .directive('defaultImage', defaultImage);

function defaultImage() {
  var directive = {
    link: link,
    restrict: 'A'
  };
  return directive;

  function link(scope, element, attrs) {
    element.bind('error', function() {
      element.attr('src', attrs.defaultImage);
    })
  }
}

//<img ng-src="{{photo.profile}}" default-image="https://instagramimages-a.akamaihd.net/profiles/anonymousUser.jpg">

