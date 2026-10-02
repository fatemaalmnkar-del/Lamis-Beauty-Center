const ContactMessage = require("../models/contactMessage");
const User = require("../models/user");

const createContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message
    } = req.body;

    // Betreff und Nachricht sind für alle Pflicht
    if (!subject || !message) {
      return res.status(400).json({
        message: "Bitte füllen Sie alle Pflichtfelder aus."
      });
    }

    let contactName = name;
    let contactEmail = email;

    // Wenn die Kundin angemeldet ist
    if (req.user) {
      const loggedInUser = await User.findById(req.user.id);

      if (!loggedInUser) {
        return res.status(404).json({
          message: "Benutzer wurde nicht gefunden."
        });
      }

      contactName = loggedInUser.name;
      contactEmail = loggedInUser.email;
    }

    // Wenn es ein Gast ist
    if (!req.user && (!contactName || !contactEmail)) {
      return res.status(400).json({
        message: "Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein."
      });
    }

    const contactMessage = await ContactMessage.create({
      user: req.user ? req.user.id : null,
      name: contactName,
      email: contactEmail,
      phone,
      subject,
      message
    });

    res.status(201).json({
      message:
        "Vielen Dank für Ihre Nachricht! Wir melden uns so schnell wie möglich bei Ihnen.",
      contactMessage
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
    });
  }
};


const getContactMessages = async (req, res) => {
  try {
    const contactMessages = await ContactMessage.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      contactMessages
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Nachrichten konnten nicht geladen werden."
    });
  }
};


const deleteContactMessage = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findById(
      req.params.id
    );

    if (!contactMessage) {
      return res.status(404).json({
        message: "Nachricht wurde nicht gefunden."
      });
    }

    await contactMessage.deleteOne();

    res.status(200).json({
      message: "Nachricht wurde erfolgreich gelöscht."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Nachricht konnte nicht gelöscht werden."
    });
  }
};

const replyToContactMessage = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        message: "Bitte schreiben Sie eine Antwort."
      });
    }

    const contactMessage = await ContactMessage.findById(
      req.params.id
    );

    if (!contactMessage) {
      return res.status(404).json({
        message: "Nachricht wurde nicht gefunden."
      });
    }

    contactMessage.reply = reply;
    contactMessage.repliedAt = new Date();

    await contactMessage.save();

    res.status(200).json({
      message: "Antwort wurde erfolgreich gesendet.",
      contactMessage
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Antwort konnte nicht gesendet werden."
    });
  }
};




//MEINE NACHRICTE
const getMyContactMessages = async (req, res) => {
  try {
    const contactMessages = await ContactMessage.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      contactMessages
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Nachrichten konnten nicht geladen werden."
    });
  }
};



module.exports = {createContactMessage,getContactMessages,deleteContactMessage,replyToContactMessage, getMyContactMessages};