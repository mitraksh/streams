fetch('/employee').then((response) => response.json()).then((data) => {
    console.log(data);
    data.forEach((employees) => {
        const cardTemp = document.querySelector('template');
        const card = cardTemp.content.cloneNode(true);
        card.querySelector('p').innerText = employees.name;
        document.body.appendChild(card);
    })
})