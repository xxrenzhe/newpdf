import { ToolbarItemBase } from '../ToolbarItemBase';
import Dialog from '../../../components/dialog';
import { Locale } from '../../../locale';
import { Events, PDFEvent } from '../../../event';


const HEADER_TEXT = 'header_text';
const FOOTER_TEXT = 'footer_text';

const HEADER_PREVIEW_BOX_CLASS = 'perview_dom';
const FOOTER_PREVIEW_BOX_CLASS = 'perview_dom_bottom';
const ACTIVE_CLASS = 'table_btn_active';
const PAGE_START = 'page_start';
const PAGE_END = 'page_end';
const HEADER_UPLOAD = 'upload_img_h';
const FOOTER_UPLOAD = 'upload_img_f';

class HeaderFooter extends ToolbarItemBase {
    init() {
        this.name = 'header_footer';
        this.textColor = '#000000';
        this.headerText = '';
        this.footerText = '';
        this.textSize = 12;
        this.fontFamily = fontList[0].fontFamily;
        this.fontFile = fontList[0].fontFile;
        this.mode = 'text';
        this.headerAlign = 'left';
        this.footerAlign = 'left';
        this.headerArrayBuffer = null;
        this.footerArrayBuffer = null;
        this.headerImageType = 'image/png';
        this.footerImageType = 'image/png';
        this.headerImageUrl = null;
        this.footerImageUrl = null;


        this.dialog = new Dialog({
            initOpened: false,
            width: 700,
            height: 'auto',
            body: require('./popup.html')(),
            title: Locale.get('header_footer_popup_title')
        });
        Locale.bind(this.dialog.elBody);

        const elBody = this.dialog.elDialogBody;
        const elImgBox = elBody.querySelectorAll('.popup_uploadimg');
        const elTextBox = elBody.querySelectorAll('.popup_editText');

        const elHeaderText = elBody.querySelector('#' + HEADER_TEXT);
        elHeaderText.addEventListener('input', e => {
            this.headerText = elHeaderText.value;
            __updatePreview();
        });

        const elFooterText = elBody.querySelector('#' + FOOTER_TEXT);
        elFooterText.addEventListener('input', e => {
            this.footerText = elFooterText.value;
            __updatePreview();
        });

        //set align
        elBody.querySelectorAll('.__text_align').forEach(el => {
            el.addEventListener('click', e => {
                let type = el.getAttribute('data-type');
                let align = el.value;
                if (type == 'header') {
                    this.headerAlign = align;
                } else {
                    this.footerAlign = align;
                }
                __updatePreview();
            });
        });


        const elFontList = elBody.querySelector('.font_family');
        fontList.forEach(font => {
            let elOption = document.createElement('option');
            elOption.text = font.showName;
            elOption.fontFamily = font.fontFamily;
            elOption.fontFile = font.fontFile;
            elFontList.appendChild(elOption);
        });
        elFontList.addEventListener('change', e => {
            let option = elFontList.selectedOptions[0];
            this.fontFamily = option.fontFamily;
            this.fontFile = option.fontFile;
            __updatePreview();
        });

        const elFontSize = elBody.querySelector('.font_size');
        elFontSize.addEventListener('change', e => {
            this.textSize = elFontSize.value;
            __updatePreview();
        });


        const elHeaderPreviewBox = elBody.querySelector('.' + HEADER_PREVIEW_BOX_CLASS);
        const elHeaderPreview = elHeaderPreviewBox.querySelector('span');
        const elFooterPreviewBox = elBody.querySelector('.' + FOOTER_PREVIEW_BOX_CLASS);
        const elFooterPreview = elFooterPreviewBox.querySelector('span');
        const elHeaderImg = elHeaderPreviewBox.querySelector('img');
        const elFooterImg = elFooterPreviewBox.querySelector('img');

        elBody.querySelectorAll('.hf_table').forEach(el => {
            el.addEventListener('click', e => {
                let type = e.currentTarget.getAttribute('data-type');
                this.mode = type;
                elBody.querySelector('.hf_table.' + ACTIVE_CLASS)?.classList.remove(ACTIVE_CLASS);
                e.currentTarget.classList.add(ACTIVE_CLASS);
                if (type == 'text') {
                    elHeaderImg.style.display = 'none';
                    elFooterImg.style.display = 'none';
                    elHeaderPreview.style.display = '';
                    elFooterPreview.style.display = '';
                    elTextBox.forEach(el => {
                        el.style.display = '';
                    });
                    elImgBox.forEach(el => {
                        el.style.display = 'none';
                    });
                } else if (type == 'img') {
                    elHeaderImg.style.display = '';
                    elFooterImg.style.display = '';
                    elHeaderPreview.style.display = 'none';
                    elFooterPreview.style.display = 'none';
                    elTextBox.forEach(el => {
                        el.style.display = 'none';
                    });
                    elImgBox.forEach(el => {
                        el.style.display = 'flex';
                    });
                }
            });
        });


        //上传图片
        const elHeaderUpload = elBody.querySelector('#' + HEADER_UPLOAD);
        elHeaderUpload.addEventListener('change', e => {
            let file = e.target.files[0];
            if (file) {
                if (this.headerImageUrl) {
                    try { URL.revokeObjectURL(this.headerImageUrl); } catch (e) {}
                }
                this.headerImageType = file.type || 'image/png';
                this.headerImageUrl = URL.createObjectURL(file);
                elHeaderImg.addEventListener('load', () => {
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(file);
                    fileReader.addEventListener('loadend', async e => {
                        this.headerArrayBuffer = e.target.result;
                    });
                    setTimeout(() => {
                        __updatePreview();
                    }, 10);
                }, { once: true });
                elHeaderImg.src = this.headerImageUrl;
            }
            elHeaderUpload.value = '';
        });

        const elFooterUpload = elBody.querySelector('#' + FOOTER_UPLOAD);
        elFooterUpload.addEventListener('change', e => {
            let file = e.target.files[0];
            if (file) {
                if (this.footerImageUrl) {
                    try { URL.revokeObjectURL(this.footerImageUrl); } catch (e) {}
                }
                this.footerImageType = file.type || 'image/png';
                this.footerImageUrl = URL.createObjectURL(file);
                elFooterImg.addEventListener('load', () => {
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(file);
                    fileReader.addEventListener('loadend', async e => {
                        this.footerArrayBuffer = e.target.result;
                    });
                    setTimeout(() => {
                        __updatePreview();
                    }, 10);
                }, { once: true });
                elFooterImg.src = this.footerImageUrl;
            }
            elFooterUpload.value = '';
        });

        elHeaderPreview.style.fontSize = this.textSize + 'px';
        elFooterPreview.style.fontSize = this.textSize + 'px';
        elHeaderPreview.style.fontFamily = this.fontFamily;
        elFooterPreview.style.fontFamily = this.fontFamily;
        const __updatePreview = () => {
            if (this.mode == 'text') {
                elHeaderImg.style.display = 'none';
                elFooterImg.style.display = 'none';
                elHeaderPreview.style.display = '';
                elFooterPreview.style.display = '';

                elHeaderPreview.textContent = this.headerText;
                elFooterPreview.textContent = this.footerText;

                elHeaderPreview.style.fontSize = this.textSize + 'px';
                elFooterPreview.style.fontSize = this.textSize + 'px';

                elHeaderPreview.style.fontFamily = this.fontFamily;
                elFooterPreview.style.fontFamily = this.fontFamily;
            } else {
                elHeaderImg.style.display = '';
                elFooterImg.style.display = '';
                elHeaderPreview.style.display = 'none';
                elFooterPreview.style.display = 'none';
            }
            elHeaderPreviewBox.style.justifyContent = this.headerAlign;
            elFooterPreviewBox.style.justifyContent = this.footerAlign;
        }

        const elPageStart = elBody.querySelector('#' + PAGE_START);
        const elPageEnd = elBody.querySelector('#' + PAGE_END);
        elPageEnd.value = this.reader.pageCount;
        elPageEnd.setAttribute('max', this.reader.pageCount);


        const elBtnOk = elBody.querySelector('.btn_ok');
        elBtnOk.addEventListener('click', async () => {
            const totalPages = this.reader.pageCount;
            let start = Math.max(1, parseInt(elPageStart.value || '1'));
            let end = Math.min(totalPages, parseInt(elPageEnd.value || String(totalPages)));
            if (!Number.isFinite(start) || !Number.isFinite(end) || start > end) {
                this.dialog.close();
                return;
            }

            const created = [];
            const marginX = 20;
            const marginY = 20;

            const updateHistoryCount = () => {
                const elSpan = document.querySelector('#history_slider span');
                if (!elSpan) return;
                elSpan.textContent = document.querySelectorAll('#pdf-main .__pdf_editor_element').length;
            };

            const removeSilent = (page, id) => {
                const element = page?.elements?.get?.(id);
                if (!element) return;
                try { element.remove(); } catch (e) {}
                try { delete page.elements.items[id]; } catch (e) {}
                if (page?.elements?.activeId === id) page.elements.activeId = null;
            };

            const addText = (page, text, align, yMode) => {
                const element = page.elements.add('text', {
                    size: this.textSize,
                    color: this.textColor,
                    text,
                    lineHeight: this.textSize,
                    opacity: 1,
                    fontFamily: this.fontFamily,
                    fontFile: this.fontFile,
                }, {
                    pos: { x: 0, y: 0 },
                    readOnly: true,
                    autoFocus: false,
                }, true);
                if (!element) return null;

                const pageRect = page.readerPage?.content?.getBoundingClientRect?.() || page.readerPage?.elWrapper?.getBoundingClientRect?.();
                const elRect = element.el.getBoundingClientRect();

                let x = marginX;
                if (align === 'center') x = pageRect.width / 2 - elRect.width / 2;
                else if (align === 'right') x = pageRect.width - elRect.width - marginX;

                let y = marginY;
                if (yMode === 'bottom') y = pageRect.height - elRect.height - marginY;

                x = Math.max(0, Math.round(x));
                y = Math.max(0, Math.round(y));
                element.el.style.left = x + 'px';
                element.el.style.top = y + 'px';
                element.setActualRect?.();
                element.disableDrag = true;
                element.disableResize = true;
                element.el.classList.remove('__resizable', '__resizable-border');
                page.elements.setActive(null);

                created.push({
                    pageNum: page.pageNum,
                    type: 'text',
                    attrs: Object.assign({}, element.attrs, { id: element.id }),
                    options: {
                        pos: { x, y },
                        readOnly: true,
                        autoFocus: false,
                    },
                    id: element.id,
                    post: { disableDrag: true, disableResize: true, removeResizable: true },
                });
                return element;
            };

            const addImage = (page, arrayBuffer, imageUrl, imageType, align, yMode) => {
                if (!arrayBuffer || !imageUrl) return null;

                const pageRect = page.readerPage?.content?.getBoundingClientRect?.() || page.readerPage?.elWrapper?.getBoundingClientRect?.();
                const maxWidth = Math.max(80, Math.round(pageRect.width * 0.25));
                const maxHeight = 80;

                let naturalW = elHeaderImg?.naturalWidth || 0;
                let naturalH = elHeaderImg?.naturalHeight || 0;
                if (imageUrl === this.footerImageUrl) {
                    naturalW = elFooterImg?.naturalWidth || naturalW;
                    naturalH = elFooterImg?.naturalHeight || naturalH;
                }
                if (!naturalW || !naturalH) {
                    naturalW = 800;
                    naturalH = 200;
                }
                const scale = Math.min(maxWidth / naturalW, maxHeight / naturalH, 1);
                const width = Math.max(20, Math.round(naturalW * scale));
                const height = Math.max(20, Math.round(naturalH * scale));

                const img = new Image();
                img.src = imageUrl;
                img.style.width = '100%';
                img.style.height = '100%';

                const element = page.elements.add('image', {
                    image: img,
                    imageType: imageType || 'image/png',
                    opacity: 1,
                    arrayBuffer,
                    rotate: 0,
                    width,
                    height,
                }, {
                    pos: { x: 0, y: 0 },
                }, true);
                if (!element) return null;

                let x = marginX;
                if (align === 'center') x = pageRect.width / 2 - width / 2;
                else if (align === 'right') x = pageRect.width - width - marginX;

                let y = marginY;
                if (yMode === 'bottom') y = pageRect.height - height - marginY;

                x = Math.max(0, Math.round(x));
                y = Math.max(0, Math.round(y));
                element.el.style.left = x + 'px';
                element.el.style.top = y + 'px';
                element.setActualRect?.();
                element.disableDrag = true;
                element.disableResize = true;
                element.el.classList.remove('__resizable', '__resizable-border');
                page.elements.setActive(null);

                created.push({
                    pageNum: page.pageNum,
                    type: 'image',
                    attrs: Object.assign({}, element.attrs, { id: element.id }),
                    options: { pos: { x, y } },
                    id: element.id,
                    post: { disableDrag: true, disableResize: true, removeResizable: true },
                });
                return element;
            };

            for (let pageNum = start; pageNum <= end; pageNum++) {
                const page = this.editor.pdfDocument.getPage(pageNum);
                if (!page) continue;

                if (this.mode === 'text') {
                    if (this.headerText?.trim()) addText(page, this.headerText, this.headerAlign, 'top');
                    if (this.footerText?.trim()) addText(page, this.footerText, this.footerAlign, 'bottom');
                } else {
                    if (this.headerArrayBuffer) addImage(page, this.headerArrayBuffer, this.headerImageUrl, this.headerImageType, this.headerAlign, 'top');
                    if (this.footerArrayBuffer) addImage(page, this.footerArrayBuffer, this.footerImageUrl, this.footerImageType, this.footerAlign, 'bottom');
                }
            }

            if (created.length > 0) {
                updateHistoryCount();
                PDFEvent.dispatch(Events.HISTORY_PUSH, {
                    undo: () => {
                        created.forEach(item => {
                            const page = this.editor.pdfDocument.getPage(item.pageNum);
                            if (!page) return;
                            removeSilent(page, item.id);
                        });
                        updateHistoryCount();
                    },
                    redo: () => {
                        created.forEach(item => {
                            const page = this.editor.pdfDocument.getPage(item.pageNum);
                            if (!page) return;
                            const element = page.elements.add(item.type, item.attrs, item.options, true);
                            if (!element) return;
                            try {
                                if (item.post?.disableDrag) element.disableDrag = true;
                                if (item.post?.disableResize) element.disableResize = true;
                                if (item.post?.removeResizable) element.el.classList.remove('__resizable', '__resizable-border');
                                element.el.style.left = item.options?.pos?.x + 'px';
                                element.el.style.top = item.options?.pos?.y + 'px';
                                element.setActualRect?.();
                                page.elements.setActive(null);
                            } catch (e) {}
                        });
                        updateHistoryCount();
                    }
                });
            }

            this.dialog.close();
        });


        const elBtnCancel = elBody.querySelector('.btn_cancel');
        elBtnCancel.addEventListener('click', () => {
            this.dialog.close();
        });
    }

    onClick() {
        this.dialog.open();
    }
}

export default HeaderFooter;
