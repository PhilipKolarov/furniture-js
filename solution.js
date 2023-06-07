function solve() {
  [ generateTextArea, buyTextArea ] = Array.from(document.getElementsByTagName('textarea'));
  [ generateBtn, buyBtn ] = Array.from(document.getElementsByTagName('button'));

  generateBtn.addEventListener('click', generateHandler);
  buyBtn.addEventListener('click', buyHandler);

  function generateHandler() {
    const data = JSON.parse(generateTextArea.value);
    const [ tbody ] = Array.from(document.getElementsByTagName('tbody'));
    for (const { img, name, price, decFactor } of data) {
      let tableRow = createElement('tr');
      let firstColumn = createElement('td', tableRow);
      createElement('img', firstColumn, '', '', '', { src: img });
      let secondColumn = createElement('td', tableRow);
      createElement('p', secondColumn, name);
      let thirdColumn = createElement('td', tableRow);
      createElement('p', thirdColumn, price);
      let forthColumn = createElement('td', tableRow);
      createElement('p', forthColumn, decFactor);
      let fifthColumn = createElement('td', tableRow);
      createElement('input', fifthColumn, '', '', '', { type: 'checkbox' });

      tbody.appendChild(tableRow);
    }
  }

  function buyHandler() {
    let checkedInputs = Array.from(document.querySelectorAll('tbody tr input:checked'));
    let boughtItems = [];
    let totalPrice = 0;
    let totalDecFactor = 0;

    for (const el of checkedInputs) {
      let tableRow = el.parentElement.parentElement;
      [ _imgColumn, nameColumn, priceColumn, decFactorColumn ] = Array.from(tableRow.children);
      let name = nameColumn.children[0].textContent;
      boughtItems.push(name);
      let price = Number(priceColumn.children[0].textContent);
      totalPrice += price;
      let decFactor = Number(decFactorColumn.children[0].textContent);
      totalDecFactor += decFactor;
    }

    buyTextArea.value += `Bought furniture: ${boughtItems.join(', ')}\n`;
    buyTextArea.value += `Total price: ${totalPrice.toFixed(2)}\n`;
    buyTextArea.value += `Average decoration factor: ${totalDecFactor / boughtItems.length}`;
  }

  function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type);
  
    if (content && useInnerHtml) {
      htmlElement.innerHTML = content;
    } else {
      if (content && type !== 'input') {
        htmlElement.textContent = content;
      }
      
      if (content && type === 'input') {
        htmlElement.value = content;
      }
    }
    
    // parse as an array
    if (classes && classes.length > 0) {
      htmlElement.classList.add(...classes);
    }
  
    if (id) {
      htmlElement.id = id;
    }
  
    // { src: 'ink', href: 'http' }
    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttribute(key, attributes[key])
      }
    }
  
    if (parentNode) {
      parentNode.appendChild(htmlElement)
    }
  
    return htmlElement;
  }
}

// type = string
// content = string
// id = string
// classes = array of strings
// attributes  = object
