const saveToLocalStorage = ( key, item ) => {
  localStorage.setItem(key, JSON.stringify( item ));
};

const getFromLocalStorage = ( key ) => {
  const result = localStorage.getItem( key );

  return result ? JSON.parse( result ) : null;
};

const removeFromLocalStorage = ( key ) => {
  localStorage.removeItem( key );
};

export {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage
}
