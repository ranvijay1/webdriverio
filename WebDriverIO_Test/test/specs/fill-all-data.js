const ForIndividual = require('../pageobjects/for-individual.page');
const PreRetirementCalculator = require('../pageobjects/pre-retirement-calculator.page');
const AllData = require('../data/allData');

describe('Filling All Data', () => {
    it('Should open page', async () => {
        await ForIndividual.open();
    });

    it('Should verify all field required',  async () => {
        await ForIndividual.clickOnCalculate();
        await ForIndividual.verifyAllFieldRequired(true);
    })

    it('Should enter all data', async () => {
        await ForIndividual.fillAllData(AllData.data);
    });

    it('Should verify results calculated', async () => {
        await PreRetirementCalculator.verifyResultCalculated();
    })
});


