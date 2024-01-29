const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', handleFormSubmit);

function onFormInput() {
  saveToLS(STORAGE_KEY, {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
  });
}

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}
function loadFromLS(key) {
  const zip = localStorage.getItem(key);
  try {
    return JSON.parse(zip);
  } catch {
    return zip;
  }
}

function init() {
  const data = loadFromLS(STORAGE_KEY) || {};
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}
init();

function handleFormSubmit(e) {
  e.preventDefault();
  const { email, message } = e.target.elements;

  if (!email.value.trim() || !message.value.trim()) {
    return alert('All form fields must be filled in');
  }

  console.log({
    email: email.value,
    message: message.value,
  });
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}
