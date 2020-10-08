const express = require('express');
const alert = require('alert');

const router = express.Router();

const Contact = require('../models/contacts');

// Hello world....
// router.get('/', (req, res) => {
//     res.send("Hello world!");
// });

router.get('/', async (req, res) => {
    const contacts  = await Contact.find();
    res.render('index', {contacts});
});

router.post('/add', async (req, res) => {
    // empty fields case
    const contactData = req.body;
    if (contactData.name !== '' && contactData.phone !== '') {
        const contact = new Contact(contactData);
        await contact.save();
    }
    res.redirect('/');
});

router.get('/drop/:id', async (req, res)=> {
    const { id } = req.params;
    await Contact.remove({_id:id});
    res.redirect('/');
});

router.get('/mark/:id', async(req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    contact.relevant = !contact.relevant;
    await contact.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById({ _id:id });
    res.render('edit', {
        contact
    });
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Contact.update(
        { _id : id }, 
        req.body
    );
    res.redirect('/');
});

module.exports = router;
