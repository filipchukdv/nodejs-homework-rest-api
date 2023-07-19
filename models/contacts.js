import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(moviesPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(moviesPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(moviesPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id: contactId,
    ...body,
  };
  await fs.writeFile(moviesPath, JSON.stringify(contacts, null, 2));

  return {
    id: contactId,
    ...body,
  };
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
