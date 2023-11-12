const Establishment = require('../mongo model/resto.model')

const getAllEstablishments = async (req, res) => {
    try {
      const establishments = await Establishment.find();
      res.json(establishments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const createEstablishment = async (req, res) => {
    const {
        id,
        name,
        role,
        avatar,
        images,
        category,
        profileDescription,
        description,
        location,
        rating,
      } = req.body;
    try {
      const newEstablishment = new Establishment({
            id,
            name,
            role: role || 'Resto',
            avatar: avatar || '/static/images/default-avatar.jpg', 
            images: images || [],
            category,
            profileDescription,
            description,
            location,
            rating,
        });
      const savedEstablishment = await newEstablishment.save();
      res.status(201).json(savedEstablishment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };

  const deleteEstablishment = async (req, res) => {
    try {
      const deletedEstablishment = await Establishment.findByIdAndDelete(req.params.id);
      if (!deletedEstablishment) {
        return res.status(404).json({ message: 'Establishment not found' });
      }
      res.json({ message: 'Establishment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const findEstablishmentId = async (req,res) => {
    try {
        const establishment = await Establishment.findById(req.params.id);
        if (!establishment) {
          return res.status(404).json({ message: 'Establishment not found' });
        }
        res.json(establishment);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
  
modules.export = {
    getAllEstablishments,
    createEstablishment,
    deleteEstablishment,
    findEstablishmentId,
}