document.addEventListener('DOMContentLoaded', function() {
  const postBtn = document.querySelector('.btn-primary');
  if (!postBtn) return;
  postBtn.addEventListener('click', function() {
    // Get form values
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const weight = document.getElementById('weight').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const desc = document.getElementById('desc').value;
    const contact = document.getElementById('contact').value;
    const photosInput = document.getElementById('photos');
    const photos = photosInput.files;

    // Read images as data URLs
    const readImages = Array.from(photos).map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readImages).then(imagesData => {
      // Save to localStorage
      const item = {
        title, type, weight, price, location, desc, contact,
        images: imagesData
      };
      const items = JSON.parse(localStorage.getItem('seller_items') || '[]');
      items.push(item);
      localStorage.setItem('seller_items', JSON.stringify(items));
      // Redirect to sellers-items.html
      window.location.href = 'sellers-items.html';
    });
  });
});

 function renderItems() {
      const itemsList = document.getElementById('items-list');
      itemsList.innerHTML = '';
      const items = JSON.parse(localStorage.getItem('seller_items') || '[]');
      if (!items.length) {
        itemsList.innerHTML = '<div class="empty">No items posted yet.</div>';
        return;
      }
      items.reverse().forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p><strong>Type:</strong> ${item.type}</p>
          <p><strong>Weight:</strong> ${item.weight} kg</p>
          <p><strong>Price/kg:</strong> ₦${item.price}</p>
          <p><strong>Location:</strong> ${item.location}</p>
          <p><strong>Description:</strong> ${item.desc}</p>
          <p><strong>Contact Preference:</strong> ${item.contact}</p>
          <div class="card-images"></div>
        `;
        const imagesDiv = card.querySelector('.card-images');
        if (item.images && item.images.length) {
          item.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            imagesDiv.appendChild(img);
          });
        }
        itemsList.appendChild(card);
      });
    }
    renderItems();