document.getElementById('fetchBooks').addEventListener('click', async () => {
  try {
    const response = await fetch('/books');
    const data = await response.text();
    const book_list = JSON.parse(data);
    book_list.forEach(populateTemplate);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

const template = document.getElementById('bookTemplate').content;
const bookTableBody = document.getElementById('bookTableBody');

function populateTemplate(book) {
  const clone = document.importNode(template, true);

  clone.querySelector('th[slot="title"]').textContent = book.title;
  clone.querySelector('td[slot="author"]').textContent = book.author;
  clone.querySelector('td[slot="pages"]').textContent = book.pages;
  clone.querySelector('td[slot="language"]').textContent = book.language;
  clone.querySelector('td[slot="status"]').textContent = book.status;
  clone.querySelector('td[slot="isbn"]').textContent = book.isbn;

  bookTableBody.appendChild(clone);
}
