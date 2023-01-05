class PreRetirementCalculator {
    get result() {
        return $("[id='calculator-results-container'] h3");
    }

    async verifyResultCalculated() {
        let selector = await this.result;
        await selector.waitForDisplayed();
        let resultText = await selector.getText();
        expect(resultText).toEqual('Results');
    }
}

module.exports = new PreRetirementCalculator();