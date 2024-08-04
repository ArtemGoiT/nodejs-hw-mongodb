import { getAllContacts, getContactByID } from '../services/contacts';

// eslint-disable-next-line no-unused-vars
export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
// eslint-disable-next-line no-unused-vars
export const getContactByIDController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByID(contactId);
  if (!contact) {
    next(new Error('Contact no found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found student with id ${contactId}!`,
    data: contact,
  });
};
