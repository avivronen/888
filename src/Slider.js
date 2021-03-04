/**
 *
 * @param componentId Element HTML ID
 * @param imagesArray [0]='imageLocation'
 * @param nextInterval in Seconds
 * @returns {Promise<any>}
 */
const Slider  = async (componentId, imagesArray, nextInterval = 3) => {

    nextInterval            = nextInterval * 1000;
    const  _Component       = document.querySelector('#' + componentId);
    const _imagesLength     = imagesArray.length;
    let   _currentImageKey  = 0;

    /**
     *
     * @returns {Promise<any>}
     */
    const render = async () => {
        _renderImage();
        await _startInterval();
    }

    /**
     *
     * @private
     */
    const _next = () => {
        const nextId = _currentImageKey == _imagesLength -1 ? 0: _currentImageKey + 1
        _currentImageKey = nextId;
        return _renderImage();
    }

    /**
     *
     * @private
     */
    const _renderImage = () => {
        const downloadingImage = new Image();
        _Component.innerHTML = "<img src='" + imagesArray[_currentImageKey] + "' style='max-width: 100%' loading='eager'/>";
    }

    /**
     *
     * @returns {Promise<anyn>}
     * @private
     */
    const _startInterval = async () => {
        return await new Promise(() => {
            const interval = setInterval(() => {
                _next();
            }, nextInterval);
        });
    }

    await render();
};




