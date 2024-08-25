import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIDController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middleware/isValidId.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIDController));

router.post(
  '/',

  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
