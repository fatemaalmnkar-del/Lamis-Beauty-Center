const Service=require('../models/service');
const cloudinary = require("../config/cloudinary");

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
     let imageUrl="";
     let imagePublicId="";
    try {
        const { title, description, price, duration} = req.body;
       
        if (req.file) {
            const uploadResult=await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "lamis-beauty-center/services" }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(req.file.buffer);
            });
            imageUrl=uploadResult.secure_url;
            imagePublicId=uploadResult.public_id;
        }
        const service= await Service.create({ title, description, price, duration, image: imageUrl, imagePublicId: imagePublicId });
        res.status(201).json({ message: "Die Dienstleistung wurde erfolgreich erstellt.", service });
    } catch (error) {
        if (imagePublicId) {
            await cloudinary.uploader.destroy(imagePublicId);
        }
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateService=async(req,res)=>{
    try {
        const service=await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Die Dienstleistung wurde nicht gefunden." });
        }
        if (req.file) {
            const uploadResult=await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "lamis-beauty-center/services" }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(req.file.buffer);
            });
            if (service.imagePublicId) {
                await cloudinary.uploader.destroy(service.imagePublicId);
            }
            service.image = uploadResult.secure_url;
            service.imagePublicId = uploadResult.public_id;
        }
        const { title, description, price, duration } = req.body;
        service.title = title;
        service.description = description;
        service.price = price;
        service.duration = duration;
        await service.save();
        res.status(200).json({ message: "Die Dienstleistung wurde erfolgreich aktualisiert.", service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteService=async(req,res)=>{
    try {
        const service=await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Die Dienstleistung wurde nicht gefunden." });
        }
        if (service.imagePublicId) {
            await cloudinary.uploader.destroy(service.imagePublicId);
        }
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Die Dienstleistung wurde erfolgreich gelöscht.", service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.", error: error.message });
    }
};

module.exports={getservices,getserviceById,createService,updateService,deleteService};
