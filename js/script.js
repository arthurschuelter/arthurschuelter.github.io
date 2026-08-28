const papersList = document.getElementById('papers-list');

async function loadAllPapers() {
    try {
        const manifestResponse = await fetch('./publications/index.json');
        const filenames = await manifestResponse.json();

        const paperPromises = filenames.map(async (file) => {
            const response = await fetch(`./publications/${file}`);
            return response.json();
        });

        const papers = await Promise.all(paperPromises);

        papers
            .sort((a, b) => b.year - a.year)
            .forEach(renderPaper);

    } catch (error) {
        console.error('Error loading papers:', error);
        papersList.innerHTML = '<li>Error loading publications.</li>';
    }
}

function renderPaper(paper) {
    const li = document.createElement('li');
    li.style.marginBottom = '1em';
    li.innerHTML = `
        <strong>${paper.title}</strong><br>
        <em>${paper.authors.join(', ')}</em> <br>
        <span> ${paper.conference}, ${paper.year}</span>
    `;
    papersList.appendChild(li);
}

loadAllPapers();