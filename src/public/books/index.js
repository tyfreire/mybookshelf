const template = document.getElementById('bookTemplate').content;
const bookTableBody = document.getElementById('bookTableBody');

function populateTemplate(book) {
  const clone = document.importNode(template, true);
  const title = clone.querySelector('a[slot="title"]');

  title.href = `/public/books/show.html?id=${book.id}`;
  title.textContent = book.title;

  bookTableBody.appendChild(clone);
}

async function fetch_books() {
  try {
    const response = await fetch('/books');
    const data = await response.text();
    const book_list = JSON.parse(data);
    book_list.forEach(populateTemplate);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetch_books);
