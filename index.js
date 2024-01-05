import * as contactsService from './contacts.js';
// index.js
const argv = require('yargs').argv;

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await contactsService.listContacts();
            console.log(contactsList);
            break;

        case 'get':
            const contactId = await contactsService.getContactById(id);
            return console.log(contactId);
        default:
            break;

        case 'add':
            const addContact = await contactsService.addContact({ id, name, email, phone });
            return console.log(addContact);

            // ... name email phone
            break;

        case 'remove':
            // ... id
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);