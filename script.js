function calculateLove(event) {
    event.preventDefault();
    
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    const resultDiv = document.getElementById('result');
    const body = document.body;

    if (name1 === '' || name2 === '') {
        resultDiv.innerHTML = 'Please enter both names!';
        resultDiv.style.display = 'block';
        return;
    }

    let score = getScore(name1, name2);

    body.style.animation = "pulseRed 0.5s forwards";
    
    setTimeout(() => {
        if (score <= 30) {
            body.style.background = 'linear-gradient(135deg, #6b6bff, #8e8eff)';
            resultDiv.style.color = '#6b6bff';
        } else if (score <= 70) {
            body.style.background = 'linear-gradient(135deg, #ffd56b, #ffeb8e)';
            resultDiv.style.color = '#ffd56b';
        } else {
            body.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
            resultDiv.style.color = '#ff6b6b';
        }

        resultDiv.innerHTML = `${name1} and ${name2} are a match: ${score}%`;
        resultDiv.style.display = 'block';
        
        if (score <= 30) {
            createHearts(5);
        } else if (score <= 70) {
            createHearts(30);
        } else {
            createHearts(70);
        }
    }, 2000);
}

function getScore(name1, name2) {
    name1 = name1.toLowerCase();
    name2 = name2.toLowerCase();

    const combinedNames = name1 + name2;
    let charSum = 0;
    
    for (let i = 0; i < combinedNames.length; i++) {
        charSum += combinedNames.charCodeAt(i);
    }

    let baseScore = charSum % 101;
    let nameLengthDifference = Math.abs(name1.length - name2.length);
    let lengthAdjustment = Math.max(0, 10 - nameLengthDifference);
    let matchingLetters = getMatchingLetters(name1, name2);
    let matchBonus = matchingLetters * 2;

    let finalScore = Math.min(100, baseScore + lengthAdjustment + matchBonus);

    return finalScore;
}

function getMatchingLetters(name1, name2) {
    let matchCount = 0;
    let letterSet = new Set(name2);

    for (let i = 0; i < name1.length; i++) {
        if (letterSet.has(name1[i])) {
            matchCount++;
            letterSet.delete(name1[i]);
        }
    }
    
    return matchCount;
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 1 + 7 + 's';

        heart.textContent = '❤️';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 12000);
    }
}