import { writable } from 'svelte/store';

export let isDarkMode = writable(false);


// CENTRAL STORE
export let loginState = writable('login');

export let personalInfoId = writable();
export let currentUser = writable();

$:currentUser.set(JSON.parse(sessionStorage.getItem('currentUser')) !== null ? JSON.parse(sessionStorage.getItem('currentUser'))[0] : undefined);