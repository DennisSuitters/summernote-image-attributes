# summernote-image-attributes
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

Adds a button to the image popover to edit title, alt, class and style attributes, and Links with relevant Attributes (Thanks to [minidc](https://github.com/ninidc)).

### Installation

#### 1. Include JS

Include the following code after including Summernote:

```html
<script src="summernote-image-attributes.js"></script>
<script src="lang/[language-COUNTRY].js"></script>
```

#### 2. Supported languages
Currently available in US English (Default), UK English, Spanish, French, Chinese (Traditional), Italian, German and Turkish!

#### 3. Summernote options
Finally, customize the Summernote image popover.

```javascript
$(document).ready(function() {
    $('#summernote').summernote({
        popover: {
            image: [
                ['custom', ['imageAttributes']],
                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']]
            ],
        },
        lang: 'en-US', // Change to your chosen language
        imageAttributes:{
            imageDialogLayout:'default', // default|horizontal
            icon:'<i class="note-icon-pencil"/>',
            removeEmpty:false // true = remove attributes | false = leave empty if present
        },
        displayFields:{
            imageBasic:true,  // show/hide Title, Source, Alt fields
            imageExtra:false, // show/hide Alt, Class, Style, Role fields
            linkBasic:true,   // show/hide URL and Target fields for link
            linkExtra:false   // show/hide Class, Rel, Role fields for link
        }
    });
});
```

#### 4. Check out our other Summernote Plugins via our main Github page.
- [Diemen Design](https://github.com/DiemenDesign/)

### Contributors
- Add links to Image
  - Thank you to [minidc](https://github.com/ninidc)
  - Thank you to [MarcosBL](https://github.com/MarcosBL)
- French Translation
  - Thank you to [b-alidr](https://github.com/b-alidra)
- Chinese (Traditional) Translation
  - Thank you to [horkenw](https://github.com/horkenw)
- Italian Translation
  - Thank you to [paolodadda](https://github.com/paolodadda)
- German Translation and Horizontal Dialog Layout
  - Thank you to [YaWK](https://github.com/YaWK)
- Turkish Translation
  - Thank you to [GoktugOzturk](https://github.com/GoktugOzturk)
