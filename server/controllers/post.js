module.exports=(function(){
	var mongoose=require('mongoose');
	var Post=mongoose.model('Post');

	return {
		getPosts:function(req,res){
			Post.find({},function(err,posts){
				if(err) console.log(err)
				else res.json(posts);
			});
		},
		getPost:function(req,res){
			Post.findOne({_id:req.body.id},function(err,results){
				if(err)console.log(err)
				else res.json(results);
			})
		},
		newPost:function(req,res){
			var post=new Post({
				title:req.body.title,
				body:req.body.body,
				created:Date(),
				updated:Date()
			}).save(function(err){
				if(err) console.log(err);
				else res.sendStatus(200);
			});
		}
	}
})();