import axios from 'axios';

export const WHAT_UP = 'WHAT_UP';
export const BYE_FELICIA = 'BYE_FELICIA';

export const greeting = response => ({
  type: WHAT_UP,
  payload: sessionStorage.getItem('name')
});

export const bye = response => ({
  type: BYE_FELICIA
})