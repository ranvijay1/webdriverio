const Page = require('./page');
const Utility = require('./utility.page');

class ForIndividual extends Page {
     /**
     * define selectors using getter methods
     */
     get currentAgeInput () {
        return $('#current-age');
    }

    get retirementAgeInput () {
        return $('#retirement-age');
    }

    get currentIncomeInput () {
        return $('#current-income');
    }

    get spouseAnualIncomeInput () {
        return $('#spouse-income');
    }

    get currentTotalSavingInput () {
        return $('#current-total-savings');
    }
    
    get currentAnnualSavingInput () {
        return $('#current-annual-savings');
    }

    get savingIncreaseRateInput () {
        return $('#savings-increase-rate');
    }

    get noSocialBenfitRadio() {
        return $('#no-social-benefits')
    }

    get yesSocialBenfitRadio() {
        return $('#yes-social-benefits')
    }

    get marriatelStatus() {
        return $('#marital-status-label');
    }

    get sSingleRadio() {
        return $('#single');
    }

    get marriedRadio() {
        return $('#married');
    }

    get socialSecurityOverride() {
        return $('#social-security-override');
    }

    get calculateButton() {
        return $("[class*='btn-primary'][onclick*='calculate']");
    }

    get errorForAllRequiredField() {
        return $('#calculator-input-alert-desc');
    }
    /**
     * Setting the retirement plan
     */
    async setRetirementAge(retirementAge) {
        let selector = await this.retirementAgeInput;
        await Utility.setAndVerifyText(selector, retirementAge);
    }

    /**
     * Setting the current age
     */
    async setCurrentAge(currentAge) {
        let selector = await this.currentAgeInput;
        await Utility.setAndVerifyText(selector, currentAge);
    }

    /**
     * Setting the current annual income
     */
    async setIncome(income) {
        let selector = await this.currentIncomeInput;
        await Utility.setValueByJavaScript(selector, income);
    }

    /**
     * Setting the current total saving income
     */
    async setcurrentTotalSavingInput(currentTotalSaving) {
        let selector = await this.currentTotalSavingInput;
        await Utility.setValueByJavaScript(selector, currentTotalSaving);
    }

     /**
     * Setting the current annual saving income
     */
     async setcurrentAnnualSavingInput(currentAnnualSaving) {
        let selector = await this.currentAnnualSavingInput;
        await Utility.setValueByJavaScript(selector, currentAnnualSaving);
    }
    
    /**
     * Setting the spouse annual income
     */
    async setSpouseAnualIncome(income) {
        let selector = await this.spouseAnualIncomeInput;
        await Utility.setValueByJavaScript(selector, income);
    }

    /**
     * Setting the saving increase rate
     */
    async setSavingIncreaseRate(increaseRate) {
        let selector = await this.savingIncreaseRateInput;
        await Utility.setValueByJavaScript(selector, increaseRate);
    }

    async verifyMarriatelStatusDisplayed() {
        await await this.marriatelStatus.waitForDisplayed();
        let isDisplayed = await this.marriatelStatus.isDisplayed();
        expect(isDisplayed).toBeTruthy();
    }

    async selectRadioButton(radioButtonName) {
        let selector;
        if(radioButtonName.toLowerCase() === 'yes') {
            selector = await this.yesSocialBenfitRadio;
        } else {
            selector = await this.noSocialBenfitRadio;
        }
        await selector.scrollIntoView();
        await Utility.jsClick(selector);
        await this.verifyMarriatelStatusDisplayed();
    }

    async selectMarriatelSatus(marriatalStatus) {
        let selector;
        if(marriatalStatus.toLowerCase() === 'single') {
            selector = await this.singleRadio;
        } else {
            selector = await this.marriedRadio;
        }
        await selector.scrollIntoView();
        await Utility.jsClick(selector);
    }

    async setSocialSecurityOveride(socalSecurityOveride) {
        let selector = await this.socialSecurityOverride;
        await Utility.setValueByJavaScript(selector, socalSecurityOveride);
    }

    async clickOnCalculate() {
        await this.calculateButton.waitForExist();
        await this.calculateButton.scrollIntoView();
        await Utility.jsClick( await this.calculateButton);
    }

    async fillAllData(data) {
        await this.setCurrentAge(data.currentAgeData);
        await this.setRetirementAge(data.retirementAgeData);
        await this.setIncome(data.cuurentAnualIncome);
        await this.setSpouseAnualIncome(data.spouseAnualIncome);
        await this.setcurrentTotalSavingInput(data.currentRetirementSaving);
        await this.setcurrentAnnualSavingInput(data.currentRetirementContribution);
        await this.setSavingIncreaseRate(data.annualRetirementConIncrease);
        await this.selectRadioButton(data.socialSecurityIncome);
        await this.selectMarriatelSatus(data.relationShipStatus);
        await this.setSocialSecurityOveride(data.socialSecurityOverride);
        await this.clickOnCalculate();
        await this.verifyAllFieldRequired(false);
    }

    async verifyAllFieldRequired(isDisplayed) {
        let selector = await this.errorForAllRequiredField;
        let errorDisplayed = false;
        if(await selector.isExisting()) {
            await selector.scrollIntoView();
            errorDisplayed = await this.errorForAllRequiredField.isDisplayed();
        }
        expect(errorDisplayed).toEqual(isDisplayed);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('insights-tools/retirement-calculator.html');
    }
}

module.exports = new ForIndividual();