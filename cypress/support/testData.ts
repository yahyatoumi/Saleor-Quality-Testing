export interface User {
    email: string;
    password: string;
}

export interface Product {
    slug: string;
    category: string;
    subCategory?: string;
}

export interface PaymentCard {
    number: string;
    expiry: string;
    cvc: string;
}

export let testUsers: {
    newUser: User;
    customer: User;
    admin: User;
} = {
    newUser: { email: '', password: '' },
    customer: { email: '', password: '' },
    admin: { email: '', password: '' },
};

export let productData: {
    testProducts: Product[];
    searchTerms: { common: string; nonexistent: string };
} = {
    testProducts: [],
    searchTerms: { common: '', nonexistent: '' },
};

export let paymentMethods: {
    validCards: PaymentCard[];
    invalidCards: PaymentCard[];
} = {
    validCards: [],
    invalidCards: [],
};
