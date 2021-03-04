/**
 *
 * @param ComponentId Element HTML ID
 * @param apiUrl
 * @returns {Promise<any>}
 * @constructor
 */
const Jackpot = async (ComponentId, apiUrl) => {

    const Component    = document.querySelector('#' + ComponentId);
    let _maxAmount     = false;
    let _currentAmount = false;

    /**
     *
     * @returns {Promise<any>}
     */
    const render = async () => {
        const maxAmount = await _fetchMaxAmount();
        if(!maxAmount) {
            return '';
        }
        _maxAmount = maxAmount;
        _currentAmount = _subtractDollars(1000, _maxAmount);
        _updateJackpot(_currentAmount);
        return await _startInterval();
    }

    /**
     *
     * @param amount to show
     * @private
     */
    const _updateJackpot = (amount) => {
        amount = Number(amount).toFixed(2);
        Component.innerHTML = amount;
    }

    /**
     *
     * @returns {Promise<any>}
     * @private
     */
    const _startInterval = async () => {
        return await new Promise(() => {
            const interval = setInterval(() => {
                const randomIncrease = _randomCentsIncrease(1, 10);
                if (randomIncrease >= _maxAmount) {
                    _currentAmount = _maxAmount;
                    clearInterval(interval);
                } else {
                    _currentAmount = randomIncrease;
                }
                _updateJackpot(_currentAmount);
            }, 3000);
        });
    }

    /**
     *
     * @param min in Cents
     * @param max in Cents
     * @returns {number} 2 digits
     * @private
     */
    const _randomCentsIncrease = (min = 1, max = 10) => {
        const rnd = (Math.floor(Math.random() * max) + min) / 100;
        return _addCents(rnd, _currentAmount);
    }

    /**
     *
     * @param add The amount to add in cents
     * @param to The current amount
     * @returns {number} 2 digits
     * @private
     */
    const _addCents = (add, to) => {
        const amount = (to * 100 + add * 100) / 100;
        return Number((amount).toFixed(2));
    }

    /**
     *
     * @param subtract Amount to subtract in Dollars
     * @param from Amount
     * @returns {number} 2 digits
     * @private
     */
    const _subtractDollars= (subtract, from) => {
        const amount = (from - subtract) / 1;
        return Number((amount).toFixed(2));
    }

    /**
     *
     * @returns {Promise<number | boolean>}
     * @private
     */
    const _fetchMaxAmount = async () => {
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                try {
                    return data['entity']['totalAmount'];
                } catch (e) {
                    return false;
                }
            }).catch((e) => { return false;})
    }

    return await render();
};