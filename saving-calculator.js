const regionDataMap = {
  'Australia': { 
    currency: 'A$', 
    minSalary: 90000, 
    maxSalary: 100000,
    customMinSalary: 45000,
    customMaxSalary: 150000,
    pmiCost: 2000,
    customMinPmiCost: 500,
    customMaxPmiCost: 3000
  },
  'Canada': { 
    currency: 'C$', 
    minSalary: 85000, 
    maxSalary: 90000,
    customMinSalary: 42500,
    customMaxSalary: 13500,
    pmiCost: 1000,
    customMinPmiCost: 200,
    customMaxPmiCost: 1500
  },
  'Europe': { 
    currency: '€', 
    minSalary: 45000, 
    maxSalary: 50000,
    customMinSalary: 22500,
    customMaxSalary: 75000,
    pmiCost: 1300,
    customMinPmiCost: 900,
    customMaxPmiCost: 3000
  },
  'New Zealand': { 
    currency: 'NZ$', 
    minSalary: 75000, 
    maxSalary: 85000,
    customMinSalary: 37500,
    customMaxSalary: 127500,
    pmiCost: 1200,
    customMinPmiCost: 900,
    customMaxPmiCost: 1800
  },
  'UK': { 
    currency: '£', 
    minSalary: 40000, 
    maxSalary: 45000,
    customMinSalary: 2000,
    customMaxSalary: 67500,
    pmiCost: 1000,
    customMinPmiCost: 250,
    customMaxPmiCost: 1500
  },
  'USA': { 
    currency: '$', 
    minSalary: 85000, 
    maxSalary: 90000,
    customMinSalary: 42500,
    customMaxSalary: 13500,
    pmiCost: 8500,
    minPmiCost: 3700,
    maxPmiCost: 12800
  }
};

const peopleSlider = document.getElementById('people-slider');
const peopleThumbValue = document.getElementById('people-thumb-value');

const employeesPercentageSlider = document.getElementById('employees-percentage-slider');
const employeesPercentageThumbValue = document.getElementById('employees-percentage-thumb-value');
const employeesPercentageOverlay = document.getElementById('employees-percentage-overlay');

const pmiCostSlider = document.getElementById('pmi-cost-slider');
const pmiCostThumbValue = document.getElementById('pmi-cost-thumb-value');
const pmiCostOverlay = document.getElementById('pmi-cost-overlay');

const salarySlider = document.getElementById('salary-slider');
const salaryThumbValue = document.getElementById('salary-thumb-value');
const salaryOverlay = document.getElementById('salary-overlay');

const estimatedAmount = document.getElementById('estimated-amount');
const currencySymbol = document.getElementById('currency-symbol');
const regionButton =  document.getElementById('regionButton');
const industryButton =  document.getElementById('industryButton');
const regionMenu = document.getElementById('regionMenu');
const industryMenu =  document.getElementById('industryMenu');
const selectedRegion =  document.getElementById('selectedRegion');
const selectedIndustry =  document.getElementById('selectedIndustry');

function updatePeopleSliderValue() {
  const value = peopleSlider.value;
  peopleThumbValue.textContent = value;
  
  if (value == 11000) {
    peopleThumbValue.textContent = "10000+";
  } else {
     peopleThumbValue.textContent = `${value}`;
  }

  const min = peopleSlider.min;
  const max = peopleSlider.max;

  const sliderWidth = peopleSlider.offsetWidth;
  const thumbWidth = peopleThumbValue.offsetWidth;

  const percentage = (value - min) / (max - min);
  const position = percentage * (sliderWidth - thumbWidth);

  peopleThumbValue.style.left = `${position}px`;
}

function updateEmployeesPercentageSliderValue() {
  const value = employeesPercentageSlider.value;
  
  if (value == -1) {
    employeesPercentageThumbValue.textContent = "Don't know";
  } else {
    employeesPercentageThumbValue.textContent = `${value}%`;
  }
  
  const min = employeesPercentageSlider.min;
  const max = employeesPercentageSlider.max;
  
  const sliderWidth =   
    employeesPercentageSlider.offsetWidth;
  const thumbWidth = 
    employeesPercentageThumbValue.offsetWidth;
  
  const percentage = (value == -1 ? 0 : (value - min) /         (max - min));
  const position = percentage * (sliderWidth - thumbWidth);

  employeesPercentageThumbValue.style.left =
    `${position}px`;
}

