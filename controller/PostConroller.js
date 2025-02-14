import prisma from '../DB/db.config.js';

export const fetchPosts = async (req, res) => {
  const post = await prisma.post.findMany({});


  return res.status(200).json({
    success: true,
    post
  });
};

export const createPost = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    if (!title || !description || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Additional validation
    if (typeof title !== "string" || title.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be a string with at least 3 characters",
      });
    }

    if (typeof description !== "string" || description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be a string with at least 10 characters",
      });
    }

    // Verify user_id exists in the database
    const user = await prisma.user.findUnique({ where: { id: Number(user_id) } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newPost = await prisma.post.create({
      data: { user_id: Number(user_id), title, description },
    });

    return res.status(201).json({
      success: true,
      newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const showPost = async (req, res) => {
  const postId = req.params.id;

  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId)
    }
  });

  return res.status(200).json({
    success: true,
    data: post
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

  const postFound = await prisma.post.findUnique({
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