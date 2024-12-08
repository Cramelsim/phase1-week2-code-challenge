const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItem');
const clearListButton = document.getElementById('clearList');
const shoppingListContainer = document.getElementById('shoppingList');

const renderList = () => {
  shoppingListContainer.innerHTML = '';
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    listItem.className = item.purchased ? 'purchased' : '';

    listItem.addEventListener('click', () => {
      shoppingList[index].purchased = !shoppingList[index].purchased;
      saveList();
      renderList();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const newName = prompt('Edit item name:', item.name);
      if (newName) {
        shoppingList[index].name = newName;
        saveList();
        renderList();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      shoppingList.splice(index, 1);
      saveList();
      renderList();
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    shoppingListContainer.appendChild(listItem);
  });
};

const saveList = () => {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
};

addItemButton.addEventListener('click', () => {
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false });
    saveList();
    renderList();
    itemInput.value = '';
  }
});

clearListButton.addEventListener('click', () => {
  shoppingList.length = 0;
  saveList();
  renderList();
});

renderList();