function updatePmiCostSliderValue() {
  const value = pmiCostSlider.value;
  const region = regionDataMap[selectedRegion.innerText];
  
  if (value == (region.customMinPmiCost - 100)) {
    pmiCostThumbValue.textContent = "Don't know";
  } else {
    pmiCostThumbValue.textContent = `${value}`;
  }
  
  const min = pmiCostSlider.min;
  const max = pmiCostSlider.max;
  
  const sliderWidth = pmiCostSlider.offsetWidth;
  const thumbWidth = pmiCostThumbValue.offsetWidth;
  
  const percentage = (value == (region.customMinPmiCost - 100) ? 0 : (value - min) / (max - min));
  const position = percentage * (sliderWidth - thumbWidth);

  pmiCostThumbValue.style.left = `${position}px`;
}

function updateSalarySliderValue() {
  const value = salarySlider.value;
  const region = regionDataMap[selectedRegion.innerText];
  
  if (value == (region.customMinSalary - 250)) {
    salaryThumbValue.textContent = "Don't know";
  } else {
    salaryThumbValue.textContent = `${value}`;
  }
  
  const min = salarySlider.min;
  const max = salarySlider.max;
  
  const sliderWidth = salarySlider.offsetWidth;
  const thumbWidth = salaryThumbValue.offsetWidth;
  
  const percentage = (value == (region.customMinSalary - 250) ? 0 : (value - min) / (max - min));
  const position = percentage * (sliderWidth - thumbWidth);

  salaryThumbValue.style.left = `${position}px`;
}

peopleSlider.addEventListener('input', () => {
  updatePeopleSliderStep();
  updatePeopleSliderValue();
  updateEstimateAndCurrency();
});

employeesPercentageSlider.addEventListener('input', () => {
  updateEmployeesPercentageSliderValue();
  updateEstimateAndCurrency();
});

pmiCostSlider.addEventListener('input', () => {
  updatePmiCostSliderValue();
  updateEstimateAndCurrency();
});

salarySlider.addEventListener('input', () => {
  updateSalarySliderValue();
  updateEstimateAndCurrency();
});

regionButton.addEventListener('click', () => toggleDropdown(regionMenu));

industryButton.addEventListener('click', () => toggleDropdown(industryMenu));

regionMenu.addEventListener('click', (event) => {
  const selection = event.target.innerText;
  selectedRegion.innerText = selection;
  toggleDropdown(regionMenu);
  updateSlidersBasedOnRegion();
  updateEstimateAndCurrency();
});

industryMenu.addEventListener('click', (event) => {
  const selection = event.target.innerText;
  selectedIndustry.innerText = selection;
  toggleDropdown(industryMenu);
});

window.addEventListener('click', (event) => {
  if (!regionButton.contains(event.target) && 
      !regionMenu.contains(event.target)) {
        regionMenu.style.display = 'none';
  }
  if (!industryButton.contains(event.target) && 
      !industryMenu.contains(event.target)) {
        industryMenu.style.display = 'none';
  }
});

