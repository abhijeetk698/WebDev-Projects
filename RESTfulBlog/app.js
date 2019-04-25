var bodyParser=require("body-parser");
var mongoose =require("mongoose");
var express=require("express");
var methodOverride = require("method-override");
var expressSanitizer=require("express-sanitizer")
app=express();
// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());
//DB CONFIG
var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date,default:Date.now}
});
var Blog=mongoose.model("Blog",blogSchema);

// RESTFUL ROUTES
app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("error while recieving data from db");
        }
        else{
            res.render("index",{blogs:blogs});
        }
    });
})
app.post("/blogs",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/new",function(req,res){
    res.render("new");
});

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            res.send("sorry there was an error");
        }
        else{
            res.render("show",{blog:blog});
        }
    });
});

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            res.send("sorry there was an error");
        }
        else{
            res.render("edit",{b:blog});
        }
    });
});

app.put("/blogs/:id/",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,newData){
        if(err){
            res.send("there is some error");
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
})
app.delete("/blogs/:id/",function(req,res){
    Blog.findByIdAndDelete(req.params.id,function(err,newData){
        if(err){
            res.send("there is some error");
        }
        else{
            res.redirect("/blogs");
        }
    })
})


app.listen(2121,function(){
    console.log("Server is running");
});