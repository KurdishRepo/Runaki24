document.getElementById('calculate-button').addEventListener('click', function () {
    const consumption = parseFloat(document.getElementById('consumption').value);
    if (!consumption || isNaN(consumption)) {
        alert('Please enter a valid consumption value.');
        return;
    }

    // Tariff Slabs (in IQD per kWh)
    const tariffs = [72, 108, 175, 265, 350];
    const slabRanges = [400, 800, 1200, 1600]; // kWh thresholds for each slab

    // Calculate the tariff for each slab
    let totalTariff = 0;
    let remainingConsumption = consumption;

    const resultSection = document.getElementById('result-section');
    const slab1Result = document.getElementById('slab1-result');
    const slab2Result = document.getElementById('slab2-result');
    const slab3Result = document.getElementById('slab3-result');
    const slab4Result = document.getElementById('slab4-result');
    const slab5Result = document.getElementById('slab5-result');
    const totalTariffResult = document.getElementById('total-tariff-result');

    // Clear previous results
    slab1Result.textContent = '';
    slab2Result.textContent = '';
    slab3Result.textContent = '';
    slab4Result.textContent = '';
    slab5Result.textContent = '';
    totalTariffResult.textContent = '';

    // Calculate each slab
    for (let i = 0; i < tariffs.length; i++) {
        let currentSlabConsumption = 0;

        // Determine the consumption for the current slab
        if (i < slabRanges.length) {
            currentSlabConsumption = Math.min(slabRanges[i] - (i > 0 ? slabRanges[i - 1] : 0), remainingConsumption);
        } else {
            currentSlabConsumption = remainingConsumption; // For Slab 5 (1600+ kWh)
        }

        let currentSlabTariff = currentSlabConsumption * tariffs[i];

        totalTariff += currentSlabTariff;

        // Update the corresponding slab result
        switch (i) {
            case 0:
                slab1Result.textContent = `${currentSlabConsumption} kWh × ${tariffs[i]} IQD/kWh = ${currentSlabTariff} IQD`;
                break;
            case 1:
                slab2Result.textContent = `${currentSlabConsumption} kWh × ${tariffs[i]} IQD/kWh = ${currentSlabTariff} IQD`;
                break;
            case 2:
                slab3Result.textContent = `${currentSlabConsumption} kWh × ${tariffs[i]} IQD/kWh = ${currentSlabTariff} IQD`;
                break;
            case 3:
                slab4Result.textContent = `${currentSlabConsumption} kWh × ${tariffs[i]} IQD/kWh = ${currentSlabTariff} IQD`;
                break;
            case 4:
                slab5Result.textContent = `${currentSlabConsumption} kWh × ${tariffs[i]} IQD/kWh = ${currentSlabTariff} IQD`;
                break;
        }

        remainingConsumption -= currentSlabConsumption;
        if (remainingConsumption <= 0) break;
    }

    // Display the total tariff
    totalTariffResult.textContent = `${totalTariff.toFixed(2)} IQD`;

    // Show the result section
    resultSection.classList.remove('hidden');
});
// Localization Data
const translations = {
    en: {
        title: "Tariff Calculator",
        segment: "Segment",
        consumption: "Consumption (kWh)",
        calculateButton: "Calculate Tariff",
        calculationDetails: "Calculation Details",
        totalTariff: "Total Tariff",
        slab1: "Slab 1:",
        slab2: "Slab 2:",
        slab3: "Slab 3:",
        slab4: "Slab 4:",
        slab5: "Slab 5:",
    },
    ar: {
        title: "حاسبة التعريفة",
        segment: "القطاع",
        consumption: "الاستهلاك (كيلو واط ساعة)",
        calculateButton: "احسب التعريفة",
        calculationDetails: "تفاصيل الحساب",
        totalTariff: "التعريفة الإجمالية",
        slab1: "الفئة 1:",
        slab2: "الفئة 2:",
        slab3: "الفئة 3:",
        slab4: "الفئة 4:",
        slab5: "الفئة 5:",
    },
    ku: { // Kurdish Central
        title: "خەمڵاندنی پسوولەی کارەبا",
        segment: "پسوولەکەت بخەمڵێنە",
        consumption: "کارەبا (کیلۆوات کاتژمێر)",
        calculateButton: "پسوولەکەت بخەمڵێنە",
        calculationDetails: "وردەکاری ژمێریاری",
        totalTariff: "کۆی گشتی پسوولە",
        slab1: "بەشی 1: ",
        slab2: "بەشی 2: ",
        slab3: "بەشی 3: ",
        slab4: "بەشی 4: ",
        slab5: "بەشی 5: ",
    },
};

// Initial Language
let currentLanguage = "en";

// Function to update the UI with the selected language
function updateUI(lang) {
    currentLanguage = lang;

    // Update the language button text
    document.getElementById("current-language").textContent = lang.toUpperCase();

    // Update the calculator UI
    document.getElementById("calculator-title").textContent = translations[lang].title;
    document.querySelector('label[for="segment"]').textContent = translations[lang].segment;
    document.querySelector('label[for="consumption"]').textContent = translations[lang].consumption;
    document.getElementById("calculate-button").textContent = translations[lang].calculateButton;
    document.getElementById("calculation-details-title").textContent = translations[lang].calculationDetails;
    document.querySelector('.total-tariff span:first-child').textContent = translations[lang].totalTariff;
    document.getElementById("slab1-result").parentElement.children[0].textContent = translations[lang].slab1;
    document.getElementById("slab2-result").parentElement.children[0].textContent = translations[lang].slab2;
    document.getElementById("slab3-result").parentElement.children[0].textContent = translations[lang].slab3;
    document.getElementById("slab4-result").parentElement.children[0].textContent = translations[lang].slab4;
    document.getElementById("slab5-result").parentElement.children[0].textContent = translations[lang].slab5;
}

// Event Listener for Language Switcher
document.getElementById("language-button").addEventListener("click", function () {
    const languageMenu = document.getElementById("language-menu");
    languageMenu.classList.toggle("hidden");
});

document.getElementById("language-menu").addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        const lang = event.target.dataset.lang;
        updateUI(lang);
        document.getElementById("language-menu").classList.add("hidden");
    }
});

// Initialize the UI with the default language (English)
updateUI(currentLanguage);