function removeEmptyItems(content) {
    for (let index in content) {
        let item = content[index];
        if (typeof item === 'object') {
            // item is an object
            if (Array.isArray(item)) {
                removeEmptyItems(item);
            } else {
                // item is not an array
                if (!item.hasOwnProperty('text') || typeof item.text !== 'string') {
                    if (item.hasOwnProperty('text') && Array.isArray(item.text)) {
                        removeEmptyItems(item.text);
                    } else {
                        if (item.hasOwnProperty('stack')) {
                            removeEmptyItems(item.stack);
                        } else {
                            if (item.hasOwnProperty('columns')) {
                                removeEmptyItems(item.columns);
                            } else {
                                if (item.hasOwnProperty('table')) {
                                    for (let row in item.table.body) {
                                        removeEmptyItems(item.table.body[row]);
                                    }
                                } else {
                                    console.warn('- Detected not valid element:', item);
                                    content.splice(index, 1);;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return content;
}

module.exports = function (content) {
    removeEmptyItems(content);
};