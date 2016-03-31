(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
    $.extend(true, $.summernote.lang, {
        'en-US': {
            imageTitle: {
                edit: 'Edit title',
                titleLabel: 'Title',
                altLabel: 'Alternative Text',
            }
        },
        'fr-FR': {
            imageTitle: {
                edit: 'Modifier le titre',
                titleLabel: 'Titre',
                altLabel: 'Texte alternatif',
            },
        },
        'ko-KR': {
            imageTitle: {
                edit: '제목 바꾸기',
                titleLabel: '제목'
            },
        }
    });

    $.extend($.summernote.plugins, {
        'imageTitle': function (context) {
            var self = this;

            var ui = $.summernote.ui;
            var $note = context.layoutInfo.note;
            var $editor = context.layoutInfo.editor;
            var $editable = context.layoutInfo.editable;

            if (typeof context.options.imageTitle === 'undefined') {
                context.options.imageTitle = {};
            }

            if (typeof context.options.imageTitle.specificAltField === 'undefined') {
                context.options.imageTitle.specificAltField = false;
            }

            var options = context.options;
            var lang = options.langInfo;

            context.memo('button.imageTitle', function () {
                var button = ui.button({
                    contents: ui.icon(options.icons.pencil),
                    tooltip: lang.imageTitle.edit,
                    click: function (e) {
                        context.invoke('imageTitle.show');
                    }
                });

                return button.render();
            });

            this.initialize = function () {
                var $container = options.dialogsInBody ? $(document.body) : $editor;

                var body = '<div class="form-group">' +
                             '<label>' + lang.imageTitle.titleLabel + '</label>' +
                             '<input class="note-image-title-text form-control" type="text" />' +
                           '</div>';

                if (options.imageTitle.specificAltField) {
                    body += '<div class="form-group">' +
                               '<label>' + lang.imageTitle.altLabel + '</label>' +
                               '<input class="note-image-alt-text form-control" type="text" />' +
                             '</div>';
                }

                var footer = '<button href="#" class="btn btn-primary note-image-title-btn">' + lang.imageTitle.edit + '</button>';

                this.$dialog = ui.dialog({
                    title: lang.imageTitle.edit,
                    body: body,
                    footer: footer
                }).render().appendTo($container);
            };

            this.destroy = function () {
                ui.hideDialog(this.$dialog);
                this.$dialog.remove();
            };

            this.bindEnterKey = function ($input, $btn) {
                $input.on('keypress', function (event) {
                    if (event.keyCode === 13) {
                        $btn.trigger('click');
                    }
                });
            };

            this.show = function () {
                var $img = $($editable.data('target'));
                var imgInfo = {
                    imgDom: $img,
                    title: $img.attr('title'),
                    alt: $img.attr('alt'),
                };
                this.showLinkDialog(imgInfo).then(function (imgInfo) {
                    ui.hideDialog(self.$dialog);
                    var $img = imgInfo.imgDom;
                    $img.attr('alt', imgInfo.alt);
                    $img.attr('title', imgInfo.title);
                    $note.val(context.invoke('code'));
                    $note.change();
                });
            };

            this.showLinkDialog = function (imgInfo) {
                return $.Deferred(function (deferred) {
                    var $imageTitle = self.$dialog.find('.note-image-title-text'),
                        $imageAlt = (options.imageTitle.specificAltField) ? self.$dialog.find('.note-image-alt-text') : null,
                        $editBtn = self.$dialog.find('.note-image-title-btn');

                    ui.onDialogShown(self.$dialog, function () {
                        context.triggerEvent('dialog.shown');

                        $editBtn.click(function (event) {
                            event.preventDefault();
                            deferred.resolve({
                                imgDom: imgInfo.imgDom,
                                title: $imageTitle.val(),
                                alt: (options.imageTitle.specificAltField) ? $imageAlt.val() : $imageTitle.val(),
                            });
                        });

                        $imageTitle.val(imgInfo.title).trigger('focus');
                        self.bindEnterKey($imageTitle, $editBtn);

                        if (options.imageTitle.specificAltField) {
                            $imageAlt.val(imgInfo.alt);
                            self.bindEnterKey($imageAlt, $editBtn);
                        }
                    });

                    ui.onDialogHidden(self.$dialog, function () {
                        $editBtn.off('click');

                        if (deferred.state() === 'pending') {
                            deferred.reject();
                        }
                    });

                    ui.showDialog(self.$dialog);
                });
            };
        }
    });
}));