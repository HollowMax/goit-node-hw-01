const fs = require('fs');
const path = require('path');
const contactsPath = path.resolve('db/contacts.json');

function listContacts() {
  console.log(fs.readFileSync(contactsPath, 'utf-8'));
}

function getContactById(contactId) {
  console.log(JSON.parse(fs.readFileSync(contactsPath, 'utf-8')).find(el => el.id === contactId));
}

function removeContact(contactId) {
  const newContacts = JSON.parse(fs.readFileSync(contactsPath, 'utf-8')).filter(
    el => el.id !== contactId
  );
  console.log(newContacts);

  return fs.writeFileSync(contactsPath, JSON.stringify(newContacts), 'utf-8');
}

function addContact(name, email, phone) {
  const oldContacts = JSON.parse(fs.readFileSync(contactsPath, 'utf-8'));
  const newContact = {
    id: String(oldContacts.length ? Number(oldContacts[oldContacts.length - 1].id) + 1 : 1),
    name,
    email,
    phone,
  };
  console.log(newContact);
  const contacts = [...oldContacts, newContact];
  return fs.writeFileSync(contactsPath, JSON.stringify(contacts), 'utf-8');
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
