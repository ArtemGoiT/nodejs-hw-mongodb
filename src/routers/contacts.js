import { Router } from 'express';

import {
  getContactByIDController,
  getContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);

router.get('/contacts/:contactId', getContactByIDController);

export default router;
