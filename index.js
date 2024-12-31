// Sayfa içi yumuşak kaydırma için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function updateSection(sectionId) {
    const input = document.getElementById(`${sectionId}-input`);
    const textElement = document.getElementById(`${sectionId}-text`);
    
    if (input.value.trim() !== '') {
        if (sectionId === 'yetenekler') {
            // Yetenekler için özel işleme
            const yetenekler = input.value.split('\n').filter(yetenek => yetenek.trim() !== '');
            const yeteneklerHTML = yetenekler
                .map(yetenek => `<li>${yetenek.trim()}</li>`)
                .join('');
            textElement.innerHTML = `<ul class="yetenekler-list">${yeteneklerHTML}</ul>`;
        } else {
            // Diğer bölümler için normal işleme
            textElement.innerHTML = input.value.replace(/\n/g, '<br>');
        }
        
        input.value = ''; // Formu temizle
        localStorage.setItem(`${sectionId}-content`, textElement.innerHTML);
    }
}

// Sayfa yüklendiğinde kaydedilmiş içeriği geri yükle
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['hakkimda', 'egitim', 'deneyim', 'yetenekler'];
    
    sections.forEach(section => {
        const savedContent = localStorage.getItem(`${section}-content`);
        if (savedContent) {
            document.getElementById(`${section}-text`).innerHTML = savedContent;
        }
    });
});

function addYetenek() {
    const baslik = document.getElementById('yetenek-baslik').value;
    const detay = document.getElementById('yetenek-detay').value;
    
    if (baslik.trim() !== '') {
        const yeteneklerList = document.querySelector('.yetenekler-list');
        const yeniYetenek = document.createElement('div');
        yeniYetenek.className = 'yetenek-item';
        yeniYetenek.innerHTML = `
            <div class="yetenek-baslik">${baslik}</div>
            <div class="yetenek-detay">${detay.replace(/\n/g, '<br>')}</div>
        `;
        
        yeteneklerList.appendChild(yeniYetenek);
        
        // Form temizleme
        document.getElementById('yetenek-baslik').value = '';
        document.getElementById('yetenek-detay').value = '';
        
        // LocalStorage'a kaydetme
        saveYetenekler();
    }
}

// Yetenekleri açıp kapama
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('yetenek-baslik')) {
        e.target.classList.toggle('active');
        e.target.nextElementSibling.classList.toggle('active');
    }
});

// Yetenekleri localStorage'a kaydetme
function saveYetenekler() {
    const yeteneklerList = document.querySelector('.yetenekler-list');
    localStorage.setItem('yetenekler', yeteneklerList.innerHTML);
}

// Sayfa yüklendiğinde yetenekleri geri yükleme
document.addEventListener('DOMContentLoaded', () => {
    const savedYetenekler = localStorage.getItem('yetenekler');
    if (savedYetenekler) {
        document.querySelector('.yetenekler-list').innerHTML = savedYetenekler;
    }
});
