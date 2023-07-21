function searchWord() {
        const apiKey = "337c0b5b-8256-473f-8b94-ec93a171b15f";
        const word = document.getElementById("searchInput").value.trim();

        if (!word) {
                alert("Please Enter a Word to Search...");
                return;
        }

        fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => {
                console.error('Error Fetching Data:', error);
                alert("An error occurred while fetching data. Please try again later.");
        });
}

function displayResults(data) {
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = " ";

        if (data.length === 0) {
                resultContainer.innerHTML = "<p>No Results found for the given Word.</p>";
                resultContainer.classList.remove('show');
                return;
        }

        const uniquePartsOfSpeech = new Set();
        const entriesToShow = [];

        data.forEach(entry => {
                const partOfSpeech = entry.fl;

                if (!uniquePartsOfSpeech.has(partOfSpeech)) {
                        uniquePartsOfSpeech.add(partOfSpeech);
                        entriesToShow.push(entry);
                }
        });

        entriesToShow.forEach(entry => {
                const partOfSpeech = entry.fl;
                const definitions = entry.shortdef;

                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');

                const partOfSpeechHeading = document.createElement('h3');
                partOfSpeechHeading.textContent = `Part of Speech: ${partOfSpeech}`;
                entryDiv.appendChild(partOfSpeechHeading);

                definitions.forEach((definition, index) => {
                        const definitionPara = document.createElement('p');
                        definitionPara.textContent = `Definition ${index + 1}: ${definition}`;
                        entryDiv.appendChild(definitionPara);
                });
                resultContainer.appendChild(entryDiv);
        });
        resultContainer.classList.add('show');
        resultContainer.style.overflowY = 'scroll';

        resultContainer.addEventListener('animationend', () => {
                resultContainer.classList.remove('show');
        });
}