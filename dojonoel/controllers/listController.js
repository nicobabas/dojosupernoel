import express from 'express';
//import Joi from 'joi';
const router = express.Router(); 
import List from '../models/listModel.js';

router.get('/allchildren', async (req, res) => {
    try {
    const list = await List.getAllChildren();
    if (list) return res.json(list).status(201);
    } catch (error){
        res.status(500).send(error.message)
    }
})
router.get('/allpresent', async (req, res) => {
    try {
    const list = await List.getAllPresents();
    if (list) return res.json(list).status(201);
    } catch (error){
        res.status(500).send(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
    const list = await List.getAll();
    if (list) return res.json(list).status(201);
    } catch (error){
        res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const list = await List.getOneById(id);
        list ? res.json(list) : res.status(404).json({ message: 'List not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/present', async (req, res) => {
    const { name } = req.body;
    try {
        const lastInsertId = await List.newPresent(name);
        lastInsertId ? res.json(lastInsertId) : res.status(404).json({ message: 'Present not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await List.deleteListByChildId(id);
        result ? res.json({message : `List has been deleted !`}) : res.status(404).json({ message: 'List not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;