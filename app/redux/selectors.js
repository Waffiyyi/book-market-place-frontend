export const selectAllErrors = (state) => {
  const errors = [];
  if (state.auth?.error) errors.push({ message: state.auth.error, type: 'auth' });
  if (state.book?.error) errors.push({ message: state.book.error, type: 'book' });
  if (state.cart?.error) errors.push({ message: state.cart.error, type: 'cart' });
  return errors;
};