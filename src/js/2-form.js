const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: ''
};

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data) || {};
  } catch {
    return {};
  }
}

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData() {
  const savedData = loadFromLS(STORAGE_KEY);
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

form.addEventListener('input', (event) => {
  formData[event.target.name] = event.target.value;
  saveToLS(STORAGE_KEY, formData);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.elements.email.value || !form.elements.message.value) {
    alert('Please fill in all form fields before submitting');
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

loadData();
