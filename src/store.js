import {create} from 'zustand';

export const UseRestaurantAccountInfo = create((set) => ({
    restaurant_account_email: 'email',
    restaurant_id: 'id',

    UpdateRestaurantAccountEmail: (restaurant_email) => set(() => ({ restaurant_email: restaurant_email})),
    UpdateRestaurantId: (restaurant_id) => set(() => ({ restaurant_id: restaurant_id}))
}))

export const UseImageSelector = create((set) => ({
    menu_picture: "null",

    UpdateMenuPicture: (menu_picture) => set(() => ({menu_picture: menu_picture})),
}))

export const UsePositionInfo = create ((set) => ({
    latitude: 0,
    longitude: 0,
    
    UpdateLatitude: (latitude) => set(() => ({ latitude: latitude})),
    UpdateLongitude: (longitude) => set(() => ({ longitude: longitude}))
}))