import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.resolve("db", "contacts.json")

function updateContact(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
export async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;

}
export async function updateContactById(contactId, { name, email, phone }) {
    const contacts = await getAllContacts();

    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id: contactId, name, email, phone };
    await updateContact(contacts);

    return contacts[index];
};

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    };
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
}

export async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;

}