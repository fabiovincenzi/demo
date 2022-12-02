// ---------------------------------------------------------------------------------------
//                                        ILGPU
//                           Copyright (c) 2022 ILGPU Project
//                                    www.ilgpu.net
//
// File: search.js
//
// This file is part of ILGPU and is distributed under the University of Illinois Open
// Source License. See LICENSE.txt for details.
// ---------------------------------------------------------------------------------------


/***** Lunr Index *****/
const searchDocuments = [
    
];


const searchIndex = lunr(function () {
    this.ref('url')
    this.field('title');
    this.field('content');
    searchDocuments.forEach(function (doc) {
        this.add(doc);
    }, this);
})
/***** Lunr Index *****/


/***** TypeAhead *****/
function findDocumentByFieldValue(field, value) {
    const results = searchDocuments.find(obj => {
        return obj[field] === value
    });
    if (results.length === 0) {
        return undefined;
    }else if (results.length === 1) {
        return results[0];
    }else {
        return results;
    }
}


function findMatches(query, callback) {
    const matches = searchIndex.search(query).map(({ ref }) => {
        return findDocumentByFieldValue('url', ref);
    });
    callback(matches);
}

$('#search .typeahead').typeahead({
        minLength: 1,
        classNames: {
            menu: 'bg-white',
            cursor: 'text-primary',
        }
    },
    {
        name: 'documentation',
        source: findMatches,
        display: 'title',
        limit: 3,
        templates: {
            empty: `<div class="empty-message">
                No matches found
                </div>`,
            suggestion: (s) => (`<div role="button">${s.title}</div>`),
        }
    });


$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
    if (suggestion?.url) {
        window.location.href = suggestion.url;
    }
});
/***** TypeAhead *****/

