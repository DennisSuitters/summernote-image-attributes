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
                fieldLabel: 'Title'
            }
        },
        'fr-FR': {
            imageTitle: {
                edit: 'Modifier le titre',
                fieldLabel: 'Titre'
            },
        },
        'ko-KR': {
            imageTitle: {
                edit: '제목 바꾸기',
                fieldLabel: '제목'
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

                var body = '<div class="form-group note-group-image-title">' +
                             '<label>' + lang.imageTitle.fieldLabel + '</label>' +
                             '<input class="note-image-title-text form-control col-md-12" type="text" />' +
                           '</div>';

                var footer = '<button href="#" class="btn btn-primary note-image-title-btn disabled" disabled>' + lang.imageTitle.edit + '</button>';

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
                    title: $img.attr('alt'),
                };
                this.showLinkDialog(imgInfo).then(function (imgInfo) {
                    ui.hideDialog(self.$dialog);
                    var $img = imgInfo.imgDom;
                    $img.attr('alt', imgInfo.title);
                    $img.attr('title', imgInfo.title);

                    $note.val(context.invoke('code'));
                    $note.change();
                });
            };

            this.showLinkDialog = function (imgInfo) {
                return $.Deferred(function (deferred) {
                    var $imageTitle = self.$dialog.find('.note-image-title-text'),
                        $editBtn = self.$dialog.find('.note-image-title-btn');

                    ui.onDialogShown(self.$dialog, function () {
                        context.triggerEvent('dialog.shown');

                        $editBtn.click(function (event) {
                            event.preventDefault();
                            deferred.resolve({
                                imgDom: imgInfo.imgDom,
                                title: $imageTitle.val(),
                            });
                        });

                        $imageTitle.on('keyup paste', function () {
                            var url = $imageTitle.val();
                            ui.toggleBtn($editBtn, url);
                        }).val(imgInfo.title).trigger('focus');

                        self.bindEnterKey($imageTitle, $editBtn);
                    });

                    ui.onDialogHidden(self.$dialog, function () {
                        $imageTitle.off('keyup paste keypress');
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
