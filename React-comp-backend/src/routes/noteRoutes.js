import express from 'express';
import { createNote, delteNote, getAllNotes, updateNote } from '../controllers/noteController.js';

const router = express.Router();

router.get('/get', getAllNotes);
router.post('/create', createNote);
router.patch('/update', updateNote);
router.delete('/delete', delteNote);


export default router;