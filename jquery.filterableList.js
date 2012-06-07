/**
 * jQuery Filterable List Plugin
 * Adapted from jQuery Mobile list filter by Jake Boone
 * https://github.com/jakeboone02/filterableList
 * Released with MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function( $ ) {

$.fn.filterableList = function( options ) {
    var settings = $.extend({

        // Placeholder for the input textbox
        placeholder: "Filter...",

        // CSS class applied to items to be hidden.
        // This should be defined in your CSS somewhere as "display: none;"
        hiddenClass: "hidden",

        // CSS class of list dividers (LI's treated as section headers)
        listDividerClass: "list-divider",

        // .data() attribute to search instead of .text()
        dataFilter: "filtertext",

        // CSS class applied to the input textbox
        filterBoxClass: "filterbox"
    }, options);

    return this.each( function() {

        var list = $(this);
        var wrapper = $( "<form>" ),
            search = $( "<input>", {
                placeholder: settings.placeholder,
                "class": settings.filterBoxClass,
                data: {"lastval": ""}
            })
            .on( "keyup.filterablelist change.filterablelist", function() {

                var $this = $(this),
                    val = $this.val().toLowerCase(),
                    listItems = null,
                    lastval = $this.data( "lastval" ) + "",
                    childItems = false,
                    itemtext = "",
                    item;

                // Change val as lastval for next execution
                $this.data( "lastval" , val );

                if ( val.length < lastval.length || val.indexOf(lastval) !== 0 ) {

                    // Removed chars or pasted something totally different, check all items
                    listItems = list.children();
                } else {

                    // Only chars added, not removed, only use visible subset
                    listItems = list.children( ":not(." + settings.hiddenClass + ")" );
                }

                if ( val ) {

                    // This handles hiding regular rows without the text we search for
                    // and any list dividers without regular rows shown under it

                    for ( var i = listItems.length - 1; i >= 0; i-- ) {
                        item = $( listItems[ i ] );
                        itemtext = item.data( settings.dataFilter ) || item.text();

                        if ( item.is( "li." + settings.listDividerClass ) ) {

                            item.toggleClass( "ui-filter-hidequeue" , !childItems );

                            // New bucket!
                            childItems = false;

                        } else if ( itemtext.toLowerCase().indexOf( val ) === -1 ) {

                            //mark to be hidden
                            item.toggleClass( "ui-filter-hidequeue" , true );
                        } else {

                            // There's a shown item in the bucket
                            childItems = true;
                        }
                    }

                    // Show items, not marked to be hidden
                    listItems
                        .filter( ":not(.ui-filter-hidequeue)" )
                        .toggleClass( settings.hiddenClass, false );

                    // Hide items, marked to be hidden
                    listItems
                        .filter( ".ui-filter-hidequeue" )
                        .toggleClass( settings.hiddenClass, true )
                        .toggleClass( "ui-filter-hidequeue", false );

                } else {

                    //filtervalue is empty => show all
                    listItems.toggleClass( settings.hiddenClass, false );
                }
            })
            .appendTo( wrapper );

        wrapper.on( "submit.filterablelist", function() {
            return false;
        })
        .insertBefore( list );
    });
};

})( jQuery );
