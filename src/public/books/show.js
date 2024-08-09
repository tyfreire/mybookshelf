const template = document.getElementById('bookTemplate').content;
const bookTableBodyEl = document.getElementById('bookTableBody');

function get_id_from_url() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return id;
}

async function fetch_book_by_id(id) {
  const response = await fetch(`/books/${id}`);
  const body = await response.text();
  const book = JSON.parse(body);
  return book;
}

function populateTemplate(book) {
  const clone = document.importNode(template, true);
  const titleEl = clone.querySelector('th[slot=title]');
  titleEl.textContent = book.title;

  bookTableBodyEl.appendChild(clone);
}

async function main() {
  const id = get_id_from_url();
  const book = await fetch_book_by_id(id);
  populateTemplate(book);
}

document.addEventListener('DOMContentLoaded', main);
