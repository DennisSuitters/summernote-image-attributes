# summernote-image-attributes
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

Adds a button to the image popover to edit title and alt attributes.

### Installation

#### 1. Include JS

Include the following code after Summernote:

```html
<script src="summernote-image-attributes.js"></script>
```

#### 2. Supported languages

Currently available in English!

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
    });
});
```


