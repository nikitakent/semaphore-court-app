const charges = document.querySelectorAll('.charge');

charges.forEach((charge) => {
    const guiltyBtn = charge.querySelector('.guilty');
    const notGuiltyBtn = charge.querySelector('.not-guilty');
    
    guiltyBtn.addEventListener('click', () => vote(charge, 1));
    notGuiltyBtn.addEventListener('click', () => vote(charge, 0));
});

function vote(chargeElement: Element, signal: number) {
    // You can add more logic here to store votes or handle behavior
    console.log(`Charge ${chargeElement.getAttribute('data-id')} voted: ${signal === 1 ? 'GUILTY' : 'NOT GUILTY'}`);
}

const generateResultBtn = document.getElementById('generateResult');
generateResultBtn.addEventListener('click', () => {
    // For demonstration, I'm just randomizing the bar width
    const guiltyBar = document.getElementById('guiltyBar') as HTMLElement;
    const notGuiltyBar = document.getElementById('notGuiltyBar') as HTMLElement;
    
    if (guiltyBar && notGuiltyBar) {
        guiltyBar.style.width = `${Math.random() * 100}%`;
        notGuiltyBar.style.width = `${Math.random() * 100}%`;
    }
});



