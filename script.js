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