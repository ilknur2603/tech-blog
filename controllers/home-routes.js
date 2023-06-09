const router = require("express").Router();
const {Post , User , Comment} = require("../models");
// const withAuth = require("../../utils/auth")

router.get("/" , (req, res) => {
    Post.findAll({
        
        attributes : ["id","title", "post_text", "created_at" ],
       
        include : [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include : {
                    model: User,
                    attributes: ["username"]
                }
            }

        ]
    })
    .then((dbPostData) => {
        const posts = dbPostData.map(post => post.get({plain:true}));
        res.render("homepage", {posts, loggedIn: req.session.loggedIn});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})


//************************************************************************* */

router.get("/login", (req, res) => {
    if(req.session.loggedIn){
        res.redirect("/");
        return;

    }
    res.render("login")
})

//******************************************************************* */


router.get("/post/:id", (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes : ["id","title", "post_text", "created_at" ],
        include : [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include : {
                    model: User,
                    attributes: ["username"]
                }
            }

        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: "there is no post id"}) ;
            return;
        }
        const post = dbPostData.get({plain:true});
        res.render("single-post" , {
            post, loggedIn : req.session.loggedIn
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
})

module.exports=router;