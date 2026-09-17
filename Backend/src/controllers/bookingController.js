const Booking= require('../models/booking');



const createBooking=async(req,res)=>{
 try {
    const { service, date, time } = req.body;
    const existingBooking = await Booking.findOne({date,time,
      status: { $ne: "cancelled" }
     });

    if (existingBooking) {
      return res.status(409).json({
        message: "Dieser Termin ist bereits vergeben. Bitte wählen Sie eine andere Uhrzeit."
      });
    }
        const booking= await Booking.create({ user:req.user.id, service, date, time });
        res.status(201).json({ message: "Ihr Termin wurde erfolgreich gebucht.", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMyBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find({ user: req.user.id }).populate('service');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate("service", "title price");

    res.status(200).json({ bookings });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const cancelBooking=async(req,res)=>{
    try {
        const booking=await Booking.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { status: 'cancelled' },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: "Die Buchung wurde nicht gefunden." });
        }
        res.status(200).json({ message: "Ihr Termin wurde erfolgreich storniert.", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Der ausgewählte Buchungsstatus ist ungültig."
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("user", "name email phone")
      .populate("service", "title price");

    if (!booking) {
      return res.status(404).json({
        message: "Die Buchung wurde nicht gefunden."
      });
    }

    res.status(200).json({
      message: "Der Buchungsstatus wurde erfolgreich aktualisiert.",
      booking
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      error: error.message
    });
  }
};

module.exports={
    createBooking,
    getMyBookings,
    cancelBooking,getAllBookings,
    updateBookingStatus
};
