(function (factory){
    if (typeof define==='function'&&define.amd){
        define(['jquery'],factory);
    }else if(typeof module==='object'&&module.exports){
        module.exports=factory(require('jquery'));
    }else{
        factory(window.jQuery);
    }
}(function($){
    $.extend(true,$.summernote.lang,{
        'en-US':{
            imageAttributes:{
                tooltip:'Image Attributes',
                title:'Title',
                alt:'Alt',
                class:'Class',
                style:'Style'
            }
        }
    });
    $.extend($.summernote.options,{
        imageAttributes:{
            icon:'<i class="fa fa-pencil"/>'
        }
    })
    $.extend($.summernote.plugins,{
        'imageAttributes':function(context){
            var self=this;
            var ui=$.summernote.ui;
            var $note=context.layoutInfo.note;
            var $editor=context.layoutInfo.editor;
            var $editable=context.layoutInfo.editable;
            var options=context.options;
            var lang=options.langInfo;
            context.memo('button.imageAttributes',function(){
                var button=ui.button({
                    contents:options.imageAttributes.icon,
                    tooltip:lang.imageAttributes.tooltip,
                    click:function(e){
                        context.invoke('imageAttributes.show');
                    }
                });
                return button.render();
            });
            this.initialize=function(){
                var $container=options.dialogsInBody?$(document.body):$editor;
                var body='<div class="form-group">'+
                 '<label class="control-label col-xs-2">'+lang.imageAttributes.title+'</label>'+
                 '<div class="input-group col-xs-10">'+
                    '<input class="note-image-title-text form-control" type="text">'+
                 '</div>'+
                '</div>'+
                '<div class="form-group">'+
                 '<label class="control-label col-xs-2">'+lang.imageAttributes.alt+'</label>'+
                 '<div class="input-group col-xs-10">'+
                  '<input class="note-image-alt-text form-control" type="text">'+
                 '</div>'+
                '</div>'+
                '<div class="form-group">'+
                 '<label class="control-label col-xs-2">'+lang.imageAttributes.class+'</label>'+
                 '<div class="input-group col-xs-10">'+
                  '<input class="note-image-class-text form-control" list="note-image-class-select" type="text">'+
                  '<div class="input-group-btn">'+
                   '<select class="note-image-class-select btn btn-default" onchange="$(\'.note-image-class-text\').val($(\'.note-image-class-text\').val()+\' \'+$(this).val());">'+
                    '<option value="">Select Class</option>'+
                    '<option value="img-responsive">Responsive</option>'+
                    '<option value="img-rounded">Rounded</option>'+
                    '<option value="img-circle">Circle</option>'+
                    '<option value="img-thumbnail">Thumbnail</option>'+
                   '</select>'+
                  '</div>'+
                 '</div>'+
                '</div>'+
                '<div class="form-group">'+
                 '<label class="control-label col-xs-2">'+lang.imageAttributes.style+'</label>'+
                 '<div class="input-group col-xs-10">'+
                  '<input class="note-image-style-text form-control" type="text">'+
                 '</div>'+
                '</div>';
                this.$dialog=ui.dialog({
                    title:'Image Attributes',
                    body:body,
                    footer:'<button href="#" class="btn btn-primary note-image-title-btn">OK</button>'
                }).render().appendTo($container);
            };
            this.destroy=function(){
                ui.hideDialog(this.$dialog);
                this.$dialog.remove();
            };
            this.bindEnterKey=function($input,$btn){
                $input.on('keypress',function(event){
                    if(event.keyCode===13){
                        $btn.trigger('click');
                    }
                });
            };
            this.show=function(){
                var $img=$($editable.data('target'));
                var imgInfo={
                    imgDom:$img,
                    title:$img.attr('title'),
                    alt:$img.attr('alt'),
                    class:$img.attr('class'),
                    style:$img.attr('style')
                };
                this.showLinkDialog(imgInfo).then(function(imgInfo){
                    ui.hideDialog(self.$dialog);
                    var $img=imgInfo.imgDom;
                    $img.attr('alt',imgInfo.alt);
                    $img.attr('title',imgInfo.title);
                    $img.attr('class',imgInfo.class);
                    $img.attr('style',imgInfo.style);
                    $note.val(context.invoke('code'));
                    $note.change();
                });
            };
            this.showLinkDialog=function(imgInfo){
                return $.Deferred(function(deferred){
                    var $imageTitle=self.$dialog.find('.note-image-title-text');
                    var $imageAlt=self.$dialog.find('.note-image-alt-text');
                    var $imageClass=self.$dialog.find('.note-image-class-text');
                    var $imageStyle=self.$dialog.find('.note-image-style-text');
                    var $editBtn=self.$dialog.find('.note-image-title-btn');
                    ui.onDialogShown(self.$dialog,function(){
                        context.triggerEvent('dialog.shown');
                        $editBtn.click(function(event){
                            event.preventDefault();
                            deferred.resolve({
                                imgDom:imgInfo.imgDom,
                                alt:$imageAlt.val(),
                                class:$imageClass.val(),
                                title:$imageTitle.val(),
                                style:$imageStyle.val(),
                            });
                        });
                        $imageTitle.on('keyup paste',function(){
                            var url=$imageTitle.val();
                        }).val(imgInfo.title).trigger('focus');
                        $imageAlt.on('keyup paste',function(){
                            var url=$imageAlt.val();
                        }).val(imgInfo.alt).trigger('focus');
                        $imageClass.on('keyup paste',function(){
                            var url=$imageClass.val();
                        }).val(imgInfo.class).trigger('focus');
                        $imageStyle.on('keyup paste',function(){
                            var url=$imageStyle.val();
                        }).val(imgInfo.style).trigger('focus');
                        self.bindEnterKey($imageTitle,$imageAlt,$imageClass,$imageStyle,$editBtn);
                    });
                    ui.onDialogHidden(self.$dialog,function(){
                        $imageTitle.off('keyup paste keypress');
                        $imageAlt.off('keyup paste keypress');
                        $imageClass.off('keyup paste keypress');
                        $imageStyle.off('keyup paste keypress');
                        $editBtn.off('click');
                        if(deferred.state()==='pending'){
                            deferred.reject();
                        }
                    });
                    ui.showDialog(self.$dialog);
                });
            };
        }
    });
}));
