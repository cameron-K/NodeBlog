var nodeBlog=angular.module('nodeBlog',['ngRoute','ngSanitize']);
nodeBlog.config(function($routeProvider){
  $routeProvider
  .when('/',{templateUrl:'/partials/posts.html'})
  .when('/new',{templateUrl: '/partials/newPost.html'})
  .when('/view/:id',{templateUrl:'/partials/viewPost.html'})
  .when('/edit/:id',{templateUrl:'partials/editPost.html'})
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

  factory.updatePost=function(update){
    $http.post('/updatepost',update).success(function(){
      $location.path('/view/'+update.post_id);
    })
  }

  factory.deletePost=function(id){
    $http.post('/deletepost',{id:id}).success(function(){
      $location.path('/');
    })
  }

  return factory; 
});


nodeBlog.controller('postsController',function($scope,postFactory,$location){

  // function getPosts(){
    $scope.posts=[];
    postFactory.getPosts(function(data){$scope.posts=data;});    
  // }

  
  $scope.newPost=function(){
    postFactory.newPost($scope.new_post);
    $scope.posts.push($scope.new_post);
  };

  


})

nodeBlog.controller('postController',function($scope,postFactory,$routeParams){

    $scope.post={};
    $scope.update={};

    postFactory.getPost($routeParams.id,function(data){
      $scope.post={};
      $scope.post=data;
      $scope.update=data;
    });

    $scope.updatePost=function(){
      $scope.update.post_id=$routeParams.id;
      postFactory.updatePost($scope.update);
    }

    $scope.confirmDeletion=function(){
      document.getElementById('confirm_delete_post').style.display='none';
      document.getElementById('delete_post').style.display='inline';
      document.getElementById('cancel_deletion').style.display='inline';
    }
    $scope.cancelDeletion=function(){
      document.getElementById('confirm_delete_post').style.display='inline';
      document.getElementById('delete_post').style.display='none';
      document.getElementById('cancel_deletion').style.display='none';
    }
    $scope.deletePost=function(id){
      postFactory.deletePost(id);
    }

})


