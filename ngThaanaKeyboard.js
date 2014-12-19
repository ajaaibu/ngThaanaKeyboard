(function(){
  'use strict'

  angular.module('thaanaKeyboard',[])

  .directive('thaanaKeyboard',function(){

    var keyboard = { 33 : '!', 34 : '"', 35: '#', 36 : '$', 37 : '%', 38 : '&', 39 : '\'', 40 : ')', 41 : '(', 42 : '*', 43 : '+', 44 : '،', 45 : '-', 46 : '.', 47 : '/', 58: ':', 59 : '؛', 60 : '>', 61 : '=', 62 : '<', 63 : '؟', 64 : '@', 65 : 'ާ', 66 : 'ޞ', 67 : 'ޝ', 68 : 'ޑ', 69 : 'ޭ', 70 : 'ﷲ', 71 : 'ޣ', 72 : 'ޙ', 73 : 'ީ' ,74 : 'ޛ', 75 : 'ޚ' ,76 : 'ޅ', 77 : 'ޟ', 78 : 'ޏ', 79 : 'ޯ', 80 : '÷', 81 : 'ޤ', 82 : 'ޜ', 83 : 'ށ', 84 : 'ޓ', 85 : 'ޫ', 86 : 'ޥ', 87 : 'ޢ', 88 : 'ޘ', 89 : 'ޠ', 90 : 'ޡ', 91 : ']', 92 : '\\', 93 : '[', 94 : '^', 95: '_', 96 : '`', 97 : 'ަ', 98 : 'ބ', 99 : 'ޗ', 100 : 'ދ', 101 : 'ެ', 102 : 'ފ', 103 : 'ގ', 104 : 'ހ', 105 : 'ި', 106 : 'ޖ', 107 : 'ކ', 108 : 'ލ', 109 : 'މ', 110 : 'ނ', 111 : 'ޮ', 112 : 'ޕ', 113 : 'ް', 114 : 'ރ', 115 : 'ސ', 116 : 'ތ', 117 : 'ު', 118 : 'ވ', 119 : 'އ', 120 : '×', 121 : 'ޔ', 122 : 'ޒ', 123: '}', 124 : '|', 125 : '{', 126 : '~'};

    // event trigger function
    var fireEvent = function(element,event){
      if (document.createEventObject){
          // dispatch for IE
          var evt = document.createEventObject();
          return element.fireEvent('on'+event,evt)
      }
      else{
          // dispatch for firefox + others
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent(event, true, true ); // event type,bubbling,cancelable
          return !element.dispatchEvent(evt);
      }
    }

    // linker function for directive
    var thaanaLinker = function(scope,element,attrs){

      // disable autocomplete on element
      element.attr('autocomplete','off');

      // handle key inputs
      element.on('keypress',function(e){
        
        // default behavior for ctrl,command, shift keys
        if (e.ctrlKey){
          return true;
        }
        else if(e.metaKey){
          return true;
        }
        else if (e.which == 16){
            return true;
        }
        else{

          // check if key in translation array
          if(keyboard[e.which]){

            // insert char based on text selection and cursor position
            if(this.selectionStart || this.selectionStart == 0){
              var selected = this.selectionStart + 1;
              var current = this.value.substring(0, this.selectionStart)
              + keyboard[e.which]
              + this.value.toString().substring(this.selectionEnd, this.value.length);
              
              this.value = current;

              this.setSelectionRange(selected,selected);
              this.focus();

            }
            else if(document.selection){ // for ie
              var selected = document.selection.createRange();
              selected.text = keyboards[settings.keyboard][e.which];
              this.focus();
            }
            else{
              var current = this.value;
              current += keyboards[e.which];
              this.focus();
            }
            // trigger change event, just incase you have another event callback
            fireEvent(this,'change');
            e.preventDefault();
            return false;
          }
        }

      });
    };

    return {
      restrict: 'A',
      link: thaanaLinker
    };
  });

})();