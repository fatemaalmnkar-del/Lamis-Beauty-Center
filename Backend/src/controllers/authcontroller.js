
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, dataofBirth  }= req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Bitte füllen Sie alle Pflichtfelder aus." });
    }; 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
      };

      const phoneRegex = /^\+?[0-9]\d{1,14}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Bitte geben Sie eine gültige Telefonnummer ein." });
      };


      const exsistingUser = await User.findOne({ email });
      if (exsistingUser) {
        return res.status(409).json({ message: "Diese E-Mail-Adresse ist bereits registriert." });

      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        dataofBirth
      });
      res.status(201).json({ message: "Die Registrierung war erfolgreich.", user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        dataofBirth: newUser.dataofBirth,
        role: newUser.role,
      }
      });
    }catch (error) {
      console.error(error);
      res.status(500).json({ message:error.message });
    }

}
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).json({ message: "Bitte geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein." });
    }
    const eamailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!eamailRegex.test(email)) {
      return res.status(400).json({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "E-Mail-Adresse oder Passwort ist falsch." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ message: "E-Mail-Adresse oder Passwort ist falsch."});
    }
    const token =jwt.sign({ id: user._id ,role:user.role },
   process.env.JWT_SECRET,
   { expiresIn: "1h" });
   res.status(200).json({ message: "Sie haben sich erfolgreich angemeldet", token, user: {
    id: user._id,
    name: user.name, 
    email: user.email,
    phone: user.phone,
    dataofBirth: user.dataofBirth,
    role: user.role,
    }
    });
  
  
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: error.message });
  }
};
  

module.exports = { registerUser,loginUser};



