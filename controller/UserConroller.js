import prisma from '../DB/db.config.js';

export const fetchUsers = async (req, res) => {
  let user;
  try {
    user = await prisma.user.findMany({
      include: {
        post: {
          select: {
            title: true
          }
        }
      }
    });
  } catch (error) {

    return res.status(404).json({
      success: false,
      message: "There is not user with comment + posts"
    });


  }


  return res.status(200).json({
    success: true,
    user
  });
};
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields"
    });
  }
  const findUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (findUser) {
    return res.status(400).json({
      success: false,
      message: "Email Alredy in use"
    });
  }


  const newUser = await prisma.user.create({
    data: { name, email, password }

  });

  return res.status(201).json({
    success: true, newUser,
    message: "User Created"
  });


};
export const updateUser = async (req, res) => {

  const { name, email, password } = req.body;
  const userId = req.params.id;
  await prisma.user.update({
    where: {
      id: Number(userId)
    },
    data: {
      name, email, password
    }
  });

  return res.status(201).json({
    success: false,
    message: "User updated successfully"
  });


};

export const deleteUser = async (req, res) => {

  const userId = req.params.id;

  const userFound = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    }
  });

  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found"
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