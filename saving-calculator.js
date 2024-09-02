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
const peopleInputSection = document.getElementById('people-input-section');

const employeesPercentageSlider = document.getElementById('employees-percentage-slider');
const employeesPercentageThumbValue = document.getElementById('employees-percentage-thumb-value');
const employeesPercentageInputSection = document.getElementById('employees-percentage-input-section');
let isHoveringEmployees = false;

const pmiCostSlider = document.getElementById('pmi-cost-slider');
const pmiCostThumbValue = document.getElementById('pmi-cost-thumb-value');
const pmiCostInputSection = document.getElementById('pmi-cost-input-section');
let isHoveringPmiCost = false;

const salarySlider = document.getElementById('salary-slider');
const salaryThumbValue = document.getElementById('salary-thumb-value');
const salaryInputSection = document.getElementById('salary-input-section');
let isHoveringSalary = false;

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
  
  peopleThumbValue.textContent = value == 11000 ? "10000+" : value;

  const min = peopleSlider.min;
  const max = peopleSlider.max;

  const sliderWidth = peopleSlider.offsetWidth;
  const thumbWidth = peopleThumbValue.offsetWidth;

  const percentage = (value - min) / (max - min);
  const position = percentage * (sliderWidth - thumbWidth);

  peopleInputSection.style.backgroundColor = '#F3F2F4';
  peopleInputSection.style.opacity = 1;
  peopleInputSection.style.border = 'none';
  peopleThumbValue.style.left = `${position}px`;
}

function updateEmployeesPercentageSliderValue() {
  const value = employeesPercentageSlider.value;
  
  employeesPercentageThumbValue.textContent = value == -1 ? "Don't know" : `${value}%`;
    
  const hasOverlay = isHoveringEmployees ? 0 : value == -1 ? 1 : 0;
  const backgroundColor = hasOverlay ? '#FFF' : '#F3F2F4';
  const opacity = hasOverlay ? 0.5 : 1;

  employeesPercentageInputSection.style.backgroundColor = backgroundColor;
  employeesPercentageInputSection.style.opacity = opacity;
  
  const min = employeesPercentageSlider.min;
  const max = employeesPercentageSlider.max;
  
  const sliderWidth =   
    employeesPercentageSlider.offsetWidth;
  const thumbWidth = 
    employeesPercentageThumbValue.offsetWidth;
  
  const percentage = (value == -1 ? 0 : (value - min) /         (max - min));
  const position = percentage * (sliderWidth - thumbWidth);

  employeesPercentageThumbValue.style.left = `${position}px`;
}

function updatePmiCostSliderValue() {
  const value = pmiCostSlider.value;
  const region = regionDataMap[selectedRegion.innerText];
  
  pmiCostThumbValue.textContent = value == (region.customMinPmiCost - 100) ? "Don't know" : value;
  
  const hasOverlay = isHoveringPmiCost ? 0 : value == (region.customMinPmiCost - 100) ? 1 : 0;
  const backgroundColor = hasOverlay ? '#FFF' : '#F3F2F4';
  const opacity = hasOverlay ? 0.5 : 1;
  
  pmiCostInputSection.style.backgroundColor = backgroundColor;
  pmiCostInputSection.style.opacity = opacity;
  
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
  
  salaryThumbValue.textContent = value == (region.customMinSalary - 250) ? "Don't know" : value;
  
  const hasOverlay = isHoveringSalary ? 0 : value == (region.customMinSalary - 250) ? 1 : 0;
  const backgroundColor = hasOverlay ? '#FFF' : '#F3F2F4';
  const opacity = hasOverlay ? 0.5 : 1;
  
  salaryInputSection.style.backgroundColor = backgroundColor;
  salaryInputSection.style.opacity = opacity;
  
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
employeesPercentageInputSection.addEventListener('mouseenter', () => {
  isHoveringEmployees = true;
  updateEmployeesPercentageSliderValue();
});
employeesPercentageInputSection.addEventListener('mouseleave', () => {
  isHoveringEmployees = false;
  updateEmployeesPercentageSliderValue();
});

pmiCostSlider.addEventListener('input', () => {
  updatePmiCostSliderValue();
  updateEstimateAndCurrency();
});
pmiCostInputSection.addEventListener('mouseenter', () => {
  isHoveringPmiCost = true;
  updatePmiCostSliderValue();
});
pmiCostInputSection.addEventListener('mouseleave', () => {
  isHoveringPmiCost = false;
  updatePmiCostSliderValue();
});

salarySlider.addEventListener('input', () => {
  updateSalarySliderValue();
  updateEstimateAndCurrency();
});
salaryInputSection.addEventListener('mouseenter', () => {
  isHoveringSalary = true;
  updateSalarySliderValue();
});
salaryInputSection.addEventListener('mouseleave', () => {
  isHoveringSalary = false;
  updateSalarySliderValue();
});

regionButton.addEventListener('click', () => toggleDropdown(regionMenu));

industryButton.addEventListener('click', () => toggleDropdown(industryMenu));

regionMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown-header') ||
      event.target.classList.contains('title') ||
      event.target.classList.contains('arrow')
  ) {
    toggleDropdown(regionMenu);
    return;
  }
  const selection = event.target.innerText;
  selectedRegion.innerText = selection;
  toggleDropdown(regionMenu);
  updateSlidersBasedOnRegion();
  updateEstimateAndCurrency();
});

industryMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown-header') ||
      event.target.classList.contains('title') ||
      event.target.classList.contains('arrow')
  ) {
    toggleDropdown(industryMenu);
    return;
  }
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
