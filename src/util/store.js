import { writable } from 'svelte/store';

export let isDarkMode = writable(false);


// CENTRAL STORE
export let loginState = writable('login');

export let personalInfoId = writable();
export let currentUser = writable();
export let currentUserPersonalInfo = writable();
export let currentUserWorkHistory = writable([]);
export let currentUserEBG = writable([]);
export let currentUserCharacterRef = writable([]);

$: currentUser.set(
    JSON.parse(localStorage.getItem('currentUser')) !== null 
    ? JSON.parse(localStorage.getItem('currentUser')) 
    : undefined);