function toggleDropdown(menu) {
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

function updateEstimateAndCurrency() {
  const region = selectedRegion.innerText;
  const currency = regionDataMap[region].currency;
  
  // Calculate estimate savings on sicks days as a range
  const minSavingsOnSickDays = calculateMinSavingsOnSickDays();
  const maxSavingsOnSickDays = calculateMaxSavingsOnSickDays();
  
  // Calculate custom estimate savings on sick days
  const customSavingsOnSickDays = calculateCustomSavingsOnSickDays();
  
  // Calculate savings on PMI Costs
  const savingsOnPmiCost = calculateSavingsOnPmiCosts();
  
  const salary = parseInt(salarySlider.value, 10);
  if (salary == regionDataMap[region].customMinSalary - 250) {
    const min = (minSavingsOnSickDays + savingsOnPmiCost) / 12;
    const max = (maxSavingsOnSickDays + savingsOnPmiCost) / 12;
    estimatedAmount.textContent = `${min.toFixed(0)} - ${max.toFixed(0)} `;
  } else {
    const customValue = (customSavingsOnSickDays + savingsOnPmiCost) / 12;
    estimatedAmount.textContent = `${customValue.toFixed(0)} `;
  }
}

function getAdoptionEstimate(peopleCount) {
  if (peopleCount <= 50) return 0.56;
  if (peopleCount <= 100) return 0.40;
  if (peopleCount <= 500) return 0.37;
  if (peopleCount <= 1000) return 0.28;
  if (peopleCount <= 10000) return 0.16;
  return 0.12;
}

function calculateMinSavingsOnSickDays() {
  const peopleCount = parseInt(peopleSlider.value, 10);
  const adoptionEstimate = getAdoptionEstimate(peopleCount);
  const region = selectedRegion.innerText;
  const minAverageSalary = regionDataMap[region].minSalary;

  const estimate = peopleCount * adoptionEstimate * 0.4 * 0.32 * minAverageSalary * 0.004;
  return Math.round(estimate);
}

function calculateMaxSavingsOnSickDays() {
  const peopleCount = parseInt(peopleSlider.value, 10);
  const adoptionEstimate = getAdoptionEstimate(peopleCount);
  const region = selectedRegion.innerText;
  const maxAverageSalary = regionDataMap[region].maxSalary;

  const estimate = peopleCount * adoptionEstimate * 0.4 * 0.32 * maxAverageSalary * 0.004;
  return Math.round(estimate);
}

function calculateCustomSavingsOnSickDays() {
  const peopleCount = parseInt(peopleSlider.value, 10);
  const adoptionEstimate = getAdoptionEstimate(peopleCount);
  const region = selectedRegion.innerText;
  const value = salarySlider.value;
  
  const estimate = peopleCount * adoptionEstimate * 0.4 * 0.32 * value * 0.004;
  return Math.round(estimate);
}

function calculateSavingsOnPmiCosts() {
  const peopleCount = peopleSlider.value;
  const employeesPercentage = employeesPercentageSlider.value;
  const pmiCost = pmiCostSlider.value;
  const adoptionEstimate = getAdoptionEstimate(peopleCount);
  const region = selectedRegion.innerText;

  const employerPmiCost = (pmiCost > - 1) ? pmiCost : regionDataMap[region].pmiCost;
    
  const workforceOnPmi = (employeesPercentage > -1)
    ? (employeesPercentage / 100) * peopleCount
    : 0.25 * peopleCount;
  
  const estimate = workforceOnPmi * adoptionEstimate * 0.4 * 0.32 * employerPmiCost * 0.16;
  return Math.round(estimate);
}

function updateSlidersBasedOnRegion() {
  const region = regionDataMap[selectedRegion.innerText];
  
  if (region) {
    employeesPercentageSlider.value = -1;
    employeesPercentageThumbValue.textContent = "Don't know";
    employeesPercentageThumbValue.style.left = "0px";
    
    pmiCostSlider.min = region.customMinPmiCost - 100;
    pmiCostSlider.max = region.customMaxPmiCost;
    pmiCostSlider.value = pmiCostSlider.min;
    pmiCostThumbValue.textContent = "Don't know";
    pmiCostThumbValue.style.left = "0px";
    
    salarySlider.min = region.customMinSalary - 250;
    salarySlider.max = region.customMaxSalary;
    salarySlider.value = salarySlider.min;
    salaryThumbValue.textContent = "Don't know";
    salaryThumbValue.style.left = "0px";
    
    currencySymbol.textContent = region.currency;
  }
}

function getPeopleSliderStepSize(value) {
  if (value <= 50) return 5;
  if (value <= 100) return 10;
  if (value <= 500) return 50;
  if (value <= 1000) return 100;
  if (value <= 5000) return 200;
  if (value < 10000) return 500;
  return 1000;
}

function updatePeopleSliderStep() {
  const currentValue = parseInt(peopleSlider.value, 10);
  const stepSize = getPeopleSliderStepSize(currentValue);
  peopleSlider.step = stepSize;
}

updatePeopleSliderValue();
updateEmployeesPercentageSliderValue();
updatePmiCostSliderValue();
updateSalarySliderValue();
updateEstimateAndCurrency();
updatePeopleSliderStep();
