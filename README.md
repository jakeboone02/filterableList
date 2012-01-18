jQuery Filterable List Plugin
Adapted from jQuery Mobile list filter by Jake Boone
https://github.com/jakeboone02/filterableList
Released with MIT License: http://www.opensource.org/licenses/mit-license.php

jQuery extention to add an auto-filter text box to the top of a list.

Basic usage:

    $("ul.filterable").filterableList();
    
With options:
    
    $("ul.filterable").filterableList({
        placeholder: "Filter items...",
        hiddenClass: "hide"
    });

Available options:

    placeholder
        Placeholder for the input textbox
        Default: "Filter..."

    hiddenClass
        CSS class applied to items to be hidden.
        This should be defined in your CSS somewhere as "display: none;"
        Default: "hidden"

    listDividerClass
        CSS class of list dividers (LI's treated as section headers)
        Default: "list-divider"

    dataFilter
        .data() attribute to search instead of .text()
        Default: "filtertext"

    filterBoxClass
        CSS class applied to the input textbox
        Default: "filterbox"
