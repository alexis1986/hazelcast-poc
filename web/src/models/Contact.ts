export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface ContactDTO {
    name: string;
    email: string;
    phone: string;
}

export interface ContactFormState {
    id: number | null;
    name: string;
    email: string;
    phone: string;
}

export const contactToFormState = (contact: Contact): ContactFormState => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
});

export const createEmptyFormState = (): ContactFormState => ({
    id: null,
    name: '',
    email: '',
    phone: '',
});

export const formStateToDTO = (formState: ContactFormState): ContactDTO => ({
    name: formState.name,
    email: formState.email,
    phone: formState.phone,
});
