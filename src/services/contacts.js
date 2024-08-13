import { SORT_ORDER } from '../constants/index.js';
import { ContactCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactCollection.find();
    const contactsCount = await ContactCollection.find()
      .merge(contactsQuery)
      .countDocuments();
    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();
    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );
    console.log('Contacts:', contacts); // Вывод всех контактов
    return { data: contacts, ...paginationData };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error; // Или можно вернуть пустой массив []
  }
};
export const getContactByID = async (contactId) => {
  const contact = await ContactCollection.findOne({ _id: contactId });
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};
export const updateContact = async (contactId, payload, options = {}) => {
  const opaResult = await ContactCollection.findOneAndUpdate(
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

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
