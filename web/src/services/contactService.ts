import apiClient from './apiClient';
import { Contact, ContactDTO } from '../models';
import config from '../config';

const ENDPOINT = config.api.contactsEndpoint;

export class ContactService {
    static async getAll(): Promise<Contact[]> {
        const response = await apiClient.get<Contact[]>(ENDPOINT);
        return response.data;
    }

    static async getById(id: number): Promise<Contact> {
        const response = await apiClient.get<Contact>(`${ENDPOINT}/${id}`);
        return response.data;
    }

    static async create(contact: ContactDTO): Promise<Contact> {
        const response = await apiClient.post<Contact>(ENDPOINT, contact);
        return response.data;
    }

    static async update(id: number, contact: ContactDTO): Promise<Contact> {
        const response = await apiClient.put<Contact>(`${ENDPOINT}/${id}`, contact);
        return response.data;
    }

    static async delete(id: number): Promise<void> {
        await apiClient.delete(`${ENDPOINT}/${id}`);
    }
}

export default ContactService;
