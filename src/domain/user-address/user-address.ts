export interface UserAddress {
  id: number;
  userId: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CreateUserAddressInput {
  userId: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface UpdateUserAddressInput {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
