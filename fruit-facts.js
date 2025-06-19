const FRUIT_FACTS = {
  apple: {
    nutrition: {
      calories: "95 kcal",
      fiber: "4.5g",
      vitamin_c: "14% DV"
    },
    facts: [
      "Apples float in water because they are 25% air",
      "There are over 7,500 varieties of apples grown worldwide",
      "The science of apple growing is called pomology"
    ],
    benefits: [
      "Supports heart health",
      "Helps maintain healthy blood sugar levels",
      "Rich in antioxidants"
    ],
    season: "Best from September to November"
  },
  banana: {
    nutrition: {
      calories: "105 kcal",
      fiber: "3.1g",
      potassium: "422mg"
    },
    facts: [
      "Bananas are berries, but strawberries aren't!",
      "They naturally produce a happy hormone called serotonin",
      "Wild bananas have large seeds and little flesh"
    ],
    benefits: [
      "Great source of quick energy",
      "Supports muscle function",
      "Aids in digestion"
    ],
    season: "Available year-round"
  },
  lemon: {
    nutrition: {
      calories: "20 kcal",
      fiber: "2.4g",
      vitamin_c: "51% DV"
    },
    facts: [
      "One tree can produce up to 600 pounds of lemons per year",
      "They were once used to combat scurvy in sailors",
      "Ancient Romans believed lemons could neutralize poison"
    ],
    benefits: [
      "Boosts immune system",
      "Aids in iron absorption",
      "Supports skin health"
    ],
    season: "Peak season from November to March"
  }
};

function getFruitFacts(fruit) {
  return FRUIT_FACTS[fruit] || null;
}

function createFactsSection(fruit) {
  const facts = getFruitFacts(fruit);
  if (!facts) return '';

  return `
    <div class="facts-section">
      <div class="facts-nutrition">
        <h3>Nutrition Facts</h3>
        <div class="nutrition-grid">
          <div class="nutrition-item">
            <span class="nutrition-value">${facts.nutrition.calories}</span>
            <span class="nutrition-label">Calories</span>
          </div>
          <div class="nutrition-item">
            <span class="nutrition-value">${facts.nutrition.fiber}</span>
            <span class="nutrition-label">Fiber</span>
          </div>
          ${facts.nutrition.vitamin_c ? `
            <div class="nutrition-item">
              <span class="nutrition-value">${facts.nutrition.vitamin_c}</span>
              <span class="nutrition-label">Vitamin C</span>
            </div>
          ` : `
            <div class="nutrition-item">
              <span class="nutrition-value">${facts.nutrition.potassium}</span>
              <span class="nutrition-label">Potassium</span>
            </div>
          `}
        </div>
      </div>

      <div class="facts-benefits">
        <h3>Health Benefits</h3>
        <ul class="benefits-list">
          ${facts.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
      </div>

      <div class="fun-facts">
        <h3>Fun Facts</h3>
        <div class="facts-carousel">
          ${facts.facts.map(fact => `
            <div class="fact-card">
              <p>${fact}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="season-info">
        <h3>Best Season</h3>
        <p>${facts.season}</p>
      </div>
    </div>
  `;
}

// Initialize facts carousel
function initFactsCarousel() {
  const cards = document.querySelectorAll('.fact-card');
  let currentCard = 0;

  function showCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
  }

  function nextCard() {
    currentCard = (currentCard + 1) % cards.length;
    showCard(currentCard);
  }

  // Show first card and start rotation
  if (cards.length > 0) {
    showCard(0);
    setInterval(nextCard, 5000); // Rotate every 5 seconds
  }
} 