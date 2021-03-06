module.exports=function(app){
	var post=require('../server/controllers/post.js');

	app.get('/getposts',function(req,res){
		post.getPosts(req,res);
	});

	app.post('/getpost',function(req,res){
		post.getPost(req,res);
	});

	app.post('/newpost',function(req,res){
		post.newPost(req,res);
	});

	app.post('/updatepost',function(req,res){
		post.updatePost(req,res);
	});

	app.post('/deletepost',function(req,res){
		post.deletePost(req,res);
	})
}