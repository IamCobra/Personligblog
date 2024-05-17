// Funktion til at oprette og tilføje indlægget
const createEntry = (date, text, imageSrc = null) => {
    const entry = document.createElement('div');
    entry.className = 'entry';
  
    const entryDate = document.createElement('h3');
    entryDate.textContent = date;
    entry.appendChild(entryDate);
  
    const entryText = document.createElement('p');
    entryText.textContent = text;
    entry.appendChild(entryText);
  
    if (imageSrc) {
      const entryImage = document.createElement('img');
      entryImage.src = imageSrc;
      entry.appendChild(entryImage);
    }
  
    entry.addEventListener('click', () => {
      openModal(date, text, imageSrc);
    });
  
    document.getElementById('entry-list').appendChild(entry);
  };
  
  // Hent poster fra localStorage og vis dem
  const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => {
      createEntry(entry.date, entry.text, entry.imageSrc);
    });
  };
  
  // Gem en ny post i localStorage
  const saveEntry = (date, text, imageSrc = null) => {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ date, text, imageSrc });
    localStorage.setItem('entries', JSON.stringify(entries));
  };
  
  // Event listener for form submission
  document.getElementById('entry-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Hent værdier fra formularen
    const date = document.getElementById('entry-date').value;
    const text = document.getElementById('entry-text').value;
    const imageInput = document.getElementById('entry-image');
  
    // Hvis der er et billede, læs det asynkront, ellers gem posten direkte
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageSrc = e.target.result;
        saveEntry(date, text, imageSrc);
        createEntry(date, text, imageSrc);
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      saveEntry(date, text);
      createEntry(date, text);
    }
  
    // Ryd formularen
    document.getElementById('entry-form').reset();
  });
  
  // Indlæs poster, når siden indlæses
  window.addEventListener('load', loadEntries);
  
  // Modal funktioner
  const modal = document.getElementById('entry-modal');
  const modalDate = document.getElementById('modal-date');
  const modalText = document.getElementById('modal-text');
  const modalImage = document.getElementById('modal-image');
  const closeModalBtn = document.querySelector('.close');
  
  const openModal = (date, text, imageSrc) => {
    modalDate.textContent = date;
    modalText.textContent = text;
    if (imageSrc) {
      modalImage.src = imageSrc;
      modalImage.style.display = 'block';
    } else {
      modalImage.style.display = 'none';
    }
    modal.style.display = 'block';
  };
  
  const closeModal = () => {
    modal.style.display = 'none';
  };
  
  closeModalBtn.addEventListener('click', closeModal);
  
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  