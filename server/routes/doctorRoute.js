const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/get-doctor/:doctorId",
  authMiddleware,
  async (req, res) => {
    try {
      const { doctorId } = req.params;
      console.log(doctorId);

      if (!doctorId) {
        return res
          .status(400)
          .send({ success: false, message: "Doctor ID is required." });
      }

      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
        return res
          .status(404)
          .send({ success: false, message: "Doctor not found." });
      }

      res.status(200).send({
        success: true,
        message: "Doctor info fetched successfully",
        data: doctor,
      });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: "Error getting doctor info", error });
    }
  }
);

router.post('/get-doctor-info-by-id', authMiddleware, async(req,res)=>{
    try{
        const doctor = await Doctor.findOne({userId: req.body.userId});
        res.status(200).send({success: true, message: "Doctor info fetched successfully", data: doctor});
    }catch(error){
        res.status(500).send({message: "Error getting user info", success: false, error})
    }
});
router.post('/get-doctor-info-by-doctor-id', authMiddleware, async(req,res)=>{
    try{
        const doctor = await Doctor.findOne({_id: req.body.doctorId});
        res.status(200).send({success: true, message: "Doctor info fetched successfully", data: doctor});
    }catch(error){
        res.status(500).send({message: "Error getting user info", success: false, error})
    }
});

router.post('/update-doctor-profile', authMiddleware, async(req,res)=>{
    try{
        const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({success: true, message: "Doctor profile updated successfully", data: doctor});
    }catch(error){
        res.status(500).send({message: "Error getting user info", success: false, error})
    }
});

router.get("/get-appointments-by-doctor-id", authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId});

      const appointments = await Appointment.find({ doctorId: doctor._id });
      res
        .status(200)
        .send({
          message: "Appointments fetched successfully",
          success: true,
          data: appointments,
        });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error fetching appointments", success: false, error });
    }
  });


  router.post("/change-appointment-status", authMiddleware,  async (req, res) => {
    try {
        const {appointmentId, status} = req.body;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
            status,
        })
        const user = await User.findOne({_id: appointment.userId});
        const unseenNotifications = user.unseenNotifications
        unseenNotifications.push({
            type: "appointment-status-changed",
            message: `Your appointment has been ${status}`,
            onClickPath: "/appointments"
        })
        await user.save(); 
        res.status(200).send({message: "Appointment status updated successfully", success: true})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error", success: false, error });
    }
});




module.exports = router; 