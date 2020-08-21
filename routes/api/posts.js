const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../Models/Post");
const User = require("../../Models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {

    
    // const user= await User.findById(req.user.id);
    // await Post.updateMany({user:req.user.id},{avatar:user.avatar})

    
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});





// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
// router.put('/like/:id', [auth, checkObjectId('id')], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has already been liked
//     if (post.likes.some(like => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put("/unlike/:id", [auth, checkObjectId("id")], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has not yet been liked
//     if (!post.likes.some(like => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: "Post has not yet been liked" });
//     }

//     // remove the like
//     post.likes = post.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     );

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
// router.post(
//   "/comment/:id",
//   [
//     auth,
//     checkObjectId("id"),
//     [
//       check("text", "Text is required")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select("-password");
//       const post = await Post.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };

//       post.comments.unshift(newComment);

//       await post.save();

//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Pull out comment
//     const comment = post.comments.find(
//       comment => comment.id === req.params.comment_id
//     );
//     // Make sure comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: "Comment does not exist" });
//     }
//     // Check user
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User not authorized" });
//     }

//     post.comments = post.comments.filter(
//       ({ id }) => id !== req.params.comment_id
//     );

//     await post.save();

//     return res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send("Server Error");
//   }
// });


// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private                       //Duplicate available
router.put("/like/:id", auth, checkObjectId("id"), async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    if (!post) {
      return res.status(401).status(404).json({ msg: "Post not found" });
    }
    if (
      post.likes.filter(item => item.user.toString() === req.user.id).length > 0
    ) {
      return res.status(401).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Like operation failed" });
  }
});


// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private                           //Duplicate available
router.put("/unlike/:id", auth, checkObjectId("id"), async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (
      post.likes.filter(item => item.user.toString() === req.user.id).length === 0
    ) {
      return res.status(401).json({ msg: "Only a previously liked post can be unliked" });
    }
    

    post.likes = post.likes.filter(item => item.user.toString() != req.user.id);
    //console.log(post);
    await post.save();
    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Unlike operation failed" });
  }
});


// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
router.post("/comment/:id", auth, checkObjectId("id"), [check("text", "Text cannot be empty").not().isEmpty()], async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    const user = await User.findById({ _id: req.user.id }).select("-password");

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    post.comments.unshift({
      user: req.user.id,
      text: req.body.text,
      avatar: user.avatar,
      name: user.name
    });

    const newPost = await post.save();
    res.json(newPost.comments);





  }
  catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: "Server error" });

  }
}
);


// // @route    DELETE api/posts/comment/:id/:commentId
// // @desc     Delete a comment by the logged in user
// // @access   Private
router.delete("/comment/:id/:commentId", auth, checkObjectId("id"), checkObjectId("commentId"), [check("text", "Text cannot be empty").not().isEmpty()], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = post.comments.find(item => item.id.toString() === req.params.commentId)

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    console.log(comment.user)
    console.log(req.user.id)
    if (comment.user != req.user.id) {
      return res.status(404).json({ msg: "User not authorized" });

    }
    post.comments = post.comments.filter(item => item.id.toString() != req.params.commentId);



    const newPost = await post.save();
    res.json(newPost.comments);





  }
  catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: "Server error" });

  }
}
);


module.exports = router;
