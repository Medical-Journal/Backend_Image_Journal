

const Image = require('../Model/image');


exports.updateImage = async (req, res) => {
    try {
        const {image_id} = req.body;
        const { buffer } = req.file;
        const imageBuffer = Buffer.from(buffer, 'binary');

        const [rowsAffected] = await Image.update(
            { image_data: imageBuffer },
            { where: { id: image_id }, returning: true, raw: true }
        );
//
        if (rowsAffected === 0) {
            return res.status(404).json({ error: 'Image not found for the specified image_id' });
        }

        const updatedImage = await Image.findByPk(image_id);

        res.status(200).json({ message: 'Image updated successfully', updatedImage });
    } catch (error) {
        console.error('Error executing Sequelize query', error);

        // Provide more information about the error in the response
        res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
    }
};


exports.getAllImages = async (req, res) => {
    try{
        const images = await Image.findAll();
        res.json(images)
    }catch(error){
        console.error('Error executing Mysql query', error);
        res.status(500).send('Internal Server Error');

    }
}

exports.addNewImage = async (req, res) => {
    try{
        const {patient_id} = req.body;
        const {buffer} = req.file;
        const imageBuffer = Buffer.from(buffer, 'binary');

        const image = await Image.create({
            patient_id: patient_id,
            image_data: imageBuffer
        })
        res.status(200).json(image)
    }catch(error){
        console.error('Error executing Mysql query', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getImagesByPatientId = async (req, res) => {
    try {
        const { patient_id } = req.params;
        console.log("patient_id")
        console.log(patient_id)
        const images = await Image.findAll({
            where: { patient_id: patient_id },
        });

        if (!images || images.length === 0) {
            return res.status(404).json({ error: 'Images not found for the specified patient_id' });
        }

        res.json(images);
    } catch (error) {
        console.error('Error executing MySQL query', error);
        res.status(500).send('Internal Server Error');
    }
};