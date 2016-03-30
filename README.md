# summernote-image-title
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

Adds a button to the image popover to edit title and alt attributes.

### Installation

#### 1. Include JS

Include the following code after Summernote:

```html
<script src="summernote-image-title.js"></script>
```

#### 2. Include language file

Eventually include language file (currently available in French, contributions welcomed!)

```html
<script src="lang/summernote-image-title-fr-FR.js"></script>
```

#### 3. Summernote options

Finally, customize the Summernote image popover:

```javascript
$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'fr-FR',
        popover: {
            image: [
                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']],
                ['custom', ['imageTitle']],
            ],
        },
    });
});
```