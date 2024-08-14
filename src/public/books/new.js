async function create_book(book) {
  return await fetch('/books', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify(book),
  });
}

function extract_data(form_el) {
  const form = new FormData(form_el);
  const data = Object.fromEntries(form.entries());

  return {
    title: data.title,
    author: data.author,
    pages: +data.pages,
    language: data.language,
    status: data.status,
    isbn: +data.isbn,
  };
}

function feedback(response) {
  if (response.status === 201) {
    alert('Your book has been created');
  } else {
    alert('Book not created');
  }
}

async function on_submit(event) {
  event.preventDefault();
  const form_el = event.target;
  const data = extract_data(form_el);
  const response = await create_book(data);
  feedback(response);
}

document.getElementById('bookForm').addEventListener('submit', on_submit);
