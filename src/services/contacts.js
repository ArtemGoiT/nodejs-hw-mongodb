import { SORT_ORDER } from '../constants/index.js';
import { ContactCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactCollection.find();
    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    contactsQuery.where('userId').equals(userId);

    const [contactsCount, contacts] = await Promise.all([
      ContactCollection.find().merge(contactsQuery).countDocuments(),
      contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);
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
export const getContactByID = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContacts = async (payload, userId) => {
  const contact = await ContactCollection.create(payload, userId);
  return contact;
};
export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const opaResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
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

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
