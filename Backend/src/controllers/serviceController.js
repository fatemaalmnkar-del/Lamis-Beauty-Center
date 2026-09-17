const Service=require('../models/service');

const getservices=async(req,res)=>{
    try {
        const services=await Service.find();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
    };



const getserviceById=async(req,res)=>{
    try {
        const serviceId=req.params.id;
        const service=await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Die Dienstleistung wurde nicht gefunden." });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const createService=async(req,res)=>{
    try {
        const { title, description, price, duration, image } = req.body;
    const service= await Service.create({ title, description, price, duration, image });
        res.status(201).json({ message: "Die Dienstleistung wurde erfolgreich erstellt.", service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const updateService=async(req,res)=>{
    try {
        const service=await Service.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true });
        if (!service) {
            return res.status(404).json({ message: "Die Dienstleistung wurde nicht gefunden." });
        }
        res.status(200).json({ message: "Die Dienstleistung wurde erfolgreich aktualisiert.", service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteService=async(req,res)=>{
    try {
        const service=await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "vDie Dienstleistung wurde nicht gefunden." });
        }
        res.status(200).json({ message: "Die Dienstleistung wurde erfolgreich gelöscht.", service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.", error: error.message });
    }
};

module.exports={getservices,getserviceById,createService,updateService,deleteService};
