import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


// Розкоментуй і запиши значення
const contactsPath = path.resolve("db", "contacts.json")

// TODO: задокументувати кожну функцію
export async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
    // ...твій код. Повертає масив контактів.
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    // ...твій код. Повертає об'єкт доданого контакту. 
}