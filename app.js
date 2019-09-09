class Link {
    constructor (desc,link) {
        this.desc = desc;
        this.link = link;
        
    }
}

class UI {
    static displayLink() {
       
         const links = Store.getLinks();

         links.forEach((li) => UI.addLinkToList(li));

    }
    static addLinkToList(li) {
        const list = document.querySelector('#data');

        const row = document.createElement('tr');

        row.innerHTML = `
        
        <td><a style = "text-decoration : none;" href="${li.link}">${li.desc}</a></td>
        
        <td><a href="#" class=" delete" style="color:red; text-decoration : none; ">Remove</a></td>
        `;
        
        list.appendChild(row);
    }

    static deleteLink(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.row');
        container.insertBefore(div, form);

        //deleting in 3 seconds

        setTimeout(() => document.querySelector('.alert').remove(),2000);
    }

    static clearFields(){
        document.querySelector('#desc').value = '';
        document.querySelector('#link').value = '';
    }

}

//storing in local storage

class Store {
    static getLinks() {
      let lis;
      if(localStorage.getItem('lis') === null) {
        lis = [];
      } else {
        lis = JSON.parse(localStorage.getItem('lis'));
      }
  
      return lis;
    }
  
    static addLink(lis1) {
      const lis = Store.getLinks();
      lis.push(lis1);
      localStorage.setItem('lis', JSON.stringify(lis));
    }
  
    static removeLink(desc) {
      const lis = Store.getLinks();
  
      lis.forEach((lis1, index) => {
        if(lis1.desc === desc) {
          lis.splice(index, 1);
        }
      });
  
      localStorage.setItem('lis', JSON.stringify(lis));
    }
  }



document.addEventListener('DOMContentLoaded', UI.displayLink);

document.querySelector('#link-form').addEventListener('submit', (e) => {


    e.preventDefault();

    const desc = document.querySelector('#desc').value;
    const link = document.querySelector('#link').value;

    //validate

    if(desc === '' || link === ''){
        UI.showAlert('Please fill all the fields', 'danger');
    }else{
         //Instantiate the object
    UI.showAlert('Link Added', 'success');
         
    const link1 = new Link(desc, link);

    UI.addLinkToList(link1); // adding the book

    Store.addLink(link1);

    UI.clearFields();

    }

   

});

//removing

document.querySelector('#data').addEventListener('click', (e) =>{
    UI.deleteLink(e.target)
    Store.removeLink(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Link Removed', 'danger');
}
);