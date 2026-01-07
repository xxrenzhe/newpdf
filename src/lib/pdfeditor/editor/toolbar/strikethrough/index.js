import { ToolbarItemBase } from '../ToolbarItemBase';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';

const HIGHLIGHT_CLASS = 'text_strike';
const TAG_NAME = 'strikethrough';

class Strikethrough extends ToolbarItemBase {
    init() {
        this.name = 'strikethrough';
        let attrs = {
            background: '#ff0000',
            opacity: 1
        };
        if (Strikethrough.attrs) {
            attrs = Object.assign(attrs, Strikethrough.attrs);
        }
        this.setAttrs(attrs);

        rangy.init();
        this.highlighter = rangy.createHighlighter();

        this.applier = rangy.createClassApplier(HIGHLIGHT_CLASS, {
            ignoreWhiteSpace: true,
            elementTagName: TAG_NAME,
            useExistingElements: true,
            onElementCreate: (el, that) => {
                const page = this.reader.pdfDocument.getPageActive();
                requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const mainRect = page.elWrapper.getBoundingClientRect();
                    const x = rect.left - mainRect.left;
                    const y = rect.top - mainRect.top;
                    const width = rect.width;
                    const height = rect.height;
                    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width) || !Number.isFinite(height)) return;
                    if (width <= 0 || height <= 0) return;

                    const editorPage = this.editor.pdfDocument.getPageForId(page.id) || this.editor.pdfDocument.getPage(page.pageNum);
                    const thickness = 2;
                    editorPage.elements.add('rect', {
                        width,
                        height: thickness,
                        opacity: this.attrs.opacity,
                        background: this.attrs.background,
                    }, {
                        pos: {
                            x,
                            y: y + height / 2 - thickness / 2,
                        },
                    });
                    editorPage.elements.setActive(null);
                    el.remove();
                });
            }
        });

        this.highlighter.addClassApplier(this.applier);
        this.reader.mainBox.addEventListener('mouseup', e => {
            if (this.status) {
                this.highlighter.highlightSelection(HIGHLIGHT_CLASS);
                rangy.getSelection().removeAllRanges();
            }
        });
    }
}

export default Strikethrough;
