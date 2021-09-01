import React from 'react';

// Password validation
// Returns 0 if password is valid
// Returns 1 if either password is empty
// Returns 2 if password does not match
export function passwordValidation(password1, password2) {
  if (password1 === '' || password2 === '') {
    return 1;
  }
  if (password1 !== password2) {
    return 2;
  }
  return 0;
}
