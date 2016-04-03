# summernote-image-attributes
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

Adds a button to the image popover to edit title, alt, class and style attributes.

![summernote-image-attributes-popover](https://github.com/StudioJunkyard/summernote-image-attributes/blob/master/summernote-image-attributes-popover.png)

![summernote-image-attributes-popover](https://github.com/StudioJunkyard/summernote-image-attributes/blob/master/summernote-image-attributes-dialog.png)

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
        imageAttributes:{
            icon:'<i class="fa fa-pencil"/>',
            removeEmpty:false // true = remove attributes | false = leave empty if present
        }
    });
});
```


