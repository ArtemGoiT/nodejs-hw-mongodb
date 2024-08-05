import { ContactCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactCollection.find();
    console.log('Contacts:', contacts); // Вывод всех контактов
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error; // Или можно вернуть пустой массив []
  }
};
export const getContactByID = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};
export const updateContact = async (contactId, payload, options = {}) => {
  const opaResult = await ContactCollection.findByIdAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!opaResult || !opaResult.value) return null;

  return {
    contact: opaResult.value,
    isNew: Boolean(opaResult?.lastErrorObject?.upserted),
  };
};
