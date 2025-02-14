import prisma from '../DB/db.config.js';

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({});


  if (!comments) {
    return res.status(404).json({
      success: false,
      message: "No comments found"
    });
  }

  return res.status(200).json({
    success: true,
    comments
  });

};

export const createComment = async (req, res) => {
  try {
    const { user_id, post_id, comment } = req.body;

    if (!post_id || !comment || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Additional validation
    if (typeof comment !== "string" || comment.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Comment must be a string with at least 3 characters",
      });
    }



    // Verify user_id exists in the database
    const user = await prisma.user.findUnique({ where: { id: Number(user_id) } });
    const post = await prisma.post.findUnique({ where: { id: Number(post_id) } });

    // If user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If post not found
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const newComment = await prisma.comment.create({
      data: { user_id: Number(user_id), post_id: Number(post_id), comment },
    });

    return res.status(201).json({
      success: true,
      newComment,
      message: "Comment created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const showComment = async (req, res) => {
  const commentId = req.params.id;

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId
    }
  });

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "No comments Found !"
    });
  }
  return res.status(200).json({
    success: true,
    data: comment
  });
};

// export const updateUser = async (req, res) => {

//   const { name, email, password } = req.body;
//   const userId = req.params.id;
//   await prisma.user.update({
//     where: {
//       id: Number(userId)
//     },
//     data: {
//       name, email, password
//     }
//   });

//   return res.status(201).json({
//     success: false,
//     message: "User updated successfully"
//   });


// };

export const deletePost = async (req, res) => {

  const postId = req.params.id;

  const postFound = await prisma.comment.findUnique({
    where: {
      id: Number(userId)
    }
  });

  if (!postFound) {
    return res.status(404).json({
      success: false,
      message: "post not found"
    });
  }

  await prisma.user.delete({
    where: {
      id: Number(userId)
    }
  });

  return res.status(200).json({
    success: false,
    message: "User deleted successfully"
  });
};