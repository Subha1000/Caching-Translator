import express from 'express';
import {Translation} from '../models/translatorModel.js';

const router = express.Router();

//Route for Save a new Translation
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.phraseToTranslate ||
            !request.body.translatedPhrase
        ) {
            return response.status(400).send({
                message: 'Send all required fields: phraseToTranslate, translatedPhrase',
            });
        }
        const newTranslation = {
            phraseToTranslate: request.body.phraseToTranslate,
            translatedPhrase: request.body.translatedPhrase,
        };

        const translate = await Translation.create(newTranslation);

        return response.status(201).send(translate);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get all Translations
router.get('/', async (request, response) => {
    try{
        const translates = await Translation.find({});

        return response.status(200).json({
            count: translates.length,
            data: translates
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get One Translation from database by id
router.get('/:id', async (request, response) => {
    try{

        const{ id } = request.params;

        const translation = await Translation.findById(id);

        return response.status(200).json(translation);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Update Translation
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.phraseToTranslate ||
            !request.body.translatedPhrase
        ) { 
            return response.status(400).send({
                message: 'Send all required fields: phraseToTranslate, translatedPhrase',
            });
        }

        const { id } = request.params;

        const result = await Translation.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({message: 'Translation not found'});
        }

        return response.status(200).send({message: 'Translation updated successfully'});

    }catch (error) {
     console.log(error.message);
     response.status(500).send({message: error.message});
    }
})

//Route for delete a translation

router.delete('/:id', async (request, response) => {
    try{
        const{ id } = request.params;

        const result = await Translation.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message: 'Translation not found'});
        }

        return response.status(200).send({message: 'Translation deleted successfully'});
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
    
});

export default router;