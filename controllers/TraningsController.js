import traningModel from "../models/TraningsModel.js";

class TraningsController {

    async allTranings(req, res) {
        try {
            const tranings = await traningModel.findAll()
            res.status(200).json(tranings);

        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAllCurrentTranings(req, res) {
        try {
            const {id_user} = req;
            const { id_traning } = await CurrentTraningsModel.findOne({where: {id_user}})

            if (!id_traning) {
                return res.status(400);
            }

            const currentTranings = await traningModel.findAll({where: {id_traning}})

            res.status(200).json(currentTranings);

        } catch(e) {
            res.status(500).json(e)
        }
    }
}
export default new TraningsController
