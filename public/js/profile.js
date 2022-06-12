const newFormHandler = async (event) => {
    event.preventDefault(); 

    const name = document. querySelector('#name').value.trim(); 
    const amount = document.querySelector('#email-signup').value.trim(); 
    const date = document.querySelector('#pwd').value.trim();

    if(name && amount && date) { 
      const response = await fetch(`/api/expenses/newexpense`, {
        method: 'POST', 
        body: JSON.stringify({ name, amount, date}), 
        headers: { 
          'Content-Type': 'application/json', 
        },
      });

      if(response.ok) { 
        document.location.replace('/profile'); 
      } else { 
        alert('Failed to create project'); 
      }
    }
};

const delButtonHandler = async(event) => { 
  if(event.target.hasAttribute('data-id')) { 
    const id = event.target.getAttribute('data-id'); 

    const response = await fetch(`/api/expenses/${id}`, {
      method: 'DELETE', 
    });

    if(response.ok) {
      document.locationh.replace('/profile');
    } else { 
      alert('Failed to delete'); 
    }
  }
}; 

document.querySelector('#submitBtn1').addEventListener('click', newFormHandler);

document.querySelector('.deleteBtn').addEventListener('click', delButtonHandler); 
