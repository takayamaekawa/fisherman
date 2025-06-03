import { createRoute } from 'honox/factory';
import ContactContent from '../islands/ContactContent';
import contactDataJson from '../../data/contact.json';
import type { ContactData } from '../types/contact';

const typedContactData = contactDataJson as ContactData;

export default createRoute(async (c) => c.render(<ContactContent contactList={typedContactData.contact} />));
