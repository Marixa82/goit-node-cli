import * as contactsService from './contacts.js';
import { program } from 'commander';

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse();

const argv = program.opts();



async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await contactsService.listContacts();
            console.table(contactsList);
            break;

        case 'get':
            const contactId = await contactsService.getContactById(id);
            return console.log(contactId);
            break;

        case 'add':
            const addContact = await contactsService.addContact({ name, email, phone });
            return console.log(addContact);
            break;
        case 'update':
            const updatedContact = await contactsService.updateContactById(id, {
                name,
                phone,
                email,
            });
            return console.log(updatedContact);

        case 'remove':
            const removeContact = await contactsService.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
