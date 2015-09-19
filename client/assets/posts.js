var nodeBlog=angular.module('nodeBlog',['ngRoute']);
nodeBlog.config(function($routeProvider){
  $routeProvider
  .when('/',{templateUrl:'/partials/posts.html'})
  .when('/new',{templateUrl: '/partials/newPost.html'})
  .when('/view/:id',{templateUrl:'/partials/viewPost.html'})
  .otherwise({
    redirectTo:'/'
  })
});


nodeBlog.factory('postFactory',function($http,$location){
  var factory={};

  factory.getPosts=function(setScope){
    $http({
      url:'/getposts',
      method:'GET'
    }).success(function(data){
      setScope(data);
    });
  };

  factory.getPost=function(id,setScope){
    $http.post('/getpost',{id:id}).success(function(data){
      setScope(data);
    });
    
  }

  factory.newPost=function(post){
    $http.post('/newpost',post).success(function(){
      $location.path('/');
    });
  };

  return factory; 
});


nodeBlog.controller('postsController',function($scope,postFactory,$location){

  $scope.posts=[];
  postFactory.getPosts(function(data){$scope.posts=data;});

  
  $scope.newPost=function(){
    postFactory.newPost($scope.new_post);
    $scope.posts.push($scope.new_post);
  };

  // $scope.viewPost=function(id){
  //   $location.path('/view/'+id);
  // }


})

nodeBlog.controller('postController',function($scope,postFactory,$routeParams){

    $scope.post={};
    postFactory.getPost($routeParams.id,function(data){
      $scope.post={};
      $scope.post=data;
    });

})


