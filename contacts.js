const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));

    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));

    const foundContacts = contacts.find(({ id }) => id === contactId);
    console.table(foundContacts);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const removedContact = contacts.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(removedContact), 'utf8');
    console.log('Contact removed');
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const addedContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const allContacts = [...contacts, addedContact];

    await fs.writeFile(contactsPath, JSON.stringify(allContacts), 'utf8');
    console.log(`${name} added`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
