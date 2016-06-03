/*global define*/
define([
        '../ThirdParty/bluebird',
        './defined',
        './DeveloperError',
        './loadImage'
    ], function(
        Promise,
        defined,
        DeveloperError,
        loadImage) {
    'use strict';

    /**
     * @private
     */
    function loadImageFromTypedArray(uint8Array, format) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(uint8Array)) {
            throw new DeveloperError('uint8Array is required.');
        }

        if (!defined(format)) {
            throw new DeveloperError('format is required.');
        }
        //>>includeEnd('debug');

        var blob = new Blob([uint8Array], {
            type : format
        });

        var blobUrl = window.URL.createObjectURL(blob);
        return loadImage(blobUrl, false).then(function(image) {
            window.URL.revokeObjectURL(blobUrl);
            return image;
        }, function(error) {
            window.URL.revokeObjectURL(blobUrl);
            return Promise.reject(error);
        });
    }

    return loadImageFromTypedArray;
});
