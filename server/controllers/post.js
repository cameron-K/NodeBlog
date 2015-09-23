module.exports=(function(){
	var mongoose=require('mongoose');
	var Post=mongoose.model('Post');

	return {
		getPosts:function(req,res){
			Post.find({},null,{sort:'-created'},function(err,posts){
				if(err) console.log(err)
				else res.json(posts);
			});
		},
		getPost:function(req,res){
			Post.findOne({_id:req.body.id},function(err,results){
				if(err)console.log(err)
				else{
					res.json(results);
				}
			})
		},
		newPost:function(req,res){
			var post=new Post({
				title:req.body.title,
				summary:req.body.summary,
				body:req.body.body,
				created:Date(),
				updated:Date()
			}).save(function(err){
				if(err) console.log(err);
				else res.sendStatus(200);
			});
		},
		updatePost:function(req,res){
			Post.update({_id:req.body.post_id},
					{
						title:req.body.title,
						summary:req.body.summary,
						body:req.body.body,
						updated:Date()
					},function(err){
						if(err)console.log(err);
						else res.sendStatus(200);
					});
		},
		deletePost:function(req,res){
			Post.find({_id:req.body.id}).remove(function(err){
				if(err)console.log(err);
				else res.sendStatus(200);
			})
		}
	}
})();