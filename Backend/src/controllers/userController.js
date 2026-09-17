const User = require("../models/user");


const  gitProfile = async (req, res) => {
  try {
    const user= await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Der Benutzer wurde nicht gefunden." });
    }
    res.status(200).json(user);
    } catch (error) {console.error(error);
    res.status(500).json({ message: "Server error", console: error.message });
  }
};
 const updateProfile = async (req, res) => {
  try {
    const {name,phone, dataofBirth,profileImage } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Der Benutzer wurde nicht gefunden."
      });
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (dataofBirth !== undefined) {
      user.dataofBirth = dataofBirth;
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    await user.save();

    res.status(200).json({
      message:  "Ihr Profil wurde erfolgreich aktualisiert.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dataofBirth: user.dataofBirth,
        profileImage: user.profileImage,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};



module.exports = { gitProfile , updateProfile};