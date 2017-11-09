/* https://github.com/DiemenDesign/summernote-image-attributes */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(window.jQuery);
  }
}(function ($) {
  var readFileAsDataURL = function(file) {
    return $.Deferred(function(deferred) {
      $.extend(new FileReader(),{
        onload:function(e) {
          var sDataURL = e.target.result;
          deferred.resolve(sDataURL);
        },
        onerror:function() {
          deferred.reject(this);
        }
      }).readAsDataURL(file);
    }).promise();
  };
  $.extend(true,$.summernote.lang, {
    'en-US': { /* US English(Default Language) */
      imageAttributes: {
        dialogTitle: 'Image Attributes',
        tooltip: 'Image Attributes',
        pluginImageTitle: 'Image Attributes',
        pluginLinkTitle: 'Link Attributes',
        title: 'Title',
        src: 'Source',
        srcHelp: 'Selecting an image will replace existing image with an Inlined Image.',
        alt: 'Alt',
        class: 'Class',
        classSelect: 'Select Class',
        style: 'Style',
        role: 'Role',
        href: 'URL',
        target: 'Target',
        linkClass: 'Class',
        linkRole: 'Role',
        rel: 'Rel',
        relBlank: 'Do not use Rel Attribute',
        relAlternate: 'Alternate: Links to an alternate version of the document',
        relAuthor: 'Author: Links to the Author of the Document',
        relBookmark: 'Bookmark: Permanent URL used for Bookmarking',
        relHelp: 'Help: Links to a Help Document',
        relLicense: 'License: Links to copyright information for the document',
        relNext: 'Next: The next document in a selection',
        relNofollow: 'NoFollow: Links to an unendorsed document, like a paid link, also stops Search Engines following this link',
        relNoreferrer: 'NoReferrer: Specifies that the browser should not send a HTTP Header',
        relPrefetch: 'PreFetch: Specifies that the target document should be cached',
        relPrev: 'Prev: The previous document in a selection',
        relSearch: 'Search: Links to a search tool for the document',
        relTag: 'Tag: A tag (Keyword) for the current document',
        editBtn: 'OK'
      }
    }
  });
  $.extend($.summernote.options, {
    imageDialogLayout: 'default', /* default|horizontal */
    imageAttributes: {
      icon: '<i class="note-icon-pencil"/>',
      removeEmpty: true,
    },
    displayFields: {
      imageBasic: true,
      imageExtra: false,
      linkBasic: true,
      linkExtra: false
    }
  });
  $.extend($.summernote.plugins, {
    'imageAttributes':function(context) {
      var self = this;
      var ui = $.summernote.ui;
      var $note = context.layoutInfo.note;
      var $editor = context.layoutInfo.editor;
      var $editable = context.layoutInfo.editable;
      var options = context.options;
      var lang = options.langInfo;
      var imageLimitation = '';
      if (options.maximumImageFileSize) {
        var unit = Math.floor(Math.log(options.maximumImageFileSize) / Math.log(1024));
        var readableSize = (options.maximumImageFileSize/Math.pow(1024,unit)).toFixed(2) * 1 + ' ' + ' KMGTP'[unit] + 'B';
        imageLimitation = '<small>' + lang.image.maximumFileSize + ' : ' + readableSize+'</small>';
      }
      context.memo('button.imageAttributes',function() {
        var button = ui.button({
          contents: options.imageAttributes.icon,
          tooltip: lang.imageAttributes.tooltip,
          click:function(e) {
            context.invoke('imageAttributes.show');
          }
        });
        return button.render();
      });
      this.initialize=function() {
        var $container = options.dialogsInBody ? $(document.body) : $editor;
        if (options.imageDialogLayout=='horizontal') {
          var body='<dl class="dl-horizontal">';
          if (options.displayFields.imageBasic) {
            body += '<dt>' +
              '<label for="note-image-attributes-title">' + lang.imageAttributes.title + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-title" class="note-image-attributes-title form-control">' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-src">' + lang.imageAttributes.src + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-src" class="note-image-attributes-src form-control">' +
            '</dd>' +
            '<dt>' +
              '<label for="note-group-select-from-files"></label>' +
            '</dt>' +
            '<dd>' +
              '<input type="file" id="note-group-select-from-files" name="file" accept="image/*" class="note-image-input form-control">' + imageLimitation +
            '</dd>' +
            '<dt>' +
            '</dt>' +
            '<dd>' +
              '<small class="help-block">' + lang.imageAttributes.srcHelp + '</small>' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-alt">' + lang.imageAttributes.alt + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-alt" class="note-image-attributes-alt form-control">' +
            '</dd>';
          }
          if (options.displayFields.imageExtra) {
            body += '<dt>' +
              '<label for="note-image-attributes-class">' + lang.imageAttributes.class + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-class" class="note-image-attributes-class form-control">' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-style">' + lang.imageAttributes.style + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-style" class="note-image-attributes-style form-control">' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-role">' + lang.imageAttributes.role + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-role" class="note-image-attributes-role form-control">' +
            '</dd>';
          }
          body += '</dl>' +
          '<hr>';
          if (options.displayFields.linkBasic) {
            body += '<h4>' + lang.imageAttributes.pluginLinkTitle + '</h4>' +
            '<dl class="dl-horizontal">' +
            '<dt>' +
              '<label for="note-image-attributes-link-href">' + lang.imageAttributes.href + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-link-href" class="note-image-attributes-href form-control">' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-link-target">' + lang.imageAttributes.target + '</label>' +
            '</dt>' +
            '<dd>' +
              '<select id="note-image-attributes-link-target" class="note-image-attributes-target form-control">' +
                '<option value="_self">Self</option>' +
                '<option value="_blank">Blank</option>' +
                '<option value="_top">Top</option>' +
                '<option value="_parent">Parent</option>' +
              '</select>' +
            '</dd>';
          }
          if (options.displayFields.linkExtra) {
            body += '<dt>' +
              '<label for="note-image-attributes-link-class">' + lang.imageAttributes.linkClass + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-link-class" class="note-image-attributes-link-class form-control">' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-link-rel">' + lang.imageAttributes.rel + '</label>' +
            '</dt>' +
            '<dd>' +
              '<select id="note-image-attributes-link-rel" class="note-image-attributes-link-rel form-control">' +
                '<option value="">' + lang.imageAttributes.relBlank + '</option>' +
                '<option value="alternate">' + lang.imageAttributes.relAlternate + '</option>' +
                '<option value="author">' + lang.imageAttributes.relAuthor + '</option>' +
                '<option value="bookmark">' + lang.imageAttributes.relBookmark + '</option>' +
                '<option value="help">' + lang.imageAttributes.relHelp + '</option>' +
                '<option value="license">' + lang.imageAttributes.relLicense + '</option>' +
                '<option value="next">' + lang.imageAttributes.relNext + '</option>' +
                '<option value="nofollow">' + lang.imageAttributes.relNofollow + '</option>' +
                '<option value="noreferrer">' + lang.imageAttributes.relNoreferrer + '</option>' +
                '<option value="prefetch">' + lang.imageAttributes.relPrefetch + '</option>' +
                '<option value="prev">' + lang.imageAttributes.relPrev + '</option>' +
                '<option value="search">' + lang.imageAttributes.relSearch + '</option>' +
                '<option value="tag">' + lang.imageAttributes.relTag + '</option>' +
              '</select>' +
            '</dd>' +
            '<dt>' +
              '<label for="note-image-attributes-link-role">' + lang.imageAttributes.linkRole + '</label>' +
            '</dt>' +
            '<dd>' +
              '<input type="text" id="note-image-attributes-link-role" class="note-image-attributes-link-role form-control">' +
            '</dd>';
          }
          body += '</dl>';
        } else {
          var body = '<div class="form-group">';
          if (options.displayFields.imageBasic) {
            body += '<label for="note-image-attributes-title" class="control-label col-xs-2">' + lang.imageAttributes.title + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-title" class="note-image-attributes-title form-control">' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-src" class="control-label col-xs-2">' + lang.imageAttributes.src + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-src" class="note-image-attributes-src form-control">' +
              '</div>' +
            '</div>' +
            '<div class="form-group note-group-select-from-files">' +
              '<label class="control-label col-xs-2"></label>' +
              '<div class="input-group col-xs-10">' +
                '<input class="note-image-input form-control" type="file" name="file" accept="image/*" />' + imageLimitation +
                '<small class="help-block">' + lang.imageAttributes.srcHelp + '</small>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-alt" class="control-label col-xs-2">' + lang.imageAttributes.alt + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-alt" class="note-image-attributes-alt form-control">' +
              '</div>' +
            '</div>';
          }
          if (options.displayFields.imageExtra) {
            body += '<div class="form-group">' +
              '<label for="note-image-attributes-class" class="control-label col-xs-2">' + lang.imageAttributes.class + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-class" class="note-image-attributes-class form-control">' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-style" class="control-label col-xs-2">' + lang.imageAttributes.style + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-style" class="note-image-attributes-style form-control">' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-role" class="control-label col-xs-2">' + lang.imageAttributes.role + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-role" class="note-image-attributes-role form-control">' +
              '</div>' +
            '</div>';
          }
          if (options.displayFields.linkBasic || options.displayFields.linkExtra) {
            body += '<h4>'+lang.imageAttributes.pluginLinkTitle+'</h4>' +
            '<hr>';
          }
          if (options.displayFields.linkBasic) {
            body += '<div class="form-group">' +
              '<label for="note-image-attributes-link-href" class="control-label col-xs-2">' + lang.imageAttributes.href + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-link-href" class="note-image-attributes-href form-control">' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-link-target" class="control-label col-xs-2">' + lang.imageAttributes.target + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<select id="note-image-attributes-link-target" class="note-image-attributes-target form-control">' +
                  '<option value="_self">Self</option>' +
                  '<option value="_blank">Blank</option>' +
                  '<option value="_top">Top</option>' +
                  '<option value="_parent">Parent</option>' +
                '</select>' +
              '</div>' +
            '</div>';
          }
          if (options.displayFields.linkExtra) {
            body += '<div class="form-group">' +
              '<label for="note-image-attributes-link-class" class="control-label col-xs-2">' + lang.imageAttributes.linkClass + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-link-class" class="note-image-attributes-link-class form-control">' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-link-rel" class="control-label col-xs-2">' + lang.imageAttributes.rel + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<select id="note-image-attributes-link-rel" class="note-image-attributes-link-rel form-control">' +
                  '<option value="">' + lang.imageAttributes.relBlank + '</option>' +
                  '<option value="alternate">' + lang.imageAttributes.relAlternate + '</option>' +
                  '<option value="author">' + lang.imageAttributes.relAuthor + '</option>' +
                  '<option value="bookmark">' + lang.imageAttributes.relBookmark + '</option>' +
                  '<option value="help">' + lang.imageAttributes.relHelp + '</option>' +
                  '<option value="license">' + lang.imageAttributes.relLicense + '</option>' +
                  '<option value="next">' + lang.imageAttributes.relNext + '</option>' +
                  '<option value="nofollow">' + lang.imageAttributes.relNofollow + '</option>' +
                  '<option value="noreferrer">' + lang.imageAttributes.relNoreferrer + '</option>' +
                  '<option value="prefetch">' + lang.imageAttributes.relPrefetch + '</option>' +
                  '<option value="prev">' + lang.imageAttributes.relPrev + '</option>' +
                  '<option value="search">' + lang.imageAttributes.relSearch + '</option>' +
                  '<option value="tag">' + lang.imageAttributes.relTag + '</option>' +
                '</select>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="note-image-attributes-link-role" class="control-label col-xs-2">' + lang.imageAttributes.linkRole + '</label>' +
              '<div class="input-group col-xs-10">' +
                '<input type="text" id="note-image-attributes-link-role" class="note-image-attributes-link-role form-control">' +
              '</div>' +
            '</div>';
          }
        }
        this.$dialog=ui.dialog({
          title: lang.imageAttributes.dialogTitle,
          body: body,
          footer: '<button href="#" class="btn btn-primary note-image-attributes-btn">' + lang.imageAttributes.editBtn + '</button>'
        }).render().appendTo($container);
      };
      this.destroy=function(){
        ui.hideDialog(this.$dialog);
        this.$dialog.remove();
      };
      this.bindEnterKey=function($input,$btn) {
        $input.on('keypress',function(event) {
          if (event.keyCode===13) $btn.trigger('click');
        });
      };
      this.bindLabels=function() {
        self.$dialog.find('.form-control:first').focus().select();
        self.$dialog.find('label').on('click',function() {
          $(this).parent().find('.form-control:first').focus();
        });
      };
      this.show=function() {
        var $img = $($editable.data('target'));
        var imgInfo = {
          imgDom:  $img,
          title:   $img.attr('title'),
          src:     $img.attr('src'),
          alt:     $img.attr('alt'),
          role:    $img.attr('role'),
          class:   $img.attr('class'),
          style:   $img.attr('style'),
          imgLink: $($img.context).parent().is("a") ? $($img.context).parent() : null
        };
        this.showImageAttributesDialog(imgInfo).then(function(imgInfo) {
          ui.hideDialog(self.$dialog);
          var $img = imgInfo.imgDom;
          if (options.imageAttributes.removeEmpty) {
            if (imgInfo.alt)   $img.attr('alt',imgInfo.alt);     else $img.removeAttr('alt');
            if (imgInfo.title) $img.attr('title',imgInfo.title); else $img.removeAttr('title');
            if (imgInfo.src)   $img.attr('src',imgInfo.src);     else $img.attr('src', '#');
            if (imgInfo.class) $img.attr('class',imgInfo.class); else $img.removeAttr('class');
            if (imgInfo.style) $img.attr('style',imgInfo.style); else $img.removeAttr('style');
            if (imgInfo.role)  $img.attr('role',imgInfo.role);   else $img.removeAttr('role');
          } else {
            if (imgInfo.src)    $img.attr('src',imgInfo.src);     else $img.attr('src', '#');
            $img.attr('alt',imgInfo.alt);
            $img.attr('title',imgInfo.title);
            $img.attr('class',imgInfo.class);
            $img.attr('style',imgInfo.style);
            $img.attr('role',imgInfo.role);
          }
          if($img.parent().is("a")) $img.unwrap();
          if (imgInfo.href) {
            var lnktxt = '<a';
            if (imgInfo.linkClass) lnktxt += ' class="' + imgInfo.linkClass + '"';
            lnktxt += ' href="' + imgInfo.href + '" target="' + imgInfo.target + '"';
            if (imgInfo.linkRel) lnktxt += ' rel="' + imgInfo.linkRel + '"';
            if (imgInfo.linkRole) lnktxt += ' role="' + imgInfo.linkRole + '"';
            lnktxt += '></a>';
            $img.wrap(lnktxt);
          }
          $note.val(context.invoke('code'));
          $note.change();
        });
      };
      this.showImageAttributesDialog=function(imgInfo) {
        return $.Deferred(function(deferred) {
          var $imageTitle = self.$dialog.find('.note-image-attributes-title'),
              $imageInput = self.$dialog.find('.note-image-input'),
              $imageSrc   = self.$dialog.find('.note-image-attributes-src'),
              $imageAlt   = self.$dialog.find('.note-image-attributes-alt'),
              $imageClass = self.$dialog.find('.note-image-attributes-class'),
              $imageStyle = self.$dialog.find('.note-image-attributes-style'),
              $imageRole  = self.$dialog.find('.note-image-attributes-role'),
              $linkHref   = self.$dialog.find('.note-image-attributes-href'),
              $linkTarget = self.$dialog.find('.note-image-attributes-target'),
              $linkClass  = self.$dialog.find('.note-image-attributes-link-class'),
              $linkRel    = self.$dialog.find('.note-image-attributes-link-rel'),
              $linkRole   = self.$dialog.find('.note-image-attributes-link-role'),
              $editBtn    = self.$dialog.find('.note-image-attributes-btn');
          $linkHref.val();
          $linkClass.val();
          $linkRole.val();
          $linkTarget.val();
          $linkRel.val();
          if (imgInfo.imgLink) {
            $linkHref.val(imgInfo.imgLink.attr('href'));
            $linkClass.val(imgInfo.imgLink.attr('class'));
            $linkRole.val(imgInfo.imgLink.attr('role'));
            $linkTarget.find('option').each(function() {
              if ($(this).val() == imgInfo.imgLink.attr('target')) $(this).attr('selected','selected');
            });
            $linkRel.find('option').each(function() {
              if ($(this).val() == imgInfo.imgLink.attr('rel')) $(this).attr('selected','selected');
            });
          }
          ui.onDialogShown(self.$dialog,function() {
            context.triggerEvent('dialog.shown');
            $imageInput.replaceWith(
              $imageInput.clone().on('change',function() {
                var callbacks = options.callbacks;
                if (callbacks.onImageUpload) {
                  context.triggerEvent('image.upload',this.files[0]);
                } else {
                  readFileAsDataURL(this.files[0]).then(function(dataURL) {
                    $imageSrc.val(dataURL);
                  }).fail(function() {
                    context.triggerEvent('image.upload.error');
                  });
                }
              }).val('')
            );
            $editBtn.click(function(e) {
              e.preventDefault();
              deferred.resolve({
                imgDom:    imgInfo.imgDom,
                title:     $imageTitle.val(),
                src:       $imageSrc.val(),
                alt:       $imageAlt.val(),
                class:     $imageClass.val(),
                style:     $imageStyle.val(),
                role:      $imageRole.val(),
                href:      $linkHref.val(),
                target:    $linkTarget.val(),
                linkClass: $linkClass.val(),
                linkRel:   $linkRel.val(),
                linkRole:  $linkRole.val()
              });
            });
            $imageTitle.val(imgInfo.title).focus;
            $imageSrc.val(imgInfo.src)
            $imageAlt.val(imgInfo.alt);
            $imageClass.val(imgInfo.class);
            $imageStyle.val(imgInfo.style);
            $imageRole.val(imgInfo.role);
            self.bindEnterKey($editBtn);
            self.bindLabels();
          });
          ui.onDialogHidden(self.$dialog,function() {
            $editBtn.off('click');
            if (deferred.state() === 'pending') deferred.reject();
          });
          ui.showDialog(self.$dialog);
        });
      };
    }
  });
}));
