import { ToolbarItemBase } from '../ToolbarItemBase';
import Dialog from '../../../components/dialog';
import { Locale } from '../../../locale';
import { Events, PDFEvent } from '../../../event';


const HEADER_PREVIEW_BOX_CLASS = 'perview_dom';
const FOOTER_PREVIEW_BOX_CLASS = 'perview_dom_bottom';
const POS_ACTIVE_CLASS = 'pos_module_active';
const PAGE_START = 'page_start';
const PAGE_END = 'page_end';


class PageNumber extends ToolbarItemBase {
    init() {
        this.name = 'page_number';
        this.textColor = '#000000';
        this.textSize = 12;
        this.fontFamily = fontList[0].fontFamily;
        this.fontFile = fontList[0].fontFile;
        this.position = 1;


        this.dialog = new Dialog({
            initOpened: false,
            width: 700,
            height: 'auto',
            body: require('./popup.html')(),
            title: Locale.get('add_page_number')
        });
        Locale.bind(this.dialog.elBody);

        const elBody = this.dialog.elDialogBody;


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


        elBody.querySelectorAll('.popup_pos_module').forEach(el => {
            el.addEventListener('click', e => {
                elBody.querySelector('.popup_pos_module.' + POS_ACTIVE_CLASS)?.classList.remove(POS_ACTIVE_CLASS);
                e.currentTarget.classList.add(POS_ACTIVE_CLASS);
                this.position = parseInt(e.currentTarget.getAttribute('data-pos'));
                __updatePreview();
            });
        });


        elHeaderPreview.style.fontSize = this.textSize + 'px';
        elFooterPreview.style.fontSize = this.textSize + 'px';
        elHeaderPreview.style.fontFamily = this.fontFamily;
        elFooterPreview.style.fontFamily = this.fontFamily;

        let pos = {
            1: 'left',
            2: 'center',
            3: 'right',
            4: 'left',
            5: 'center',
            6: 'right'
        };
        const __updatePreview = () => {
            elHeaderPreview.style.display = '';
            elFooterPreview.style.display = '';

            elHeaderPreview.textContent = '1 / ' + this.reader.pageCount;
            elFooterPreview.textContent = '1 / ' + this.reader.pageCount;

            elHeaderPreview.style.fontSize = this.textSize + 'px';
            elFooterPreview.style.fontSize = this.textSize + 'px';

            elHeaderPreview.style.fontFamily = this.fontFamily;
            elFooterPreview.style.fontFamily = this.fontFamily;

            if (this.position >= 1 && this.position <= 3) {
                elHeaderPreviewBox.style.justifyContent = pos[this.position];
            }

            if (this.position >= 4 && this.position <= 6) {
                elFooterPreviewBox.style.justifyContent = pos[this.position];
            }
        }

        const elPageStart = elBody.querySelector('#' + PAGE_START);
        const elPageEnd = elBody.querySelector('#' + PAGE_END);
        elPageEnd.value = this.reader.pageCount;
        elPageEnd.setAttribute('max', this.reader.pageCount);

        const elBtnOk = elBody.querySelector('.btn_ok');
        elBtnOk.addEventListener('click', async () => {
            this.dialog.close();

            const totalPages = this.reader.pageCount;
            let start = Math.max(1, parseInt(elPageStart.value || '1'));
            let end = Math.min(totalPages, parseInt(elPageEnd.value || String(totalPages)));
            if (!Number.isFinite(start) || !Number.isFinite(end) || start > end) {
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

            const posGroup = this.position <= 3 ? 'top' : 'bottom';
            const align = pos[this.position] || 'left';

            for (let pageNum = start; pageNum <= end; pageNum++) {
                const page = this.editor.pdfDocument.getPage(pageNum);
                if (!page) continue;

                const text = pageNum + ' / ' + totalPages;
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
                if (!element) continue;

                const pageRect = page.readerPage?.content?.getBoundingClientRect?.() || page.readerPage?.elWrapper?.getBoundingClientRect?.();
                const elRect = element.el.getBoundingClientRect();

                let x = marginX;
                if (align === 'center') x = pageRect.width / 2 - elRect.width / 2;
                else if (align === 'right') x = pageRect.width - elRect.width - marginX;

                let y = marginY;
                if (posGroup === 'bottom') y = pageRect.height - elRect.height - marginY;

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
                    options: { pos: { x, y }, readOnly: true, autoFocus: false },
                    id: element.id,
                    post: { disableDrag: true, disableResize: true, removeResizable: true },
                });
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

export default PageNumber;
